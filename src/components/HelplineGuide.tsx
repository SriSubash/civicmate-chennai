import React, { useState } from 'react';
import { Phone, ChevronDown, ChevronUp, Smartphone, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { CHENNAI_HELPLINE_INFO } from '../constants/presets';

interface HelplineGuideProps {
  language: Language;
}

export const HelplineGuide: React.FC<HelplineGuideProps> = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTa = language === 'ta';

  return (
    <section id="helpline-guide-section" className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <button
        id="toggle-helpline-guide"
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                {isTa ? 'சென்னையின் முக்கிய புகார் உதவி எண்கள் (அதிகாரப்பூர்வ குறிப்பு)' : 'Verified Chennai Grievance Channels'}
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                {isTa ? 'சரிபார்க்கப்பட்ட குறிப்பு' : 'Verified References'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isTa
                ? 'சென்னை மாநகராட்சி (GCC), குடிநீர் வாரியம், மின்வாரிய தொடர்பு எண்கள் மற்றும் வழிகாட்டுதல்'
                : 'Official helplines, Namma Chennai App, and Metro Water portals for Greater Chennai'}
            </p>
          </div>
        </div>

        <div className="text-slate-400 p-1">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-3.5">
          {/* Official Verification Notice Callout */}
          <div className="mt-3 p-3 bg-amber-50/80 rounded-lg border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-amber-950">
                {isTa ? 'சமர்ப்பிக்கும் முன் சரிபார்க்கவும்:' : 'Please verify before submitting:'}
              </span>{' '}
              <span className="text-amber-900 leading-relaxed">
                {isTa
                  ? 'கீழே உள்ள உதவி எண்களும் இணையதளங்களும் சென்னையின் அதிகாரப்பூர்வ குறிப்பு தகவல்களாகும். அரசு பயன்பாட்டு இணைப்புகள் அல்லது எண்கள் மாறக்கூடும் என்பதால், உங்கள் தனிப்பட்ட புகாரை சமர்ப்பிக்கும் முன் சம்பந்தப்பட்ட துறையின் நேரடி அதிகாரப்பூர்வ இணையதளத்தில் சரிபார்த்துக் கொள்ளவும்.'
                  : 'The channels listed below are standard verified reference contacts for Greater Chennai. Official phone numbers, apps, or zonal portals may be updated by government departments. Always verify the current active contact details before submitting.'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHENNAI_HELPLINE_INFO.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-lg border border-slate-200/80 shadow-2xs space-y-1.5"
              >
                <div className="font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between">
                  <span>{isTa ? item.nameTa : item.name}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-100">
                    {item.helpline}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isTa ? item.serviceTa : item.service}
                </p>
                <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-slate-400" />
                    {item.app}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Globe className="w-3 h-3" />
                    {item.portal}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1 text-center">
            <p className="text-[11px] text-slate-500">
              {isTa
                ? 'குறிப்பு: உங்கள் பகுதி வார்டு கவுன்சிலர் அல்லது சென்னை மாநகராட்சி மண்டல அலுவலகத்திலும் (Zonal Office 1 முதல் 15) இந்த வரைவை சமர்ப்பிக்கலாம்.'
                : 'Tip: You can also copy your generated draft and message your local Chennai Ward Councillor or Zonal Office (Zones 1-15).'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

