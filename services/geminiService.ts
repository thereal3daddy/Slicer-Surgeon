
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FixStep } from "../types";

const SYSTEM_INSTRUCTION = `You are a Senior 3D Printing Application Engineer.
Your first task is to determine if the provided image is a 3D print (specifically a failure or artifact) or if it's unrelated.

If the image is NOT a 3D print or does not show any clear print-related content:
- Set "isPrintFailure" to false.
- Provide a polite "rejectionMessage" explaining that you can only analyze 3D printing failures and ask for a clear photo of a failed print.

If the image IS a 3D print failure:
- Set "isPrintFailure" to true.
- "diagnosis": A very short name of the defect (e.g., "BED ADHESION FAILURE").
- "shortDescription": A single, impactful sentence describing the core issue and its common result (e.g., "Leads to spaghetti-like extrusions and is a very common first-layer issue.").
- Provide a technical 3-step fix guide RANKED BY EASE OF APPLICATION:
    - Step 1: Easiest/Quickest fix (e.g., "Clean the bed" or "Adjust Z-Offset").
    - Step 2: Moderate effort/Slicer adjustment (e.g., "Increase bed temperature" or "Add brim").
    - Step 3: Technical/Hardware fix (e.g., "Level the gantry" or "Replace build plate").

Output the analysis strictly in JSON format matching this schema:
{
  "isPrintFailure": boolean,
  "rejectionMessage": "Explanation if not a print failure, otherwise null",
  "diagnosis": "Short defect name",
  "shortDescription": "One sentence impact description",
  "confidenceScore": number (0-100),
  "visualEvidence": ["evidence 1", "evidence 2", ...],
  "printerGuess": "Estimate of printer model",
  "step1": { 
    "title": "Short title", 
    "summary": "One sentence summary",
    "guide": ["Step 1", "Step 2", ...],
    "resourceLink": "URL"
  },
  "step2": { 
    "title": "Short title", 
    "summary": "One sentence summary",
    "guide": ["Step 1", "Step 2", ...],
    "resourceLink": "URL"
  },
  "step3": { 
    "title": "Short title", 
    "summary": "One sentence summary",
    "guide": ["Step 1", "Step 2", ...],
    "resourceLink": "URL"
  },
  "searchQueries": ["query 1", "query 2"]
}`;

const getApiKey = () => {
  // Try variables in order of specificity
  const key = (import.meta.env?.VITE_GEMINI_API_KEY) ||
    (import.meta.env?.GEMINI_API_KEY) ||
    (process.env?.VITE_GEMINI_API_KEY) ||
    (process.env?.API_KEY) ||
    (window as any).process?.env?.VITE_GEMINI_API_KEY ||
    (window as any).process?.env?.GEMINI_API_KEY;

  // Safety check: if it's the literally "undefined" string (from Vite define), it's not a key
  if (!key || key === "undefined") {
    console.error("DEBUG: Gemini API Key is missing or undefined.");
    return null;
  }

  console.log("DEBUG: API Key detection: FOUND (starts with " + String(key).substring(0, 4) + ")");
  return key;
};

export async function analyzePrintFailure(base64Image: string): Promise<{ result: AnalysisResult, grounding: any[] }> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("Gemini API Key is missing. Please check your .env.local file.");

  const ai = new (GoogleGenAI as any)({ apiKey });

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image.split(',')[1],
    },
  };

  const textPart = {
    text: "Examine this image. If it is a failed 3D print, provide a concise diagnostic analysis. Rank solutions from easiest/fastest to most complex/technical."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isPrintFailure: { type: Type.BOOLEAN },
            rejectionMessage: { type: Type.STRING },
            diagnosis: { type: Type.STRING },
            shortDescription: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER },
            visualEvidence: { type: Type.ARRAY, items: { type: Type.STRING } },
            printerGuess: { type: Type.STRING },
            step1: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                guide: { type: Type.ARRAY, items: { type: Type.STRING } },
                resourceLink: { type: Type.STRING }
              },
              required: ["title", "summary", "guide"]
            },
            step2: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                guide: { type: Type.ARRAY, items: { type: Type.STRING } },
                resourceLink: { type: Type.STRING }
              },
              required: ["title", "summary", "guide"]
            },
            step3: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                guide: { type: Type.ARRAY, items: { type: Type.STRING } },
                resourceLink: { type: Type.STRING }
              },
              required: ["title", "summary", "guide"]
            },
            searchQueries: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["isPrintFailure", "diagnosis", "shortDescription", "confidenceScore", "visualEvidence", "printerGuess", "step1", "step2", "step3", "searchQueries"],
        }
      },
    });

    const resultText = typeof response.text === 'function' ? response.text() : (response.text || "{}");
    const result = JSON.parse(resultText) as AnalysisResult;
    const grounding = (response as any).candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { result, grounding };
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    if (error?.message?.includes("404")) {
      throw new Error("Model not found. Please ensure your API key has access to 'gemini-1.5-flash'.");
    }
    throw new Error(error instanceof Error ? error.message : "Failed to analyze the image.");
  }
}

export async function getDetailedProcedure(fixTitle: string, diagnosis: string): Promise<string[]> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");
  const ai = new (GoogleGenAI as any)({ apiKey });

  const prompt = `As a 3D printing engineer, provide a high-granularity, step-by-step procedure for the following fix: "${fixTitle}" for the problem "${diagnosis}". 
  Break it down into 6-10 extremely detailed, easy-to-follow steps for a beginner.
  Return ONLY a JSON object with a "procedure" property which is an array of strings.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            procedure: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["procedure"]
        }
      }
    });

    const resultText = typeof response.text === 'function' ? response.text() : (response.text || '{"procedure": []}');
    const data = JSON.parse(resultText);
    return data.procedure || [];
  } catch (error) {
    console.error("Detailed Guide Error:", error);
    throw new Error("Could not fetch detailed procedure.");
  }
}
