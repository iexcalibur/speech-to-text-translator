type TranslationEngineProps = {
  selectedEngine: string;
  setSelectedEngine: (engine: string) => void;
};

export function TranslationEngine({ selectedEngine, setSelectedEngine }: TranslationEngineProps) {
  return (
    <div>
      <h3 className="font-medium mb-3 text-black">Translation Engine</h3>
      <div className="flex gap-4">
        <label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer text-black">
          <input 
            type="radio" 
            name="engine" 
            value="gpt4"
            checked={selectedEngine === 'gpt4'}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="accent-blue-600" 
          />
          <span>GPT-4o</span>
        </label>
      </div>
    </div>
  );
} 