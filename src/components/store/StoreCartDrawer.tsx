import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  MapPin,
  Loader2,
  Plane,
  Package,
  Store as StoreIcon,
  Download,
  AlertCircle,
  Sparkles,
  Check,
} from 'lucide-react';
import { CartItem } from './storeData';
import {
  AddressInfo,
  ShippingOption,
  fetchAddressFromCep,
  calculateShipping,
} from './shippingCalculator';

interface StoreCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: (
    shippingMethod: string,
    shippingCost: number,
    addressDetails?: AddressInfo
  ) => void;
}

export const StoreCartDrawer: React.FC<StoreCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [cep, setCep] = useState('01442-001');
  const [address, setAddress] = useState<AddressInfo>({
    cep: '01442-001',
    street: 'Alameda Gabriel Monteiro da Silva',
    neighborhood: 'Jardim América',
    city: 'São Paulo',
    state: 'SP',
    region: 'sp-capital',
  });
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('jadlog');
  const [loadingShipping, setLoadingShipping] = useState<boolean>(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const [totalWeight, setTotalWeight] = useState<number>(1.8);
  const [isDigitalOnly, setIsDigitalOnly] = useState<boolean>(false);

  // Recalculate shipping options whenever items or address change
  useEffect(() => {
    if (items.length > 0) {
      const result = calculateShipping(items, address);
      setShippingOptions(result.options);
      setTotalWeight(result.totalWeightKg);
      setIsDigitalOnly(result.isDigitalOnly);

      // Keep selected option if valid, else fallback to first available
      if (!result.options.some(opt => opt.id === selectedOptionId)) {
        setSelectedOptionId(result.options[0]?.id || 'jadlog');
      }
    }
  }, [items, address]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const selectedOption = shippingOptions.find(opt => opt.id === selectedOptionId) || shippingOptions[0];
  const shippingCost = items.length === 0 || !selectedOption ? 0 : selectedOption.price;
  const grandTotal = subtotal + shippingCost;

  // Handle CEP formatting and calculation
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatted = raw;
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    }
    setCep(formatted);
    setCepError(null);
  };

  const handleCalculateShipping = async () => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) {
      setCepError('Digite um CEP válido com 8 números (ex: 01442-001)');
      return;
    }

    setLoadingShipping(true);
    setCepError(null);

    try {
      const resolvedAddress = await fetchAddressFromCep(clean);
      setAddress(resolvedAddress);
      const result = calculateShipping(items, resolvedAddress);
      setShippingOptions(result.options);
      setTotalWeight(result.totalWeightKg);
      setIsDigitalOnly(result.isDigitalOnly);
      setSelectedOptionId(result.options[0].id);
    } catch (err: any) {
      setCepError('Não foi possível localizar o CEP. Verifique os dígitos e tente novamente.');
    } finally {
      setLoadingShipping(false);
    }
  };

  const renderOptionIcon = (type: ShippingOption['iconType']) => {
    switch (type) {
      case 'plane':
        return <Plane className="w-4 h-4 text-sky-500" />;
      case 'package':
        return <Package className="w-4 h-4 text-amber-500" />;
      case 'store':
        return <StoreIcon className="w-4 h-4 text-emerald-500" />;
      case 'digital':
        return <Download className="w-4 h-4 text-brand-mint" />;
      default:
        return <Truck className="w-4 h-4 text-teal-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-brand-mint/20 text-teal-600 dark:text-brand-mint">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Seu Carrinho de Memórias
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {items.length} {items.length === 1 ? 'item configurado' : 'itens configurados'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Escolha um álbum, quadro ou revelação no catálogo para personalizar com suas fotos.
                  </p>
                </div>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.cartId}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40 flex gap-3 relative group"
                >
                  {/* Photo Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10">
                    <img
                      src={item.selectedPhotoUrl}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-teal-600 dark:text-brand-mint font-medium mt-0.5">
                        {item.selectedSize.dimensions}
                      </p>

                      {item.selectedMaterial && (
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {item.selectedMaterial.name}
                        </p>
                      )}

                      {item.customText && (
                        <p className="text-[10px] text-amber-700 dark:text-amber-300 italic truncate">
                          "{item.customText}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200/60 dark:border-white/5">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-300 dark:border-white/10 rounded-lg bg-white dark:bg-slate-900 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold text-[11px]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        R$ {(item.unitPrice * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* DYNAMIC REALISTIC CEP SHIPPING CALCULATOR */}
            {items.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Truck className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                    <span>Cálculo Real de Frete e Prazo de Envio</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                    Correios & Jadlog
                  </span>
                </div>

                {/* CEP Input Form with Real Time Search */}
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        onKeyDown={e => e.key === 'Enter' && handleCalculateShipping()}
                        placeholder="Informe seu CEP (00000-000)"
                        maxLength={9}
                        className="w-full pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      {loadingShipping && (
                        <div className="absolute right-2.5 top-2.5 text-teal-500 animate-spin">
                          <Loader2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleCalculateShipping}
                      disabled={loadingShipping}
                      className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-teal-600 dark:hover:bg-brand-mint transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      {loadingShipping ? 'Cotando...' : 'Calcular'}
                    </button>
                  </div>

                  {cepError && (
                    <div className="flex items-center gap-1.5 text-rose-500 text-[11px] font-medium pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{cepError}</span>
                    </div>
                  )}

                  {/* Destination Feedback Resolved from ViaCEP */}
                  {address.city && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-brand-mint flex-shrink-0" />
                      <span className="truncate">
                        <b>Destino:</b> {address.neighborhood ? `${address.neighborhood}, ` : ''}
                        {address.city} - {address.state}
                      </span>
                    </div>
                  )}
                </div>

                {/* Available Carrier Options */}
                <div className="space-y-2 pt-1">
                  {shippingOptions.map(option => {
                    const isSelected = selectedOptionId === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedOptionId(option.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all relative ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/80 dark:bg-brand-mint/15 dark:border-brand-mint ring-1 ring-teal-500/30'
                            : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white/50 dark:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-teal-600 text-white dark:bg-brand-mint dark:text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                              {renderOptionIcon(option.iconType)}
                            </div>
                            <div>
                              <span className="font-bold text-xs text-slate-900 dark:text-white block">
                                {option.carrier}
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                {option.deliveryDays}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            {option.price === 0 ? (
                              <div className="flex flex-col items-end">
                                <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                  Grátis
                                </span>
                                {option.originalPrice && (
                                  <span className="text-[10px] text-slate-400 line-through">
                                    R$ {option.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="font-extrabold text-xs text-teal-700 dark:text-brand-mint">
                                R$ {option.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/50 dark:border-white/5">
                          <span className="truncate pr-2">{option.description}</span>
                          {option.tag && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-teal-100 dark:bg-brand-mint/20 text-teal-800 dark:text-brand-mint whitespace-nowrap">
                              {option.tag}
                            </span>
                          )}
                        </div>

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500 dark:bg-brand-mint animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Packaging & Safety Info Pill */}
                {!isDigitalOnly && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-900/60 text-[11px] text-slate-600 dark:text-slate-300 border border-slate-300/50 dark:border-white/5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>
                      Embalagem reforçada antichoque • Peso aprox.: <b>{totalWeight.toFixed(1)} kg</b> • Seguro de extravio incluso.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/90 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal dos Produtos</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Frete ({selectedOption?.carrier || 'Calculado'})</span>
                  <span className="font-semibold text-teal-700 dark:text-brand-mint">
                    {shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/10">
                  <span>Total Final:</span>
                  <span className="text-lg text-teal-700 dark:text-brand-mint">
                    R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Instant Checkout Button */}
              <button
                onClick={() =>
                  onProceedToCheckout(
                    selectedOption?.carrier || 'Jadlog .Package Pro',
                    shippingCost,
                    address
                  )
                }
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-brand-glow"
              >
                <span>Avançar para Pagamento (PIX / Cartão)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                <span>Pagamento 100% Seguro com Certificado SSL</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
