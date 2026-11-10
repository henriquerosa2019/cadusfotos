import React, { useState } from 'react';
import { X, Download, ShieldCheck, Check, Sparkles, AlertCircle, FileArchive } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  correctPin: string;
  totalPhotosCount: number;
  favoritesCount: number;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  correctPin,
  totalPhotosCount,
  favoritesCount
}) => {
  const [pinInput, setPinInput] = useState('');
  const [format, setFormat] = useState<'high' | 'web'>('high');
  const [scope, setScope] = useState<'all' | 'favorites'>('favorites');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const handleStartDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() !== correctPin) {
      setErrorMsg(`Código PIN incorreto. Dica para teste: o PIN é ${correctPin}`);
      return;
    }
    setErrorMsg('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleReset = () => {
    setIsComplete(false);
    setIsProcessing(false);
    setPinInput('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-white/15 p-6 sm:p-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl relative">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isComplete ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-brand-sky/20 text-sky-600 dark:text-brand-sky flex items-center justify-center font-bold">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Download das Fotos</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Protegido por PIN do cliente</p>
              </div>
            </div>

            <form onSubmit={handleStartDownload} className="mt-6 space-y-5">
              {/* Scope Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  1. Quais fotos você deseja baixar?
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setScope('favorites')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      scope === 'favorites'
                        ? 'border-teal-500 bg-teal-50/50 dark:bg-brand-mint/10 text-teal-800 dark:text-brand-mint font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-bold">Apenas Favoritas</p>
                    <p className="text-[10px] opacity-80 mt-0.5">{favoritesCount} fotos selecionadas</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScope('all')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      scope === 'all'
                        ? 'border-teal-500 bg-teal-50/50 dark:bg-brand-mint/10 text-teal-800 dark:text-brand-mint font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-bold">Todas da Galeria</p>
                    <p className="text-[10px] opacity-80 mt-0.5">{totalPhotosCount} fotos no total</p>
                  </button>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  2. Resolução do arquivo:
                </label>
                <div className="space-y-2 text-xs">
                  <label
                    onClick={() => setFormat('high')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      format === 'high'
                        ? 'border-sky-500 bg-sky-50/50 dark:bg-brand-sky/10 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      checked={format === 'high'}
                      onChange={() => setFormat('high')}
                      className="mt-1 accent-sky-500"
                    />
                    <div>
                      <p className="font-bold">Resolução Original (24 MP • 300 DPI)</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Qualidade máxima para impressão em laboratório, quadros e álbuns.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setFormat('web')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      format === 'web'
                        ? 'border-sky-500 bg-sky-50/50 dark:bg-brand-sky/10 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      checked={format === 'web'}
                      onChange={() => setFormat('web')}
                      className="mt-1 accent-sky-500"
                    />
                    <div>
                      <p className="font-bold">Otimizada para Redes Sociais & Web</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Arquivos leves e rápidos para WhatsApp, Instagram e celular.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* PIN Code Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    3. Código PIN da Galeria:
                  </label>
                  <span className="text-[10px] text-teal-700 dark:text-brand-mint font-semibold">
                    Dica: use o PIN {correctPin}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="Digite o PIN de 4 dígitos"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-center tracking-widest text-lg font-bold focus:outline-none focus:border-teal-500"
                  />
                  <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-brand-mint absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errorMsg && (
                  <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || !pinInput}
                className="w-full py-3.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                    <span>Empacotando arquivo ZIP...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Baixar Arquivo ZIP com as Fotos</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Download Pronto!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              O pacote com as fotos selecionadas ({scope === 'favorites' ? favoritesCount : totalPhotosCount} fotos em {format === 'high' ? 'Alta Resolução' : 'Versão Web'}) foi gerado com sucesso.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs text-left flex items-center gap-3">
              <FileArchive className="w-8 h-8 text-teal-600 dark:text-brand-mint flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Casamento_Isabela_Rodrigo.zip</p>
                <p className="text-[11px] text-slate-500">Compactado sem perda de qualidade • Pronto</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-brand-gradient text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow"
            >
              Concluir e Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
