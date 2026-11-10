import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Iniciante',
      tagline: 'Ideal para quem está começando e quer profissionalizar a entrega',
      priceMonthly: 0,
      priceAnnual: 0,
      featured: false,
      badge: 'Grátis para Sempre',
      features: [
        'Até 3 galerias ativas simultâneas',
        '10GB de fotos em resolução original',
        'Seleção e prova com favoritos',
        'Downloads protegidos por PIN',
        'Loja integrada (10% taxa de serviço)'
      ],
      buttonText: 'Criar Conta Grátis',
      buttonStyle: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10'
    },
    {
      name: 'Pro Fotógrafo',
      tagline: 'Para fotógrafos em crescimento que querem lucrar alto com produtos',
      priceMonthly: 89,
      priceAnnual: 69,
      featured: true,
      badge: 'Mais Escolhido',
      features: [
        'Galerias ILIMITADAS',
        '250GB de armazenamento ultra-rápido',
        'ZERO % de comissão na sua loja de produtos',
        'Recebimentos direto via PIX instantâneo',
        'Contratos digitais com assinatura válida',
        'App Mobile PWA exclusivo para cada cliente',
        'Exportação direta para o Adobe Lightroom',
        'Suporte prioritário via WhatsApp'
      ],
      buttonText: 'Começar Teste de 14 Dias',
      buttonStyle: 'bg-brand-gradient hover:bg-brand-gradient-hover text-slate-950 font-bold shadow-brand-glow'
    },
    {
      name: 'Studio Elite',
      tagline: 'Para grandes estúdios, coberturas de casamento e produtoras',
      priceMonthly: 169,
      priceAnnual: 139,
      featured: false,
      badge: 'Sem Limites',
      features: [
        'Armazenamento 100% ILIMITADO',
        'Domínio próprio (galeria.seuestudio.com.br)',
        'Marca branca total (white-label)',
        'Multi-usuários para sua equipe de fotógrafos',
        'Fulfillment prioritário em gráficas parceiras',
        'IA Culling para descarte automático de fotos',
        'Gerente de conta exclusivo'
      ],
      buttonText: 'Assinar Studio Elite',
      buttonStyle: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10'
    }
  ];

  return (
    <section id="planos" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-teal-400/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-teal-600 dark:text-brand-mint font-bold mb-2">
            Planos Transparentes
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Investimento que se paga logo no <br />
            <span className="text-gradient">primeiro álbum vendido</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-8">
            Comece de graça e faça o upgrade quando seu estúdio começar a vender. Cancele quando quiser.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-white dark:glass-panel border border-slate-200 dark:border-white/10 shadow-md">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !annual ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Cobrança Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                annual ? 'bg-brand-gradient text-slate-950 shadow-brand-glow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Cobrança Anual</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-950 text-[10px] font-extrabold">
                Economize 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.featured
                    ? 'border-2 border-teal-500 dark:border-brand-mint shadow-xl lg:-translate-y-3 bg-white dark:bg-slate-900/90'
                    : 'bg-white dark:glass-panel border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-gradient text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-brand-glow flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                    {!plan.featured && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-brand-mint border border-slate-200 dark:border-white/5">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">R$</span>
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                        {price}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">/mês</span>
                    </div>
                    {annual && price > 0 && (
                      <p className="text-[11px] text-teal-700 dark:text-brand-mint font-bold mt-1">
                        Cobrado anualmente (R$ {price * 12}/ano)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-teal-600 dark:text-brand-mint mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#cadastro"
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
