import React, { useState } from 'react';
import { Sliders, ShieldCheck, DollarSign, Clock, Check, AlertCircle, Key, RefreshCw, Zap } from 'lucide-react';
import { labPartners } from './storeData';

export const PhotographerStoreSettings: React.FC = () => {
  const [globalMarkup, setGlobalMarkup] = useState(250); // +250% margin
  const [holdPeriodHours, setHoldPeriodHours] = useState<number>(48);
  const [autoSendToLab, setAutoSendToLab] = useState(false);
  const [pixKeyType, setPixKeyType] = useState<'email' | 'cpf' | 'telefone'>('email');
  const [pixKey, setPixKey] = useState('cadu.fotografia@gmail.com');
  const [isSavedToast, setIsSavedToast] = useState(false);

  const handleSave = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Settings Header */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-mint/20 text-brand-mint border border-brand-mint/30">
            Painel de Configuração da Loja & Laboratórios
          </span>
          <h2 className="text-2xl font-bold mt-2">
            Margens de Lucro & Parcerias de Impressão
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Ajuste quanto você lucra em cada produto, configure o tempo de revisão de retoque antes de mandar imprimir e informe sua chave PIX para repasses automáticos.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-brand-glow flex items-center gap-2 flex-shrink-0"
        >
          {isSavedToast ? <Check className="w-4 h-4" /> : <SaveIcon className="w-4 h-4" />}
          <span>{isSavedToast ? 'Configurações Salvas!' : 'Salvar Preferências'}</span>
        </button>
      </div>

      {/* 💰 Bônus de Adoção: Primeiros R$ 500 em Vendas com Taxa Zero */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-teal-500/10 via-brand-mint/15 to-emerald-500/10 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase tracking-wider">
              0% de Taxa Ativa
            </span>
            <span className="text-xs font-bold text-teal-800 dark:text-brand-mint">
              Incentivo de Boas-Vindas para Novos Fotógrafos
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Seus primeiros R$ 500,00 em vendas na loja têm 0% de comissão de serviço!
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Fique com 100% do lucro líquido gerado pela venda de álbuns, quadros e revelações. Sem surpresas ou taxas ocultas.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-right flex-shrink-0 w-full sm:w-auto">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Saldo com Isenção de Taxa:</span>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            R$ 500,00 restantes
          </div>
          <span className="text-[10px] text-slate-500">R$ 0 / R$ 500 consumidos</span>
        </div>
      </div>

      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Markup & Margin Slider */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-brand-mint/20 text-teal-600 dark:text-brand-mint">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Margem de Lucro Geral ({globalMarkup}%)
              </h3>
              <p className="text-xs text-slate-500">
                Multiplicador automático aplicado sobre os custos do laboratório
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>+100% (Margem Mínima)</span>
              <span className="text-base text-teal-600 dark:text-brand-mint font-extrabold">+{globalMarkup}%</span>
              <span>+400% (Alta Margem)</span>
            </div>

            <input
              type="range"
              min={100}
              max={400}
              step={10}
              value={globalMarkup}
              onChange={e => setGlobalMarkup(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Real-world Simulator based on chosen markup */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Simulação de Preço Final e Seu Lucro:
            </span>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Álbum Indimagem 30x30 Panorâmico</span>
                <span className="text-[10px] text-slate-500">Custo Lab: R$ 390,00</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Venda: R$ {Math.round(390 * (1 + globalMarkup / 100))},00
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  Lucro: +R$ {Math.round(390 * (globalMarkup / 100))},00
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Quadro Digipix Pro 50x70 Fine Art</span>
                <span className="text-[10px] text-slate-500">Custo Lab: R$ 145,00</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Venda: R$ {Math.round(145 * (1 + globalMarkup / 100))},00
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  Lucro: +R$ {Math.round(145 * (globalMarkup / 100))},00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Hold Period (Pixieset Retouch Approval) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-brand-mint/20 text-teal-600 dark:text-brand-mint">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Fila de Revisão de Retoque (Hold)
              </h3>
              <p className="text-xs text-slate-500">
                Evite imprimir fotos sem retoque fino antes do laboratório produzir
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => setAutoSendToLab(false)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                !autoSendToLab
                  ? 'border-teal-500 bg-teal-50/70 dark:bg-brand-mint/15 dark:border-brand-mint shadow-sm'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Reter Pedido por {holdPeriodHours} horas (Recomendado)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-brand-mint/20 text-teal-800 dark:text-brand-mint">
                  Modo Seguro
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Quando o cliente compra, o pedido fica em espera por {holdPeriodHours}h para você substituir qualquer arquivo por um TIFF/JPEG retocado em 300 DPI antes de ser impresso.
              </p>
            </div>

            <div
              onClick={() => setAutoSendToLab(true)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                autoSendToLab
                  ? 'border-teal-500 bg-teal-50/70 dark:bg-brand-mint/15 dark:border-brand-mint shadow-sm'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-teal-500" />
                  Envio Automático Imediato (Zero-Touch)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  100% Automático
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                O arquivo é enviado imediatamente para a fila de impressão da Indimagem ou Digipix Pro assim que o PIX for pago.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Dados de Recebimento PIX */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-5 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-brand-mint/20 text-teal-600 dark:text-brand-mint">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Chave PIX para Depósito Automático do seu Lucro
              </h3>
              <p className="text-xs text-slate-500">
                Seu lucro líquido é repassado automaticamente para esta conta em D+1 após a confirmação
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Tipo de Chave</label>
              <select
                value={pixKeyType}
                onChange={e => setPixKeyType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs"
              >
                <option value="email">E-mail</option>
                <option value="cpf">CPF / CNPJ</option>
                <option value="telefone">Celular</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Sua Chave PIX</label>
              <input
                type="text"
                value={pixKey}
                onChange={e => setPixKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-mono"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Chave validada no Banco Central do Brasil • Repasses sem taxas de saque</span>
            </div>
            <span className="font-bold uppercase text-[10px] bg-emerald-200/50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
              Ativo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SaveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);
