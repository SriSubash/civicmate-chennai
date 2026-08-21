import React, { useState } from 'react';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { AboutPrototype } from './components/AboutPrototype';
import { ComplaintInputForm } from './components/ComplaintInputForm';
import { ComplaintResultCard } from './components/ComplaintResultCard';
import { HelplineGuide } from './components/HelplineGuide';
import { Toast } from './components/Toast';
import { ComplaintData, Language } from './types';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [description, setDescription] = useState<string>('');
  const [complaint, setComplaint] = useState<ComplaintData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isTa = language === 'ta';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const handleGenerateComplaint = async () => {
    if (!description.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: description.trim(),
          language,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to generate complaint draft.');
      }

      setComplaint(result.data);
      showToast(isTa ? 'புகார் வரைவு உருவாக்கப்பட்டது!' : 'Complaint draft generated!');
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'An unexpected error occurred while analyzing the complaint.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async (targetLang: Language) => {
    if (!complaint) return;

    setIsTranslating(true);
    setError(null);

    try {
      const response = await fetch('/api/translate-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complaint,
          targetLanguage: targetLang,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to translate complaint.');
      }

      setComplaint(result.data);
      setLanguage(targetLang);
      showToast(
        targetLang === 'ta'
          ? 'தமிழில் மொழிபெயர்க்கப்பட்டது!'
          : 'Translated to English successfully!'
      );
    } catch (err: any) {
      console.error('Translation error:', err);
      showToast(err.message || 'Failed to translate draft.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (complaint && complaint.language !== newLang) {
      handleTranslate(newLang);
    }
  };

  const handleClear = () => {
    setDescription('');
    setComplaint(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Header with language switcher */}
      <Header language={language} onLanguageChange={handleLanguageChange} />

      {/* Main Workspace Area with Two-Column Desktop Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Error Alert if any */}
        {error && (
          <div
            id="error-alert"
            className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start justify-between gap-3 shadow-2xs"
          >
            <div>
              <p className="font-semibold text-rose-900">{isTa ? 'பிழை ஏற்பட்டது:' : 'Error occurred:'}</p>
              <p className="mt-0.5 text-xs sm:text-sm">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline shrink-0 cursor-pointer"
            >
              {isTa ? 'மறை' : 'Dismiss'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Input Form, Disclaimer, and About Prototype */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
              <ComplaintInputForm
                description={description}
                onChangeDescription={setDescription}
                language={language}
                onLanguageChange={handleLanguageChange}
                onSubmit={handleGenerateComplaint}
                isLoading={isLoading}
                onClear={handleClear}
              />
            </div>

            {/* Disclaimer card */}
            <DisclaimerBanner language={language} />

            {/* About this Prototype details */}
            <AboutPrototype language={language} />
          </section>

          {/* Right Column: Generated Result & Helplines (7 of 12 cols on desktop) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            {complaint ? (
              <ComplaintResultCard
                complaint={complaint}
                onTranslate={handleTranslate}
                isTranslating={isTranslating}
                onCopySuccess={() =>
                  showToast(isTa ? 'புகார் உரை நகலெடுக்கப்பட்டது!' : 'Complaint text copied to clipboard!')
                }
              />
            ) : (
              /* Empty / Initial state */
              <div
                id="intro-guide-card"
                className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 text-center space-y-5 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto shadow-2xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    {isTa
                      ? 'சென்னை குடிமக்கள் பிரச்சனைகளை தெளிவான புகார் வரைவுகளாக மாற்றுங்கள்'
                      : 'Turn Chennai civic problems into clear complaint drafts'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {isTa
                      ? 'இந்த ஏஐ மாதிரி கருவி உங்கள் பகுதி பிரச்சனையை பகுப்பாய்வு செய்து, விடுபட்ட விவரங்களை சுட்டிக்காட்டி தெளிவான புகார் வரைவை உருவாக்குகிறது. வரைவை மதிப்பாய்வு செய்து நீங்களே அதிகாரப்பூர்வ அரசு சேனல்களில் சமர்ப்பிக்கலாம்.'
                      : 'This AI prototype creates structured drafts for you to review and submit through official channels yourself. It categorizes the issue, highlights missing location details, and provides a ready-to-copy text.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center text-[10px] font-bold">
                        1
                      </span>
                      <span>{isTa ? 'வகைப்படுத்துதல்' : 'Department & Urgency'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {isTa
                        ? 'மாநகராட்சி, குடிநீர் வாரியம் அல்லது மின்சார வாரியத்தை கண்டறியும்.'
                        : 'Identifies GCC, CMWSSB, TANGEDCO with severity level.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center text-[10px] font-bold">
                        2
                      </span>
                      <span>{isTa ? 'விவரங்கள் சரிபார்ப்பு' : 'Missing Details'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {isTa
                        ? 'விடுபட்ட வார்டு எண், அடையாளங்கள் போன்ற தகவல்களை நினைவூட்டும்.'
                        : 'Checklist of street landmarks, photos, or ward numbers needed.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center text-[10px] font-bold">
                        3
                      </span>
                      <span>{isTa ? 'நகலெடுத்து சமர்ப்பிக்க' : 'Ready to Copy'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {isTa
                        ? 'நம்ம சென்னை செயலி அல்லது 1913 உதவி எண்ணுக்கு அனுப்ப தயார்.'
                        : '1-click copy for Namma Chennai App, GCC Portal, or Ward emails.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chennai Helpline & Grievance Directory */}
            <HelplineGuide language={language} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer id="main-footer" className="border-t border-slate-200 bg-white py-6 mt-10 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-700">CivicMate Chennai</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isTa
                ? 'சென்னைவாசிகளுக்கான குடிமக்கள் குறைதீர்வு ஏஐ வரைவு மாதிரி கருவி • தனிநபர் தகவல் எதுவும் சேமிக்கப்படுவதில்லை.'
                : 'AI-assisted civic grievance drafting assistant for Chennai residents • No login required • Zero data stored.'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Private & Client-Side Safe</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Toast popup */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}

