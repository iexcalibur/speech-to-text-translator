type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
};

export function Button({ onClick, disabled, variant, children }: ButtonProps) {
  const baseStyles = "px-6 py-2 rounded-lg transition-colors";
  const variants = {
    primary: `bg-blue-600 text-white ${
      disabled ? 'opacity-50' : 'hover:bg-blue-700'
    }`,
    secondary: "bg-gray-200 text-black hover:bg-gray-300"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
} 