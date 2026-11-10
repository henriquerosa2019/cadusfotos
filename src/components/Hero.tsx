import React from 'react';
import { ArrowRight, Play, CheckCircle2, ShoppingBag, Eye, Heart, Sparkles, Download, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreDemo }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden transition-colors duration-300">
      {/* Background Radial Glow: Sky Blue to Mint Green */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-sky-400/15 via-teal-400/15 to-transparent dark:from-brand-sky/20 dark:via-brand-mint/15 dark:to-transparent blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-400/10 dark:bg-brand-cyan/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-400/10 dark:bg-brand-emerald/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central Content */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-teal-500/30 dark:border-brand-mint/30 shadow-sm dark:shadow-brand-glow text-xs font-semibold text-teal-800 dark:text-brand-mint mb-8">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 dark:bg-brand-mint animate-ping" />
            <span className="text-gradient font-bold tracking-wider uppercase text-[11px]">
              Plataforma All-in-One de Fotografia
            </span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="text-slate-600 dark:text-slate-300">Nova Versão 2.0</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            Projetada para encantar clientes. <br />
            <span className="text-gradient">Feita para vender mais.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
            Entregue galerias memoráveis, receba escolhas de fotos com favoritos e venda álbuns encadernados, quadros e downloads em alta resolução <span className="text-teal-600 dark:text-brand-mint font-bold">tudo na mesma página</span>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8 relative z-20">
            <a
              href="#cadastro"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-slate-950 font-bold text-sm uppercase tracking-wider shadow-brand-glow transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group"
            >
              Começar Gratuitamente
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-sm border border-slate-300 dark:border-white/10 hover:border-teal-500/40 dark:hover:border-brand-mint/40 transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-brand-mint/20 text-teal-700 dark:text-brand-mint flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              Simular Compra na Galeria
            </button>
          </div>

          {/* Trust Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
              <span>Sem necessidade de cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
              <span>PIX Instantâneo e Cartão até 12x</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
              <span>Impressão integrada a gráficas brasileiras</span>
            </div>
          </div>
        </div>

        {/* Hero Showcase Mockup */}
        <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto">
          {/* Ambient Glow behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 via-teal-400/20 to-emerald-400/20 dark:from-brand-sky/25 dark:via-brand-mint/20 dark:to-brand-emerald/25 blur-2xl -z-10 rounded-3xl transform scale-95" />

          {/* Mockup Frame */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Browser Header Bar */}
            <div className="h-11 bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-white/10 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-400 font-mono shadow-sm">
                <span className="text-teal-600 dark:text-emerald-400 font-bold">https://</span>
                <span>galeria.cadusfotos.com.br/isabela-e-rodrigo</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-brand-mint font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Galeria Protegida</span>
              </div>
            </div>

            {/* Gallery Cover & Interactive Demo Header */}
            <div className="relative h-64 sm:h-96 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
                alt="Ensaio de Casamento Isabela & Rodrigo"
                className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
                <span className="text-xs uppercase tracking-widest text-brand-mint font-bold mb-1">
                  Coleção Premium • Casamento
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
                  Isabela & Rodrigo — A Cerimônia dos Sonhos
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <span>São Paulo, SP</span>
                  <span>•</span>
                  <span>248 fotos entregues</span>
                  <span>•</span>
                  <span className="text-brand-sky font-semibold">Download em 4K Liberado</span>
                </div>
              </div>

              {/* Floating Sales Notification Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 glass-panel rounded-xl p-3 border border-teal-500/30 dark:border-brand-mint/30 shadow-xl flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-sky to-brand-mint flex items-center justify-center text-slate-950 font-bold">
                  <ShoppingBag className="w-5 h-5 text-brand-dark" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-teal-700 dark:text-brand-mint">Novo Pedido no Estúdio!</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Álbum Panorâmico Linho Cru</p>
                  <p className="text-[11px] text-teal-600 dark:text-emerald-400 font-extrabold">+ R$ 890,00 via PIX</p>
                </div>
              </div>
            </div>

            {/* Gallery Action Ribbon (Like Pixieset) */}
            <div className="bg-slate-50 dark:bg-slate-950 px-6 py-3.5 border-t border-b border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Visualização do Cliente:</span>
                <span className="px-2.5 py-1 rounded-md bg-teal-50 dark:bg-brand-mint/15 text-teal-700 dark:text-brand-mint font-semibold border border-teal-200 dark:border-brand-mint/20 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  Modo Prova Ativo
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onExploreDemo}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Loja de Produtos
                </button>
                <div className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1.5 border border-slate-200 dark:border-white/5 shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>32 Favoritos</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1.5 border border-slate-200 dark:border-white/5 shadow-sm">
                  <Download className="w-3.5 h-3.5 text-sky-600 dark:text-brand-sky" />
                  <span>Download PIN</span>
                </div>
              </div>
            </div>

            {/* Micro Gallery Thumbnails */}
            <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-100/60 dark:bg-slate-900/60">
              {[
                {
                  url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
                  title: 'Entrada da Noiva',
                  price: 'Quadro a partir de R$ 180'
                },
                {
                  url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
                  title: 'Troca de Alianças',
                  price: 'Álbum Linho Cru'
                },
                {
                  url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
                  title: 'Brinde dos Noivos',
                  price: 'Fine Art 30x45'
                },
                {
                  url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
                  title: 'Pôr do Sol Mágico',
                  price: 'Canvas Moldura Flutuante'
                }
              ].map((item, idx) => (
                <div key={idx} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-white/5 shadow-sm">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                    <p className="text-[10px] text-brand-mint font-medium">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
