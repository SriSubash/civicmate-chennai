export type Language = 'en' | 'ta';

export type UrgencyLevel = 'Low' | 'Medium' | 'High';

export interface ComplaintData {
  category: string;
  shortTitle: string;
  complaintDescription: string;
  urgency: UrgencyLevel;
  urgencyReason: string;
  keyInfoNeeded: string[];
  readyToCopyMessage: string;
  suggestedAuthority: string;
  language: Language;
  originalDescription?: string;
}

export interface PresetExample {
  id: string;
  category: string;
  title: string;
  titleTa: string;
  textEn: string;
  textTa: string;
  tag: string;
}
