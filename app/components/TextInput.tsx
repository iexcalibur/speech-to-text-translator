type TextInputProps = {
  inputText: string;
  charCount: number;
  maxChars: number;
  isRecording: boolean;
  isTranscribing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onMicClick: () => void;
};

export function TextInput({
  inputText,
  charCount,
  maxChars,
  isRecording,
  isTranscribing,
  onInputChange,
  onMicClick
}: TextInputProps) {
  return (
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-black">Enter Text</h3>
        <div className="relative">
          <button 
            onClick={onMicClick}
            disabled={isTranscribing || charCount >= maxChars}
            className={`p-3 rounded-full ${
              isRecording 
                ? 'bg-red-500 text-white' 
                : charCount >= maxChars
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-2 border-gray-300 hover:bg-gray-100 text-gray-700'
            } w-12 h-12 flex items-center justify-center transition-all ${
              isTranscribing ? 'opacity-50' : ''
            }`}
            title={charCount >= maxChars ? 'Character limit reached' : ''}
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
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
          {isTranscribing && (
            <div className="absolute -inset-2 rounded-full border-4 border-t-blue-600 border-transparent animate-spin"></div>
          )}
        </div>
      </div>
      <textarea 
        value={inputText}
        onChange={onInputChange}
        className={`w-full h-48 p-4 border rounded-lg resize-none text-black ${
          charCount >= maxChars ? 'border-red-500' : ''
        }`}
        placeholder="Enter text to translate..."
      />
      <div className={`text-sm ${
        charCount >= maxChars ? 'text-red-500 font-medium' : 'text-black'
      }`}>
        Characters: {charCount}/{maxChars}
      </div>
    </div>
  );
} 