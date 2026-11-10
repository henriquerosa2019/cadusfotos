import React, { useState } from 'react';
import { Volume2, VolumeX, Calendar, MapPin, ChevronDown, Heart, ShieldCheck, Download, Share2 } from 'lucide-react';
import { GalleryConfig } from './galleryData';

interface GalleryHeroCoverProps {
  config: GalleryConfig;
  favoritesCount: number;
  onExplore: () => void;
  onOpenDownload: () => void;
  onOpenSelectionModal: () => void;
}

export const GalleryHeroCover: React.FC<GalleryHeroCoverProps> = ({
  config,
  favoritesCount,
  onExplore,
  onOpenDownload,
  onOpenSelectionModal
}) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] w-full flex flex-col justify-between overflow-hidden bg-slate-950">
      {/* Background Image with Parallax-like aesthetic and soft zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.coverImage}
          alt={config.title}
          className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05] scale-100 hover:scale-105 transition-transform duration-[8000ms] ease-out"
        />
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50" />
      </div>

      {/* Top Bar inside Cover */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-xs text-white">
          <ShieldCheck className="w-4 h-4 text-brand-mint" />
          <span className="font-medium">Galeria Protegida por PIN</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Ambient Music Mockup Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 hover:border-brand-mint/40 text-xs text-white flex items-center gap-2 transition-all"
            title="Música ambiente"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-[11px] text-slate-300">Música Desligada</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-brand-mint animate-pulse" />
                <span className="hidden sm:inline text-[11px] text-brand-mint font-semibold">Tocando Trilha Sonora</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={onOpenDownload}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 hover:border-brand-mint/40 text-xs text-white flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-brand-sky" />
            <span className="hidden sm:inline">Baixar Fotos</span>
          </button>
        </div>
      </div>

      {/* Center Cinematic Title */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 text-center my-auto py-12">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold text-brand-mint mb-4 drop-shadow">
          Coleção Oficial de Casamento
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
          {config.coupleNames}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-200 drop-shadow mb-8 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-mint" />
            <span>{config.eventDate}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-sky" />
            <span>{config.location}</span>
          </div>
        </div>

        {/* Welcome Letter Pill */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed italic drop-shadow bg-slate-950/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          "{config.welcomeMessage}"
        </p>
      </div>

      {/* Bottom Floating Action Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Selection Status indicator */}
        <div
          onClick={onOpenSelectionModal}
          className="bg-slate-950/85 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl flex items-center gap-3.5 cursor-pointer hover:border-brand-mint/60 hover:bg-slate-950 transition-all group shadow-2xl"
        >
          <div className="w-9 h-9 rounded-full bg-rose-500/25 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div className="text-left text-xs">
            <span className="text-slate-300 font-semibold block">Sua Seleção para o Álbum:</span>
            <span className="font-extrabold text-white text-sm">
              {favoritesCount} de {config.albumSelectionLimit} fotos escolhidas
            </span>
          </div>
        </div>

        {/* Explore Button */}
        <button
          onClick={onExplore}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient hover:bg-brand-gradient-hover text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow transition-all hover:scale-105"
        >
          <span>Explorar Todas as Fotos</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </div>
  );
};
