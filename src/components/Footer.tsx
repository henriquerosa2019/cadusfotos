import React from 'react';
import { Camera, Instagram, Facebook, Youtube, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-brand-dark border-t border-slate-200 dark:border-white/10 pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Call to Action in Footer */}
        <div className="rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 mb-16 bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal-700 dark:text-brand-mint">
                Pronto para transformar sua fotografia em um negócio lucrativo?
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-3">
                Crie sua primeira galeria com loja integrada hoje mesmo.
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Sem cartão de crédito. Leva menos de 2 minutos para subir as primeiras fotos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href="#cadastro"
                className="px-8 py-4 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow text-center transition-all"
              >
                Começar Grátis Agora
              </a>
              <a
                href="#simulador"
                className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-white font-bold text-xs border border-slate-200 dark:border-white/10 text-center transition-all"
              >
                Ver Simulador ao Vivo
              </a>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/cadus-logo.jpg"
                alt="Cadu's Foto"
                className="w-10 h-10 rounded-xl object-cover shadow-md ring-1 ring-amber-400/80"
              />
              <span className="text-lg font-bold text-slate-900">
                Cadu's <span className="text-teal-600">Fotos</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
              A plataforma tudo-em-um desenvolvida especialmente para fotógrafos profissionais entregarem galerias de alto impacto e venderem múltiplos produtos aos seus clientes em um só lugar.
            </p>
            <div className="flex items-center gap-3 text-slate-500">
              <a href="#" className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center hover:text-teal-600 dark:hover:text-brand-mint transition-colors shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center hover:text-sky-600 dark:hover:text-brand-sky transition-colors shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center hover:text-rose-500 transition-colors shadow-sm">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Produtos</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#galerias" className="hover:text-teal-600 dark:hover:text-brand-mint transition-colors">Galerias de Clientes</a></li>
              <li><a href="#loja" className="hover:text-teal-600 dark:hover:text-brand-mint transition-colors">Loja de Impressões</a></li>
              <li><a href="#gestao" className="hover:text-teal-600 dark:hover:text-brand-mint transition-colors">Studio CRM & PIX</a></li>
              <li><a href="#app" className="hover:text-teal-600 dark:hover:text-brand-mint transition-colors">App Mobile PWA</a></li>
              <li><a href="#ia" className="hover:text-teal-600 dark:hover:text-brand-mint transition-colors">IA Photo Culling</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Laboratórios</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Digipix Pro</a></li>
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Indimagem Encadernadora</a></li>
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">FotoRegistro</a></li>
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Quadros Moldura Nobre</a></li>
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Fulfillment Automático</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Segurança & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Conformidade LGPD</a></li>
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Contratos com Valor Legal</a></li>
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Proteção de Direitos Autorais</a></li>
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-teal-600 dark:hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Cadu's Fotos. Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistemas Operacionais 100%
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/5 shadow-sm"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
