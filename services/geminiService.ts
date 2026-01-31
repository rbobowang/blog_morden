
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI client using the recommended named parameter and environment variable.
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const summarizePost = async (content: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请用简短的 3 个要点总结以下博文内容，并以吸引人的方式呈现。仅提供要点内容：\n\n${content}`,
    });
    // Access the text property directly from the response.
    return response.text || "无法生成摘要。";
  } catch (error) {
    console.error("Gemini summary error:", error);
    return "AI 正在休息，请稍后再试。";
  }
};

export const generateBlogIdea = async (category: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `为分类为“${category}”的博客文章生成一个吸引人的、具有未来感的标题和简短的 2 句引言。请使用简体中文，并以 JSON 格式返回，包含 'title' 和 'intro' 键。`,
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
    return response.text || JSON.stringify({ title: "创新等待探索", intro: "探索现代技术与人类成就的前沿领域。" });
  } catch (error) {
    console.error("Gemini idea error:", error);
    return JSON.stringify({ title: "创新等待探索", intro: "探索现代技术与人类成就的前沿领域。" });
  }
};

export const askAiAssistant = async (query: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]): Promise<string> => {
  const ai = getAIClient();
  try {
    // Create chat with history to maintain conversation context.
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: history,
      config: {
        systemInstruction: `你叫 aita，是一个高科技个人博客的 AI 助手。
你精通财经、科技、健康和艺术，并且拥有一个核心研究项目：“共鸣溢价（Resonance Premium）”。
你目前的语境设定在 2026 年 1 月。
你的核心逻辑是：在功能贬值的过剩时代，情绪价值、文化认同和“生命真诚度”是产生高溢价的关键。
你关注 2026 年的定价权、AI 环境智能、数字生命心理学和年轻人向“内在充实”的深度转型。
请使用简体中文回答，语气要简洁、理性且带有强烈的未来感。`,
      },
    });
    
    // sendMessage handles the user turn.
    const response = await chat.sendMessage({ message: query });
    return response.text || "正在处理您的信息...";
  } catch (error) {
    console.error("Gemini assistant error:", error);
    return "神经连接不稳定，请重试。";
  }
};
