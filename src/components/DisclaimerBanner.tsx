import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { Language } from '../types';

interface DisclaimerBannerProps {
  language: Language;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ language }) => {
  const isTa = language === 'ta';

  return (
    <div
      id="disclaimer-banner"
      className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3.5 sm:p-4 text-amber-900 text-sm flex items-start gap-3 shadow-xs"
    >
      <div className="p-1 bg-amber-100 rounded-lg text-amber-700 shrink-0 mt-0.5">
        <ShieldAlert className="w-4 h-4" />
      </div>
      <div className="space-y-1">
        <div className="font-semibold flex items-center gap-1.5 text-amber-950">
          <span>{isTa ? 'முக்கிய அறிவிப்பு & வழிகாட்டுதல்' : 'Important Notice & Disclaimer'}</span>
        </div>
        <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
          {isTa
            ? 'இந்த செயலி ஒரு ஏஐ-உதவி மாதிரி கருவி (AI-assisted prototype) மட்டுமே. இது அரசு அல்லது சென்னை மாநகராட்சிக்கு புகாரை நேரடியாக அனுப்பாது. உருவாக்கப்பட்ட புகார் வரைவில் உள்ள விவரங்களை சரிபார்த்து, உங்கள் அதிகாரப்பூர்வ சென்னை மாநகராட்சி (Namma Chennai App / 1913) அல்லது சம்பந்தப்பட்ட துறை இணையதளத்தில் சமர்ப்பிக்கவும்.'
            : 'CivicMate Chennai is an AI-assisted drafting tool, not an official government complaint portal. It does not submit complaints to any government department. Please review and verify all details (like your exact street name and ward) before submitting through official channels such as GCC Namma Chennai App or helpline 1913.'}
        </p>
      </div>
    </div>
  );
};
