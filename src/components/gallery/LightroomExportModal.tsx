import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  FileText,
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle2,
  FolderPlus
} from 'lucide-react';
import { GalleryPhoto } from './galleryData';

interface LightroomExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
  galleryTitle: string;
}

export const LightroomExportModal: React.FC<LightroomExportModalProps> = ({
  isOpen,
  onClose,
  photos,
  galleryTitle
}) => {
  const [copyFormat, setCopyFormat] = useState<'comma' | 'space' | 'noext' | 'withext'>('comma');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const favoritePhotos = photos.filter(p => p.isFavorite);
  const cleanFilenames = favoritePhotos.map(p => p.filename.replace(/\.[^/.]+$/, ''));
  const originalFilenames = favoritePhotos.map(p => p.filename);

  let formattedText = '';
  switch (copyFormat) {
    case 'comma':
      formattedText = cleanFilenames.join(', ');
      break;
    case 'space':
      formattedText = cleanFilenames.join(' ');
      break;
    case 'noext':
      formattedText = cleanFilenames.join(', ');
      break;
    case 'withext':
      formattedText = originalFilenames.join(', ');
      break;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadLrsmcol = () => {
    const rawList = cleanFilenames.join(' ');
    const lrsmcolContent = `s = {
\tid = "${Date.now()}",
\tinternalName = "Fotos Aprovadas - ${galleryTitle}",
\ttitle = "Fotos Aprovadas - ${galleryTitle}",
\ttype = "LibrarySmartCollection",
\tvalue = {
\t\t{
\t\t\tcriteria = "filename",
\t\t\toperation = "all",
\t\t\tvalue = "${rawList}",
\t\t},
\t\tcombine = "union",
\t},
\tversion = 0,
}`;

    const blob = new Blob([lrsmcolContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lightroom-${galleryTitle.replace(/[^a-zA-Z0-9]/g, '-')}-Aprovadas.lrsmcol`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('Coleção Inteligente (.lrsmcol) baixada com sucesso!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleDownloadTxt = () => {
    const content = formattedText;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lista-Fotos-${galleryTitle.replace(/[^a-zA-Z0-9]/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('Lista .TXT baixada com sucesso!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl relative my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-6 bg-slate-950 text-white border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center font-serif font-black text-lg shadow-sm">
              Lr
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Integração Direta com Adobe Lightroom
                </h3>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full font-bold">
                  {favoritePhotos.length} fotos prontas
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Filtre e revele instantaneamente as fotos escolhidas pelo cliente no Lightroom Classic
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {downloadSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          {/* 1. Escolha de Formato para Copiar & Colar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Formato de Cópia para o Filtro de Texto
              </label>
              <span className="text-[11px] text-teal-600 dark:text-brand-mint font-semibold">
                Compatível com RAW (.CR3, .NEF, .ARW) e JPG
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'comma', label: 'Com Vírgula', hint: 'Padrão Lightroom' },
                { id: 'space', label: 'Com Espaço', hint: 'Busca rápida' },
                { id: 'noext', label: 'Sem Extensão', hint: 'Localiza RAW original' },
                { id: 'withext', label: 'Com .JPG', hint: 'Nome exato' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCopyFormat(opt.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    copyFormat === opt.id
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-bold ring-1 ring-teal-500'
                      : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs block">{opt.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal block">{opt.hint}</span>
                </button>
              ))}
            </div>

            {/* Preview Box & Copy Button */}
            <div className="relative">
              <textarea
                readOnly
                rows={3}
                value={formattedText || 'Nenhuma foto selecionada'}
                className="w-full p-3 pr-28 rounded-xl font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                disabled={favoritePhotos.length === 0}
                className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar (Ctrl+C)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Exportação Direta via Arquivos Nativos */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              2. Exportação com 1 Clique (Arquivos Nativos)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDownloadLrsmcol}
                disabled={favoritePhotos.length === 0}
                className="p-3.5 rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-950/50 text-left transition-all group flex items-start gap-3 disabled:opacity-50"
              >
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-sky-950 dark:text-sky-200 block">
                    Baixar Coleção Inteligente (.lrsmcol)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    O Lightroom cria a pasta com as fotos aprovadas automaticamente ao importar o arquivo.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleDownloadTxt}
                disabled={favoritePhotos.length === 0}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-all group flex items-start gap-3 disabled:opacity-50"
              >
                <div className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Baixar Lista em Arquivo (.TXT)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Ideal para backup do ensaio ou buscas em lote no Windows Explorer / Finder.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 3. Passo a Passo Visual para o Fotógrafo */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Como Usar no Adobe Lightroom Classic (4 Passos Rápidos)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-teal-700 dark:text-brand-mint font-bold">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[11px]">
                    1
                  </span>
                  <span>Módulo Biblioteca + Tecla "\"</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  No Lightroom Classic, abra a pasta com os RAWs do evento e aperte a tecla <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono font-bold">\</kbd> (barra invertida) para exibir a Barra de Filtros.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-teal-700 dark:text-brand-mint font-bold">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[11px]">
                    2
                  </span>
                  <span>Filtro de Texto {'>'} Nome do Arquivo</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Clique na aba <b>Texto</b>. No primeiro menu escolha <b>Nome do Arquivo</b> e no segundo selecione <b>Contém</b>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-teal-700 dark:text-brand-mint font-bold">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[11px]">
                    3
                  </span>
                  <span>Cole com Ctrl + V</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Dê <b>Ctrl + V</b> no campo de texto. Instantaneamente, todas as fotos favoritadas pela noiva aparecem isoladas na tela!
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-teal-700 dark:text-brand-mint font-bold">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[11px]">
                    4
                  </span>
                  <span>Marque e Revele (Tecla "D")</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Selecione todas (<kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">Ctrl+A</kbd>), dê 5 estrelas e aperte a tecla <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono font-bold">D</kbd> para ir direto ao módulo <b>Revelação (Develop)</b>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-teal-600" />
            <span>Compatível com Adobe Lightroom Classic 2020 a 2026.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
