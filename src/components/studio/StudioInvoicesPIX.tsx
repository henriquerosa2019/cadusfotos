import React, { useState } from 'react';
import {
  DollarSign,
  QrCode,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  MessageSquare,
  Plus,
  ArrowRight,
  ShieldCheck,
  X,
  CreditCard,
  Send,
  Calendar,
} from 'lucide-react';
import { StudioInvoice, initialInvoices, StudioClient } from './studioData';

interface StudioInvoicesPIXProps {
  clients: StudioClient[];
}

export const StudioInvoicesPIX: React.FC<StudioInvoicesPIXProps> = ({ clients }) => {
  const [invoices, setInvoices] = useState<StudioInvoice[]>(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<StudioInvoice | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false);

  // New Invoice Form
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [desc, setDesc] = useState('2ª Parcela do Casamento');
  const [amount, setAmount] = useState('2940');
  const [dueDate, setDueDate] = useState('10/09/2026');
  const [totalInstallments, setTotalInstallments] = useState(3);
  const [currentInstallment, setCurrentInstallment] = useState(2);

  const totalAmount = invoices.reduce((acc, i) => acc + i.amount, 0);
  const paidAmount = invoices.filter(i => i.status === 'pago').reduce((acc, i) => acc + i.amount, 0);
  const pendingAmount = invoices.filter(i => i.status === 'pendente').reduce((acc, i) => acc + i.amount, 0);

  const handleCopyPix = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleMarkAsPaid = (invId: string) => {
    const now = new Date();
    const formatted = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    setInvoices(prev =>
      prev.map(i =>
        i.id === invId
          ? { ...i, status: 'pago', paidAt: formatted }
          : i
      )
    );

    if (selectedInvoice && selectedInvoice.id === invId) {
      setSelectedInvoice({
        ...selectedInvoice,
        status: 'pago',
        paidAt: formatted,
      });
    }

    setToastMessage('Pagamento via PIX confirmado! A fatura foi liquidada no sistema.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getWhatsAppReminderLink = (inv: StudioInvoice) => {
    const text = encodeURIComponent(
      `Olá ${inv.clientName.split(' ')[0]}! Tudo bem?\n\n` +
      `Aqui é o Cadu. Passando para enviar o lembrete da parcela ${inv.installmentNumber}/${inv.totalInstallments} (${inv.description}) do seu ensaio/evento, com vencimento em ${inv.dueDate}.\n\n` +
      `💰 Valor: R$ ${inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n` +
      `Você pode pagar com 1 clique usando o código PIX Copia-e-Cola abaixo:\n` +
      `${inv.pixCode}\n\n` +
      `Após o pagamento o comprovante é reconhecido automaticamente no estúdio. Muito obrigado!`
    );
    return `https://wa.me/?text=${text}`;
  };

  const handleCreateInvoice = () => {
    const client = clients.find(c => c.id === selectedClientId) || clients[0];
    const newId = `inv-${Date.now()}`;
    const parsedAmount = parseFloat(amount) || 1500;

    const newInv: StudioInvoice = {
      id: newId,
      contractId: 'ctr-101',
      clientId: client.id,
      clientName: client.name + (client.partnerName ? ` & ${client.partnerName}` : ''),
      description: desc,
      installmentNumber: currentInstallment,
      totalInstallments: totalInstallments,
      amount: parsedAmount,
      dueDate,
      status: 'pendente',
      pixCode: `00020126580014br.gov.bcb.pix0136cadusfotos-${newId}520400005303986540${parsedAmount.toFixed(2)}5802BR5925CADUS FOTOS6009SAO PAULO62070503***6304${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`,
      pixQrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=cadus-fotos-pix-${newId}`,
    };

    setInvoices([newInv, ...invoices]);
    setNewInvoiceModalOpen(false);
    setToastMessage('Nova fatura PIX gerada com sucesso!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-md animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Recebido via PIX</span>
            <h4 className="text-xl font-extrabold text-slate-900">
              R$ {paidAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h4>
            <span className="text-[11px] text-emerald-600 font-semibold">Repasses na conta D+0</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">A Receber (Próximas Parcelas)</span>
            <h4 className="text-xl font-extrabold text-slate-900">
              R$ {pendingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h4>
            <span className="text-[11px] text-amber-700 font-semibold">Previsão de caixa assegurada</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Total em Cobrança Ativa</span>
            <h4 className="text-xl font-extrabold text-slate-900">
              R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h4>
            <span className="text-[11px] text-teal-700 font-semibold">Taxa de inadimplência: 0%</span>
          </div>
        </div>
      </div>

      {/* Invoices List Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-teal-600" />
            <span>Faturas & Parcelas com Cobrança Automática via PIX</span>
          </h3>
          <p className="text-xs text-slate-500">
            Envie lembretes e QR Codes dinâmicos com confirmação instantânea no WhatsApp dos noivos.
          </p>
        </div>

        <button
          onClick={() => setNewInvoiceModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Cobrança PIX</span>
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Parcelas & Faturas ({invoices.length})
          </span>
          <span className="text-xs text-slate-400">
            Pix Dinâmico Banco Central
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {invoices.map(inv => {
            const isPago = inv.status === 'pago';
            return (
              <div
                key={inv.id}
                className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      isPago
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-sm font-bold text-slate-900">
                        {inv.clientName}
                      </h4>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isPago
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isPago ? 'Pago via PIX' : 'A Vencer'}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        Parcela {inv.installmentNumber}/{inv.totalInstallments}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span>Descrição: <b>{inv.description}</b></span>
                      <span>•</span>
                      <span>Vencimento: <b>{inv.dueDate}</b></span>
                      <span>•</span>
                      <span>Valor: <b className="text-teal-700 text-sm">R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b></span>
                    </div>

                    {isPago && inv.paidAt && (
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 pt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Liquidado em {inv.paidAt}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-slate-500" />
                    <span>Ver PIX</span>
                  </button>

                  {!isPago && (
                    <>
                      <a
                        href={getWhatsAppReminderLink(inv)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                        title="Enviar lembrete amigável no WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Lembrete WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleMarkAsPaid(inv.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirmar Pagamento</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: VER QR CODE PIX DA FATURA */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 space-y-5 text-center">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Cobrança PIX Oficial • Cadu's Fotos
              </span>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                {selectedInvoice.clientName}
              </h3>
              <p className="text-xs text-slate-500">
                {selectedInvoice.description} (Parcela {selectedInvoice.installmentNumber}/{selectedInvoice.totalInstallments})
              </p>
              <div className="text-2xl font-black text-teal-700 pt-2">
                R$ {selectedInvoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={selectedInvoice.pixQrCodeUrl}
                alt="QR Code PIX"
                className="w-48 h-48 rounded-xl shadow-inner bg-white p-2"
              />
              <span className="text-[11px] text-slate-500 mt-2 font-medium">
                Vencimento: <b>{selectedInvoice.dueDate}</b>
              </span>
            </div>

            {/* Copia e Cola */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block text-left">
                Código PIX Copia-e-Cola:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedInvoice.pixCode}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700"
                />
                <button
                  onClick={() => handleCopyPix(selectedInvoice.pixCode)}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {selectedInvoice.status !== 'pago' ? (
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => handleMarkAsPaid(selectedInvoice.id)}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simular Confirmação do PIX (Baixa Imediata)</span>
                </button>
                <a
                  href={getWhatsAppReminderLink(selectedInvoice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Enviar para WhatsApp do Cliente</span>
                </a>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Esta fatura já está liquidada no estúdio</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: NOVA COBRANÇA */}
      {newInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Gerar Nova Fatura PIX
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cobrança individual ou parcela de contrato
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNewInvoiceModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Selecione o Cliente</label>
                <select
                  value={selectedClientId}
                  onChange={e => setSelectedClientId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                >
                  {clients.map(cli => (
                    <option key={cli.id} value={cli.id}>
                      {cli.name} {cli.partnerName ? `& ${cli.partnerName}` : ''} ({cli.eventType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Descrição da Cobrança</label>
                <input
                  type="text"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="Ex: 2ª Parcela Intermediária do Casamento"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Valor da Parcela (R$)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Data de Vencimento</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    placeholder="DD/MM/AAAA"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nº da Parcela</label>
                  <input
                    type="number"
                    min="1"
                    value={currentInstallment}
                    onChange={e => setCurrentInstallment(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Total de Parcelas</label>
                  <input
                    type="number"
                    min="1"
                    value={totalInstallments}
                    onChange={e => setTotalInstallments(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setNewInvoiceModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateInvoice}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>Gerar QR Code PIX</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
