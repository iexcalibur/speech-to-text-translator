type TranslatedOutputProps = {
  translatedText: string;
  onCopy: () => void;
};

export function TranslatedOutput({ translatedText, onCopy }: TranslatedOutputProps) {
  return (
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-black">Translated Text</h3>
        <button 
          onClick={onCopy}
          className="p-3 rounded-full border-2 border-gray-300 hover:bg-gray-100 text-gray-700 w-12 h-12 flex items-center justify-center transition-all"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      <div className="relative">
        <textarea 
          value={translatedText}
          className="w-full h-48 p-4 bg-gray-50 border rounded-lg resize-none text-black"
          placeholder="Translation will appear here..."
          readOnly
        />
      </div>
    </div>
  );
} 