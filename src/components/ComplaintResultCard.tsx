import React, { useState } from 'react';
import {
  Copy,
  Check,
  Languages,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Building,
  Edit3,
  Sparkles,
  Info,
} from 'lucide-react';
import { ComplaintData, Language, UrgencyLevel } from '../types';

interface ComplaintResultCardProps {
  complaint: ComplaintData;
  onTranslate: (targetLang: Language) => void;
  isTranslating: boolean;
  onCopySuccess: () => void;
}

export const ComplaintResultCard: React.FC<ComplaintResultCardProps> = ({
  complaint,
  onTranslate,
  isTranslating,
  onCopySuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(complaint.readyToCopyMessage);

  React.useEffect(() => {
    setEditedText(complaint.readyToCopyMessage);
    setIsEditing(false);
  }, [complaint.readyToCopyMessage, complaint.language]);

  const isTa = complaint.language === 'ta';

  const handleCopy = async () => {
    const textToCopy = isEditing ? editedText : complaint.readyToCopyMessage;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'High':
        return {
          bg: 'bg-red-100 text-red-700 border-red-200',
          label: isTa ? 'அவசரம்: அதிகம்' : 'Urgency: High',
          icon: Flame,
        };
      case 'Medium':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-200',
          label: isTa ? 'அவசரம்: நடுத்தரம்' : 'Urgency: Medium',
          icon: AlertTriangle,
        };
      case 'Low':
      default:
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          label: isTa ? 'அவசரம்: குறைவு' : 'Urgency: Low',
          icon: ShieldCheck,
        };
    }
  };

  const urgencyInfo = getUrgencyBadge(complaint.urgency);
  const nextLang: Language = complaint.language === 'en' ? 'ta' : 'en';

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar for Analysis & Draft Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
          {isTa ? 'ஆய்வு & வரைவு (Analysis & Draft)' : 'Analysis & Draft'}
        </h2>
        <button
          id="btn-toggle-translation"
          type="button"
          onClick={() => onTranslate(nextLang)}
          disabled={isTranslating}
          className="bg-white border border-slate-200 px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300 flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
        >
          <Languages className="w-3.5 h-3.5 text-blue-600" />
          <span>
            {isTranslating
              ? isTa
                ? 'மொழிபெயர்க்கிறது...'
                : 'Translating...'
              : nextLang === 'ta'
              ? 'Translate to தமிழ்'
              : 'Translate to English'}
          </span>
        </button>
      </div>

      {/* Main Analysis & Draft Card */}
      <div
        id="complaint-result-card"
        className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden"
      >
        {/* Card Header with Badges, Title, and Copy Button */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span
                id="complaint-category-badge"
                className="px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded tracking-wider"
              >
                {complaint.category}
              </span>
              <span
                id="complaint-urgency-badge"
                className={`px-2 py-1 text-[10px] font-bold uppercase rounded tracking-wider ${urgencyInfo.bg}`}
              >
                {urgencyInfo.label}
              </span>
            </div>
            <h3 id="complaint-short-title" className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
              {complaint.shortTitle}
            </h3>
          </div>

          <button
            id="btn-copy-draft-header"
            type="button"
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer shrink-0 ${
              copied
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>{isTa ? 'நகலெடுக்கப்பட்டது!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{isTa ? 'புகாரை நகலெடு' : 'Copy Draft'}</span>
              </>
            )}
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-6">
          {/* Structured Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isTa ? 'புகாரின் விரிவான விளக்கம்' : 'Structured Complaint Description'}
            </h4>
            <p
              id="complaint-structured-description"
              className="text-sm text-slate-700 leading-relaxed whitespace-pre-line"
            >
              {complaint.complaintDescription}
            </p>
            {complaint.urgencyReason && (
              <p className="text-xs text-slate-500 italic mt-1">
                <strong>{isTa ? 'காரணம்:' : 'Urgency note:'}</strong> {complaint.urgencyReason}
              </p>
            )}
          </div>

          {/* 2-Column Info Grid: Key Info + Official Channel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {isTa ? 'சேர்க்க வேண்டிய முக்கிய தகவல்கள்' : 'Key Information to Add'}
              </h4>
              <ul className="space-y-2">
                {complaint.keyInfoNeeded.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-blue-500 font-bold text-base leading-none">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isTa ? 'ஏஐ பரிந்துரைத்த அரசு சேனல்' : 'AI-Suggested Channel'}
                </h4>
                <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  {isTa ? 'சரிபார்க்கவும்' : 'Verify'}
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 text-sm text-slate-600 leading-relaxed space-y-1.5">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{complaint.suggestedAuthority || 'Greater Chennai Corporation (GCC)'}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {isTa
                    ? 'குறிப்பு: இது ஏஐ வழங்கிய பரிந்துரை மட்டுமே. சமர்ப்பிக்கும் முன் இது உங்கள் வார்டு அல்லது மண்டலத்திற்கு (GCC/CMWSSB/TANGEDCO) பொருந்துகிறதா என்பதை சரிபார்க்கவும்.'
                    : 'Note: AI-generated routing suggestion. Please confirm this corresponds to your specific Chennai ward or zone before submitting.'}
                </p>
              </div>
            </div>
          </div>

          {/* Ready-to-Copy Message Section */}
          <div className="bg-slate-50 p-5 sm:p-6 rounded-lg border border-dashed border-slate-300 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isTa ? 'நகலெடுக்கத் தயாராக உள்ள முழுப் புகார் வடிவம்' : 'Ready-to-Copy Message'}
              </h4>
              <button
                id="btn-toggle-edit"
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? (isTa ? 'முடிந்தது' : 'Done') : isTa ? 'தொகுக்க' : 'Edit text'}</span>
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  id="edited-complaint-draft"
                  rows={8}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-lg text-slate-800 bg-white font-sans text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 italic">
                  {isTa
                    ? 'உங்கள் பெயர், தெரு பெயர் அல்லது வார்டு எண்ணை நேரடியாக திருத்திக் கொள்ளலாம்.'
                    : 'You can replace placeholders like [Your Name] and [Exact Location] before copying.'}
                </p>
              </div>
            ) : (
              <div
                id="ready-to-copy-text"
                className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans select-all bg-white/70 p-4 rounded-md border border-slate-200/60"
              >
                {editedText}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                {isTa ? 'சென்னை மாநகராட்சி / வாட்ஸ்அப் / இமெயில் வடிவம்' : 'Formatted for GCC / Metro Water / Councillors'}
              </span>
              <button
                id="btn-copy-draft-inner"
                type="button"
                onClick={handleCopy}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isTa ? 'நகலெடுக்கப்பட்டது' : 'Copied') : isTa ? 'நகலெடு' : 'Copy Message'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

