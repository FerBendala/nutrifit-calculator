
interface CalculatorIconProps {
  className?: string;
  size?: number;
}

export function CalculatorIcon({ className = "", size = 24 }: CalculatorIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calculator body */}
      <rect x="2" y="1" width="28" height="30" rx="4" ry="4" fill="currentColor" />

      {/* Screen */}
      <rect x="4" y="3" width="24" height="10" rx="2" ry="2" fill="#1e293b" />

      {/* Screen glow */}
      <rect x="5" y="4" width="22" height="8" rx="1" ry="1" fill="#10b981" opacity="0.8" />

      {/* Button grid */}
      {/* Row 1 */}
      <circle cx="8" cy="18" r="2" fill="#f1f5f9" />
      <circle cx="16" cy="18" r="2" fill="#f1f5f9" />
      <circle cx="24" cy="18" r="2" fill="#0ea5e9" />

      {/* Row 2 */}
      <circle cx="8" cy="24" r="2" fill="#f1f5f9" />
      <circle cx="16" cy="24" r="2" fill="#f1f5f9" />
      <circle cx="24" cy="24" r="2" fill="#0ea5e9" />

      {/* Equal sign on the blue button */}
      <rect x="22.5" y="23" width="3" height="0.5" fill="white" />
      <rect x="22.5" y="24.5" width="3" height="0.5" fill="white" />
    </svg>
  );
}
