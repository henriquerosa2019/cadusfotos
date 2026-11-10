import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  FileText,
  DollarSign,
  Users,
  LayoutDashboard,
  Camera,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  QrCode,
  Sliders,
} from 'lucide-react';
import {
  StudioClient,
  initialClients,
  StudioContract,
  initialContracts,
  StudioInvoice,
  initialInvoices,
  StudioBooking,
  initialBookings,
} from './studioData';
import { StudioDashboard } from './StudioDashboard';
import { StudioContractsManager } from './StudioContractsManager';
import { StudioInvoicesPIX } from './StudioInvoicesPIX';
import { StudioCalendar } from './StudioCalendar';
import { StudioClientsCRM } from './StudioClientsCRM';

interface StudioManagerPageProps {
  onBackToHome: () => void;
  onOpenGallery?: () => void;
  onOpenStore?: () => void;
}

export const StudioManagerPage: React.FC<StudioManagerPageProps> = ({
  onBackToHome,
  onOpenGallery,
  onOpenStore,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contratos' | 'faturas' | 'agenda' | 'crm'>('dashboard');
  const [clients, setClients] = useState<StudioClient[]>(initialClients);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Floating Control Ribbon */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-white/10 px-4 sm:px-6 py-2.5">
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

            {onOpenStore && (
              <button
                onClick={onOpenStore}
                className="text-xs font-semibold text-amber-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Loja & Lab</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Fase 3: Studio Manager Ativo
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Studio Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 mb-2">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              Gestão Profissional de Estúdio Fotográfico
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Studio Manager (CRM, Contratos Digitais & PIX)
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Automatize a jornada do cliente desde o primeiro contato, envio de propostas, assinatura eletrônica com validade jurídica e cobrança parcelada com lembretes no WhatsApp.
            </p>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Visão Geral (Dashboard)</span>
          </button>

          <button
            onClick={() => setActiveTab('contratos')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'contratos'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Contratos Digitais</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-extrabold">
              Assinatura
            </span>
          </button>

          <button
            onClick={() => setActiveTab('faturas')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'faturas'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Cobranças & PIX Parcelado</span>
          </button>

          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'agenda'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Agenda de Sessões</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'crm'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clientes & Leads (CRM)</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'dashboard' && (
          <StudioDashboard
            clients={clients}
            contracts={initialContracts}
            invoices={initialInvoices}
            bookings={initialBookings}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'contratos' && (
          <StudioContractsManager clients={clients} />
        )}

        {activeTab === 'faturas' && (
          <StudioInvoicesPIX clients={clients} />
        )}

        {activeTab === 'agenda' && (
          <StudioCalendar clients={clients} />
        )}

        {activeTab === 'crm' && (
          <StudioClientsCRM
            clients={clients}
            onUpdateClients={setClients}
          />
        )}
      </main>
    </div>
  );
};
