import React, { useState } from 'react';
import { showcaseGalleries, ShowcaseGallery } from './examplesData';
import {
  Camera,
  Globe,
  Calendar,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  Eye,
  Check,
  Sparkles,
  ArrowLeft,
  Sliders,
  Share2,
  Heart,
  ChevronDown
} from 'lucide-react';

interface PixiesetExamplesPageProps {
  onBackToHome: () => void;
  onOpenClientGallery: () => void;
  onOpenStore: () => void;
  onOpenStudio: () => void;
  onOpenPortfolio: () => void;
}

export const PixiesetExamplesPage: React.FC<PixiesetExamplesPageProps> = ({
  onBackToHome,
  onOpenClientGallery,
  onOpenStore,
  onOpenStudio,
  onOpenPortfolio
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'website' | 'studio' | 'store'>('gallery');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos os Estilos' },
    { id: 'wedding', label: 'Wedding (Casamento)' },
    { id: 'portrait', label: 'Portrait (Retrato)' },
    { id: 'family', label: 'Family (Família)' },
    { id: 'commercial', label: 'Commercial (Comercial)' },
    { id: 'event', label: 'Event (Eventos)' },
    { id: 'adventure', label: 'Adventure (Viagem)' }
  ];

  const filteredGalleries = selectedCategory === 'all'
    ? showcaseGalleries
    : showcaseGalleries.filter(g => g.category === selectedCategory);

  const handleTabClick = (tab: 'gallery' | 'website' | 'studio' | 'store') => {
    setActiveTab(tab);
    if (tab === 'website') onOpenPortfolio();
    else if (tab === 'studio') onOpenStudio();
    else if (tab === 'store') onOpenStore();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-200 selection:text-slate-950">
      {/* 1. TOP NAV / HEADER (PIXIESET CLEAN MINIMALIST STYLE) */}
      <nav className="sticky top-0 z-40 h-[72px] w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md text-slate-900 transition-all duration-200">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button onClick={onBackToHome} className="flex items-center gap-2.5 group text-left">
              <img
                src="/cadus-logo.jpg"
                alt="Cadu's Fotos"
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-serif font-black tracking-wider text-slate-950 text-lg uppercase leading-none">
                  Cadu's <span className="text-teal-600">Fotos</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Client Gallery Platform
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Pixieset Style) */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-slate-600">
            <button
              onClick={onBackToHome}
              className="hover:text-slate-950 transition-colors"
            >
              Produtos
            </button>
            <span className="text-slate-950 font-bold border-b-2 border-slate-950 pb-1">
              Exemplos
            </span>
            <button
              onClick={onOpenStudio}
              className="hover:text-slate-950 transition-colors"
            >
              Studio Manager
            </button>
            <button
              onClick={onOpenStore}
              className="hover:text-slate-950 transition-colors"
            >
              Loja & Lab
            </button>
            <button
              onClick={onOpenPortfolio}
              className="hover:text-slate-950 transition-colors"
            >
              Portfólio
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 px-3 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </button>

            <button
              onClick={onOpenClientGallery}
              className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              <span>Abrir Galeria Ativa</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION: "Made with Pixieset" FORMAT */}
      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-950 tracking-tight mb-4">
          Criado com Cadu's Fotos
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed">
          Descubra como os principais fotógrafos profissionais entregam fotos em alta resolução, encantam clientes e expandem seus negócios.
        </p>

        {/* 3. PRODUCT TABS (PIXIESET HORIZONTAL TABS WITH BOTTOM SLIDER) */}
        <div className="pt-12 pb-4 flex justify-center">
          <div role="tablist" className="flex w-full justify-center max-w-3xl border-b border-slate-200">
            {/* Tab 1: Client Gallery (Active) */}
            <div className="flex-1 max-w-[200px]">
              <button
                type="button"
                onClick={() => handleTabClick('gallery')}
                className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 pb-4 text-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/30 text-teal-600 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-950 group-hover:text-teal-700 transition-colors">
                  Client Gallery
                </span>
              </button>
              <div className="h-0.5 w-full bg-slate-950 relative -mb-[1px]" />
            </div>

            {/* Tab 2: Website */}
            <div className="flex-1 max-w-[200px]">
              <button
                type="button"
                onClick={() => handleTabClick('website')}
                className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 pb-4 text-center group cursor-pointer text-slate-500 hover:text-slate-950"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold transition-colors">
                  Website
                </span>
              </button>
              <div className="h-0.5 w-full bg-transparent" />
            </div>

            {/* Tab 3: Studio Manager */}
            <div className="flex-1 max-w-[200px]">
              <button
                type="button"
                onClick={() => handleTabClick('studio')}
                className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 pb-4 text-center group cursor-pointer text-slate-500 hover:text-slate-950"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold transition-colors">
                  Studio Manager
                </span>
              </button>
              <div className="h-0.5 w-full bg-transparent" />
            </div>

            {/* Tab 4: Store */}
            <div className="flex-1 max-w-[200px]">
              <button
                type="button"
                onClick={() => handleTabClick('store')}
                className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 pb-4 text-center group cursor-pointer text-slate-500 hover:text-slate-950"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold transition-colors">
                  Store
                </span>
              </button>
              <div className="h-0.5 w-full bg-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOWCASE HEADER & FILTER PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Client photo galleries
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. SHOWCASE PHOTO GALLERIES GRID (PIXIESET 3-COLUMN ASPECT 3/3.92 CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {filteredGalleries.map((item) => (
            <article
              key={item.id}
              onClick={onOpenClientGallery}
              className="group flex flex-col items-start cursor-pointer text-left"
            >
              {/* Image Container with Exact Pixieset Aspect Ratio & Hover Scale */}
              <div className="relative w-full overflow-hidden rounded-sm bg-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] duration-500 group-hover:scale-[1.02] transition-all">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto aspect-[3/3.92] object-cover object-top"
                />

                {/* Subtle Hover Pill Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 backdrop-blur-md text-slate-950 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <Eye className="w-3.5 h-3.5 text-teal-600" />
                    <span>Visualizar Galeria</span>
                  </span>
                </div>

                {item.featured && (
                  <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    Galeria Ativa (Com Trilha Sonora)
                  </span>
                )}
              </div>

              {/* Text Meta Below Card (Pixieset Style) */}
              <div className="mt-4 text-left w-full">
                <h3 className="text-slate-950 font-serif font-bold text-lg sm:text-xl group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <p className="font-medium">
                    {item.categoryLabel}
                  </p>
                  <span className="text-[11px] text-slate-400">
                    {item.location}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. GET STARTED WITH PIXIESET / CADU'S FOTOS FORMAT (BOTTOM CTA) */}
      <section className="bg-slate-50 border-t border-slate-200 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full mb-4 inline-block">
            All-in-One Photography Platform
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight mt-2 mb-4">
            Comece a Usar o Cadu's Fotos
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mb-8 font-normal">
            Grátis para sempre. Faça upgrade apenas quando o volume do seu estúdio expandir.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onOpenClientGallery}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
            >
              Criar Galeria Grátis
            </button>
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Conhecer Todos os Planos
            </button>
          </div>

          {/* Desktop & Mobile Visual Preview Mockup Strip */}
          <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-2">
            <img
              src="https://ss-assets.pixieset.com/2eBFi3tslOglBNrUPwaG7E/CTA-footer-090425.webp"
              alt="Plataforma Cadu's Fotos no Desktop e Mobile"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-14 px-4 sm:px-6 lg:px-8 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/cadus-logo.jpg" alt="Cadu's Fotos" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-serif font-bold text-white text-sm">
              Cadu's Fotos • Plataforma Completa para Fotógrafos
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={onOpenClientGallery} className="hover:text-white transition-colors">Client Gallery</button>
            <button onClick={onOpenPortfolio} className="hover:text-white transition-colors">Website</button>
            <button onClick={onOpenStudio} className="hover:text-white transition-colors">Studio Manager</button>
            <button onClick={onOpenStore} className="hover:text-white transition-colors">Store</button>
            <button onClick={onBackToHome} className="hover:text-white transition-colors">Início</button>
          </div>

          <div className="text-slate-500">
            © 2026 Cadu's Fotos. Inspirado no padrão internacional Pixieset.
          </div>
        </div>
      </footer>
    </div>
  );
};
