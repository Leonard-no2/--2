import { GoogleGenAI } from "@google/genai";

// Ensure API Key exists in environment
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const askGeminiAboutProcess = async (
  question: string, 
  context: 'TRADITIONAL' | 'PYROLYSIS' | 'COMPARISON'
): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured. Please check your environment settings.";
  }

  const systemInstruction = `
    You are an expert environmental engineer specializing in wastewater treatment and sludge management.
    Your goal is to explain technical processes clearly to a user who might be an engineer, student, or government official.
    
    Current Context: ${context} Sludge Treatment.
    
    Guidelines:
    1. Be concise but technically accurate.
    2. Use bullet points for complex comparisons.
    3. If asked about "Pyrolysis" (热解), highlight its benefits in carbon sequestration and resource recovery.
    4. If asked about "Traditional" (传统/焚烧/填埋), highlight its maturity but also its environmental drawbacks.
    5. Always answer in Chinese (Simplified).
    6. Do not mention that you are an AI model unless asked.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，AI服务暂时不可用，请稍后再试。(Sorry, AI service is temporarily unavailable)";
  }
};