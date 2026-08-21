import React, { useState } from 'react';
import { Sparkles, Cpu, CheckCircle2, ShieldCheck, ChevronDown, ChevronUp, Layers, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface AboutPrototypeProps {
  language: Language;
}

export const AboutPrototype: React.FC<AboutPrototypeProps> = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTa = language === 'ta';

  return (
    <section
      id="about-prototype-section"
      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
    >
      <button
        id="toggle-about-prototype"
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                {isTa ? 'இந்த மாதிரி கருவி பற்றி (About this Prototype)' : 'About this AI Prototype'}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                Gemini 3.7 Flash
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isTa
                ? 'சென்னைக் குடிமக்களின் பிரச்சனைகளை ஏஐ எவ்வாறு பகுப்பாய்வு செய்து வரைவாக மாற்றுகிறது?'
                : 'How Gemini AI classifies your issue, identifies missing details, and drafts your complaint'}
            </p>
          </div>
        </div>

        <div className="text-slate-400 p-1">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            {isTa
              ? 'CivicMate Chennai என்பது சென்னைவாசிகளுக்கான ஒரு சோதனை மாதிரி (prototype) செயலி ஆகும். இது கூகுள் ஜெமினி (Gemini) செயற்கை நுண்ணறிவு மாதிரியைப் பயன்படுத்தி, பயனர்கள் தட்டச்சு செய்யும் எளிய பிரச்சனைக் குறிப்புகளை பின்வருமாறு தானியங்கி முறையில் பகுப்பாய்வு செய்கிறது:'
              : 'CivicMate Chennai is an AI-powered civic assistant prototype. It utilizes Google Gemini (Gemini 3.7 Flash) to analyze everyday civic issue descriptions and structure them into formal, actionable complaint drafts through the following steps:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Step 1 */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px]">
                  1
                </span>
                <span>{isTa ? 'குறைபாடு வகைப்படுத்துதல்' : 'Civic Domain Classification'}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-7">
                {isTa
                  ? 'விவரிக்கப்பட்ட சிக்கலை குப்பை மேலாண்மை, சாலை பராமரிப்பு, குடிநீர் வாரியம் (CMWSSB), தெருவிளக்குகள் போன்ற தொடர்புடைய சென்னை நகராட்சி துறையுடன் இணைக்கிறது.'
                  : 'Automatically maps informal descriptions into proper civic domains such as Solid Waste, Roads & Potholes, Street Lighting, Drainage/CMWSSB, or Electricity.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px]">
                  2
                </span>
                <span>{isTa ? 'விடுபட்ட தகவல்கள் சரிபார்ப்பு' : 'Missing Details Identification'}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-7">
                {isTa
                  ? 'புகார் விரைவாக தீர்க்கப்பட தேவையான சரியான தெரு பெயர், அடையாளங்கள் (Landmarks), வார்டு எண், பிரச்சனை நீடிக்கும் காலம் போன்ற விடுபட்ட விவரங்களை சுட்டிக்காட்டுகிறது.'
                  : 'Identifies missing crucial info needed by officers, such as exact landmarks, door/pole numbers, Chennai ward/zone, and duration of the problem.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px]">
                  3
                </span>
                <span>{isTa ? 'தீவிரத்தன்மை மதிப்பீடு' : 'Urgency & Hazard Assessment'}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-7">
                {isTa
                  ? 'பொதுமக்கள் பாதுகாப்பு, சுகாதார அபாயம் மற்றும் போக்குவரத்து பாதிப்புகளை ஆராய்ந்து குறைந்த / நடுத்தர / அதிக அவசர நிலையை வெளிப்படையான காரணத்துடன் மதிப்பிடுகிறது.'
                  : 'Evaluates public safety, hygiene risks, and pedestrian/traffic hazards to assign Low, Medium, or High urgency with transparent rationale.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px]">
                  4
                </span>
                <span>{isTa ? 'முறைப்படியான வரைவு தயாரித்தல்' : 'Structured Complaint Drafting'}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-7">
                {isTa
                  ? 'நம்ம சென்னை செயலி, இணையதளங்கள் அல்லது வாட்ஸ்அப் வழியாக அரசு அதிகாரிகளுக்கு எளிதில் நகலெடுத்து அனுப்பக்கூடிய முழுமையான புகார் உரையை உருவாக்குகிறது.'
                  : 'Formats a polite, comprehensive grievance letter ready to copy into the Namma Chennai App, GCC Portal, or WhatsApp/Email to Ward Councillors.'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-800">
                {isTa ? 'தனியுரிமை உறுதிமொழி:' : 'Privacy & Zero Data Storage:'}
              </span>{' '}
              <span>
                {isTa
                  ? 'இந்த செயலி எந்தவொரு பயனர் தகவல் அல்லது தொடர்பு விவரங்களையும் சேமிப்பதில்லை. அனைத்து தகவல்களும் உங்கள் உலாவியில் மட்டுமே இயங்குகின்றன.'
                  : 'This application does not collect, store, or log any personal data or submitted text. All analysis is ephemeral and strictly client-session based.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
