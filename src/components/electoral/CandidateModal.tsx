import React, { memo } from 'react';
import { X, Mail, Phone, Globe, Calendar, User } from 'lucide-react';

interface CandidateModalProps {
  candidate: {
    name: string;
    foto?: string;
    political_party?: {
      name: string;
      logo?: string;
      hex_colors?: string[];
    };
    target_position?: string;
    location?: { name: string };
    description?: string;
    email?: string;
    phone?: string;
    website?: string;
    birth_date?: string;
  };
  onClose: () => void;
}

export const CandidateModal = memo(function CandidateModal({ candidate, onClose }: CandidateModalProps) {
  const partyColors = candidate.political_party?.hex_colors || ['#3b82f6'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div
          className="p-6 text-white relative"
          style={{
            background: partyColors.length > 1
              ? `linear-gradient(135deg, ${partyColors.join(', ')})`
              : partyColors[0],
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
          >
            <X size={24} />
          </button>

          <div className="flex items-start gap-4">
            {candidate.foto ? (
              <img
                src={candidate.foto}
                alt={candidate.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-4 border-white">
                <User size={48} className="text-white" />
              </div>
            )}

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{candidate.name}</h2>
              {candidate.political_party && (
                <div className="flex items-center gap-2">
                  {candidate.political_party.logo && (
                    <img
                      src={candidate.political_party.logo}
                      alt={candidate.political_party.name}
                      className="w-8 h-8 rounded object-contain bg-white p-1"
                    />
                  )}
                  <span className="text-lg">{candidate.political_party.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {candidate.description && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Biografía</h3>
              <p className="text-gray-700">{candidate.description}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidate.email && (
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400" />
                <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">
                  {candidate.email}
                </a>
              </div>
            )}

            {candidate.phone && (
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-gray-400" />
                <a href={`tel:${candidate.phone}`} className="text-blue-600 hover:underline">
                  {candidate.phone}
                </a>
              </div>
            )}

            {candidate.website && (
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-gray-400" />
                <a
                  href={candidate.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate"
                >
                  {candidate.website}
                </a>
              </div>
            )}

            {candidate.birth_date && (
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-gray-400" />
                <span className="text-gray-700">
                  {new Date(candidate.birth_date).toLocaleDateString('es-BO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
