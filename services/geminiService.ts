
import { GoogleGenAI, Type } from "@google/genai";
import { ConsultationRequest } from "../types.ts";

export const generateStudyPlan = async (request: ConsultationRequest) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `
    A parent named ${request.parentName} is seeking help for their child ${request.studentName}, who attends ${request.schoolName} in ${request.location}.
    The student is in ${request.grade} and is struggling with ${request.subject}. 
    
    LOGISTICS CONTEXT:
    - Classes are twice a week, 1 hour each.
    - Conducted via Google Meet.
    - Students are grouped by same country, school, and grade (Max 5 per class).
    - 1-on-1 tutoring is also an option.
    - Monthly payment is required upfront. 
    
    PRICING TIERS:
    - Age 4-8 (Early Literacy): $100 per subject/month.
    - Grades 3-9: $100 per subject/month.
    - Grades 10-12 (Advanced STEM): $120 per subject/month.
    
    CORE VALUES (Must be integrated into the study plan):
    - Academic Excellence & Technical Mastery.
    - Character Building (Responsibility & Discipline).
    - Fear of God (including Bible study twice a month).
    
    Additional context: ${request.description}.
    
    Please provide a structured tutoring plan in JSON format. The summary should mention the specific monthly fee based on the student's grade level and the Google Meet structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A summary of the needs, mentioning the specific monthly fee ($100 or $120) and the structure." },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3-5 specific steps tailored to their curriculum and character development."
            },
            estimatedDuration: { type: Type.STRING, description: "Classes: 2x per week, 1 hour each." },
            monthlyFee: { type: Type.STRING, description: "Specify the fee based on tiers ($100 or $120)." }
          },
          required: ["summary", "recommendations", "estimatedDuration", "monthlyFee"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
