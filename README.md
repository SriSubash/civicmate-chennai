# CivicMate Chennai

CivicMate Chennai is an AI-assisted civic prototype designed to help residents of Chennai turn informal descriptions of everyday civic issues into clear, structured, and actionable complaint drafts.

---

## Problem

When residents encounter civic issues in their neighborhoods—such as uncollected waste, sewage overflows, non-functional streetlights, water supply disruptions, or hazardous road potholes—they often face difficulties in reporting them effectively:

- **Unclear or unstructured descriptions**: Informal notes may miss essential context needed by municipal officials.
- **Missing critical details**: Vital data like landmarks, door/pole numbers, Chennai ward/zone numbers, or duration of the problem are often omitted.
- **Uncertain urgency or routing**: Residents may not know which department oversees the issue or how urgent the risk is to public safety.
- **Language barriers**: Drafting formal grievances in formal English or formal Tamil can be challenging.

---

## Solution

CivicMate Chennai uses Google Gemini to transform everyday problem descriptions into well-organized grievance drafts:

- **Understands informal input**: Analyzes plain-language problem descriptions provided by residents.
- **Categorizes the civic issue**: Maps problems to appropriate civic domains (e.g., Solid Waste Management, Roads & Potholes, CMWSSB / Drainage, Street Lighting, Electricity, Public Health).
- **Assesses urgency**: Analyzes safety, hygiene, and traffic impacts to suggest Low, Medium, or High urgency with clear rationale.
- **Identifies missing information**: Provides a checklist of missing details (exact landmarks, ward numbers, photos) before submission.
- **Generates structured complaint drafts**: Formats a professional complaint containing subject, salutation, body, and action request.
- **Supports English and Tamil**: Offers full bilingual drafting and seamless two-way translation between English and Tamil (தமிழ்).
- **Provides copy-ready text**: Delivers clean, ready-to-copy drafts with optional in-place editing to customize personal placeholders.

---

## Features

- **Intuitive Complaint Drafter**: Clean single-screen interface to enter or paste civic issue descriptions.
- **One-Click Sample Scenarios**: Quick presets covering common Chennai scenarios (overflowing garbage bins, sewage backup, street light outages, road potholes, and water supply delays).
- **Bilingual AI Support (English / தமிழ்)**: Switch application language anytime or translate generated drafts with a single click.
- **Urgency & Hazard Evaluation**: Clear visual indicators for severity with explanatory notes.
- **Missing Information Checklist**: Highlights critical data points that strengthen the complaint.
- **In-Place Draft Editing**: Edit placeholders like `[Your Name]`, `[Phone Number]`, or `[Street Name]` directly in the app.
- **One-Click Copying**: Copy Draft or Copy Message buttons with immediate visual feedback and clipboard fallbacks.
- **Verified Reference Helplines**: Dedicated directory of verified official contact references for Greater Chennai Corporation (GCC 1913), Metro Water (CMWSSB 1916), TANGEDCO Minnagam (94987 94987), and Traffic Police (103).
- **Interactive "About this Prototype" Guide**: Explains the step-by-step AI workflow to residents for transparency.

---

## How Gemini is Used

CivicMate Chennai utilizes the Google Gen AI SDK (`@google/genai`) powered by the **Gemini 3.7 Flash** model on the server side:

1. **Classification**: Analyzes the resident's text and classifies the issue into structured municipal domains.
2. **Missing-Information Extraction**: Identifies missing geographical and operational specifics (landmarks, ward numbers, duration).
3. **Urgency Assessment**: Evaluates the severity, public health hazards, and safety risks to recommend an urgency level.
4. **Structured Complaint Drafting**: Synthesizes the input into a formal grievance letter with standard placeholders.
5. **Bidirectional Translation**: Handles semantic translation between English and Tamil while preserving civic terminology and tone.

All Gemini API calls are securely proxied through backend server endpoints (`/api/generate-complaint` and `/api/translate-complaint`) to protect API credentials.

---

## Privacy

- **No User Accounts or Login Required**: Users can immediately draft grievances without creating an account.
- **Zero Personal Data Stored**: The application does not store, log, or persist user-submitted problem descriptions or personal contact details in any database.
- **Client-Side Session State**: State remains ephemeral in the browser session.

---

## Important Disclaimer

> **CivicMate Chennai is an independent AI-assisted drafting prototype and is NOT an official government application or municipal portal.**
>
> - This application **does not automatically file or submit complaints** to any government department or authority.
> - The user is responsible for reviewing and verifying all generated drafts, placeholders, and routing suggestions.
> - Users must submit their verified complaints directly through official government channels (such as the Greater Chennai Corporation Namma Chennai App, GCC Portal, CMWSSB, or official helplines).
> - Government helpline numbers and links provided in the reference section should be verified before submission, as official contacts may change over time.

---

## Technology

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Motion
- **Backend**: Express.js (Node.js runtime)
- **AI Integration**: Google Gen AI TypeScript SDK (`@google/genai`) with Gemini 3.7 Flash
- **Build Tooling**: Vite 6, esbuild, tsx

---

## Project Status

CivicMate Chennai is currently a **working prototype** intended to demonstrate how generative AI can simplify and structure civic communication for residents.

---

## Future Improvements

- **Interactive Ward & Zone Locator**: Map-based or pin-code-based ward/zone lookup for Chennai's 15 administrative zones (Zones 1–15, Wards 1–200).
- **Photo & Visual Inspection**: Allow users to attach photos of civic issues so AI can analyze visual severity and extract location details.
- **Broader Language Support**: Expand multilingual capabilities to include additional Indian languages (e.g., Telugu, Malayalam, Hindi).
- **Accessibility Enhancements**: Voice-to-text input support and screen-reader optimizations for diverse user demographics.
- **Direct Official Service Integration**: Explore secure integrations with verified public APIs or submission portals where officially supported.
