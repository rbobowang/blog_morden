
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const summarizePost = async (content: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following blog post in exactly 3 engaging bullet points. Provide only the bullet points:\n\n${content}`,
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini summary error:", error);
    return "AI is currently resting. Please try again later.";
  }
};

export const generateBlogIdea = async (category: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a catchy, futuristic title and a brief 2-sentence intro for a blog post in the category of ${category}. Format as JSON with 'title' and 'intro' keys.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            intro: { type: Type.STRING }
          },
          required: ["title", "intro"]
        }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini idea error:", error);
    return JSON.stringify({ title: "Innovation Awaits", intro: "Explore the frontiers of modern technology and human achievement." });
  }
};

export const askAiAssistant = async (query: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]): Promise<string> => {
  const ai = getAIClient();
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are Nova, an AI assistant for a high-tech personal blog. You are knowledgeable in Finance, Tech, Health, and Arts. Keep answers concise and slightly futuristic in tone.",
      },
    });
    
    // Convert history to format chat expects if necessary, but here we just send message
    const response = await chat.sendMessage({ message: query });
    return response.text || "I'm processing that information...";
  } catch (error) {
    return "The neural link is unstable. Please try again.";
  }
};
