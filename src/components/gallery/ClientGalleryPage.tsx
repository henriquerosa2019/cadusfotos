import React, { useState } from 'react';
import { Eye, Settings, ArrowLeft, Heart, Sparkles, Share2, Check, ShoppingBag } from 'lucide-react';
import { initialGalleryConfig, initialPhotos, GalleryConfig, GalleryPhoto } from './galleryData';
import { GalleryHeroCover } from './GalleryHeroCover';
import { GalleryCategoryBar } from './GalleryCategoryBar';
import { GalleryPhotoGrid } from './GalleryPhotoGrid';
import { GalleryLightbox } from './GalleryLightbox';
import { DownloadModal } from './DownloadModal';
import { SelectionApprovalModal } from './SelectionApprovalModal';
import { PhotographerManagerView } from './PhotographerManagerView';
import { GalleryMusicPlayer } from './GalleryMusicPlayer';

interface ClientGalleryPageProps {
  onBackToHome: () => void;
  onOpenStore?: (photo?: GalleryPhoto) => void;
}

export const ClientGalleryPage: React.FC<ClientGalleryPageProps> = ({ onBackToHome, onOpenStore }) => {
  const [currentMode, setCurrentMode] = useState<'client' | 'manager'>('client');
  const [config, setConfig] = useState<GalleryConfig>(initialGalleryConfig);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);

  // Gallery view states
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Modals
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [shareCopiedToast, setShareCopiedToast] = useState(false);

  // Handlers
  const handleToggleFavorite = (photoId: number) => {
    setPhotos(prev =>
      prev.map(p => (p.id === photoId ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const handleAddComment = (photoId: number, text: string) => {
    const newComment = {
      id: 'c_' + Date.now(),
      author: 'Isabela (Noiva)',
      text,
      createdAt: 'Agora mesmo'
    };
    setPhotos(prev =>
      prev.map(p =>
        p.id === photoId
          ? { ...p, isFavorite: true, comments: [...p.comments, newComment] }
          : p
      )
    );
  };

  const handleDeleteComment = (photoId: number, commentId: string) => {
    setPhotos(prev =>
      prev.map(p =>
        p.id === photoId
          ? { ...p, comments: p.comments.filter(c => c.id !== commentId) }
          : p
      )
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopiedToast(true);
    setTimeout(() => setShareCopiedToast(false), 2500);
  };

  const handleScrollToGrid = () => {
    const el = document.getElementById('fotos-secao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter photos
  const filteredPhotos = photos.filter(p => {
    if (showOnlyFavorites) return p.isFavorite;
    if (activeCategory === 'todas') return true;
    return p.category === activeCategory;
  });

  const favoritesCount = photos.filter(p => p.isFavorite).length;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Floating Control Ribbon: Mode Switcher & Return */}
      <header className="sticky top-0 z-40 bg-slate-900/90 text-white backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              title="Voltar à Página Principal"
            >
              <img
                src="/cadus-logo.jpg"
                alt="Cadu's Foto"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-amber-400/80 shadow-sm"
              />
              <span className="text-xs font-bold text-white hidden sm:inline">
                Cadu's <span className="text-teal-400">Fotos</span>
              </span>
            </button>
            <span className="text-white/20 hidden sm:inline">|</span>
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Início</span>
              <span className="sm:hidden">Voltar</span>
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-white/10">
            <button
              onClick={() => setCurrentMode('client')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentMode === 'client'
                  ? 'bg-brand-gradient text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visão da Noiva (Cliente)</span>
            </button>

            <button
              onClick={() => setCurrentMode('manager')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentMode === 'manager'
                  ? 'bg-brand-gradient text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Painel do Fotógrafo (Cadu)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onOpenStore && (
              <button
                onClick={() => onOpenStore()}
                className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-brand-mint border border-teal-500/40 hover:bg-teal-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Abrir a Loja Integrada e Laboratórios"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Loja de Álbuns & Quadros</span>
                <span className="sm:hidden">Loja</span>
              </button>
            )}

            <div className="hidden lg:flex items-center gap-2 text-xs text-brand-mint font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand-mint animate-ping" />
              <span>Módulo 1 & 2 Ativos</span>
            </div>
          </div>
        </div>
      </header>

      {/* Share Toast */}
      {shareCopiedToast && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-slate-900 text-white border border-teal-500/40 shadow-2xl flex items-center gap-2 text-xs animate-bounce">
          <Check className="w-4 h-4 text-brand-mint" />
          <span>Link da galeria copiado para a área de transferência!</span>
        </div>
      )}

      {/* Main Content depending on mode */}
      {currentMode === 'client' ? (
        <main className="flex-1">
          {/* 1. Cinematic Hero Cover */}
          <GalleryHeroCover
            config={config}
            favoritesCount={favoritesCount}
            onExplore={handleScrollToGrid}
            onOpenDownload={() => setDownloadModalOpen(true)}
            onOpenSelectionModal={() => setSelectionModalOpen(true)}
          />

          {/* 2. Category Toolbar & Filter */}
          <GalleryCategoryBar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            showOnlyFavorites={showOnlyFavorites}
            onToggleFavoritesOnly={() => setShowOnlyFavorites(!showOnlyFavorites)}
            favoritesCount={favoritesCount}
            totalPhotosCount={photos.length}
            onOpenDownload={() => setDownloadModalOpen(true)}
            onOpenSelectionModal={() => setSelectionModalOpen(true)}
            onShare={handleShare}
            onOpenStore={onOpenStore ? () => onOpenStore() : undefined}
          />

          {/* 3. Fluid Photo Grid */}
          <GalleryPhotoGrid
            photos={filteredPhotos}
            onOpenLightbox={(idx) => {
              const photo = filteredPhotos[idx];
              const fullIdx = photos.findIndex(p => p.id === photo.id);
              setLightboxIndex(fullIdx >= 0 ? fullIdx : 0);
            }}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* 4. Ambient Wedding Instrumental Soundtrack & Player */}
          <GalleryMusicPlayer />
        </main>
      ) : (
        <main className="flex-1 bg-slate-100/70 dark:bg-brand-dark">
          <PhotographerManagerView
            config={config}
            photos={photos}
            onSwitchToClientView={() => setCurrentMode('client')}
            onUpdateConfig={setConfig}
          />
        </main>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)}
          onToggleFavorite={handleToggleFavorite}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          onOrderPrint={onOpenStore ? (photo) => { setLightboxIndex(null); onOpenStore(photo); } : undefined}
        />
      )}

      {/* Download Modal with PIN */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        correctPin={config.pinCode}
        totalPhotosCount={photos.length}
        favoritesCount={favoritesCount}
      />

      {/* Selection & Lightroom Export Modal */}
      <SelectionApprovalModal
        isOpen={selectionModalOpen}
        onClose={() => setSelectionModalOpen(false)}
        photos={photos}
        albumLimit={config.albumSelectionLimit}
      />
    </div>
  );
};
