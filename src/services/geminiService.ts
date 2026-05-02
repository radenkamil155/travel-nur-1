import { GoogleGenAI } from "@google/genai";
import { Trip } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTripRecommendations(userPreferences: string, availableTrips: Trip[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert travel consultant for NUR TRAVEL. 
      Based on the following user preferences: "${userPreferences}", 
      and these available trips: ${JSON.stringify(availableTrips.map(t => ({ id: t.id, title: t.title, theme: t.theme, country: t.country })))},
      recommend the top trip and explain why in a short, emotional, story-driven sentence.
      Return the response in JSON format like this: { "recommendedTripId": "...", "reason": "..." }`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return null;
  }
}

export async function askTravelAdvisor(question: string, context?: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the NUR TRAVEL AI Advisor. You help travelers find their dream halal journey.
      Answer the user's question: "${question}"
      Keep your tone premium, emotional, and helpful. Focus on the transformation and stories of travel.
      If relevant, mention that we specialize in halal-friendly, spiritually meaningful journeys.
      Context: ${JSON.stringify(context || {})}
      Limit your response to 2-3 short paragraphs.`,
    });

    return response.text;
  } catch (error) {
    console.error("Error in AI Advisor:", error);
    return "I'm sorry, I'm having a bit of trouble connecting to my knowledge base. Please try again or contact our consultants directly.";
  }
}
