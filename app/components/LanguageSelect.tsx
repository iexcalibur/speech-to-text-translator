import { LANGUAGES } from '../constants/languages';

type LanguageSelectProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  showDetect?: boolean;
};

export function LanguageSelect({ value, onChange, label, showDetect }: LanguageSelectProps) {
  return (
    <div className="flex-1">
      <h3 className="font-medium mb-2 text-black">{label}</h3>
      <select 
        className="w-full p-3 border rounded-lg text-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {showDetect && <option value="detect">🌐 Detect Language</option>}
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
} 