import React, { memo } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  description?: string;
  error?: string;
  placeholder?: string;
}

export const SelectField = memo(function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  required,
  description,
  error,
  placeholder = 'Selecciona una opción',
}: SelectFieldProps) {
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
      <div className="relative">
        <select
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-base focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all outline-none cursor-pointer appearance-none ${
            !value ? 'text-slate-400' : 'text-slate-900'
          } ${
            error ? 'border-red-300 focus:ring-red-500/10' : ''
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" 
          size={20} 
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-2 ml-4 font-medium">{error}</p>
      )}
    </div>
  );
});
