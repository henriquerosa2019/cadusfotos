import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Sliders,
  Package,
  Layers,
  Sparkles,
  ShieldCheck,
  Truck,
  DollarSign,
  Eye,
  Camera,
} from 'lucide-react';
import { initialPhotos, GalleryPhoto } from '../gallery/galleryData';
import {
  storeProducts,
  StoreProduct,
  CartItem,
  StoreOrder,
  initialOrders,
  labPartners,
} from './storeData';
import { AddressInfo } from './shippingCalculator';
import { StoreCatalog } from './StoreCatalog';
import { ProductCustomizerModal } from './ProductCustomizerModal';
import { StoreCartDrawer } from './StoreCartDrawer';
import { StoreCheckoutModal } from './StoreCheckoutModal';
import { PhotographerOrdersManager } from './PhotographerOrdersManager';
import { PhotographerStoreSettings } from './PhotographerStoreSettings';
import { StoreGiftRegistry } from './StoreGiftRegistry';
import { SmartAiRecommenderModal } from './SmartAiRecommenderModal';
import { AiDecorRecommendation } from './storeData';
import { Gift, Wand2 } from 'lucide-react';

interface StoreLabPageProps {
  onBackToHome: () => void;
  onOpenGallery?: () => void;
  initialSelectedProduct?: StoreProduct;
  initialSelectedPhoto?: GalleryPhoto;
}

export const StoreLabPage: React.FC<StoreLabPageProps> = ({
  onBackToHome,
  onOpenGallery,
  initialSelectedProduct,
  initialSelectedPhoto,
}) => {
  // Navigation / View mode: 'client' vs 'manager'
  const [currentMode, setCurrentMode] = useState<'client' | 'manager'>('client');
  const [managerSubTab, setManagerSubTab] = useState<'orders' | 'settings'>('orders');
  const [clientSubTab, setClientSubTab] = useState<'catalog' | 'gifts'>('catalog');
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartId: 'default_item_1',
      product: storeProducts[0], // Álbum 180 Indimagem
      selectedPhotoUrl: initialPhotos[1].url,
      selectedPhotoFilename: initialPhotos[1].filename,
      selectedSize: storeProducts[0].sizes[1],
      selectedMaterial: storeProducts[0].materials?.choices[0],
      selectedFinish: storeProducts[0].finishes?.choices[0],
      customText: 'Isabela & Rodrigo • 24.10.2026',
      quantity: 1,
      unitPrice: 1450,
      unitLabCost: 390,
    },
  ]);

  const [orders, setOrders] = useState<StoreOrder[]>(initialOrders);

  // Modals state
  const [customizerProduct, setCustomizerProduct] = useState<StoreProduct | null>(
    initialSelectedProduct || null
  );
  const [customizerPhoto, setCustomizerPhoto] = useState<GalleryPhoto>(
    initialSelectedPhoto || initialPhotos[1]
  );
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutShippingMethod, setCheckoutShippingMethod] = useState<string>('Jadlog .Package Pro');
  const [checkoutShippingCost, setCheckoutShippingCost] = useState<number>(21.9);
  const [checkoutAddress, setCheckoutAddress] = useState<AddressInfo | undefined>();

  // Handlers
  const handleOpenCustomizer = (product: StoreProduct, photo: GalleryPhoto) => {
    setCustomizerProduct(product);
    setCustomizerPhoto(photo);
  };

  const handleSelectAiRecommendation = (rec: AiDecorRecommendation) => {
    const photo = initialPhotos.find(p => p.id === rec.photoId) || initialPhotos[0];
    const prod = rec.type === 'album-spread'
      ? storeProducts[0]
      : rec.type === 'canvas'
      ? storeProducts[2]
      : storeProducts[1];
    handleOpenCustomizer(prod, photo);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [item, ...prev]);
    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleProceedToCheckout = (
    shippingMethod: string,
    shippingCost: number,
    addressDetails?: AddressInfo
  ) => {
    setCheckoutShippingMethod(shippingMethod);
    setCheckoutShippingCost(shippingCost);
    if (addressDetails) {
      setCheckoutAddress(addressDetails);
    }
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleOrderCompleted = (newOrder: StoreOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]); // Clear cart
  };

  const handleUpdateOrderStatus = (orderNumber: string, newStatus: StoreOrder['labStatus']) => {
    setOrders(prev =>
      prev.map(o => (o.orderNumber === orderNumber ? { ...o, labStatus: newStatus } : o))
    );
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Floating Control Ribbon: Mode Switcher & Return */}
      <header className="sticky top-0 z-40 bg-slate-900/95 text-white backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              title="Voltar à Página Principal"
            >
              <img
                src="/cadus-logo.jpg"
                alt="Cadu's Foto"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-amber-400/80 shadow-sm"
              />
              <span className="text-xs font-bold text-white hidden sm:inline">
                Cadu's <span className="text-teal-400">Fotos</span>
              </span>
            </button>
            <span className="text-white/20 hidden sm:inline">|</span>
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Início</span>
            </button>

            {onOpenGallery && (
              <button
                onClick={onOpenGallery}
                className="text-xs font-semibold text-teal-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Galeria do Cliente</span>
              </button>
            )}
          </div>

          {/* Mode Switcher Pill */}
          <div className="inline-flex p-1 rounded-full bg-slate-800/80 border border-white/10 text-xs">
            <button
              onClick={() => setCurrentMode('client')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all ${
                currentMode === 'client'
                  ? 'bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Visão da Noiva (Loja Integrada)</span>
            </button>

            <button
              onClick={() => setCurrentMode('manager')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all ${
                currentMode === 'manager'
                  ? 'bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Painel do Fotógrafo (Vendas & Labs)</span>
            </button>
          </div>

          {/* Floating Cart Button */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="relative p-2 rounded-xl bg-teal-500/20 text-brand-mint border border-teal-500/30 hover:bg-teal-500/30 transition-colors flex items-center gap-2 text-xs font-bold"
          >
            <ShoppingBag className="w-4 h-4 text-brand-mint" />
            <span className="hidden sm:inline">Carrinho</span>
            {totalCartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full">
        {currentMode === 'client' ? (
          /* CLIENT STOREFRONT */
          <div className="space-y-6">
            {/* Client Sub-tab Switcher: Loja vs Lista de Presentes */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setClientSubTab('catalog')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    clientSubTab === 'catalog'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Catálogo de Produtos</span>
                </button>

                <button
                  onClick={() => setClientSubTab('gifts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    clientSubTab === 'gifts'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Gift className="w-4 h-4 text-rose-500" />
                  <span>🎁 Lista de Presentes & Cotas do Álbum</span>
                </button>
              </div>

              <button
                onClick={() => setAiModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-brand-mint/15 text-teal-700 dark:text-brand-mint border border-teal-200 dark:border-brand-mint/30 text-xs font-bold hover:bg-teal-100 transition-colors shadow-sm"
              >
                <Wand2 className="w-3.5 h-3.5 text-teal-600 dark:text-brand-mint" />
                <span>Curadoria por IA</span>
              </button>
            </div>

            {clientSubTab === 'catalog' ? (
              <StoreCatalog
                photos={initialPhotos}
                onSelectProduct={handleOpenCustomizer}
                onOpenCart={() => setCartDrawerOpen(true)}
                cartCount={totalCartCount}
                onOpenAiCurator={() => setAiModalOpen(true)}
                onOpenGiftRegistry={() => setClientSubTab('gifts')}
              />
            ) : (
              <StoreGiftRegistry
                coupleNames="Isabela & Rodrigo"
                onOpenStoreCatalog={() => setClientSubTab('catalog')}
              />
            )}
          </div>
        ) : (
          /* PHOTOGRAPHER MANAGEMENT VIEW */
          <div className="space-y-6">
            {/* Sub-tab Navigation */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setManagerSubTab('orders')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    managerSubTab === 'orders'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Pedidos & Fila de Produção ({orders.length})</span>
                </button>

                <button
                  onClick={() => setManagerSubTab('settings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    managerSubTab === 'settings'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>Margens, Laboratórios & Chave PIX</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <Truck className="w-4 h-4 text-teal-500" />
                <span>Indimagem (RS) & Digipix Pro (SP) Online</span>
              </div>
            </div>

            {/* Sub-tab Views */}
            {managerSubTab === 'orders' ? (
              <PhotographerOrdersManager
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            ) : (
              <PhotographerStoreSettings />
            )}
          </div>
        )}
      </main>

      {/* Modals & Slideouts */}
      {customizerProduct && (
        <ProductCustomizerModal
          product={customizerProduct}
          initialPhoto={customizerPhoto}
          allPhotos={initialPhotos}
          isOpen={!!customizerProduct}
          onClose={() => setCustomizerProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <StoreCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <StoreCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        items={cartItems}
        shippingMethod={checkoutShippingMethod}
        shippingCost={checkoutShippingCost}
        initialAddress={checkoutAddress}
        onOrderCompleted={handleOrderCompleted}
      />

      <SmartAiRecommenderModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onSelectRecommendation={handleSelectAiRecommendation}
      />
    </div>
  );
};
