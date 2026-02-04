import React, { memo, useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadFile } from '../../../lib/appwrite-client';
import { useAuth } from '../../../lib/auth-context';

interface ImageFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  accept?: string;
  description?: string;
  error?: string;
}

export const ImageField = memo(function ImageField({
  name,
  label,
  value,
  onChange,
  required,
  accept = 'image/*',
  description,
  error,
}: ImageFieldProps) {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadFile(file, user.$id);
      onChange(result.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Error al subir imagen');
      setPreviewUrl('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {description && (
        <p className="text-[9px] text-slate-400 mb-3 italic">{description}</p>
      )}

      {/* Hidden input */}
      <input
        ref={fileInputRef}
        id={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        required={required && !value}
      />

      {/* Dropzone or Preview */}
      {previewUrl ? (
        <div className="relative group">
          <div className="relative rounded-[2rem] overflow-hidden border-2 border-slate-200 bg-slate-50">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={isUploading}
          className={`w-full flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-[2rem] transition-all cursor-pointer ${
            isUploading
              ? 'border-blue-300 bg-blue-50'
              : 'border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200'
          } ${error ? 'border-red-300' : ''}`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                Subiendo...
              </span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Subir Imagen
              </span>
              <span className="text-[9px] text-slate-400 mt-2">
                Click para seleccionar archivo
              </span>
            </>
          )}
        </button>
      )}

      {(error || uploadError) && (
        <p className="text-xs text-red-500 mt-2 font-medium">
          {error || uploadError}
        </p>
      )}

      {!error && !uploadError && description && (
        <p className="text-[9px] text-slate-400 italic text-center mt-2">
          Formato recomendado: Cuadrado (800x800)
        </p>
      )}
    </div>
  );
});
