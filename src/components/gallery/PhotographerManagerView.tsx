import React, { useState } from 'react';
import { Eye, Settings, Heart, MessageSquare, Copy, Check, Download, ShieldCheck, Share2, Sparkles, ExternalLink, Sliders, Save } from 'lucide-react';
import { GalleryConfig, GalleryPhoto } from './galleryData';

interface ManagerViewProps {
  config: GalleryConfig;
  photos: GalleryPhoto[];
  onSwitchToClientView: () => void;
  onUpdateConfig: (newConfig: GalleryConfig) => void;
}

export const PhotographerManagerView: React.FC<ManagerViewProps> = ({
  config,
  photos,
  onSwitchToClientView,
  onUpdateConfig
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formConfig, setFormConfig] = useState<GalleryConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const favoritePhotos = photos.filter(p => p.isFavorite);
  const photosWithComments = photos.filter(p => p.comments.length > 0);
  const totalCommentsCount = photos.reduce((sum, p) => sum + p.comments.length, 0);

  const lightroomList = favoritePhotos.map(p => p.filename).join(', ');

  const handleCopyLightroom = () => {
    navigator.clipboard.writeText(lightroomList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formConfig);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-white/10 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-brand-mint text-xs font-bold border border-teal-500/30">
              <Sliders className="w-3.5 h-3.5" />
              <span>Painel de Gestão da Galeria</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {config.title}
            </h2>
            <p className="text-xs text-slate-400">
              {config.location} • Criada em {config.eventDate} • {config.totalViews} visualizações
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <Settings className="w-4 h-4 text-slate-300" />
              <span>{isEditing ? 'Cancelar Edição' : 'Configurações'}</span>
            </button>

            <button
              onClick={onSwitchToClientView}
              className="px-5 py-2.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow flex items-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Ver como Cliente</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-xs">
          <div>
            <span className="text-slate-400 block">Total de Fotos</span>
            <span className="text-xl font-bold text-white">{photos.length} imagens</span>
          </div>
          <div>
            <span className="text-slate-400 block">Favoritadas pelo Cliente</span>
            <span className="text-xl font-bold text-rose-400">{favoritePhotos.length} fotos</span>
          </div>
          <div>
            <span className="text-slate-400 block">Anotações de Retoque</span>
            <span className="text-xl font-bold text-teal-400">{totalCommentsCount} notas</span>
          </div>
          <div>
            <span className="text-slate-400 block">PIN de Segurança</span>
            <span className="text-xl font-bold font-mono text-brand-sky">{config.pinCode}</span>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Configurações da galeria atualizadas com sucesso!</span>
        </div>
      )}

      {/* Editing Form (collapsible) */}
      {isEditing && (
        <div className="mb-8 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
            Editar Parâmetros da Coleção
          </h3>

          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold block mb-1">Título da Galeria:</label>
              <input
                type="text"
                value={formConfig.title}
                onChange={e => setFormConfig({ ...formConfig, title: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-950 font-medium"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Nome do Casal / Cliente:</label>
              <input
                type="text"
                value={formConfig.coupleNames}
                onChange={e => setFormConfig({ ...formConfig, coupleNames: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-950 font-medium"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Limite de Fotos para o Álbum:</label>
              <input
                type="number"
                value={formConfig.albumSelectionLimit}
                onChange={e => setFormConfig({ ...formConfig, albumSelectionLimit: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-950 font-medium"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">PIN de Download:</label>
              <input
                type="text"
                value={formConfig.pinCode}
                onChange={e => setFormConfig({ ...formConfig, pinCode: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-950 font-medium font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold block mb-1">Mensagem de Boas-Vindas:</label>
              <textarea
                rows={2}
                value={formConfig.welcomeMessage}
                onChange={e => setFormConfig({ ...formConfig, welcomeMessage: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-950 font-medium"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-gradient text-slate-950 font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Back-office Grid: Lightroom Integration & Retouch Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Lightroom Export & Selected Photos */}
        <div className="lg:col-span-7 space-y-6">
          {/* Adobe Lightroom One-Click Copy */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-500 flex items-center justify-center font-bold text-xs">
                  Lr
                </div>
                <div>
                  <h4 className="text-sm font-bold">Exportação Direta para o Adobe Lightroom</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {favoritePhotos.length} fotos selecionadas pelo cliente
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyLightroom}
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Nomes Copiados!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Lista</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 font-mono text-xs text-slate-700 dark:text-slate-300 break-all select-all">
              {lightroomList || 'O cliente ainda não favoritou fotos.'}
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              💡 <b>Como usar:</b> No Adobe Lightroom Classic, vá no painel de busca da Biblioteca (Filter Bar), selecione <i>Text {'>'} Filename {'>'} Contains</i> e cole a lista. Todas as fotos aprovadas pela Isabela serão filtradas instantaneamente.
            </div>
          </div>

          {/* Photos Selected by Client Grid */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Fotos Escolhidas para o Álbum ({favoritePhotos.length})</span>
              </h4>
              <span className="text-[11px] text-slate-500">
                Limite: {config.albumSelectionLimit} fotos
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {favoritePhotos.map(photo => (
                <div key={photo.id} className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-1.5 bg-slate-950/80 text-[10px] font-mono text-white text-center truncate">
                    {photo.filename}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Retouch Notes Stream */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                <h4 className="text-sm font-bold">Instruções de Retoque Recebidas</h4>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-brand-mint/15 text-teal-700 dark:text-brand-mint">
                {totalCommentsCount} pendentes
              </span>
            </div>

            {photosWithComments.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Nenhuma nota de retoque deixada pelo cliente até o momento.
              </div>
            ) : (
              <div className="space-y-4">
                {photosWithComments.map(photo => (
                  <div key={photo.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 space-y-2">
                    <div className="flex items-center gap-3">
                      <img src={photo.url} alt="Thumb" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold font-mono text-slate-900 dark:text-white block truncate">
                          {photo.filename}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate block">
                          {photo.title}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-white/5">
                      {photo.comments.map(c => (
                        <div key={c.id} className="text-xs">
                          <span className="font-bold text-teal-700 dark:text-brand-mint text-[11px] mr-1.5">
                            {c.author}:
                          </span>
                          <span className="text-slate-700 dark:text-slate-300">
                            "{c.text}"
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {c.createdAt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
