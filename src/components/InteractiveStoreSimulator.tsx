import React, { useState } from 'react';
import { ShoppingBag, Heart, Check, QrCode, CreditCard, Sparkles, TrendingUp, X, ChevronRight, Eye, ShieldCheck, Printer, Download, Image as ImageIcon } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'Álbum' | 'Quadro' | 'Caixa' | 'Digital';
  clientPrice: number;
  labCost: number;
  description: string;
  image: string;
}

export const InteractiveStoreSimulator: React.FC = () => {
  const [viewMode, setViewMode] = useState<'client' | 'photographer'>('photographer');
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  const [favorites, setFavorites] = useState<number[]>([0, 2]);
  const [cart, setCart] = useState<{ product: ProductItem; photoIndex: number; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const photos = [
    {
      id: 0,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      title: 'A Dança dos Noivos',
      format: 'Vertical'
    },
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      title: 'Entrada Triunfal',
      format: 'Horizontal'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      title: 'Alianças & Promessas',
      format: 'Horizontal'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      title: 'Pôr do Sol no Campo',
      format: 'Horizontal'
    }
  ];

  const products: ProductItem[] = [
    {
      id: 'album-panoramico',
      name: 'Álbum Panorâmico Linho Cru 30x30 (Indimagem)',
      category: 'Álbum',
      clientPrice: 890,
      labCost: 260,
      description: 'Abertura panorâmica 180°, capa dura em tecido linho nobre e 40 páginas em papel fotográfico lustre.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'quadro-fine-art',
      name: 'Quadro Fine Art Moldura Carvalho 60x90 (Digipix)',
      category: 'Quadro',
      clientPrice: 450,
      labCost: 140,
      description: 'Impressão com pigmento mineral qualidade museu, paspatur livre de ácido e moldura em madeira nobre.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'caixa-madeira',
      name: 'Caixa de Memórias com 20 Fotos 15x21',
      category: 'Caixa',
      clientPrice: 240,
      labCost: 75,
      description: 'Caixa de madeira maciça gravada a laser com as fotos favoritas impressas em papel algodão.',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'download-completo',
      name: 'Pacote Digital Completo (4K Sem Marca d’água)',
      category: 'Digital',
      clientPrice: 380,
      labCost: 0,
      description: 'Liberação imediata para download de todas as 250 fotos em resolução original para impressão e arquivo.',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const addToCart = (product: ProductItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.photoIndex === selectedPhoto);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.photoIndex === selectedPhoto
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { product, photoIndex: selectedPhoto, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalClient = cart.reduce((sum, item) => sum + item.product.clientPrice * item.qty, 0);
  const totalLab = cart.reduce((sum, item) => sum + item.product.labCost * item.qty, 0);
  const totalProfit = totalClient - totalLab;

  return (
    <section id="simulador" className="py-24 bg-slate-100/70 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-sky-400/15 via-teal-400/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-brand-mint/15 text-teal-700 dark:text-brand-mint text-xs font-bold mb-4 border border-teal-200 dark:border-brand-mint/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador Interativo da Loja Integrada</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Como funciona a venda de produtos <br />
            <span className="text-gradient">direto na galeria do seu cliente</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg">
            Experimente abaixo a experiência real: seu cliente escolhe a foto favorita e pode encomendar álbuns ou quadros com 1 clique.
          </p>
        </div>

        {/* View Switcher: Visão do Cliente vs Visão do Fotógrafo */}
        <div className="flex items-center justify-center mb-8">
          <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200 dark:border-white/10 shadow-md">
            <button
              onClick={() => setViewMode('client')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'client'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              Visão do Cliente Final
            </button>
            <button
              onClick={() => setViewMode('photographer')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'photographer'
                  ? 'bg-brand-gradient text-slate-950 font-bold shadow-brand-glow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Visão do Fotógrafo (Lucro & Margem)
            </button>
          </div>
        </div>

        {/* Photographer Profit Alert Banner */}
        {viewMode === 'photographer' && (
          <div className="max-w-4xl mx-auto mb-8 p-4 rounded-2xl bg-gradient-to-r from-sky-400/15 via-teal-400/15 to-emerald-400/15 border border-teal-500/30 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-700 dark:text-brand-mint flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Modo Estratégico Ativo</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Você vê o custo do laboratório nacional (Indimagem / Digipix) e quanto lucra líquido sem sair de casa.
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 dark:text-slate-300 font-medium">Margem média praticada:</span>
              <p className="text-lg font-extrabold text-teal-600 dark:text-brand-mint">200% a 350% de Lucro</p>
            </div>
          </div>
        )}

        {/* The Live Interactive Studio Container */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl bg-white dark:bg-slate-900">
          {/* Header of Simulated Client Gallery */}
          <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-brand-mint tracking-widest">
                Galeria Ativa do Casal
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bruna & Eduardo — Casamento na Fazenda</h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCartOpen(true)}
                className="relative px-4 py-2 rounded-xl bg-brand-gradient text-slate-950 font-bold text-xs flex items-center gap-2 shadow-brand-glow hover:opacity-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Carrinho ({cart.reduce((c, i) => c + i.qty, 0)})</span>
                {cart.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-950 text-white text-[10px]">
                    R$ {totalClient}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Main Workspace: Photos on Left / Store Products for Selected Photo on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-white/10">
            {/* Left Gallery (7 cols): Photo Grid with selection */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Clique numa foto para vincular aos produtos da loja:
                </span>
                <span className="text-xs text-sky-600 dark:text-brand-sky font-semibold">
                  {favorites.length} fotos favoritadas
                </span>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 gap-4">
                {photos.map((photo) => {
                  const isSelected = selectedPhoto === photo.id;
                  const isFav = favorites.includes(photo.id);

                  return (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo.id)}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-teal-500 dark:border-brand-mint shadow-brand-glow ring-2 ring-teal-500/30'
                          : 'border-slate-200 dark:border-white/10 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Favorite Button Overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(photo.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                          isFav
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-950/60 text-white/80 hover:text-white hover:bg-slate-950'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-teal-500 dark:bg-brand-mint text-slate-950 text-[10px] font-bold shadow-md flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Foto Selecionada
                        </div>
                      )}

                      {/* Title Bar */}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent">
                        <p className="text-xs font-semibold text-white truncate">{photo.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Selected Photo Detail Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 flex items-center gap-4">
                <img
                  src={photos[selectedPhoto].url}
                  alt="Selected"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-white/10"
                />
                <div className="flex-1">
                  <div className="text-xs text-teal-700 dark:text-brand-mint font-bold">Foto Atual em Destaque</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{photos[selectedPhoto].title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Ao adicionar qualquer produto ao lado, esta foto será aplicada na maquete de impressão.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Products Shelf (5 cols): Aggregated Products for Sale */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/70 dark:bg-slate-950/40 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                  Produtos Disponíveis nesta Galeria
                </h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Entrega Nacional</span>
              </div>

              {/* Products List */}
              <div className="space-y-3.5">
                {products.map((prod) => {
                  const profit = prod.clientPrice - prod.labCost;
                  const profitMargin = Math.round((profit / prod.clientPrice) * 100);

                  return (
                    <div
                      key={prod.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-teal-500/40 transition-all duration-300 group shadow-sm"
                    >
                      <div className="flex gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-white/5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-brand-mint transition-colors truncate">
                              {prod.name}
                            </h5>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                            {prod.description}
                          </p>

                          {/* Pricing Display depending on Mode */}
                          <div className="mt-2 flex items-center justify-between">
                            {viewMode === 'client' ? (
                              <div>
                                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                                  R$ {prod.clientPrice.toFixed(2)}
                                </span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-1">à vista ou 12x</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div>
                                  <span className="text-xs font-bold text-teal-600 dark:text-brand-mint">
                                    Lucro: +R$ {profit.toFixed(2)}
                                  </span>
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-0.5">
                                    Venda R$ {prod.clientPrice} | Custo R$ {prod.labCost} ({profitMargin}% margem)
                                  </span>
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => addToCart(prod)}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-500 dark:bg-white/10 dark:hover:bg-brand-mint hover:text-slate-950 text-slate-800 dark:text-white font-semibold text-xs transition-colors flex items-center gap-1"
                            >
                              Adicionar
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Simulated Cart Modal */}
        {cartOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-white/15 p-6 shadow-2xl relative bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              <button
                onClick={() => setCartOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {!checkoutSuccess ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ShoppingBag className="w-5 h-5 text-teal-600 dark:text-brand-mint" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Carrinho da Galeria</h3>
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                      Seu carrinho está vazio. Adicione um álbum ou quadro para testar!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                        {cart.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={photos[item.photoIndex].url}
                                alt="Thumb"
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                                  {item.product.name}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                  Foto: {photos[item.photoIndex].title} (Qtd: {item.qty})
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-bold text-teal-600 dark:text-brand-mint">
                                R$ {(item.product.clientPrice * item.qty).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeFromCart(idx)}
                                className="text-[10px] text-rose-500 hover:underline"
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Profit Breakdown */}
                      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-teal-500/20 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-700 dark:text-slate-300">
                          <span>Subtotal do Cliente:</span>
                          <span className="font-bold text-slate-900 dark:text-white">R$ {totalClient.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 dark:text-slate-400">
                          <span>Custo de Impressão (Laboratório):</span>
                          <span>- R$ {totalLab.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-white/10 text-teal-600 dark:text-brand-mint font-bold text-sm">
                          <span>Lucro Líquido do Fotógrafo:</span>
                          <span>+ R$ {totalProfit.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Payment Options */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-teal-500/40 flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">PIX Instantâneo</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Aprovação em 5s</p>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-sky-600 dark:text-brand-sky" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">Cartão até 12x</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Sem burocracia</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setCheckoutSuccess(true)}
                        className="w-full py-3.5 rounded-xl bg-brand-gradient text-slate-950 font-bold text-sm uppercase tracking-wider shadow-brand-glow hover:opacity-95 flex items-center justify-center gap-2"
                      >
                        Simular Checkout com PIX
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pagamento PIX Aprovado!</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Na plataforma real, o pedido é enviado diretamente para a gráfica parceira (Indimagem ou Digipix Pro) encadernar e despachar no endereço do cliente.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs text-left space-y-1">
                    <p className="text-teal-700 dark:text-brand-mint font-semibold">✓ WhatsApp disparado para o cliente com código de rastreio</p>
                    <p className="text-sky-700 dark:text-brand-sky font-semibold">✓ R$ {totalProfit.toFixed(2)} depositado na conta do fotógrafo</p>
                    <p className="text-slate-500 dark:text-slate-400 font-semibold">✓ Sem necessidade de empacotar ou ir aos Correios</p>
                  </div>
                  <button
                    onClick={() => {
                      setCheckoutSuccess(false);
                      setCartOpen(false);
                      setCart([]);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-semibold"
                  >
                    Fechar Simulação
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
