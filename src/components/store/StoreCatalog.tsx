import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Eye, Layers, ShieldCheck, Truck, ChevronRight, Check, Heart, Award, Gift, Wand2 } from 'lucide-react';
import { StoreProduct, storeProducts, labPartners } from './storeData';
import { GalleryPhoto } from '../gallery/galleryData';

interface StoreCatalogProps {
  photos: GalleryPhoto[];
  onSelectProduct: (product: StoreProduct, photo: GalleryPhoto) => void;
  onOpenCart: () => void;
  cartCount: number;
  onOpenAiCurator?: () => void;
  onOpenGiftRegistry?: () => void;
}

export const StoreCatalog: React.FC<StoreCatalogProps> = ({
  photos,
  onSelectProduct,
  onOpenCart,
  cartCount,
  onOpenAiCurator,
  onOpenGiftRegistry,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto>(
    photos.find(p => p.isFavorite) || photos[0]
  );

  const categories = [
    { id: 'todos', label: 'Todos os Produtos' },
    { id: 'albuns', label: 'Álbuns Panorâmicos 180°' },
    { id: 'quadros', label: 'Quadros Fine Art & Telas' },
    { id: 'caixas', label: 'Caixas de Memórias' },
    { id: 'revelacoes', label: 'Impressões Avulsas' },
    { id: 'digitais', label: 'Downloads em Alta' },
  ];

  const filteredProducts = storeProducts.filter(p => {
    if (activeCategory === 'todos') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner: Parceiros Nacionais Homologados */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white border border-white/10 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/20 border border-brand-mint/30 text-brand-mint text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Laboratórios Homologados Cadu's Fotos
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Impressões Fine Art e Encadernação de Luxo 100% Nacional
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Integrado diretamente com a <b>Indimagem</b> (Caxias do Sul/RS) para álbuns 180° de alta costura e <b>Digipix Pro</b> (Barueri/SP) para quadros com vidro antirreflexo e molduras nobres. Sem surpresas com taxas de importação e com frete expresso via Jadlog/Sedex para todo o Brasil.
            </p>
          </div>

          {/* Quick Partner Cards */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto flex-shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] font-bold text-brand-mint uppercase tracking-wider mb-1">
                Indimagem Álbuns
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Layflat 180° • Linho & Couro
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Produção em Caxias do Sul - RS
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                Digipix Pro Fine Art
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Papéis 100% Algodão & Quadros
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Produção em Alphaville - SP
              </div>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Selected Photo Strip: Apply bride's photo to all mockups live */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Personalize os produtos com uma foto da sua galeria:
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Foto ativa no mockup: <b>{selectedPhoto.filename}</b>
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {photos.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPhoto(p)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all group ${
                selectedPhoto.id === p.id
                  ? 'border-teal-500 dark:border-brand-mint ring-2 ring-teal-500/30 scale-105 shadow-md'
                  : 'border-transparent opacity-75 hover:opacity-100 hover:scale-100'
              }`}
            >
              <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
              {p.isFavorite && (
                <div className="absolute top-1 right-1 p-0.5 rounded-full bg-rose-500 text-white">
                  <Heart className="w-2.5 h-2.5 fill-current" />
                </div>
              )}
              {selectedPhoto.id === p.id && (
                <div className="absolute inset-0 bg-teal-600/25 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white drop-shadow" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs & Quick Features */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold shadow-brand-glow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Feature Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {onOpenAiCurator && (
            <button
              onClick={onOpenAiCurator}
              className="px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-brand-mint/15 text-teal-700 dark:text-brand-mint border border-teal-200 dark:border-brand-mint/30 text-xs font-bold flex items-center gap-1.5 hover:bg-teal-100 dark:hover:bg-brand-mint/25 transition-all shadow-sm"
              title="A IA analisa as fotos e sugere a moldura e diagramação perfeita"
            >
              <Wand2 className="w-3.5 h-3.5 text-teal-600 dark:text-brand-mint" />
              <span>✨ Sugestão por IA</span>
            </button>
          )}

          {onOpenGiftRegistry && (
            <button
              onClick={onOpenGiftRegistry}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-teal-500/10 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all shadow-sm"
              title="Permita que padrinhos e convidados comprem cotas do álbum ou réplicas para os pais"
            >
              <Gift className="w-3.5 h-3.5 text-rose-500" />
              <span>🎁 Cotas de Presente</span>
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map(product => {
          const lab = labPartners[product.labId];
          const hasRoomView = product.category === 'quadros';
          const has180Spread = product.category === 'albuns';

          return (
            <div
              key={product.id}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:border-teal-500/40"
            >
              {/* Product Card Image Container */}
              <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-950 overflow-hidden flex items-center justify-center p-4">
                {/* Dynamic Mockup Image with Bride's Photo */}
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md transform transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={selectedPhoto.url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle mockup frame overlay */}
                  {product.category === 'quadros' && (
                    <div className="absolute inset-0 border-8 border-[#C8A97E] pointer-events-none shadow-inner" />
                  )}
                  {product.category === 'albuns' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none flex items-center justify-center">
                      <span className="text-white font-serif text-xs font-bold tracking-widest uppercase drop-shadow">
                        Isabela & Rodrigo
                      </span>
                    </div>
                  )}
                </div>

                {/* Lab Badge Overlay */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-brand-mint" />
                  <span>{lab.name.split(' ')[0]}</span>
                </div>

                {/* Feature Tags */}
                {hasRoomView && (
                  <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-teal-900/80 backdrop-blur-md border border-teal-400/30 text-teal-200 text-[10px] font-semibold flex items-center gap-1">
                    <Eye className="w-3 h-3 text-brand-mint" />
                    <span>Room View Disponível</span>
                  </div>
                )}
                {has180Spread && (
                  <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-teal-900/80 backdrop-blur-md border border-teal-400/30 text-teal-200 text-[10px] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-mint" />
                    <span>Abertura 180° Layflat</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-teal-600 dark:text-brand-mint uppercase tracking-wider text-[10px]">
                      {product.categoryLabel}
                    </span>
                    <span>{product.sizes.length} opções de tamanho</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-brand-mint transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="mt-3 space-y-1">
                    {product.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-teal-500 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                      A partir de:
                    </span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      R$ {product.basePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product, selectedPhoto)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-600 dark:hover:bg-brand-mint transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Personalizar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
