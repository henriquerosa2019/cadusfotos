import React from 'react';
import {
  Calendar,
  DollarSign,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  QrCode,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { StudioClient, StudioContract, StudioInvoice, StudioBooking } from './studioData';

interface StudioDashboardProps {
  clients: StudioClient[];
  contracts: StudioContract[];
  invoices: StudioInvoice[];
  bookings: StudioBooking[];
  onNavigateTab: (tab: 'dashboard' | 'contratos' | 'faturas' | 'agenda' | 'crm') => void;
}

export const StudioDashboard: React.FC<StudioDashboardProps> = ({
  clients,
  contracts,
  invoices,
  bookings,
  onNavigateTab,
}) => {
  const totalContracted = clients.reduce((acc, c) => acc + c.totalContractValue, 0);
  const totalPaidPIX = invoices.filter(i => i.status === 'pago').reduce((acc, i) => acc + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pendente').reduce((acc, i) => acc + i.amount, 0);
  const signedContractsCount = contracts.filter(c => c.status === 'assinado').length;
  const pendingContractsCount = contracts.filter(c => c.status === 'enviado').length;

  return (
    <div className="space-y-8">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Contratado */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Receita Contratada
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              R$ {totalContracted.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-teal-700 font-semibold flex items-center gap-1 mt-1">
              <span>5 contratos ativos no pipeline</span>
            </span>
          </div>
        </div>

        {/* PIX Liquidado */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Liquidado via PIX
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-700">
              R$ {totalPaidPIX.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sem taxas ocultas • Caixa D+0</span>
            </span>
          </div>
        </div>

        {/* Saldo a Receber */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              A Receber (PIX)
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-amber-800">
              R$ {totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 mt-1">
              <span>Parcelas programadas pré-evento</span>
            </span>
          </div>
        </div>

        {/* Contratos Digitais */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Contratos Digitais
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              {signedContractsCount} <span className="text-sm font-normal text-slate-400">assinados</span>
            </h3>
            <span className="text-[11px] text-sky-700 font-semibold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{pendingContractsCount} aguardando assinatura</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Ribbon */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-400">
            <Sparkles className="w-3.5 h-3.5" />
            Atalhos Operacionais Rápidos
          </div>
          <h4 className="text-base font-bold">
            O que você deseja fazer agora no seu estúdio?
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('contratos')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>Novo Contrato</span>
          </button>
          <button
            onClick={() => onNavigateTab('faturas')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <QrCode className="w-4 h-4 text-teal-400" />
            <span>Cobrança PIX</span>
          </button>
          <button
            onClick={() => onNavigateTab('agenda')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Calendar className="w-4 h-4 text-teal-400" />
            <span>Agendar Sessão</span>
          </button>
          <button
            onClick={() => onNavigateTab('crm')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Users className="w-4 h-4" />
            <span>Novo Lead</span>
          </button>
        </div>
      </div>

      {/* Two Columns: Upcoming Shoots & Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Próximas Sessões (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <h4 className="text-base font-bold text-slate-900">
                Próximas Sessões de Fotos & Casamentos
              </h4>
            </div>
            <button
              onClick={() => onNavigateTab('agenda')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>Ver Agenda Completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {bookings.map(bk => (
              <div
                key={bk.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 border-l-4 border-l-teal-600 flex items-start justify-between gap-3 hover:bg-slate-100/80 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-teal-100 text-teal-800">
                      {bk.eventType}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900">
                      {bk.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600">
                    {bk.clientName} • <b>{bk.date}</b> ({bk.time})
                  </p>
                  <p className="text-[11px] text-slate-500">
                    📍 {bk.location}
                  </p>
                </div>

                <button
                  onClick={() => onNavigateTab('agenda')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors self-center flex-shrink-0"
                >
                  Ver Ficha
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Faturas e Contratos a Vencer (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <h4 className="text-base font-bold text-slate-900">
                Cobranças & Contratos Pendentes
              </h4>
            </div>
            <button
              onClick={() => onNavigateTab('faturas')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>Ver Faturas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {invoices.filter(i => i.status === 'pendente').map(inv => (
              <div
                key={inv.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5 min-w-0">
                  <h6 className="text-xs font-bold text-slate-900 truncate">
                    {inv.clientName}
                  </h6>
                  <p className="text-[11px] text-slate-500 truncate">
                    {inv.description} • Vencimento: <b>{inv.dueDate}</b>
                  </p>
                  <span className="text-xs font-extrabold text-teal-700 block">
                    R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={() => onNavigateTab('faturas')}
                  className="px-2.5 py-1.5 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 font-bold text-[11px] flex items-center gap-1 flex-shrink-0"
                >
                  <MessageSquare className="w-3 h-3 text-teal-600" />
                  <span>Cobrar</span>
                </button>
              </div>
            ))}

            {contracts.filter(c => c.status === 'enviado').map(ctr => (
              <div
                key={ctr.id}
                className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-amber-800">
                    Aguardando Assinatura
                  </span>
                  <h6 className="text-xs font-bold text-slate-900 truncate">
                    {ctr.clientName}
                  </h6>
                  <p className="text-[11px] text-slate-600 truncate">
                    {ctr.contractNumber} • {ctr.eventType}
                  </p>
                </div>

                <button
                  onClick={() => onNavigateTab('contratos')}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 font-bold text-[11px] flex-shrink-0"
                >
                  Assinar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
