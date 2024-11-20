import { Button } from './Button';

type ActionButtonsProps = {
  onTranslate: () => void;
  onClear: () => void;
  isTranslating: boolean;
  hasInput: boolean;
};

export function ActionButtons({ 
  onTranslate, 
  onClear, 
  isTranslating, 
  hasInput 
}: ActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4">
      <Button 
        onClick={onTranslate}
        disabled={!hasInput || isTranslating}
        variant="primary"
      >
        {isTranslating ? 'Translating...' : 'Translate'}
      </Button>

      <Button 
        onClick={onClear}
        variant="secondary"
      >
        Clear
      </Button>
    </div>
  );
} 