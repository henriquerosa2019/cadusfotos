import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MessageSquare, Download, ZoomIn, ZoomOut, Check, Send, Trash2, ShoppingBag } from 'lucide-react';
import { GalleryPhoto } from './galleryData';

interface LightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleFavorite: (id: number) => void;
  onAddComment: (photoId: number, text: string) => void;
  onDeleteComment: (photoId: number, commentId: string) => void;
  onOrderPrint?: (photo: GalleryPhoto) => void;
}

export const GalleryLightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onToggleFavorite,
  onAddComment,
  onDeleteComment,
  onOrderPrint,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!currentPhoto) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddComment(currentPhoto.id, newNoteText.trim());
    setNewNoteText('');
  };

  const handleSingleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between select-none">
      {/* Lightbox Top Navigation Bar */}
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-white/10 bg-slate-950/80 z-20">
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded-md bg-white/10">
            {currentPhoto.filename}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Foto {currentIndex + 1} de {photos.length}
          </span>
          <span className="text-[11px] text-teal-400 font-mono hidden md:inline">
            • {currentPhoto.resolution}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Favorite Toggle */}
          <button
            onClick={() => onToggleFavorite(currentPhoto.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              currentPhoto.isFavorite
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-white/10 hover:bg-white/20 text-slate-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${currentPhoto.isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">
              {currentPhoto.isFavorite ? 'Favoritada para o Álbum' : 'Favoritar Foto'}
            </span>
          </button>

          {/* Notes Drawer Toggle */}
          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              showNotesDrawer || currentPhoto.comments.length > 0
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'bg-white/10 hover:bg-white/20 text-slate-300'
            }`}
            title="Anotações de retoque para o fotógrafo"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Notas ({currentPhoto.comments.length})</span>
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors hidden sm:flex"
            title={isZoomed ? 'Reduzir Zoom' : 'Ampliar Imagem'}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Single Download */}
          <button
            onClick={handleSingleDownload}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Baixar esta foto em alta resolução"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline text-emerald-400 font-bold">Baixada!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-sky-400" />
                <span className="hidden sm:inline">Baixar</span>
              </>
            )}
          </button>

          {/* Direct Store / Order Print Button */}
          {onOrderPrint && (
            <button
              onClick={() => onOrderPrint(currentPhoto)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-all shadow-sm"
              title="Pedir quadro, tela ou álbum com esta foto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Comprar Impressão</span>
            </button>
          )}

          {/* Close Lightbox */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Area: Photo Display & Navigation Arrows */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Left Nav Arrow */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/10 text-white shadow-2xl transition-all hover:scale-110 z-10"
          title="Foto anterior (Seta esquerda)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Photo */}
        <div
          className={`relative max-w-full max-h-[80vh] flex items-center justify-center transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Right Nav Arrow */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/10 text-white shadow-2xl transition-all hover:scale-110 z-10"
          title="Próxima foto (Seta direita)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Retouch Notes Drawer (Slideout overlay) */}
        {showNotesDrawer && (
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 p-6 z-30 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  <span>Notas de Retoque para o Fotógrafo</span>
                </div>
                <button
                  onClick={() => setShowNotesDrawer(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-4">
                Escreva instruções específicas para esta foto ({currentPhoto.filename}). O Cadu receberá as notas no painel.
              </p>

              {/* Comments List */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {currentPhoto.comments.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500 italic">
                    Nenhuma nota de retoque adicionada nesta foto ainda.
                  </div>
                ) : (
                  currentPhoto.comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1 group"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-teal-300">{c.author}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">{c.createdAt}</span>
                          <button
                            onClick={() => onDeleteComment(currentPhoto.id, c.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                            title="Excluir nota"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{c.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handleAddNote} className="pt-4 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Clarear olheiras, remover reflexo..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:opacity-40 disabled:hover:bg-teal-500 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Lightbox Bottom Caption Bar */}
      <div className="h-14 px-6 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 z-20">
        <span className="font-medium text-white truncate">{currentPhoto.title}</span>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Use as setas ◀ ▶ do teclado para navegar</span>
          <span className="font-mono text-slate-400">{currentPhoto.filesize}</span>
        </div>
      </div>
    </div>
  );
};
