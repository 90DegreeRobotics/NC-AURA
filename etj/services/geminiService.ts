
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// This function assumes API_KEY is validated before calling
export const generateCharacterResponse = async (
  systemInstruction: string,
  userPrompt: string,
  apiKey: string | undefined // Accept undefined as the key might not be available
): Promise<string> => {
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
    // This case should ideally be handled by apiKeyAvailable state in App.tsx
    // and the additional check in processGeminiRequest
    console.error("Gemini API Key is not provided or is invalid in generateCharacterResponse function.");
    throw new Error("Gemini API Key is missing or invalid. Please check your configuration.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey }); 
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const text = response.text;
    if (typeof text !== 'string') {
      console.error("Unexpected response format from Gemini API:", response);
      throw new Error("Received an unexpected response format from the AI.");
    }
    return text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key not valid")) {
        throw new Error("The provided Gemini API Key is not valid. Please check your configuration.");
      }
      throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};