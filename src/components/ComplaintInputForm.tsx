import React, { useRef } from 'react';
import { Trash2, RefreshCw, SendHorizontal } from 'lucide-react';
import { Language, PresetExample } from '../types';
import { PRESET_EXAMPLES } from '../constants/presets';

interface ComplaintInputFormProps {
  description: string;
  onChangeDescription: (value: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onClear: () => void;
}

export const ComplaintInputForm: React.FC<ComplaintInputFormProps> = ({
  description,
  onChangeDescription,
  language,
  onLanguageChange,
  onSubmit,
  isLoading,
  onClear,
}) => {
  const isTa = language === 'ta';
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelectPreset = (preset: PresetExample) => {
    const text = isTa ? preset.textTa : preset.textEn;
    onChangeDescription(text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (description.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div id="complaint-input-section" className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">
          {isTa ? 'குறைபாட்டை விவரிக்கவும்' : 'Describe the Civic Problem'}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          {isTa
            ? 'உங்கள் பகுதியில் உள்ள குறைகளை விவரிக்கவும். ஏஐ மாதிரி உங்கள் மதிப்பாய்விற்கான வரைவை உருவாக்கும்; அதை நீங்களே அதிகாரப்பூர்வ சேனல்களில் சமர்ப்பிக்கலாம்.'
            : 'Describe your local civic issue. AI will create an organized draft for you to review and submit through official Chennai channels.'}
        </p>
      </div>

      {/* Quick Example Chips */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
          {isTa ? 'உதாரணத்தை கிளிக் செய்து சோதிக்கவும்' : 'Sample Scenarios'}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_EXAMPLES.map((preset) => (
            <button
              key={preset.id}
              id={`preset-${preset.id}`}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200/80 text-slate-600 transition-all text-left flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span>{isTa ? preset.titleTa : preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Description Textarea Field */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="civic-problem-description" className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {isTa ? 'விளக்கம் (Description)' : 'Description'}
          </label>
          {description && (
            <button
              id="clear-input-btn"
              type="button"
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>{isTa ? 'அழி' : 'Clear'}</span>
            </button>
          )}
        </div>

        <div className="relative">
          <textarea
            id="civic-problem-description"
            ref={textareaRef}
            rows={6}
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isTa
                ? 'எடுத்துக்காட்டு: "எங்கள் தெருவில் கடந்த மூன்று நாட்களாக குப்பைகள் அகற்றப்படாமல் துர்நாற்றம் வீசுகிறது. இதனால் பாதசாரிகள் நடக்க முடியவில்லை..."'
                : 'E.g., The garbage bin at the corner of T. Nagar 3rd street has been overflowing for three days. There is a foul smell and it is attracting stray animals.'
            }
            className="w-full p-4 border border-slate-200 rounded-lg text-slate-700 bg-slate-50/80 resize-y min-h-[140px] focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white placeholder:text-slate-400 text-sm leading-relaxed transition-all"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <span>
            {description.trim().length} {isTa ? 'எழுத்துக்கள்' : 'characters'}
          </span>
          <span className="hidden sm:inline">
            {isTa ? 'விசைப்பலகை: Ctrl + Enter' : 'Ctrl + Enter to generate'}
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        id="btn-generate-complaint"
        type="button"
        onClick={onSubmit}
        disabled={!description.trim() || isLoading}
        className={`w-full py-3.5 sm:py-4 font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
          !description.trim() || isLoading
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-100 hover:shadow-blue-200'
        }`}
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-white" />
            <span>{isTa ? 'ஏஐ புகார் வரைவை உருவாக்குகிறது...' : 'Analyzing & Drafting...'}</span>
          </>
        ) : (
          <>
            <SendHorizontal className="w-4 h-4 text-blue-200" />
            <span>{isTa ? 'புகார் வரைவை உருவாக்கு' : 'Generate Complaint Draft'}</span>
          </>
        )}
      </button>
    </div>
  );
};

