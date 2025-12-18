import { GoogleGenAI } from "@google/genai";
import { CARS } from "../data";

let aiClient: GoogleGenAI | null = null;

// Initialize the client only when needed to ensure environment variable availability
const getAiClient = () => {
    if (!aiClient) {
        aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    }
    return aiClient;
};

export const getCarAssistantResponse = async (userQuery: string): Promise<string> => {
    try {
        const client = getAiClient();
        
        // Contextualize with current car data
        const carContext = CARS.map(c => 
            `${c.name} (${c.category}): $${c.price}/day. Specs: ${c.specs.speed}, ${c.specs.fuel}.`
        ).join('\n');

        const systemInstruction = `You are "Velo", the AI concierge for Velocidad Premium Rentals.
        Your tone is sophisticated, helpful, and concise.
        You help customers choose a luxury car from our catalog.
        
        Here is our current catalog:
        ${carContext}
        
        Rules:
        1. Only recommend cars from the catalog.
        2. Keep responses short (under 50 words) unless detailed comparison is asked.
        3. Emphasize luxury and performance.
        4. If the user asks for something we don't have, politely suggest the closest alternative from our list.
        `;

        const response = await client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: userQuery,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "Disculpe, no pude procesar su solicitud en este momento.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Lo siento, mi conexión neuronal está experimentando interferencias. Por favor intente de nuevo.";
    }
};