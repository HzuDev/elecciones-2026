import React, { memo, useState } from 'react';
import type { FormConfig, FormField } from '../../config/forms';
import {
  TextField,
  TextAreaField,
  SelectField,
  NumberField,
  ImageField,
  RelationField,
} from './fields';
import { useCollection } from '../../hooks/useCollection';
import { useAuth } from '../../lib/auth-context';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface DynamicFormProps {
  formConfig: FormConfig;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const DynamicForm = memo(function DynamicForm({
  formConfig,
  onSuccess,
  onCancel,
}: DynamicFormProps) {
  const { user } = useAuth();
  const { createDocument } = useCollection(formConfig.collectionId);
  
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    formConfig.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es requerido`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !user) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Add metadata
      const dataToSubmit = {
        $id: crypto.randomUUID ? crypto.randomUUID() : `doc_${Date.now()}`,
        ...formData,
        created_by: user.$id,
        created_at: new Date().toISOString(),
      };

      await createDocument(dataToSubmit);
      
      setSubmitSuccess(true);
      setFormData({});

      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      name: field.name,
      label: field.label,
      value: formData[field.name] || '',
      onChange: (value: any) => handleFieldChange(field.name, value),
      required: field.required,
      description: field.description,
      error: errors[field.name],
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
        return <TextField {...commonProps} type={field.type} placeholder={field.placeholder} />;
      
      case 'textarea':
        return <TextAreaField {...commonProps} placeholder={field.placeholder} />;
      
      case 'number':
      case 'float':
        return (
          <NumberField
            {...commonProps}
            min={field.min}
            max={field.max}
            step={field.step || (field.type === 'float' ? 0.01 : 1)}
            placeholder={field.placeholder}
          />
        );
      
      case 'date':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="date"
              value={formData[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {field.description && (
              <p className="text-sm text-gray-500 mt-1">{field.description}</p>
            )}
            {errors[field.name] && (
              <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>
            )}
          </div>
        );
      
      case 'select':
        return <SelectField {...commonProps} options={field.options || []} />;
      
      case 'relation':
        return (
          <RelationField
            {...commonProps}
            collectionId={field.relationCollection!}
            displayField={field.relationDisplayField || 'name'}
          />
        );
      
      case 'image':
        return <ImageField {...commonProps} accept={field.accept} />;
      
      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white border border-slate-200 rounded-[3rem] p-16 text-center shadow-sm">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-emerald-600" strokeWidth={2} />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">¡Registro Exitoso!</h3>
        <p className="text-slate-500 font-medium">Los datos se han guardado correctamente en el sistema</p>
      </div>
    );
  }

  // Group fields by type for better layout
  const imageField = formConfig.fields.find(f => f.type === 'image');
  const textareaField = formConfig.fields.find(f => f.type === 'textarea');
  const contactFields = formConfig.fields.filter(f => 
    ['email', 'url', 'text'].includes(f.type) && 
    (f.name.includes('website') || f.name.includes('email') || f.name.includes('phone') || f.name.includes('birth'))
  );
  const dateFields = formConfig.fields.filter(f => f.type === 'date');
  const mainFields = formConfig.fields.filter(f => 
    f !== imageField && 
    f !== textareaField && 
    !contactFields.includes(f) &&
    !dateFields.includes(f)
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 px-4">
        <div>
          <span className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase">Registro de Datos</span>
          <h1 className="text-4xl font-black tracking-tighter mt-1">
            {formConfig.title.split(' ').map((word, i) => 
              i === formConfig.title.split(' ').length - 1 ? 
              <span key={i} className="text-slate-400">{word}</span> : 
              word + ' '
            )}
          </h1>
        </div>
        <div className="flex gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-2xl text-xs font-black text-slate-400 hover:text-red-500 transition-colors uppercase disabled:opacity-50"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-3 rounded-2xl bg-blue-600 text-white text-xs font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Guardando...
              </>
            ) : (
              'Guardar Registro'
            )}
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="mx-4 mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-[2rem] flex items-start gap-4">
          <AlertCircle className="text-red-600 shrink-0 mt-1" size={24} strokeWidth={2} />
          <div>
            <p className="font-black text-red-900 text-sm uppercase tracking-wide">Error al Enviar</p>
            <p className="text-sm text-red-700 mt-1 font-medium">{submitError}</p>
          </div>
        </div>
      )}

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Information Section */}
        <div className="md:col-span-8 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
          <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Información del Perfil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainFields.map(field => (
              <div key={field.name} className={field.type === 'select' || field.type === 'relation' ? '' : 'md:col-span-2'}>
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload Section */}
        {imageField && (
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm flex flex-col justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
              {imageField.label}
            </h3>
            <div className="flex-1 flex items-center justify-center">
              {renderField(imageField)}
            </div>
          </div>
        )}

        {/* Biography Section */}
        {textareaField && (
          <div className="md:col-span-7 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
              {textareaField.label}
            </h3>
            {renderField(textareaField)}
          </div>
        )}

        {/* Contact Information Section - Dark */}
        {(contactFields.length > 0 || dateFields.length > 0) && (
          <div className={`${textareaField ? 'md:col-span-5' : 'md:col-span-4'} bg-slate-900 rounded-[3rem] p-10 text-white shadow-xl shadow-slate-200 flex flex-col justify-center`}>
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-8">
              Información de Enlace
            </h3>
            <div className="space-y-4">
              {contactFields.map(field => (
                <div key={field.name}>
                  {renderField(field)}
                </div>
              ))}
              {dateFields.map(field => (
                <div key={field.name} className="pt-4">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">
                    {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
});
