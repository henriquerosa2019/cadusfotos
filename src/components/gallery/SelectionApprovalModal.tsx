import React, { useState } from 'react';
import { X, CheckCircle2, Copy, Check, Send, Sparkles, MessageSquare, Heart, FileText } from 'lucide-react';
import { GalleryPhoto } from './galleryData';

interface SelectionApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
  albumLimit: number;
}

export const SelectionApprovalModal: React.FC<SelectionApprovalModalProps> = ({
  isOpen,
  onClose,
  photos,
  albumLimit
}) => {
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [clientFinalNote, setClientFinalNote] = useState('');

  if (!isOpen) return null;

  const favoritePhotos = photos.filter(p => p.isFavorite);
  const totalComments = photos.reduce((sum, p) => sum + p.comments.length, 0);

  // Comma-separated filenames ready for Adobe Lightroom search / filter bar
  const lightroomFileList = favoritePhotos.map(p => p.filename).join(', ');

  const handleCopyLightroom = () => {
    navigator.clipboard.writeText(lightroomFileList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendSelection = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
  };

  const handleReset = () => {
    setSentSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 dark:border-white/15 p-6 sm:p-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!sentSuccess ? (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-brand-mint/15 text-teal-700 dark:text-brand-mint text-xs font-bold mb-3 border border-teal-200 dark:border-brand-mint/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Finalização da Prova do Álbum</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Revisar e Enviar Escolha das Fotos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Confira as fotos favoritadas e envie para o estúdio iniciar a diagramação do seu álbum.
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2 text-rose-500 font-bold mb-1">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Fotos Selecionadas</span>
                </div>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {favoritePhotos.length} de {albumLimit} fotos
                </p>
                <p className="text-[10px] text-slate-500">
                  {favoritePhotos.length <= albumLimit ? 'Dentro do limite contratado' : 'Fotos extras serão orçadas'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2 text-teal-600 dark:text-brand-mint font-bold mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Notas de Retoque</span>
                </div>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {totalComments} anotações
                </p>
                <p className="text-[10px] text-slate-500">
                  Enviadas diretamente para o fotógrafo
                </p>
              </div>
            </div>

            {/* Selected Photos Thumbnails Strip */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Miniaturas das Fotos Escolhidas ({favoritePhotos.length}):
              </p>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {favoritePhotos.map(p => (
                  <div key={p.id} className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 group">
                    <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] font-mono text-center text-white truncate px-0.5">
                      {p.filename}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Adobe Lightroom Integration Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-brand-sky" />
                  Filtro para Adobe Lightroom
                </span>
                <button
                  type="button"
                  onClick={handleCopyLightroom}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-600 text-[11px] font-bold flex items-center gap-1 border border-slate-200 dark:border-white/10 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar Nomes</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-mono break-all line-clamp-2 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-white/5">
                {lightroomFileList || 'Nenhuma foto selecionada'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Basta colar essa lista na barra de busca do Lightroom para filtrar instantaneamente todas as fotos escolhidas pelos noivos.
              </p>
            </div>

            {/* Optional message to photographer */}
            <form onSubmit={handleSendSelection} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Mensagem final para o fotógrafo (opcional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Cadu, amamos as fotos! Pode seguir com o layout do álbum neste estilo."
                  value={clientFinalNote}
                  onChange={(e) => setClientFinalNote(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={favoritePhotos.length === 0}
                className="w-full py-3.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Aprovar e Enviar Seleção para o Cadu</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Seleção Enviada com Sucesso!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              O fotógrafo recebeu sua lista de {favoritePhotos.length} fotos favoritas e as {totalComments} anotações de retoque.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs text-left space-y-1">
              <p className="text-teal-700 dark:text-brand-mint font-semibold">✓ Notificação e email disparados para o estúdio</p>
              <p className="text-sky-700 dark:text-brand-sky font-semibold">✓ Prévia da diagramação do álbum será iniciada</p>
              <p className="text-slate-500 font-semibold">✓ Você continuará com acesso permanente à galeria</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-brand-gradient text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow"
            >
              Voltar à Galeria
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
