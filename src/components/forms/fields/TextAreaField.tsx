import React, { memo } from 'react';

interface TextAreaFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  description?: string;
  error?: string;
}

export const TextAreaField = memo(function TextAreaField({
  name,
  label,
  value,
  onChange,
  required,
  placeholder,
  rows = 6,
  description,
  error,
}: TextAreaFieldProps) {
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
      <textarea
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Escribe la trayectoria profesional y política...'}
        required={required}
        rows={rows}
        className={`w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-base focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all outline-none resize-none ${
          error ? 'border-red-300 focus:ring-red-500/10' : ''
        }`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-2 ml-4 font-medium">{error}</p>
      )}
    </div>
  );
});
