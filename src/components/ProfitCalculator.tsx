import React, { useState } from 'react';
import { DollarSign, TrendingUp, Sparkles, ArrowRight, CheckCircle2, ShoppingCart } from 'lucide-react';

export const ProfitCalculator: React.FC = () => {
  const [sessionsPerMonth, setSessionsPerMonth] = useState<number>(8);
  const [basePrice, setBasePrice] = useState<number>(1800);
  const [enableAlbums, setEnableAlbums] = useState<boolean>(true);
  const [enableFrames, setEnableFrames] = useState<boolean>(true);
  const [enableExtraPhotos, setEnableExtraPhotos] = useState<boolean>(true);

  const albumProfitPerSession = enableAlbums ? 0.25 * 550 : 0;
  const frameProfitPerSession = enableFrames ? 0.35 * 280 : 0;
  const extraPhotosProfitPerSession = enableExtraPhotos ? 0.50 * 190 : 0;

  const extraMonthlyProfit = Math.round(
    sessionsPerMonth * (albumProfitPerSession + frameProfitPerSession + extraPhotosProfitPerSession)
  );
  const extraAnnualProfit = extraMonthlyProfit * 12;
  const baseMonthlyRevenue = sessionsPerMonth * basePrice;

  return (
    <section id="calculadora" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-400/15 via-teal-400/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-brand-sky/15 text-sky-700 dark:text-brand-sky text-xs font-bold mb-4 border border-sky-200 dark:border-brand-sky/20">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Calculadora de Receita Extra</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Quanto a mais você pode lucrar <br />
            <span className="text-gradient">sem trabalhar horas a mais?</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Ao vender álbuns, quadros e fotos extras diretamente na galeria, você multiplica o valor de cada trabalho que já fotografa.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Controls (Left 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Sessions per month */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Quantas sessões/eventos você entrega por mês?
                  </label>
                  <span className="text-base font-extrabold text-teal-700 dark:text-brand-mint px-3 py-1 rounded-lg bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-white/5">
                    {sessionsPerMonth} clientes
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={sessionsPerMonth}
                  onChange={(e) => setSessionsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-brand-mint"
                />
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>2 por mês (início)</span>
                  <span>15 por mês</span>
                  <span>30 por mês (estúdio pleno)</span>
                </div>
              </div>

              {/* Slider 2: Base package price */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Valor médio cobrado pelo seu pacote de fotos:
                  </label>
                  <span className="text-base font-extrabold text-sky-700 dark:text-brand-sky px-3 py-1 rounded-lg bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-white/5">
                    R$ {basePrice.toLocaleString('pt-BR')}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-600 dark:accent-brand-sky"
                />
              </div>

              {/* Toggles for products */}
              <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Produtos ativos na mesma página da galeria:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${enableAlbums ? 'bg-teal-50/50 dark:bg-slate-800/80 border-teal-500 dark:border-brand-mint text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-400'}`}>
                    <div className="text-xs">
                      <p className="font-bold">Álbuns Luxo</p>
                      <p className="text-[10px] text-teal-700 dark:text-brand-mint font-semibold">+R$ 550 lucro/unid</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableAlbums}
                      onChange={(e) => setEnableAlbums(e.target.checked)}
                      className="accent-teal-600 dark:accent-brand-mint w-4 h-4"
                    />
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${enableFrames ? 'bg-sky-50/50 dark:bg-slate-800/80 border-sky-500 dark:border-brand-sky text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-400'}`}>
                    <div className="text-xs">
                      <p className="font-bold">Quadros Fine Art</p>
                      <p className="text-[10px] text-sky-700 dark:text-brand-sky font-semibold">+R$ 280 lucro/unid</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableFrames}
                      onChange={(e) => setEnableFrames(e.target.checked)}
                      className="accent-sky-600 dark:accent-brand-sky w-4 h-4"
                    />
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${enableExtraPhotos ? 'bg-emerald-50/50 dark:bg-slate-800/80 border-emerald-500 dark:border-emerald-400 text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-400'}`}>
                    <div className="text-xs">
                      <p className="font-bold">Downloads Extras</p>
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">100% de margem</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableExtraPhotos}
                      onChange={(e) => setEnableExtraPhotos(e.target.checked)}
                      className="accent-emerald-600 dark:accent-emerald-400 w-4 h-4"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Results Card (Right 5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 text-white border border-teal-500/30 shadow-brand-glow text-center space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Lucro Líquido Adicional no Ano
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-gradient mt-2">
                  + R$ {extraAnnualProfit.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-brand-mint font-semibold mt-1">
                  equivale a + R$ {extraMonthlyProfit.toLocaleString('pt-BR')} a mais todo mês
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 text-xs text-left space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Receita base dos ensaios:</span>
                  <span className="font-semibold">R$ {baseMonthlyRevenue.toLocaleString('pt-BR')}/mês</span>
                </div>
                <div className="flex justify-between text-brand-mint font-bold">
                  <span>Nova Receita com Loja Integrada:</span>
                  <span>R$ {(baseMonthlyRevenue + extraMonthlyProfit).toLocaleString('pt-BR')}/mês</span>
                </div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-white/10">
                  ✓ Sem necessidade de estocar produtos ou embalar pedidos manualmente.
                </div>
              </div>

              <a
                href="#cadastro"
                className="w-full py-3.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow transition-all flex items-center justify-center gap-2"
              >
                Ativar Minha Loja Integrada
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
