"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateNumber } from '@/lib/format';
import { useState, useEffect } from 'react';

interface NumberInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  required?: boolean;
}

export function NumberInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  placeholder,
  required = false
}: NumberInputProps) {
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched && value) {
      const validation = validateNumber(value, min, max);
      setError(validation.isValid ? '' : validation.message || '');
    }
  }, [value, min, max, touched]);

  const handleBlur = () => {
    setTouched(true);
  };

  const displayLabel = unit ? `${label} (${unit})` : label;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {displayLabel}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        required={required}
        className={error ? 'border-destructive focus:border-destructive' : ''}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}