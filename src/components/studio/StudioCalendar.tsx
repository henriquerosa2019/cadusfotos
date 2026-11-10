import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Camera,
  CheckCircle2,
  Users,
  Plus,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { StudioBooking, initialBookings, StudioClient } from './studioData';

interface StudioCalendarProps {
  clients: StudioClient[];
}

export const StudioCalendar: React.FC<StudioCalendarProps> = ({ clients }) => {
  const [bookings, setBookings] = useState<StudioBooking[]>(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState<StudioBooking | null>(null);
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  // New Booking Form
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [title, setTitle] = useState('Ensaio Casal Pré-Wedding');
  const [date, setDate] = useState('28/11/2026 (Sábado)');
  const [time, setTime] = useState('16:00 às 18:30');
  const [location, setLocation] = useState('Parque Ibirapuera - Portão 7');
  const [address, setAddress] = useState('Av. Pedro Álvares Cabral, s/n - Vila Mariana, São Paulo - SP');
  const [team, setTeam] = useState('Cadu (Fotógrafo Principal)');

  const handleCreateBooking = () => {
    const client = clients.find(c => c.id === selectedClientId) || clients[0];
    const newId = `bk-${Date.now()}`;

    const newBk: StudioBooking = {
      id: newId,
      clientId: client.id,
      clientName: client.name + (client.partnerName ? ` & ${client.partnerName}` : ''),
      eventType: client.eventType,
      title,
      date,
      time,
      location,
      address,
      status: 'confirmado',
      photographerTeam: team,
      equipmentChecklist: [
        'Sony A7 IV + Lente 85mm f/1.4 GM',
        'Lente 35mm f/1.4 GM',
        'Rebatedor Oval Dobrável',
        '3 Baterias extras carregadas',
      ],
      notes: 'Sessão confirmada via WhatsApp. Briefing com referências visuais salvo na galeria.',
    };

    setBookings([newBk, ...bookings]);
    setNewBookingModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Agenda de Sessões Fotográficas & Eventos
            </h3>
            <p className="text-xs text-slate-500">
              Gestão de datas, horários de luz (Golden Hour), rotas no mapa e checklist de câmeras.
            </p>
          </div>
        </div>

        <button
          onClick={() => setNewBookingModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Agendar Sessão</span>
        </button>
      </div>

      {/* Bookings Timeline Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {bookings.map(bk => (
          <div
            key={bk.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 border-t-4 border-t-teal-600 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-500 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-50 text-teal-900 border-2 border-teal-600 shadow-xs">
                  {bk.eventType}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirmado</span>
                </span>
              </div>

              {/* Linha verde-azulada mais grossa para destacar visualmente cada agendamento */}
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-teal-500 to-teal-300 rounded-full" />

              <div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {bk.title}
                </h4>
                <p className="text-xs text-teal-700 font-semibold mt-0.5">
                  {bk.clientName}
                </p>
              </div>

              {/* Time and Date */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="font-semibold">{bk.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{bk.time}</span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">{bk.location}</span>
                    <span className="text-[11px] text-slate-500">{bk.address}</span>
                  </div>
                </div>
              </div>

              {/* Equipment Checklist */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Checklist de Equipamento & Equipe:
                </span>
                <div className="space-y-1">
                  {bk.equipmentChecklist.slice(0, 3).map((eq, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Camera className="w-3 h-3 text-slate-400" />
                      <span className="truncate">{eq}</span>
                    </div>
                  ))}
                  {bk.equipmentChecklist.length > 3 && (
                    <span className="text-[10px] text-teal-600 font-semibold block">
                      + {bk.equipmentChecklist.length - 3} itens no checklist
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bk.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>Ver no Mapa</span>
              </a>

              <button
                onClick={() => setSelectedBooking(bk)}
                className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold text-xs transition-colors"
              >
                Detalhes da Sessão
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: DETALHES COMPLETOS DA SESSÃO */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                  Ficha da Sessão Fotográfica
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedBooking.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p><b>Cliente:</b> {selectedBooking.clientName}</p>
                <p><b>Data:</b> {selectedBooking.date}</p>
                <p><b>Horário:</b> {selectedBooking.time}</p>
                <p><b>Local:</b> {selectedBooking.location}</p>
                <p className="text-slate-500 text-xs">{selectedBooking.address}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                  Checklist Completo de Equipamentos:
                </span>
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  {selectedBooking.equipmentChecklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                  Instruções & Notas de Produção:
                </span>
                <p className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                  {selectedBooking.notes}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs transition-colors"
              >
                Fechar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NOVO AGENDAMENTO */}
      {newBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Agendar Nova Sessão Fotográfica
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sincronizado automaticamente com a agenda do estúdio
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNewBookingModalOpen(false)}
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
                <label className="text-xs font-bold text-slate-700">Título da Sessão</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Data</label>
                  <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Horário</label>
                  <input
                    type="text"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nome do Local</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Endereço Completo</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setNewBookingModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateBooking}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Salvar Agendamento</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
