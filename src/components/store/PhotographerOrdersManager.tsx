import React, { useState } from 'react';
import { StoreOrder } from './storeData';
import {
  Clock,
  Truck,
  CheckCircle,
  Eye,
  FileCheck,
  MessageSquare,
  AlertCircle,
  DollarSign,
  Package,
  Layers,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface PhotographerOrdersManagerProps {
  orders: StoreOrder[];
  onUpdateOrderStatus: (orderNumber: string, newStatus: StoreOrder['labStatus']) => void;
}

export const PhotographerOrdersManager: React.FC<PhotographerOrdersManagerProps> = ({
  orders,
  onUpdateOrderStatus,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<StoreOrder | null>(orders[0] || null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Stats calculation
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const totalLabCosts = orders.reduce((acc, o) => acc + o.totalLabCost, 0);
  const totalProfit = orders.reduce((acc, o) => acc + o.photographerProfit, 0);

  const filteredOrders = orders.filter(o => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'hold') return o.labStatus === 'hold_fotografo';
    if (activeFilter === 'producao') return o.labStatus === 'enviado_lab' || o.labStatus === 'em_producao';
    if (activeFilter === 'enviados') return o.labStatus === 'enviado_transportadora' || o.labStatus === 'entregue';
    return true;
  });

  const showToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleApproveImmediateSend = (orderNumber: string) => {
    onUpdateOrderStatus(orderNumber, 'enviado_lab');
    showToast(`Pedido ${orderNumber} liberado para produção imediata no laboratório parceiro!`);
  };

  const handleSimulateWhatsApp = (order: StoreOrder) => {
    showToast(`WhatsApp aberto para ${order.clientName} com link de rastreio Jadlog!`);
  };

  const handleReplaceHighRes = (orderNumber: string) => {
    showToast(`Arquivo mestre em 300 DPI (TIFF) substituído com sucesso no pedido ${orderNumber}!`);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Toast Alert */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white border border-brand-mint/40 shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-brand-mint" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Vendas Brutas da Loja
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {orders.length} pedidos recebidos este mês
          </span>
        </div>

        {/* Lab Costs */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Custo Gráfico (Indimagem & Digipix)
          </span>
          <div className="text-2xl font-black text-slate-600 dark:text-slate-400">
            R$ {totalLabCosts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Repassado diretamente aos laboratórios
          </span>
        </div>

        {/* Pure Photographer Profit */}
        <div className="p-5 rounded-3xl bg-gradient-to-tr from-teal-500/10 via-brand-mint/15 to-emerald-500/10 border border-teal-500/30 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-brand-mint block mb-1">
            Seu Lucro Líquido no Bolso
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300 mt-1 block font-semibold">
            Margem média de lucro de +{Math.round((totalProfit / (totalLabCosts || 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'todos', label: `Todos os Pedidos (${orders.length})` },
          { id: 'hold', label: 'Aguardando Revisão (Hold 48h)' },
          { id: 'producao', label: 'Em Produção no Lab' },
          { id: 'enviados', label: 'Despachados / Entregues' },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold shadow-brand-glow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Split View: Orders List & Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Orders List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10">
              Nenhum pedido encontrado nesta categoria.
            </div>
          ) : (
            filteredOrders.map(order => {
              const isSelected = selectedOrder?.orderNumber === order.orderNumber;
              return (
                <div
                  key={order.orderNumber}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/70 dark:bg-brand-mint/15 dark:border-brand-mint shadow-md ring-1 ring-teal-500/20'
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      {order.orderNumber}
                    </span>
                    {/* Status Pill */}
                    {order.labStatus === 'hold_fotografo' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Hold 48h
                      </span>
                    )}
                    {order.labStatus === 'enviado_lab' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
                        Enviado ao Lab
                      </span>
                    )}
                    {order.labStatus === 'em_producao' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                        Em Produção Gráfica
                      </span>
                    )}
                    {order.labStatus === 'enviado_transportadora' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        A Caminho
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {order.clientName}
                  </h4>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {order.items.length} {order.items.length === 1 ? 'produto' : 'produtos'} • Lab: {order.labPartner}
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-200/60 dark:border-white/5 text-xs">
                    <span className="text-[10px] text-slate-400">{order.createdAt}</span>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        R$ {order.totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        Lucro: +R$ {order.photographerProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Detailed Inspector (7 cols) */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
              {/* Top Banner of Selected Order */}
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Pedido {selectedOrder.orderNumber}
                    </h3>
                    <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300">
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Comprador: <b>{selectedOrder.clientName}</b> ({selectedOrder.clientPhone})
                  </p>
                </div>

                {/* WhatsApp Notification Trigger */}
                <button
                  onClick={() => handleSimulateWhatsApp(selectedOrder)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-xs font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Notificar WhatsApp</span>
                </button>
              </div>

              {/* Order Items Inspection */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Itens a Serem Produzidos:
                </span>

                <div className="space-y-2">
                  {selectedOrder.items.map(item => (
                    <div
                      key={item.cartId}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 flex items-center gap-3"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                        <img src={item.selectedPhotoUrl} alt="Item" className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.product.title}
                        </h5>
                        <p className="text-[11px] text-teal-600 dark:text-brand-mint">
                          {item.selectedSize.dimensions}
                        </p>
                        {item.selectedMaterial && (
                          <p className="text-[10px] text-slate-500 truncate">
                            {item.selectedMaterial.name}
                          </p>
                        )}
                        {item.customText && (
                          <p className="text-[10px] text-amber-700 dark:text-amber-300 italic truncate">
                            Gravação: "{item.customText}"
                          </p>
                        )}
                      </div>

                      {/* Replace High-Res button for retouching */}
                      <button
                        onClick={() => handleReplaceHighRes(selectedOrder.orderNumber)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-white/15 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 flex items-center gap-1 flex-shrink-0"
                        title="Substituir por arquivo em alta 300 DPI"
                      >
                        <FileCheck className="w-3 h-3 text-teal-500" />
                        <span className="hidden sm:inline">Trocar p/ 300DPI</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Delivery Address */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-bold mb-1">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-teal-500" />
                    <span>Envio via {selectedOrder.shippingMethod}</span>
                  </div>
                  <span className="font-mono text-[11px] text-teal-600 dark:text-brand-mint">
                    Rastreio: {selectedOrder.trackingCode}
                  </span>
                </div>
                <p className="text-slate-500">
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.number} • {selectedOrder.shippingAddress.neighborhood}
                </p>
                <p className="text-slate-500">
                  {selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.state} • CEP {selectedOrder.shippingAddress.zipCode}
                </p>
              </div>

              {/* Financial Ledger Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Valor Pago pelo Cliente</span>
                  <span>R$ {selectedOrder.totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Custo Cobrado pelo Laboratório ({selectedOrder.labPartner})</span>
                  <span>- R$ {selectedOrder.totalLabCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Frete ({selectedOrder.shippingMethod})</span>
                  <span>- R$ {selectedOrder.shippingCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                  <span>Seu Lucro Líquido Retido:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-base">
                    + R$ {selectedOrder.photographerProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Lab Approval Actions */}
              {selectedOrder.labStatus === 'hold_fotografo' && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Período de Hold ativo. Deseja liberar o pedido agora sem esperar as 48 horas?</span>
                  </div>

                  <button
                    onClick={() => handleApproveImmediateSend(selectedOrder.orderNumber)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Liberar p/ Indimagem</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
              Selecione um pedido na lista ao lado para inspecionar os arquivos e gerenciar o envio ao laboratório.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
