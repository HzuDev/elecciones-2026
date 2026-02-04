import React, { memo, useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { databases } from '../../../lib/appwrite-client';

interface RelationFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  collectionId: string;
  displayField?: string;
  required?: boolean;
  description?: string;
  error?: string;
  placeholder?: string;
}

export const RelationField = memo(function RelationField({
  name,
  label,
  value,
  onChange,
  collectionId,
  displayField = 'name',
  required,
  description,
  error,
  placeholder = 'Buscar...',
}: RelationFieldProps) {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadOptions() {
      try {
        setLoading(true);
        const response = await databases.listDocuments('6977a82d000f96ceae0f', collectionId);
        setOptions(response.documents);
      } catch (err) {
        console.error('Error loading relation options:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOptions();
  }, [collectionId]);

  const filteredOptions = options.filter((opt) =>
    opt[displayField]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {loading ? (
        <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
          <span className="text-sm text-slate-400">Cargando opciones...</span>
        </div>
      ) : (
        <>
          <div className="relative mb-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all outline-none"
            />
          </div>

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
            <option value="">Selecciona una opción</option>
            {filteredOptions.map((option) => (
              <option key={option.$id} value={option.$id}>
                {option[displayField] || option.$id}
              </option>
            ))}
          </select>
        </>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-2 ml-4 font-medium">{error}</p>
      )}
    </div>
  );
});
