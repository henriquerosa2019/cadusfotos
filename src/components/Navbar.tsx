import React, { useState } from 'react';
import { Camera, ChevronDown, Sparkles, ShoppingBag, Calendar, Smartphone, Globe, Menu, X, ArrowRight, User, Eye } from 'lucide-react';

interface NavbarProps {
  onOpenSimulator?: () => void;
  onOpenClientGallery?: () => void;
  onOpenStore?: () => void;
  onOpenStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSimulator, onOpenClientGallery, onOpenStore, onOpenStudio }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const products = [
    {
      name: 'Galerias do Cliente',
      desc: 'Entrega de fotos em alta resolução, prova e seleção com favoritos',
      icon: Camera,
      tag: 'Carro-Chefe',
      href: '#galerias'
    },
    {
      name: 'Loja Integrada & Laboratório',
      desc: 'Venda de álbuns, quadros emoldurados e impressões na própria galeria',
      icon: ShoppingBag,
      tag: 'Alta Margem',
      href: '#loja'
    },
    {
      name: 'Studio Manager (CRM & PIX)',
      desc: 'Agendamento de sessões, contratos digitais e cobranças via PIX',
      icon: Calendar,
      tag: 'Automação',
      href: '#gestao'
    },
    {
      name: 'App Mobile do Cliente (PWA)',
      desc: 'Álbum exclusivo instalado no celular do cliente como aplicativo',
      icon: Smartphone,
      tag: 'Exclusivo',
      href: '#app'
    },
    {
      name: 'Portfólio & Mini-Site',
      desc: 'Site autoral elegante sincronizado automaticamente com suas coleções',
      icon: Globe,
      tag: 'SEO Otimizado',
      href: '#site'
    }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/90 dark:border-white/10 shadow-sm py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <img
                src="/cadus-logo.jpg"
                alt="Cadu's Foto"
                className="w-12 h-12 rounded-2xl object-cover shadow-md ring-2 ring-amber-400/80 group-hover:ring-amber-500 group-hover:scale-105 transition-all duration-300"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Online" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Cadu's <span className="text-teal-600">Fotos</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-1">
                All-in-One Platform
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Products Dropdown */}
            <div
              className="relative z-50"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-white transition-colors py-2">
                Produtos
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? 'rotate-180 text-teal-600 dark:text-brand-mint' : ''}`} />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 w-96 pt-2 z-50">
                  <div className="rounded-2xl p-3 shadow-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
                      Ecossistema Integrado de Vendas
                    </div>
                    <div className="space-y-1">
                      {products.map((item, idx) => {
                        const Icon = item.icon;
                        const handleClick = (e: React.MouseEvent) => {
                          if (item.name === 'Galerias do Cliente' && onOpenClientGallery) {
                            e.preventDefault();
                            setProductsOpen(false);
                            onOpenClientGallery();
                          } else if (item.name === 'Loja Integrada & Laboratório' && onOpenStore) {
                            e.preventDefault();
                            setProductsOpen(false);
                            onOpenStore();
                          } else if (item.name === 'Studio Manager (CRM & PIX)' && onOpenStudio) {
                            e.preventDefault();
                            setProductsOpen(false);
                            onOpenStudio();
                          }
                        };
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={handleClick}
                            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                          >
                            <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-brand-mint group-hover:bg-brand-mint/20 group-hover:text-teal-700 transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-brand-mint transition-colors">
                                  {item.name}
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-brand-mint border border-teal-200 dark:border-brand-mint/20">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#galerias" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-brand-mint transition-colors">
              Galerias
            </a>

            <a href="#loja" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-brand-mint transition-colors">
              Loja & Lab
            </a>

            <a href="#gestao" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-brand-mint transition-colors">
              Studio Manager
            </a>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Direct Button to open Client Gallery Demo */}
            <button
              onClick={onOpenClientGallery}
              className="text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shadow-sm"
              title="Abrir o Módulo 1: Galeria Completa do Cliente"
            >
              <Eye className="w-3.5 h-3.5 text-teal-600" />
              <span>Galeria Demo</span>
            </button>

            {/* Direct Button to open Store & Print Lab Demo */}
            {onOpenStore && (
              <button
                onClick={onOpenStore}
                className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shadow-sm"
                title="Abrir o Módulo 2: Loja Integrada & Laboratórios"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-teal-600" />
                <span>Loja & Lab Demo</span>
              </button>
            )}

            {/* Direct Button to open Studio Manager Demo */}
            {onOpenStudio && (
              <button
                onClick={onOpenStudio}
                className="text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shadow-sm"
                title="Abrir o Módulo 3: Studio Manager (CRM, Contratos & PIX)"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Studio Manager Demo</span>
              </button>
            )}

            <a
              href="#cadastro"
              className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-xl group shadow-brand-glow flex-shrink-0"
            >
              <span className="absolute inset-0 bg-brand-gradient transition-all duration-300 group-hover:opacity-90"></span>
              <span className="relative px-5 py-2.5 rounded-[11px] bg-brand-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 group-hover:shadow-inner">
                Criar Conta Grátis
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800 dark:text-white" /> : <Menu className="w-6 h-6 text-slate-800 dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 pt-2 border-t border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-brand-dark px-2 rounded-2xl shadow-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 pt-2">
              Produtos & Ferramentas
            </div>
            {products.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                  <span className="text-sm font-semibold">{item.name}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-brand-mint">
                  {item.tag}
                </span>
              </a>
            ))}

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenClientGallery) onOpenClientGallery();
                }}
                className="w-full text-left px-3 py-2 text-sm text-teal-700 font-bold flex items-center gap-2 hover:bg-slate-50 rounded-lg"
              >
                <Eye className="w-4 h-4 text-teal-600" />
                <span>Ver Galeria do Cliente (Demo)</span>
              </button>
              {onOpenStore && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStore();
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-800 font-bold flex items-center gap-2 hover:bg-slate-50 rounded-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-teal-600" />
                  <span>Ver Loja & Laboratório (Demo)</span>
                </button>
              )}
              {onOpenStudio && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStudio();
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-emerald-800 font-bold flex items-center gap-2 hover:bg-slate-50 rounded-lg"
                >
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Ver Studio Manager CRM & PIX (Demo)</span>
                </button>
              )}
              <a
                href="#galerias"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium"
              >
                Galerias do Cliente
              </a>
              <a
                href="#loja"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium"
              >
                Loja de Impressões & Álbuns
              </a>
              <a
                href="#gestao"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium"
              >
                Studio Manager (CRM & Contratos)
              </a>
              <div className="pt-2">
                <a
                  href="#cadastro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-3 rounded-xl bg-brand-gradient text-slate-950 font-bold text-sm uppercase tracking-wider shadow-brand-glow"
                >
                  Criar Conta Grátis
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
