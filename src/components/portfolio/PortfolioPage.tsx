import React, { useState } from 'react';
import {
  initialPortfolioConfig,
  initialCollections,
  initialTestimonials,
  initialFaqs,
  PortfolioCollection,
  PortfolioSiteConfig
} from './portfolioData';
import {
  Camera,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Instagram,
  Mail,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Share2,
  Sliders,
  Eye,
  ShieldCheck,
  Send,
  MessageCircle,
  ShoppingBag,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';

interface PortfolioPageProps {
  onBackToHome: () => void;
  onOpenClientGallery?: () => void;
  onOpenStore?: () => void;
  onOpenStudio?: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onBackToHome,
  onOpenClientGallery,
  onOpenStore,
  onOpenStudio
}) => {
  const [config, setConfig] = useState<PortfolioSiteConfig>(initialPortfolioConfig);
  const [collections] = useState<PortfolioCollection[]>(initialCollections);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeStory, setActiveStory] = useState<PortfolioCollection | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    coupleName: '',
    eventType: 'Casamento',
    eventDate: '',
    eventLocation: '',
    whatsapp: '',
    notes: ''
  });

  const filteredCollections = selectedCategory === 'all'
    ? collections
    : collections.filter((c) => c.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'Todas as Histórias' },
    { id: 'casamentos', label: 'Casamentos' },
    { id: 'destination', label: 'Destination & Elopement' },
    { id: 'pre-wedding', label: 'Pré-Wedding' },
    { id: 'familia', label: 'Família & Gestante' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Olá Cadu! Sou ${formData.coupleName || 'Noivo(a)'}. Gostaria de verificar disponibilidade para meu ${formData.eventType} em ${formData.eventDate || 'data a definir'} em ${formData.eventLocation || 'local a definir'}. ${formData.notes ? 'Obs: ' + formData.notes : ''}`
    );
    window.open(`https://wa.me/${config.whatsapp}?text=${text}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-200 selection:text-slate-950">
      {/* 1. TOP CONTROL BAR / SWITCHER */}
      <aside aria-label="Controle de Demonstração" className="sticky top-0 z-50 bg-slate-950 text-white px-4 py-2.5 border-b border-teal-500/30 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
            <span>Voltar à Plataforma</span>
          </button>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">
              Mini-site Autoral de Alto Padrão (Fase 4)
            </span>
            <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full hidden md:inline-block">
              Sincronizado com Galerias
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenClientGallery && (
            <button
              onClick={onOpenClientGallery}
              className="text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Ver Galeria Noiva</span>
            </button>
          )}

          {onOpenStore && (
            <button
              onClick={onOpenStore}
              className="text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Loja & Lab</span>
            </button>
          )}

          <button
            onClick={() => setIsEditorOpen(true)}
            className="text-xs font-bold bg-teal-600 hover:bg-teal-500 text-slate-950 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Modo Editor (Cadu)</span>
          </button>
        </div>
      </aside>

      {/* 2. MINI-SITE BRAND HEADER */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-10 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/cadus-logo.jpg"
                alt="Cadu's Fotos"
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-teal-600/40 shadow-sm"
              />
            </div>
            <div>
              <span className="text-xl font-serif font-black tracking-wider text-slate-950 uppercase block">
                Cadu's Fotos
              </span>
              <span className="text-[10px] tracking-widest uppercase text-teal-700 font-bold block -mt-1">
                Fotografia Autoral & Documental
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-700">
            <a href="#historias" className="hover:text-teal-600 transition-colors">Histórias</a>
            <a href="#sobre" className="hover:text-teal-600 transition-colors">O Fotógrafo</a>
            <a href="#experiencia" className="hover:text-teal-600 transition-colors">Experiência</a>
            <a href="#depoimentos" className="hover:text-teal-600 transition-colors">Depoimentos</a>
            <a href="#faq" className="hover:text-teal-600 transition-colors">Dúvidas</a>
          </nav>

          <a
            href="#orcamento"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all shadow-sm group"
          >
            <Calendar className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
            <span>Verificar Minha Data</span>
          </a>
        </div>
      </header>

      {/* 3. HERO EDITORIAL WITH SIGNATURE ACCENT */}
      <section className="relative bg-slate-950 text-white py-24 sm:py-32 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={config.heroImage}
            alt="Casamento Emocionante"
            className="w-full h-full object-cover object-center opacity-35 scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>São Paulo • Destination Weddings • Brasil & Exterior</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
            {config.tagline}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
            {config.subtagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#historias"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
            >
              <Camera className="w-4 h-4" />
              <span>Explorar Histórias Reais</span>
            </a>

            <a
              href="#orcamento"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>Consultar Minha Data</span>
            </a>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {config.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-serif font-black text-teal-400">{stat.value}</span>
                <span className="text-xs text-slate-300 font-medium uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HISTÓRIAS & PORTFÓLIO (WITH USER'S SIGNATURE TEAL ACCENT BORDER) */}
      <section id="historias" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              Patrimônio Visual & Emoção
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mt-3 mb-4">
              Histórias Que Falam Por Si
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Cada casal é um universo. Veja as galerias selecionadas com conexão profunda, luz cinematográfica e momentos capturados com total discrição.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Collections Grid - CARDS WITH SIGNATURE BORDER-T-4 BORDER-T-TEAL-600 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection) => (
              <article
                key={collection.id}
                onClick={() => setActiveStory(collection)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col cursor-pointer border-t-4 border-t-teal-600"
              >
                {/* Accent Gradient Line */}
                <div className="h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-500" />

                {/* Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={collection.coverImage}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-950/70 backdrop-blur-md text-teal-300 px-3 py-1 rounded-full border border-teal-500/30">
                      {collection.categoryLabel}
                    </span>
                    <span className="text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-900 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <ImageIcon className="w-3 h-3 text-teal-600" />
                      <span>{collection.photosCount} fotos</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-teal-200 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{collection.location}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                      {collection.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{collection.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mb-2">
                      {collection.subtitle}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {collection.story}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-700 group-hover:text-teal-800 flex items-center gap-1">
                      <span>Ver História Completa</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Cadu's Fotos
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOBRE O FOTÓGRAFO (CADU) */}
      <section id="sobre" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Photographer Image with Badge Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
                <img
                  src={config.photographerPhoto}
                  alt={config.photographerName}
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-300 block mb-1">
                    Diretor Criativo & Fotógrafo
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {config.photographerName}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>{config.location}</span>
                  </p>
                </div>
              </div>

              {/* Floating Award Stamp */}
              <div className="absolute -top-4 -right-4 bg-amber-400 text-slate-950 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-white">
                <Award className="w-6 h-6 text-slate-950" />
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider block">Reconhecido</span>
                  <span className="text-xs font-extrabold block">Top 20 Brasil</span>
                </div>
              </div>
            </div>

            {/* Narrative Bio */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Por Trás da Lente
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mt-3 mb-6">
                "Não fotografo aparências. Fotografo a forma como as coisas se sentem."
              </h2>

              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                {config.aboutText.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Awards List */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>Prêmios & Reconhecimento da Crítica</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {config.awards.map((award, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. A EXPERIÊNCIA CADU'S FOTOS */}
      <section id="experiencia" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              Metodologia Exclusiva
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mt-3 mb-4">
              A Experiência Completa do Casal
            </h2>
            <p className="text-slate-600 text-base">
              Do primeiro contato no WhatsApp até a entrega do álbum encadernado na sua casa, cada etapa é desenhada para que você viva o seu dia sem ansiedade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Café & Conexão',
                desc: 'Alinhamos seus gostos musicais, detalhes da família, horários da luz e o ritmo ideal para vocês aproveitarem a festa.'
              },
              {
                step: '02',
                title: 'O Dia Sem Poses Forçadas',
                desc: 'Direção leve e invisível. Registramos os olhares genuínos e o carinho dos seus convidados com total naturalidade.'
              },
              {
                step: '03',
                title: 'Prévias em até 48h',
                desc: 'Receba de 25 a 40 fotos impecavelmente tratadas em 48h para postar nas redes e compartilhar com a família ainda no calor do momento.'
              },
              {
                step: '04',
                title: 'Galeria Musical + Álbum',
                desc: 'Galeria privada com trilha sonora emocional, seleção com corações, loja de quadros e diagramação personalizada do seu álbum.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-t-4 border-t-teal-600 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif font-black text-teal-600/40 block mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-teal-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Garantia de Padrão</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DEPOIMENTOS REAIS DOS NOIVOS */}
      <section id="depoimentos" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              Amor em Palavras
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mt-3 mb-4">
              O Que Dizem Quem Já Confiou Seus Sonhos
            </h2>
            <p className="text-slate-600 text-base">
              A maior honra da minha profissão é ver as lágrimas de alegria e as mensagens carinhosas que recebo após a entrega das galerias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between border-t-4 border-t-teal-600"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-base">★</span>
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <img
                    src={t.photoUrl}
                    alt={t.coupleNames}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-600/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">{t.coupleNames}</h4>
                    <span className="text-[11px] text-teal-700 font-semibold">{t.eventDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ INTERATIVO */}
      <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              Tudo Esclarecido
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mt-3 mb-3">
              Perguntas Frequentes
            </h2>
            <p className="text-slate-600 text-sm">
              Transparência total sobre prazos, equipamentos, viagens e formas de pagamento.
            </p>
          </div>

          <div className="space-y-3">
            {initialFaqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-teal-700 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FORMULÁRIO DE VERIFICAÇÃO DE DATA & ORÇAMENTO */}
      <section id="orcamento" className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/30 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300 bg-teal-500/20 border border-teal-500/40 px-3.5 py-1 rounded-full">
              Agenda 2026 & 2027 Aberta
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 mb-4">
              Vamos Contar a Sua História?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Trabalhamos com número limitado de eventos por mês para garantir dedicação exclusiva. Preencha os detalhes e receba a proposta personalizada no seu WhatsApp.
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  Mensagem Enviada com Sucesso!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                  Seu aplicativo do WhatsApp foi acionado com os dados do seu evento. Se preferir, envie uma mensagem direta agora:
                </p>
                <a
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Conversar Agora no WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Nome do Casal / Solicitante *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Beatriz & Lucas"
                      value={formData.coupleName}
                      onChange={(e) => setFormData({ ...formData, coupleName: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Tipo de Celebração *
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400"
                    >
                      <option value="Casamento Completo">Casamento Completo (Igreja + Festa)</option>
                      <option value="Destination / Praia">Destination / Casamento na Praia</option>
                      <option value="Casamento no Campo">Casamento no Campo / Fazenda</option>
                      <option value="Ensaio Pré-Wedding">Ensaio Pré-Wedding</option>
                      <option value="Ensaio Família / Gestante">Ensaio Família / Gestante</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Data Prevista *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Local / Cidade *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Fazenda Vila Rica, Itatiba - SP"
                      value={formData.eventLocation}
                      onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Seu WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Conte um pouco sobre o sonho de vocês
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Número estimado de convidados, estilo do evento ou detalhes que vocês valorizam nas fotografias..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>Seus dados são 100% confidenciais. Sem spam.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                    <span>Consultar Disponibilidade Agora</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 10. MINI-SITE FOOTER */}
      <footer className="bg-slate-950 border-t border-white/10 text-slate-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/cadus-logo.jpg"
              alt="Cadu's Fotos"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-serif font-bold text-white text-sm">
              Cadu's Fotos • Fotografia de Casamento & Família
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`https://wa.me/${config.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`https://instagram.com/${config.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a
              href={`mailto:${config.email}`}
              className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>

          <div className="text-slate-500">
            Powered by Cadu's Fotos Platform • All rights reserved
          </div>
        </div>
      </footer>

      {/* 11. STORY MODAL (DETAILED ALBUM VIEW) */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 border-t-4 border-t-teal-600 my-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <img
                src={activeStory.coverImage}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 bg-slate-950/70 hover:bg-slate-950 text-white p-2.5 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-300 block mb-1">
                  {activeStory.categoryLabel}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                  {activeStory.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    {activeStory.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    {activeStory.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
                    {activeStory.photosCount} fotos registradas
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
                  A História Desse Dia
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {activeStory.story}
                </p>
              </div>

              {/* Highlights Gallery */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-teal-600" />
                  <span>Destaques da Curadoria do Cadu</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeStory.highlightPhotos.map((photoUrl, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
                      <img
                        src={photoUrl}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action in Modal */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Gostou desse estilo e locação? Fale comigo para planejar o seu!
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveStory(null)}
                    className="px-4 py-2.5 rounded-full border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors w-full sm:w-auto"
                  >
                    Fechar
                  </button>
                  <a
                    href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Olá Cadu! Me apaixonei pelas fotos de ' + activeStory.title + ' em ' + activeStory.location + '. Gostaria de um orçamento no mesmo estilo!')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Quero Fotos Assim</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. EDITOR DRAWER (MODO CONFIGURAÇÃO DO CADU) */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-slate-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-slate-950 text-base">
                    Editor do Mini-Site (Cadu)
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
                Personalize os textos principais do seu site. As alterações refletem imediatamente na prévia em tempo real!
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Nome do Fotógrafo / Estúdio
                  </label>
                  <input
                    type="text"
                    value={config.photographerName}
                    onChange={(e) => setConfig({ ...config, photographerName: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Headline Principal (Hero)
                  </label>
                  <textarea
                    rows={2}
                    value={config.tagline}
                    onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subtítulo do Hero
                  </label>
                  <textarea
                    rows={2}
                    value={config.subtagline}
                    onChange={(e) => setConfig({ ...config, subtagline: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    WhatsApp para Receber Leads
                  </label>
                  <input
                    type="text"
                    value={config.whatsapp}
                    onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Formato DDI + DDD + Número (Ex: 5511987654321)</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Instagram Oficial
                  </label>
                  <input
                    type="text"
                    value={config.instagram}
                    onChange={(e) => setConfig({ ...config, instagram: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email de Contato
                  </label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                onClick={() => setIsEditorOpen(false)}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
              >
                Salvar & Fechar Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
