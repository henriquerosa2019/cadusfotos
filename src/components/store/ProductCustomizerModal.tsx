import React, { useState } from 'react';
import { X, Check, ShoppingBag, Eye, Maximize2, Sparkles, Layers, Sliders, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { StoreProduct, CartItem, labPartners } from './storeData';
import { GalleryPhoto } from '../gallery/galleryData';

interface ProductCustomizerModalProps {
  product: StoreProduct;
  initialPhoto: GalleryPhoto;
  allPhotos: GalleryPhoto[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  product,
  initialPhoto,
  allPhotos,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto>(initialPhoto);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(
    product.materials?.choices[0] || undefined
  );
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes?.choices[0] || undefined
  );
  const [customText, setCustomText] = useState('Isabela & Rodrigo • 2026');
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'product' | 'room' | 'album-spread'>('product');
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);

  if (!isOpen) return null;

  const lab = labPartners[product.labId];

  // Calculate dynamic price & lab cost
  const calculatedUnitPrice =
    selectedSize.price +
    (selectedMaterial?.priceModifier || 0) +
    (selectedFinish?.priceModifier || 0);

  const calculatedLabCost =
    selectedSize.labCost +
    (selectedMaterial?.costModifier || 0) +
    (selectedFinish?.costModifier || 0);

  const photographerMargin = calculatedUnitPrice - calculatedLabCost;
  const markupPercentage = calculatedLabCost > 0 ? Math.round((photographerMargin / calculatedLabCost) * 100) : 100;

  const handleConfirmAddToCart = () => {
    const item: CartItem = {
      cartId: 'item_' + Date.now(),
      product,
      selectedPhotoUrl: selectedPhoto.url,
      selectedPhotoFilename: selectedPhoto.filename,
      selectedSize,
      selectedMaterial,
      selectedFinish,
      customText: product.category === 'albuns' || product.category === 'caixas' ? customText : undefined,
      quantity,
      unitPrice: calculatedUnitPrice,
      unitLabCost: calculatedLabCost,
    };
    onAddToCart(item);
    onClose();
  };

  // Determine frame border styling based on selected material
  const getFrameStyle = () => {
    const matId = selectedMaterial?.id || 'carvalho-natural';
    switch (matId) {
      case 'carvalho-natural':
        return { border: '16px solid #C8A97E', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)' };
      case 'preto-fosco':
        return { border: '16px solid #1A1A1A', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.55)' };
      case 'branco-acetinado':
        return { border: '16px solid #F5F5F5', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)' };
      case 'filete-champagne':
        return { border: '14px solid #D4AF37', boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.25)' };
      default:
        return { border: '16px solid #222', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' };
    }
  };

  // Determine cover color for album mockup
  const getAlbumCoverColor = () => {
    return selectedMaterial?.previewColor || '#E6DFD5';
  };

  // Dynamic Album sizing and photo aspect ratio based on selected size
  const getAlbumDimensions = () => {
    switch (selectedSize.id) {
      case '20x30': // Vertical / Retrato
        return {
          containerClass: 'w-52 sm:w-64 aspect-[2/3]',
          photoClass: 'w-32 h-44 aspect-[2/3]',
          label: '20x30 cm Fechado • Retrato Vertical',
          ratioDesc: 'Proporção 2:3 vertical clássica',
          openDimensions: '20x60 cm aberto',
        };
      case '30x30': // Quadrado Perfeito
        return {
          containerClass: 'w-64 sm:w-80 aspect-square',
          photoClass: 'w-40 h-40 aspect-square',
          label: '30x30 cm Fechado • Quadrado Simétrico',
          ratioDesc: 'Proporção 1:1 quadrada balanceada',
          openDimensions: '30x60 cm aberto',
        };
      case '30x42': // Panorâmico Paisagem
        return {
          containerClass: 'w-72 sm:w-[380px] aspect-[4/3]',
          photoClass: 'w-48 h-32 aspect-[3/2]',
          label: '30x42 cm Fechado • Panorâmico Master',
          ratioDesc: 'Proporção 4:3 paisagem cinematográfica ampla',
          openDimensions: '30x84 cm aberto',
        };
      default:
        return {
          containerClass: 'w-64 sm:w-80 aspect-[4/5]',
          photoClass: 'w-36 h-36 aspect-square',
          label: selectedSize.label,
          ratioDesc: selectedSize.dimensions,
          openDimensions: 'Abertura 180°',
        };
    }
  };

  // Dynamic 180° Layflat open spread sizing
  const getAlbumSpreadAspect = () => {
    switch (selectedSize.id) {
      case '20x30':
        return 'aspect-[3/1] max-w-2xl'; // 20x60
      case '30x30':
        return 'aspect-[2/1] max-w-xl';  // 30x60
      case '30x42':
        return 'aspect-[2.8/1] max-w-2xl'; // 30x84
      default:
        return 'aspect-[16/9] max-w-xl';
    }
  };

  // Dynamic Quadro Fine Art sizing & aspect ratio
  const getQuadroDimensions = () => {
    switch (selectedSize.id) {
      case '30x40':
        return {
          containerClass: 'w-56 sm:w-64 aspect-[3/4]',
          label: '30x40 cm (Proporção 3:4 Vertical)',
        };
      case '50x70':
        return {
          containerClass: 'w-64 sm:w-76 aspect-[5/7]',
          label: '50x70 cm (Proporção 5:7 Sala)',
        };
      case '60x90':
        return {
          containerClass: 'w-72 sm:w-88 aspect-[2/3]',
          label: '60x90 cm (Proporção 2:3 Grande Formato)',
        };
      default:
        return {
          containerClass: 'w-64 sm:w-80 aspect-[3/4]',
          label: selectedSize.label,
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 dark:bg-brand-mint/20 text-teal-800 dark:text-brand-mint border border-teal-200 dark:border-brand-mint/30">
              {product.categoryLabel}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Truck className="w-3.5 h-3.5 text-teal-500" />
              Produzido por <b>{lab.name.split(' ')[0]}</b> • {lab.turnaroundDays}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Column 1: Live Interactive Mockup View (7 cols) */}
          <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden min-h-[380px] lg:min-h-[500px]">
            {/* View Switcher Tabs (For Quadros: Product vs Room View / For Albuns: Capa vs 180° Spread) */}
            <div className="w-full flex items-center justify-between z-10 mb-4">
              <div className="inline-flex p-1 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-xs font-semibold shadow-sm">
                <button
                  onClick={() => setViewMode('product')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'product'
                      ? 'bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {product.category === 'albuns' ? 'Capa Fechada' : 'Visualização do Produto'}
                </button>

                {product.category === 'quadros' && (
                  <button
                    onClick={() => setViewMode('room')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      viewMode === 'room'
                        ? 'bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver na Parede (Room View)</span>
                  </button>
                )}

                {product.category === 'albuns' && (
                  <button
                    onClick={() => setViewMode('album-spread')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      viewMode === 'album-spread'
                        ? 'bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Abertura 180° Layflat</span>
                  </button>
                )}
              </div>

              {/* Photo Switcher Trigger */}
              <button
                onClick={() => setPhotoPickerOpen(!photoPickerOpen)}
                className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-brand-mint transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Layers className="w-3.5 h-3.5 text-teal-500" />
                <span>Trocar Foto ({selectedPhoto.filename})</span>
              </button>
            </div>

            {/* Photo Picker Drawer (when open) */}
            {photoPickerOpen && (
              <div className="absolute top-16 inset-x-6 z-30 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 shadow-2xl animate-fade-in max-h-64 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Selecione uma foto da galeria para simular:
                  </span>
                  <button
                    onClick={() => setPhotoPickerOpen(false)}
                    className="text-xs font-semibold text-teal-600 dark:text-brand-mint"
                  >
                    Fechar
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {allPhotos.map(photo => (
                    <button
                      key={photo.id}
                      onClick={() => {
                        setSelectedPhoto(photo);
                        setPhotoPickerOpen(false);
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedPhoto.id === photo.id
                          ? 'border-brand-mint scale-105 shadow-md'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                      {selectedPhoto.id === photo.id && (
                        <div className="absolute inset-0 bg-teal-500/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MOCKUP CONTAINER */}
            <div className="flex-1 w-full flex items-center justify-center relative py-4">
              {/* 1. ROOM VIEW MOCKUP (Living room background with frame on wall) */}
              {viewMode === 'room' && (
                <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-slate-800">
                  {/* Living room aesthetic background */}
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                    alt="Ambiente Sala Moderna"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Frame scaled according to size */}
                  <div
                    className={`relative z-10 transition-all duration-500 transform hover:scale-105 ${
                      selectedSize.id === '30x40'
                        ? 'w-32 h-44 sm:w-36 sm:h-48'
                        : selectedSize.id === '50x70'
                        ? 'w-44 h-60 sm:w-52 sm:h-72'
                        : 'w-56 h-76 sm:w-64 sm:h-88'
                    }`}
                    style={getFrameStyle()}
                  >
                    {/* Paspatur (white border) */}
                    <div className="w-full h-full p-2 bg-white flex items-center justify-center">
                      <img
                        src={selectedPhoto.url}
                        alt="Foto no Quadro"
                        className="w-full h-full object-cover shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Room Scale Badge */}
                  <div className="absolute bottom-3 left-4 z-20 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-brand-mint" />
                    <span>Escala Real: <b>{selectedSize.dimensions}</b> em sala de estar</span>
                  </div>
                </div>
              )}

              {/* 2. ALBUM 180° SPREAD (Open panoramic spread) */}
              {viewMode === 'album-spread' && (
                <div className={`relative w-full ${getAlbumSpreadAspect()} rounded-2xl p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl transition-all duration-500`}>
                  {/* Book Spread */}
                  <div className="relative w-full h-full bg-white rounded-lg shadow-2xl flex overflow-hidden border border-slate-300">
                    {/* Left Page */}
                    <div className="w-1/2 h-full overflow-hidden relative border-r border-slate-300/60 shadow-[inset_-10px_0_15px_rgba(0,0,0,0.1)]">
                      <img
                        src={selectedPhoto.url}
                        alt="Página Esquerda"
                        className="w-[200%] max-w-none h-full object-cover object-left transition-all duration-500"
                      />
                    </div>
                    {/* Right Page (Seamless panorama continuation!) */}
                    <div className="w-1/2 h-full overflow-hidden relative shadow-[inset_10px_0_15px_rgba(0,0,0,0.1)]">
                      <img
                        src={selectedPhoto.url}
                        alt="Página Direita"
                        className="w-[200%] max-w-none h-full object-cover object-right -ml-[100%] transition-all duration-500"
                      />
                    </div>

                    {/* Central 180° Layflat subtle line */}
                    <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-900/10 shadow-sm" />
                  </div>

                  {/* 180° Layflat Pill with dynamic open spread dimension */}
                  <div className="absolute bottom-2 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-mint" />
                    <span>Lâmina Dupla 180° Layflat ({getAlbumDimensions().openDimensions}) sem perda no vinco</span>
                  </div>
                </div>
              )}

              {/* 3. STANDARD PRODUCT MOCKUP */}
              {viewMode === 'product' && (
                <div className="relative flex items-center justify-center w-full min-h-[320px] py-4">
                  {product.category === 'albuns' ? (
                    // Closed Album Mockup with Linen/Leather cover & Engraving - DYNAMICALLY SIZED!
                    (() => {
                      const albumDim = getAlbumDimensions();
                      return (
                        <div
                          className={`relative ${albumDim.containerClass} rounded-2xl shadow-2xl border border-black/20 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 transform hover:rotate-1`}
                          style={{
                            backgroundColor: getAlbumCoverColor(),
                            boxShadow: '15px 25px 50px -10px rgba(0,0,0,0.4), inset -8px 0 16px rgba(0,0,0,0.15)',
                          }}
                        >
                          {/* Spine Crease */}
                          <div className="absolute inset-y-0 left-6 w-[2px] bg-black/10 shadow-sm" />

                          {/* Dynamic Photo Inset on Cover responding to selected size */}
                          <div className={`${albumDim.photoClass} rounded-lg overflow-hidden shadow-lg border-2 border-white/90 mb-4 transition-all duration-500 transform -rotate-1 relative group`}>
                            <img src={selectedPhoto.url} alt="Capa" className="w-full h-full object-cover transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />
                          </div>

                          {/* Gold Stamping Inscription */}
                          <div className="space-y-1 transition-all duration-300 max-w-[90%]">
                            <p
                              className="font-serif text-base sm:text-lg font-bold tracking-wider uppercase text-amber-800/90 dark:text-amber-200 truncate"
                              style={{
                                textShadow: '0 1px 1px rgba(255,255,255,0.4)',
                              }}
                            >
                              {customText || 'Isabela & Rodrigo'}
                            </p>
                            <p className="text-[10px] tracking-widest text-amber-900/70 uppercase truncate">
                              Encadernação Indimagem • {albumDim.label}
                            </p>
                          </div>

                          {/* Dynamic Size Indicator Badge */}
                          <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-slate-950/90 text-brand-mint text-[10px] font-bold tracking-wider uppercase border border-brand-mint/40 shadow-lg flex items-center gap-1.5 transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
                            <span>{albumDim.ratioDesc}</span>
                          </div>
                        </div>
                      );
                    })()
                  ) : product.category === 'quadros' ? (
                    // Framed Photo Mockup - DYNAMICALLY SIZED!
                    (() => {
                      const quadroDim = getQuadroDimensions();
                      return (
                        <div
                          className={`relative ${quadroDim.containerClass} transition-all duration-500`}
                          style={getFrameStyle()}
                        >
                          <div className="w-full h-full p-3 bg-white flex items-center justify-center">
                            <img
                              src={selectedPhoto.url}
                              alt={selectedPhoto.title}
                              className="w-full h-full object-cover shadow-inner transition-all duration-500"
                            />
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-950/90 text-white text-[10px] font-bold tracking-wider uppercase border border-white/20 shadow-md whitespace-nowrap">
                            {quadroDim.label}
                          </div>
                        </div>
                      );
                    })()
                  ) : product.category === 'caixas' ? (
                    // Wooden Box Mockup
                    <div className="relative w-72 sm:w-96 aspect-[16/10] bg-[#C19A6B] rounded-2xl shadow-2xl p-6 border-4 border-[#8B5A2B]/40 flex items-center justify-between transition-all duration-500">
                      {/* Left: Prints stack inside box */}
                      <div className="w-1/2 h-full bg-white rounded-lg shadow-md p-1 border border-slate-200 transform -rotate-2 overflow-hidden">
                        <img src={selectedPhoto.url} alt="Fotos da caixa" className="w-full h-full object-cover" />
                      </div>
                      {/* Right: Wood USB Flash Drive */}
                      <div className="w-1/3 flex flex-col items-center justify-center space-y-2">
                        <div className="w-16 h-8 bg-[#A0522D] rounded-md shadow-md border border-black/20 flex items-center justify-center text-[10px] text-white font-mono font-bold tracking-wider">
                          32GB
                        </div>
                        <span className="text-[10px] text-amber-950 font-semibold text-center leading-tight">
                          Pen Drive Madeira Carvalho
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Print Stacks / Digital
                    <div className="relative w-64 sm:w-80 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 transition-all duration-500">
                      <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-semibold">
                          {product.title} • {selectedPhoto.filename}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Photo Caption with Size Details */}
            <div className="w-full text-center text-xs text-slate-500 dark:text-slate-400 mt-3 flex items-center justify-center gap-2 flex-wrap">
              <span>Foto: <span className="font-semibold text-slate-900 dark:text-slate-200">{selectedPhoto.filename}</span></span>
              <span>•</span>
              <span className="text-teal-600 dark:text-brand-mint font-semibold">Tamanho ativo no mockup: {selectedSize.label} ({selectedSize.dimensions})</span>
            </div>
          </div>

          {/* Column 2: Configuration & Pricing Options (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Product Header */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Lab Guaranteed Tag */}
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-slate-800/80 border border-teal-200 dark:border-brand-mint/20 mb-5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                  <span className="text-slate-700 dark:text-slate-200">
                    Laboratório: <b>{lab.name}</b>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-teal-700 dark:text-brand-mint uppercase bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full">
                  100% Calibrado
                </span>
              </div>

              {/* 1. Size Selection */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Escolha o Tamanho:</span>
                  <span className="text-teal-600 dark:text-brand-mint font-normal">{selectedSize.dimensions}</span>
                </label>
                <div className="space-y-1.5">
                  {product.sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                        selectedSize.id === size.id
                          ? 'border-teal-500 bg-teal-50/70 dark:bg-brand-mint/10 dark:border-brand-mint font-semibold text-slate-900 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedSize.id === size.id ? 'border-teal-500 bg-teal-500 dark:bg-brand-mint' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {selectedSize.id === size.id && <Check className="w-3 h-3 text-white dark:text-slate-950" />}
                        </div>
                        <span>{size.label}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        R$ {size.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Material / Frame / Cover Selection */}
              {product.materials && (
                <div className="space-y-2 mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {product.materials.name}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.materials.choices.map(choice => (
                      <button
                        key={choice.id}
                        onClick={() => setSelectedMaterial(choice)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 text-xs transition-all ${
                          selectedMaterial?.id === choice.id
                            ? 'border-teal-500 bg-teal-50/60 dark:bg-brand-mint/10 dark:border-brand-mint font-semibold text-slate-900 dark:text-white'
                            : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {choice.previewColor && (
                          <span
                            className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0"
                            style={{ backgroundColor: choice.previewColor }}
                          />
                        )}
                        <span className="truncate">{choice.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Finishes / Paper Selection */}
              {product.finishes && (
                <div className="space-y-2 mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {product.finishes.name}
                  </label>
                  <div className="space-y-1.5">
                    {product.finishes.choices.map(finish => (
                      <button
                        key={finish.id}
                        onClick={() => setSelectedFinish(finish)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                          selectedFinish?.id === finish.id
                            ? 'border-teal-500 bg-teal-50/60 dark:bg-brand-mint/10 dark:border-brand-mint font-semibold text-slate-900 dark:text-white'
                            : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span>{finish.name}</span>
                        {finish.priceModifier > 0 && (
                          <span className="text-[11px] text-teal-600 dark:text-brand-mint font-bold">
                            + R$ {finish.priceModifier.toFixed(2)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Custom Text (for Albums and Memory Boxes) */}
              {(product.category === 'albuns' || product.category === 'caixas') && (
                <div className="space-y-1.5 mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Gravação Personalizada na Capa:</span>
                    <span className="text-[10px] text-slate-400">Incluso</span>
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    placeholder="Ex: Isabela & Rodrigo • 24.10.2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}
            </div>

            {/* Price Breakdown, Quantity & Add to Cart */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
              {/* Back-office Profit Snapshot (Exclusive Cadu's Fotos feature) */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">
                    Custo Gráfico de Produção ({lab.name.split(' ')[0]}):
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    R$ {calculatedLabCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 block">
                    Seu Lucro Líquido (+{markupPercentage}%):
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    R$ {photographerMargin.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Quantity and Final CTA Button */}
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-slate-800 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleConfirmAddToCart}
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-brand-glow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Adicionar ao Carrinho • R$ {(calculatedUnitPrice * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
