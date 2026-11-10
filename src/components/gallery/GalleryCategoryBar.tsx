import React from 'react';
import { Heart, Download, CheckSquare, Share2, Filter, Sparkles, ShoppingBag } from 'lucide-react';

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  showOnlyFavorites: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
  totalPhotosCount: number;
  onOpenDownload: () => void;
  onOpenSelectionModal: () => void;
  onShare: () => void;
  onOpenStore?: () => void;
}

export const GalleryCategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
  showOnlyFavorites,
  onToggleFavoritesOnly,
  favoritesCount,
  totalPhotosCount,
  onOpenDownload,
  onOpenSelectionModal,
  onShare,
  onOpenStore,
}) => {
  const categories = [
    { id: 'todas', label: 'Todas as Fotos' },
    { id: 'making-of', label: 'Making-of' },
    { id: 'cerimonia', label: 'A Cerimônia' },
    { id: 'ensaio', label: 'Ensaio dos Noivos' },
    { id: 'festa', label: 'Recepção & Festa' }
  ];

  return (
    <div id="fotos-secao" className="sticky top-[68px] z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Categories Pill Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id && !showOnlyFavorites;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (showOnlyFavorites) onToggleFavoritesOnly();
                    onSelectCategory(cat.id);
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Action Tools on Right */}
          <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-2.5">
            {/* Filter by Favorites */}
            <button
              onClick={onToggleFavoritesOnly}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                showOnlyFavorites
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-rose-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current text-white' : 'text-rose-500 fill-rose-500'}`} />
              <span>Ver Apenas Favoritas ({favoritesCount})</span>
            </button>

            {/* Approve Selection for Album (Lightroom export trigger) */}
            <button
              onClick={onOpenSelectionModal}
              className="px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-brand-mint/15 text-teal-700 dark:text-brand-mint border border-teal-200 dark:border-brand-mint/30 text-xs font-bold flex items-center gap-1.5 hover:bg-teal-100 dark:hover:bg-brand-mint/25 transition-all"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Finalizar Seleção ({favoritesCount})</span>
            </button>

            {/* Direct Open Store Button */}
            {onOpenStore && (
              <button
                onClick={onOpenStore}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-all shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Loja & Produtos</span>
              </button>
            )}

            {/* Download with PIN */}
            <button
              onClick={onOpenDownload}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-brand-mint/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Baixar fotos da galeria"
            >
              <Download className="w-3.5 h-3.5 text-sky-600 dark:text-brand-sky" />
              <span className="hidden md:inline">Baixar Fotos</span>
            </button>

            {/* Share link */}
            <button
              onClick={onShare}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Compartilhar link da galeria"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
