import { GoogleGenAI } from "@google/genai";

// Try to get the API key from various sources
const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const chatWithAgent = async (message: string, history: { role: string; parts: { text: string }[] }[]) => {
  if (!ai) {
    console.error("Gemini API Key is missing.");
    return "Le service d'IA n'est pas configuré. Veuillez vérifier la clé API.";
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `Tu es l'assistant virtuel de TimeTravel Agency.
        Ton rôle : conseiller les clients sur nos voyages temporels (Paris 1889, Crétacé -66M, Florence 1504).

        IMPORTANT : Fais des réponses COURTES et naturelles (max 2-3 phrases).
        Comme une vraie personne sur un chat, évite les longs pavés.
        
        Ton ton :
        - Chaleureux et pro
        - Passionné mais concis
        - Utilise des emojis avec parcimonie

        Infos clés :
        - Paris 1889 : Belle Époque, Tour Eiffel.
        - Crétacé : Dinosaures, aventure brute.
        - Florence 1504 : Renaissance, Art.
        - Prix : ~5000-9000 ₡ (Crédits Temporels).
        - Sécurité : "Bouclier Quantique" (100% sûr).

        Réponds toujours en français.`,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: h.parts
      })),
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error: any) {
    console.error("Chat error details:", error);
    // Return a more user-friendly error message, but log the real one
    return `Une erreur est survenue lors de la communication avec le flux temporel. (Erreur: ${error.message || 'Inconnue'})`;
  }
};
