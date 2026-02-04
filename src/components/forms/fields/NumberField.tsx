import React, { memo } from 'react';

interface NumberFieldProps {
  name: string;
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  error?: string;
}

export const NumberField = memo(function NumberField({
  name,
  label,
  value,
  onChange,
  required,
  placeholder,
  min,
  max,
  step,
  description,
  error,
}: NumberFieldProps) {
  return (
    <div>
      <label 
        htmlFor={name} 
        className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-[9px] text-slate-400 ml-4 mb-2 italic">{description}</p>
      )}
      <input
        id={name}
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all outline-none ${
          error ? 'border-red-300 focus:ring-red-500/10' : ''
        }`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-2 ml-4 font-medium">{error}</p>
      )}
    </div>
  );
});
