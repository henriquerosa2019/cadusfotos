import React, { useState, useEffect } from 'react';
import { X, Check, QrCode, CreditCard, ShieldCheck, Copy, ArrowRight, Sparkles, MessageSquare, Truck, AlertCircle } from 'lucide-react';
import { CartItem, StoreOrder } from './storeData';
import { AddressInfo, fetchAddressFromCep } from './shippingCalculator';

interface StoreCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  shippingMethod: string;
  shippingCost: number;
  initialAddress?: AddressInfo;
  onOrderCompleted: (order: StoreOrder) => void;
}

export const StoreCheckoutModal: React.FC<StoreCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  shippingMethod,
  shippingCost,
  initialAddress,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'Cartão 12x'>('PIX');

  // Customer Form Data
  const [fullName, setFullName] = useState('Isabela Silveira');
  const [email, setEmail] = useState('isabela.silveira@gmail.com');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [cep, setCep] = useState(initialAddress?.cep || '01442-001');
  const [street, setStreet] = useState(initialAddress?.street || 'Alameda Gabriel Monteiro da Silva');
  const [number, setNumber] = useState('1420, Apto 82');
  const [neighborhood, setNeighborhood] = useState(initialAddress?.neighborhood || 'Jardim América');
  const [city, setCity] = useState(initialAddress?.city || 'São Paulo');
  const [state, setState] = useState(initialAddress?.state || 'SP');

  useEffect(() => {
    if (initialAddress) {
      setCep(initialAddress.cep);
      if (initialAddress.street) setStreet(initialAddress.street);
      if (initialAddress.neighborhood) setNeighborhood(initialAddress.neighborhood);
      if (initialAddress.city) setCity(initialAddress.city);
      if (initialAddress.state) setState(initialAddress.state);
    }
  }, [initialAddress]);

  const handleCheckoutCepChange = async (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 8);
    const formatted = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw;
    setCep(formatted);
    if (raw.length === 8) {
      try {
        const addr = await fetchAddressFromCep(raw);
        if (addr.street) setStreet(addr.street);
        if (addr.neighborhood) setNeighborhood(addr.neighborhood);
        if (addr.city) setCity(addr.city);
        if (addr.state) setState(addr.state);
      } catch {
        // keep input
      }
    }
  };

  // Credit Card Form Data
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('ISABELA SILVEIRA');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('884');
  const [installments, setInstallments] = useState(1);

  // PIX Countdown timer (15 minutes)
  const [secondsRemaining, setSecondsRemaining] = useState(899);
  const [pixCopied, setPixCopied] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<StoreOrder | null>(null);

  useEffect(() => {
    if (step === 'payment' && paymentMethod === 'PIX' && secondsRemaining > 0) {
      const interval = setInterval(() => {
        setSecondsRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, paymentMethod, secondsRemaining]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalLabCost = items.reduce((acc, item) => acc + item.unitLabCost * item.quantity, 0);

  // 5% discount if paid with PIX
  const discount = paymentMethod === 'PIX' ? subtotal * 0.05 : 0;
  const grandTotal = subtotal - discount + shippingCost;
  const photographerProfit = grandTotal - totalLabCost - shippingCost;

  // Format Timer mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const fakePixCode = `00020126580014br.gov.bcb.pix0136cadusfotos-${Date.now()}520400005303986540${grandTotal.toFixed(2)}5802BR5925CADUS FOTOS PAGAMENTOS6009SAO PAULO62070503***6304E8A2`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(fakePixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const handleCompleteOrder = (method: 'PIX' | 'Cartão 12x') => {
    const primaryLab = items.some(i => i.product.labId === 'indimagem') ? 'Indimagem' : 'Digipix Pro';
    const orderNumber = `CF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: StoreOrder = {
      orderNumber,
      clientName: fullName,
      clientPhone: phone,
      clientEmail: email,
      shippingAddress: {
        street,
        number,
        neighborhood,
        city,
        state,
        zipCode: cep,
      },
      shippingMethod,
      shippingCost,
      items,
      totalPrice: grandTotal,
      totalLabCost,
      photographerProfit,
      paymentMethod: method,
      paymentStatus: 'pago',
      labStatus: 'hold_fotografo', // 48h hold for photographer review
      labPartner: primaryLab,
      trackingCode: `JAD-${Math.floor(1000000 + Math.random() * 9000000)}-BR`,
      createdAt: 'Agora mesmo',
    };

    setCompletedOrder(newOrder);
    onOrderCompleted(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {step === 'info' && 'Identificação & Endereço de Entrega'}
              {step === 'payment' && 'Forma de Pagamento'}
              {step === 'success' && 'Pedido Confirmado com Sucesso!'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {/* STEP 1: CLIENT DETAILS & ADDRESS */}
          {step === 'info' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    WhatsApp para Rastreio
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    E-mail para Envio da Nota Fiscal
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-brand-mint block">
                  Endereço de Entrega (Envio Seguro com Seguro Total de Carga)
                </span>

                {/* Selected Shipping Method Badge */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50/70 dark:bg-brand-mint/10 border border-teal-200 dark:border-brand-mint/20 text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Transportadora Selecionada: <b>{shippingMethod}</b>
                    </span>
                  </div>
                  <span className="font-extrabold text-teal-700 dark:text-brand-mint">
                    {shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">CEP</label>
                    <input
                      type="text"
                      value={cep}
                      maxLength={9}
                      onChange={e => handleCheckoutCepChange(e.target.value)}
                      placeholder="00000-000"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Logradouro / Rua</label>
                    <input
                      type="text"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Número / Apto</label>
                    <input
                      type="text"
                      value={number}
                      onChange={e => setNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Bairro</label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={e => setNeighborhood(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label className="text-[11px] font-semibold text-slate-500">Cidade / UF</label>
                    <input
                      type="text"
                      value={`${city} - ${state}`}
                      onChange={e => {
                        const parts = e.target.value.split('-');
                        if (parts[0]) setCity(parts[0].trim());
                        if (parts[1]) setState(parts[1].trim());
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Order Quick Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-medium">
                    Total com {items.length} itens + frete ({shippingMethod}):
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    R$ {(subtotal + shippingCost).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-600 dark:hover:bg-brand-mint transition-colors flex items-center gap-2"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD (PIX vs CREDIT CARD) */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Payment Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('PIX')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'PIX'
                      ? 'border-teal-500 bg-teal-50/70 dark:bg-brand-mint/15 dark:border-brand-mint shadow-sm'
                      : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                      PIX Instantâneo
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[10px]">
                      5% OFF
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                    Aprovação imediata e envio prioritário ao laboratório
                  </span>
                </button>

                <button
                  onClick={() => setPaymentMethod('Cartão 12x')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'Cartão 12x'
                      ? 'border-teal-500 bg-teal-50/70 dark:bg-brand-mint/15 dark:border-brand-mint shadow-sm'
                      : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-teal-600 dark:text-brand-mint" />
                    Cartão de Crédito
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                    Parcele em até 12x sem burocracia
                  </span>
                </button>
              </div>

              {/* PIX Flow */}
              {paymentMethod === 'PIX' && (
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <Sparkles className="w-4 h-4 text-brand-mint animate-pulse" />
                    <span>QRCode expira em: <b className="font-mono text-teal-600 dark:text-brand-mint text-sm">{formatTime(secondsRemaining)}</b></span>
                  </div>

                  {/* QR Code Graphic Mockup */}
                  <div className="w-48 h-48 mx-auto p-3 bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center justify-center relative">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(fakePixCode)}`}
                      alt="PIX QR Code"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 border-4 border-teal-500/30 rounded-2xl pointer-events-none" />
                  </div>

                  {/* Total with 5% Discount */}
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500">Valor com 5% de desconto via PIX:</span>
                    <div className="text-2xl font-extrabold text-teal-600 dark:text-brand-mint">
                      R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Copy & Paste Code */}
                  <div className="flex items-center gap-2 max-w-md mx-auto">
                    <input
                      type="text"
                      readOnly
                      value={fakePixCode}
                      className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-mono text-[10px] text-slate-500 truncate"
                    />
                    <button
                      onClick={handleCopyPix}
                      className="px-3.5 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition-colors flex items-center gap-1.5 flex-shrink-0"
                    >
                      {pixCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{pixCopied ? 'Copiado!' : 'Copiar PIX'}</span>
                    </button>
                  </div>

                  {/* Simulator action to instantly trigger order confirmation */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleCompleteOrder('PIX')}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-brand-glow flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Simular Pagamento Instantâneo via PIX</span>
                    </button>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Webhook em tempo real do Banco Central integrado com confirmação imediata
                    </span>
                  </div>
                </div>
              )}

              {/* Credit Card Flow */}
              {paymentMethod === 'Cartão 12x' && (
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-semibold text-slate-500">Número do Cartão</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-semibold text-slate-500">Nome Impresso no Cartão</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs uppercase"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-500">Validade</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-500">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-semibold text-slate-500">Parcelamento</label>
                      <select
                        value={installments}
                        onChange={e => setInstallments(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs"
                      >
                        <option value={1}>1x de R$ {(grandTotal).toFixed(2)} (à vista sem juros)</option>
                        <option value={3}>3x de R$ {(grandTotal / 3).toFixed(2)} sem juros</option>
                        <option value={6}>6x de R$ {(grandTotal / 6).toFixed(2)} sem juros</option>
                        <option value={10}>10x de R$ {(grandTotal / 10).toFixed(2)} sem juros</option>
                        <option value={12}>12x de R$ {((grandTotal * 1.05) / 12).toFixed(2)}</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCompleteOrder('Cartão 12x')}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-brand-glow flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pagar R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no Cartão</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 'success' && completedOrder && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg border-2 border-emerald-500">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-teal-600 dark:text-brand-mint uppercase tracking-wider">
                  Pedido Nº {completedOrder.orderNumber}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Pagamento Confirmado com Sucesso!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Os arquivos foram validados e inseridos na esteira de produção integrada.
                </p>
              </div>

              {/* Status Badges Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {/* Lab Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    <Truck className="w-4 h-4 text-teal-500" />
                    <span>Fila do Laboratório {completedOrder.labPartner}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Período de Hold de 48h ativo para revisão de retoque pelo fotógrafo antes da impressão final.
                  </p>
                </div>

                {/* WhatsApp Notification Card */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Enviado ao Cliente</span>
                  </div>
                  <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400">
                    Isabela recebeu a confirmação do pedido e receberá o código <b>{completedOrder.trackingCode}</b> da Jadlog.
                  </p>
                </div>
              </div>

              {/* Photographer Profit Milestone */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-brand-mint/10 to-emerald-500/10 border border-teal-500/30 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-teal-700 dark:text-brand-mint block">
                    Lucro Líquido Repassado ao Fotógrafo:
                  </span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    R$ {completedOrder.photographerProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  Agendado via PIX D+1 <br />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Sem taxas ocultas</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-600 dark:hover:bg-brand-mint transition-colors"
              >
                Concluir e Voltar à Loja
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
