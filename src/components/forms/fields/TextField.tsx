import React, { memo } from 'react';

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'url' | 'tel' | 'date';
  description?: string;
  error?: string;
}

export const TextField = memo(function TextField({
  name,
  label,
  value,
  onChange,
  required,
  placeholder,
  type = 'text',
  description,
  error,
}: TextFieldProps) {
  // Detect if we're in a dark context
  const isDark = name.includes('website') || name.includes('email') || name.includes('phone');
  
  return (
    <div>
      {!isDark && (
        <>
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
        </>
      )}
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        required={required}
        className={`
          w-full transition-all outline-none
          ${isDark 
            ? 'bg-white/5 border border-white/10 text-white placeholder:text-slate-400 px-5 py-3 text-xs rounded-xl focus:border-blue-500' 
            : 'bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-base focus:ring-4 focus:ring-blue-500/10 focus:bg-white'
          }
          ${error ? 'border-red-300 focus:ring-red-500/10' : ''}
        `}
      />
      {error && (
        <p className="text-xs text-red-500 mt-2 ml-4 font-medium">{error}</p>
      )}
    </div>
  );
});
