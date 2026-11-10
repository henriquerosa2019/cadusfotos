import React from 'react';
import { Camera, ShoppingBag, Calendar, Smartphone, Globe, Sparkles, ArrowRight, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

export const ProductBentoGrid: React.FC = () => {
  const cards = [
    {
      span: 'lg:col-span-8',
      title: 'Galerias do Cliente',
      subtitle: 'Entrega de alto padrão que transforma fotos em momentos inesquecíveis',
      desc: 'Mais de 1 milhão de clientes acessam galerias criadas nesta arquitetura. Capas em tela cheia com vídeo, reprodução sonora opcional, prova de seleção com 1 toque e downloads seguros com código PIN.',
      icon: Camera,
      tag: 'Carro-Chefe',
      badgeColor: 'bg-sky-50 dark:bg-brand-sky/20 text-sky-700 dark:text-brand-sky border-sky-200 dark:border-brand-sky/30',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      stat: '99.4% aprovação dos clientes'
    },
    {
      span: 'lg:col-span-4',
      title: 'Loja Integrada',
      subtitle: 'Venda álbuns e quadros na mesma tela',
      desc: 'Sem burocracia de orçamentos manuais. O cliente escolhe a moldura, vê o quadro na parede e paga via PIX ou cartão 12x com fulfillment Indimagem/Digipix.',
      icon: ShoppingBag,
      tag: 'Alta Lucratividade',
      badgeColor: 'bg-teal-50 dark:bg-brand-mint/20 text-teal-700 dark:text-brand-mint border-teal-200 dark:border-brand-mint/30',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      stat: '+R$ 750 ticket médio extra'
    },
    {
      span: 'lg:col-span-4',
      title: 'Studio Manager & PIX',
      subtitle: 'Contratos jurídicos e agendamento',
      desc: 'Assinatura digital no celular, recibos automáticos e sinal via PIX Copia-e-Cola que cai instantaneamente na sua conta.',
      icon: Calendar,
      tag: 'Automação',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-400/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      stat: 'Zero inadimplência de sinal'
    },
    {
      span: 'lg:col-span-4',
      title: 'App Mobile PWA',
      subtitle: 'Seu estúdio no bolso do cliente',
      desc: 'O cliente salva o ícone do casamento ou ensaio na tela inicial do smartphone sem passar por lojas de aplicativos.',
      icon: Smartphone,
      tag: 'Fidelização',
      badgeColor: 'bg-cyan-50 dark:bg-cyan-400/20 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-400/30',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
      stat: '4x mais indicações orgânicas'
    },
    {
      span: 'lg:col-span-4',
      title: 'IA Culling & Edição',
      subtitle: 'Seleção inteligente acelerada',
      desc: 'Filtre fotos borradas, olhos fechados e cliques duplicados automaticamente antes de enviar para o cliente.',
      icon: Sparkles,
      tag: 'Produtividade',
      badgeColor: 'bg-sky-50 dark:bg-brand-sky/20 text-sky-700 dark:text-brand-sky border-sky-200 dark:border-brand-sky/30',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80',
      stat: 'Economize 5h por ensaio'
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-brand-dark relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-teal-600 dark:text-brand-mint font-bold mb-3">
            Recursos Projetados para Escalar
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            A ferramenta certa para cada etapa do seu estúdio
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg">
            Potentes individualmente. Mágicos quando trabalham juntos para aumentar seu faturamento.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`${card.span} rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-teal-500/40 bg-slate-50/70 dark:glass-panel shadow-sm hover:shadow-md transition-all duration-500 group flex flex-col justify-between`}
              >
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-teal-600 dark:text-brand-mint group-hover:bg-teal-50 dark:group-hover:bg-brand-mint/15 transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-brand-mint transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-teal-700 dark:text-brand-mint flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      {card.stat}
                    </span>
                    <a
                      href="#cadastro"
                      className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center gap-1 font-bold transition-colors"
                    >
                      Saiba mais
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Card Visual Footer Image */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 dark:from-slate-950/80 via-transparent to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
