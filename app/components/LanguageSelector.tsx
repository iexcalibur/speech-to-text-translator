import { LanguageSelect } from './LanguageSelect';

type LanguageSelectorProps = {
  fromLanguage: string;
  toLanguage: string;
  setFromLanguage: (lang: string) => void;
  setToLanguage: (lang: string) => void;
  onSwap: () => void;
};

export function LanguageSelector({ 
  fromLanguage, 
  toLanguage, 
  setFromLanguage, 
  setToLanguage, 
  onSwap 
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <LanguageSelect
        value={fromLanguage}
        onChange={setFromLanguage}
        label="From"
        showDetect
      />
      
      <button 
        onClick={onSwap}
        className="mt-6 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
        disabled={fromLanguage === 'detect'}
        title={fromLanguage === 'detect' ? "Can't swap when language detection is selected" : "Swap languages"}
      >
        ⇄
      </button>

      <LanguageSelect
        value={toLanguage}
        onChange={setToLanguage}
        label="To"
      />
    </div>
  );
} 