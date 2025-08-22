interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Container({ children, className = '', size = 'lg' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',      // ~768px
    md: 'max-w-4xl',      // ~896px  
    lg: 'max-w-6xl',      // ~1152px
    xl: 'max-w-7xl'       // ~1280px
  };

  return (
    <div className={`container-golden ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}