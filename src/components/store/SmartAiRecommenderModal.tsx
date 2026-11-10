import React, { useState } from 'react';
import { X, Sparkles, Check, Eye, ShoppingBag, ArrowRight, Wand2, Star, Award, Layers } from 'lucide-react';
import { sampleAiRecommendations, AiDecorRecommendation, storeProducts, StoreProduct } from './storeData';
import { GalleryPhoto } from '../gallery/galleryData';

interface SmartAiRecommenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendation: (rec: AiDecorRecommendation) => void;
}

export const SmartAiRecommenderModal: React.FC<SmartAiRecommenderModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendation,
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'room' | 'album'>('todos');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = sampleAiRecommendations.filter(r => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'room') return r.type === 'room-frame' || r.type === 'canvas';
    if (activeTab === 'album') return r.type === 'album-spread';
    return true;
  });

  const handleApply = (rec: AiDecorRecommendation) => {
    onSelectRecommendation(rec);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-white/10 bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-mint/20 border border-brand-mint/30 flex items-center justify-center text-brand-mint">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-mint">
                <Sparkles className="w-3 h-3" />
                Cadu's Fotos AI Curator
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                Sugestões Inteligentes de Decoração & Diagramação
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter sub-tabs */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'todos'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Todas as Sugestões ({sampleAiRecommendations.length})
            </button>
            <button
              onClick={() => setActiveTab('room')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'room'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Quadros & Telas (Room Decor)
            </button>
            <button
              onClick={() => setActiveTab('album')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'album'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Lâminas Centrais do Álbum
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Classificadas por contraste, emoção e proporção
          </span>
        </div>

        {/* Body Cards */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(rec => (
              <div
                key={rec.id}
                className="p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-all group"
              >
                <div className="space-y-3">
                  {/* Photo & Preview Header */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 shadow-md">
                    <img src={rec.photoUrl} alt={rec.photoTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1.5 border border-white/20">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{rec.type === 'album-spread' ? 'Candidata a Lâmina Dupla' : 'Perfeita para Sala de Estar'}</span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-medium truncate border border-white/10">
                      {rec.photoTitle}
                    </div>
                  </div>

                  {/* Recommendation Details */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {rec.recommendedProductTitle}
                      </h4>
                      <span className="text-xs font-bold text-teal-600 dark:text-brand-mint">
                        R$ {rec.simulatedPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {rec.recommendedSize} • Moldura: <b>{rec.recommendedFrame}</b>
                    </p>
                  </div>

                  {/* AI Rationale Box */}
                  <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-brand-mint/10 border border-teal-200 dark:border-brand-mint/20 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-brand-mint">
                      <Sparkles className="w-3 h-3" />
                      <span>Parecer da IA:</span>
                    </div>
                    <p>{rec.aiRationale}</p>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => handleApply(rec)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-600 dark:hover:bg-brand-mint transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Personalizar este Setup no Mockup</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
