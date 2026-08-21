import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function generateContentWithFallback(
  ai: GoogleGenAI,
  params: {
    systemInstruction?: string;
    prompt: string;
    temperature?: number;
    responseSchema?: any;
  }
) {
  const models = ["gemini-3.7-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.prompt,
        config: {
          systemInstruction: params.systemInstruction,
          temperature: params.temperature ?? 0.2,
          responseMimeType: "application/json",
          responseSchema: params.responseSchema,
        },
      });

      const text = response.text?.trim();
      if (text) {
        return text;
      }
    } catch (err: any) {
      console.warn(`Attempt with model ${model} failed:`, err?.message || err);
      lastError = err;
      // Wait briefly before trying fallback
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }

  throw lastError || new Error("Failed to generate content across available models.");
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "CivicMate Chennai" });
});

// Generate structured civic complaint
app.post("/api/generate-complaint", async (req, res) => {
  try {
    const { description, language = "en" } = req.body;

    if (!description || typeof description !== "string" || description.trim().length === 0) {
      res.status(400).json({ error: "Please provide a civic problem description." });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(500).json({
        error: "Gemini API key is not configured. Please ensure GEMINI_API_KEY is provided in settings.",
      });
      return;
    }

    const langName = language === "ta" ? "Tamil" : "English";

    const systemInstruction = `You are CivicMate Chennai, an expert civic assistant specialized in helping residents of Chennai, Tamil Nadu, India turn everyday civic problems into clear, structured, and formal complaint drafts.
You understand the civic landscape of Chennai, including Greater Chennai Corporation (GCC), Chennai Metro Water (CMWSSB), TANGEDCO (Electricity), Chennai Traffic Police, and local ward administration.
Your task is to analyze the resident's informal problem description and produce a well-structured civic complaint in ${langName}.

The output must be pure JSON adhering to the specified schema:
- category: The standard civic domain (e.g., Solid Waste Management, Roads & Potholes, Street Lighting, Drainage & Sewerage, Drinking Water Supply, Stray Cattle & Dogs, Encroachments & Footpaths, Stormwater Drains & Flooding, Mosquito/Vector Control, Public Parks & Toilets). In ${langName}.
- shortTitle: A concise, impactful subject line/title for the complaint.
- complaintDescription: A detailed, clear, and objective description of the grievance highlighting the problem, duration, location context, and impact on residents/pedestrians/traffic/public health.
- urgency: Must strictly be one of: "Low", "Medium", or "High".
  * High: Immediate hazard to life/health (open manholes, live electric wires, severe sewage mixing with drinking water, blocked access).
  * Medium: Significant ongoing disruption (overflowing garbage for days, unlit street, major potholes, water stagnation).
  * Low: Non-hazardous maintenance (faded road markings, minor park maintenance, peeling signs).
- urgencyReason: A 1-2 sentence explanation of why this urgency level was assigned.
- keyInfoNeeded: An array of 3 to 5 specific missing details or information the resident should check/fill in before submitting (e.g., Exact Street name / Door No / Landmark, Ward Number / Zone in Chennai, Duration since the issue started, Photo evidence).
- readyToCopyMessage: A comprehensive, polished, ready-to-copy complaint draft formatted with Subject, Salutation, Body, Action Request, and placeholders like [Your Name], [Contact Number], [Exact Location / Landmark in Chennai] if not specified by the user.
- suggestedAuthority: Suggested Chennai authority or channel (e.g., "Greater Chennai Corporation (GCC) - Namma Chennai App / Helpline 1913", "Chennai Metropolitan Water Supply and Sewerage Board (CMWSSB) - Helpline 1916", "TANGEDCO (Electricity) - Helpline 94987 94987 (Minnagam)", "Chennai Traffic Police - Helpline 103", or "Local Ward Office"). Do not invent or guess unverified phone numbers or URLs.`;

    const text = await generateContentWithFallback(ai, {
      systemInstruction,
      prompt: `Resident's Problem Description:\n"${description.trim()}"\n\nGenerate the complete complaint draft in ${langName}.`,
      temperature: 0.2,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          shortTitle: { type: Type.STRING },
          complaintDescription: { type: Type.STRING },
          urgency: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High"],
          },
          urgencyReason: { type: Type.STRING },
          keyInfoNeeded: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          readyToCopyMessage: { type: Type.STRING },
          suggestedAuthority: { type: Type.STRING },
        },
        required: [
          "category",
          "shortTitle",
          "complaintDescription",
          "urgency",
          "urgencyReason",
          "keyInfoNeeded",
          "readyToCopyMessage",
          "suggestedAuthority",
        ],
      },
    });

    const complaintData = JSON.parse(text);
    res.json({
      success: true,
      data: {
        ...complaintData,
        language,
        originalDescription: description,
      },
    });
  } catch (error: any) {
    console.error("Error generating complaint:", error);
    res.status(500).json({
      error: error.message || "Failed to generate complaint draft. Please try again.",
    });
  }
});

// Translate existing complaint
app.post("/api/translate-complaint", async (req, res) => {
  try {
    const { complaint, targetLanguage } = req.body;

    if (!complaint || !targetLanguage || (targetLanguage !== "en" && targetLanguage !== "ta")) {
      res.status(400).json({ error: "Invalid complaint data or target language." });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(500).json({
        error: "Gemini API key is not configured.",
      });
      return;
    }

    const targetLangName = targetLanguage === "ta" ? "Tamil" : "English";

    const prompt = `Translate the following Chennai civic complaint analysis and draft accurately and naturally into ${targetLangName}. Keep the meaning, urgency enum value ("Low", "Medium", or "High"), and structure identical. Ensure Chennai civic terms (e.g. GCC, CMWSSB, Namma Chennai App, Ward, Zone) are translated or transliterated cleanly.

Input Complaint Data (JSON):
${JSON.stringify(complaint, null, 2)}

Return the translated JSON with the exact same structure.`;

    const text = await generateContentWithFallback(ai, {
      prompt,
      temperature: 0.1,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          shortTitle: { type: Type.STRING },
          complaintDescription: { type: Type.STRING },
          urgency: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High"],
          },
          urgencyReason: { type: Type.STRING },
          keyInfoNeeded: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          readyToCopyMessage: { type: Type.STRING },
          suggestedAuthority: { type: Type.STRING },
        },
        required: [
          "category",
          "shortTitle",
          "complaintDescription",
          "urgency",
          "urgencyReason",
          "keyInfoNeeded",
          "readyToCopyMessage",
          "suggestedAuthority",
        ],
      },
    });

    const translatedData = JSON.parse(text);
    res.json({
      success: true,
      data: {
        ...translatedData,
        language: targetLanguage,
        originalDescription: complaint.originalDescription,
      },
    });
  } catch (error: any) {
    console.error("Error translating complaint:", error);
    res.status(500).json({
      error: error.message || "Failed to translate complaint.",
    });
  }
});

// Vite & Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CivicMate Chennai server running on port ${PORT}`);
  });
}

startServer();
