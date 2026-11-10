import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductTabs } from './components/ProductTabs';
import { InteractiveStoreSimulator } from './components/InteractiveStoreSimulator';
import { ProductBentoGrid } from './components/ProductBentoGrid';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { ClientGalleryPage } from './components/gallery/ClientGalleryPage';
import { StoreLabPage } from './components/store/StoreLabPage';
import { StudioManagerPage } from './components/studio/StudioManagerPage';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { GalleryPhoto } from './components/gallery/galleryData';
import { Camera, ArrowRight, Eye, Sparkles, ShoppingBag, Check, Calendar, Globe } from 'lucide-react';

export const MainContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'gallery' | 'store' | 'studio' | 'portfolio'>('landing');
  const [selectedStorePhoto, setSelectedStorePhoto] = useState<GalleryPhoto | undefined>(undefined);

  const scrollToSimulator = () => {
    const el = document.getElementById('simulador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'gallery') {
    return (
      <ClientGalleryPage
        onBackToHome={() => setCurrentView('landing')}
        onOpenStore={(photo) => {
          setSelectedStorePhoto(photo);
          setCurrentView('store');
        }}
      />
    );
  }

  if (currentView === 'store') {
    return (
      <StoreLabPage
        onBackToHome={() => setCurrentView('landing')}
        onOpenGallery={() => setCurrentView('gallery')}
        initialSelectedPhoto={selectedStorePhoto}
      />
    );
  }

  if (currentView === 'studio') {
    return (
      <StudioManagerPage
        onBackToHome={() => setCurrentView('landing')}
        onOpenGallery={() => setCurrentView('gallery')}
        onOpenStore={() => setCurrentView('store')}
      />
    );
  }

  if (currentView === 'portfolio') {
    return (
      <PortfolioPage
        onBackToHome={() => setCurrentView('landing')}
        onOpenClientGallery={() => setCurrentView('gallery')}
        onOpenStore={() => setCurrentView('store')}
        onOpenStudio={() => setCurrentView('studio')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-teal-200 selection:text-slate-950 transition-colors duration-300">
      {/* Top Banner introducing Phase 4: Portfólio & Mini-site */}
      <div className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 py-2 px-4 text-center text-slate-950 text-xs font-bold flex flex-wrap items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 bg-slate-950/20 px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
          <Sparkles className="w-3 h-3" />
          Fase 4 Pronta para Validação
        </span>
        <span>
          <b>Portfólio & Mini-Site Autoral de Alto Padrão</b> sincronizado com suas coleções!
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('portfolio')}
            className="px-3 py-1 rounded-full bg-slate-950 text-white text-[11px] font-bold hover:bg-slate-900 transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <Globe className="w-3 h-3 text-teal-400" />
            <span>Abrir Portfólio (Fase 4)</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setCurrentView('studio')}
            className="px-2.5 py-1 rounded-full bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
          >
            <Calendar className="w-3 h-3 text-emerald-900" />
            <span>Studio Manager (Fase 3)</span>
          </button>
          <button
            onClick={() => setCurrentView('store')}
            className="px-2.5 py-1 rounded-full bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3 text-teal-900" />
            <span>Loja & Lab (Fase 2)</span>
          </button>
          <button
            onClick={() => setCurrentView('gallery')}
            className="px-2.5 py-1 rounded-full bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
          >
            <Check className="w-3 h-3 text-emerald-900" />
            <span>Galeria (Fase 1)</span>
          </button>
        </div>
      </div>

      {/* Navigation Header */}
      <Navbar
        onOpenSimulator={scrollToSimulator}
        onOpenClientGallery={() => setCurrentView('gallery')}
        onOpenStore={() => setCurrentView('store')}
        onOpenStudio={() => setCurrentView('studio')}
        onOpenPortfolio={() => setCurrentView('portfolio')}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onExploreDemo={scrollToSimulator} />
        <ProductTabs />
        <InteractiveStoreSimulator />
        <ProductBentoGrid />
        <SocialProof />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

export default App;
