import React from 'react';
import { Heart, MessageSquare, Maximize2, ShoppingBag } from 'lucide-react';
import { GalleryPhoto } from './galleryData';

interface PhotoGridProps {
  photos: GalleryPhoto[];
  onOpenLightbox: (index: number) => void;
  onToggleFavorite: (id: number) => void;
}

export const GalleryPhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  onOpenLightbox,
  onToggleFavorite
}) => {
  if (photos.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Nenhuma foto favoritada ainda</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
          Clique no coração sobre qualquer foto para adicioná-la à sua seleção do álbum.
        </p>
      </div>
    );
  }

  const [layoutMode, setLayoutMode] = React.useState<'masonry' | 'uniform'>('masonry');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Layout Mode Selector Bar */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-white/10">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Exibindo <span className="font-bold text-slate-900 dark:text-white">{photos.length}</span> fotos do álbum
        </p>

        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs">
          <button
            onClick={() => setLayoutMode('masonry')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              layoutMode === 'masonry'
                ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Mosaico Editorial (Masonry)
          </button>
          <button
            onClick={() => setLayoutMode('uniform')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              layoutMode === 'uniform'
                ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Grade Simétrica (4:3)
          </button>
        </div>
      </div>

      {/* Masonry or Uniform Layout */}
      {layoutMode === 'masonry' ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
          {photos.map((photo, index) => {
            return (
              <div
                key={photo.id}
                onClick={() => onOpenLightbox(index)}
                className={`break-inside-avoid mb-5 group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-900 border transition-all duration-300 shadow-sm hover:shadow-xl ${
                  photo.isFavorite
                    ? 'border-rose-400 dark:border-rose-500/60 ring-2 ring-rose-500/20'
                    : 'border-slate-200 dark:border-white/10 hover:border-teal-400'
                }`}
              >
                {/* Photo Image matching its natural aspect ratio */}
                <div
                  className={`w-full overflow-hidden ${
                    photo.aspectRatio === 'vertical' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.98]"
                  />
                </div>

              {/* Top Controls Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                {/* Filename Badge */}
                <span className="px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-mono font-medium shadow-sm">
                  {photo.filename}
                </span>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(photo.id);
                  }}
                  className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-transform duration-200 hover:scale-110 shadow-md ${
                    photo.isFavorite
                      ? 'bg-rose-500 text-white shadow-rose-500/30'
                      : 'bg-slate-950/60 text-white/80 hover:text-white hover:bg-slate-950'
                  }`}
                  title={photo.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos para o álbum'}
                >
                  <Heart className={`w-4 h-4 ${photo.isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Bottom Details Overlay on Hover */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-white truncate drop-shadow">
                    {photo.title}
                  </p>
                  <p className="text-[10px] text-teal-300 font-mono mt-0.5">
                    {photo.resolution}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Retouch comment indicator */}
                  {photo.comments.length > 0 && (
                    <span className="p-1.5 rounded-lg bg-teal-500/30 text-teal-300 text-[10px] flex items-center gap-1 font-bold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{photo.comments.length}</span>
                    </span>
                  )}
                  <span className="p-1.5 rounded-lg bg-white/20 text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Persistent comment badge if photo has retouch note */}
              {photo.comments.length > 0 && (
                <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity">
                  <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 text-[10px] font-bold border border-teal-500/30 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>Nota de Retoque</span>
                  </span>
                </div>
              )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-900 border transition-all duration-300 shadow-sm hover:shadow-xl ${
                photo.isFavorite
                  ? 'border-rose-400 dark:border-rose-500/60 ring-2 ring-rose-500/20'
                  : 'border-slate-200 dark:border-white/10 hover:border-teal-400'
              }`}
            >
              {/* Uniform aspect-ratio 4:3 for all cards */}
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.98]"
                />
              </div>

              {/* Top Controls Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-mono font-medium shadow-sm">
                  {photo.filename}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(photo.id);
                  }}
                  className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-transform duration-200 hover:scale-110 shadow-md ${
                    photo.isFavorite
                      ? 'bg-rose-500 text-white shadow-rose-500/30'
                      : 'bg-slate-950/60 text-white/80 hover:text-white hover:bg-slate-950'
                  }`}
                  title={photo.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos para o álbum'}
                >
                  <Heart className={`w-4 h-4 ${photo.isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Bottom Details Overlay on Hover */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-white truncate drop-shadow">
                    {photo.title}
                  </p>
                  <p className="text-[10px] text-teal-300 font-mono mt-0.5">
                    {photo.resolution}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {photo.comments.length > 0 && (
                    <span className="p-1.5 rounded-lg bg-teal-500/30 text-teal-300 text-[10px] flex items-center gap-1 font-bold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{photo.comments.length}</span>
                    </span>
                  )}
                  <span className="p-1.5 rounded-lg bg-white/20 text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {photo.comments.length > 0 && (
                <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity">
                  <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 text-[10px] font-bold border border-teal-500/30 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>Nota de Retoque</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
