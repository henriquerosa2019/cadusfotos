import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  MessageSquare,
  Mail,
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle2,
  Clock,
  Filter,
  X,
  UserPlus,
} from 'lucide-react';
import { StudioClient, initialClients, ClientStatus, EventType } from './studioData';

interface StudioClientsCRMProps {
  clients: StudioClient[];
  onUpdateClients: (newClients: StudioClient[]) => void;
}

export const StudioClientsCRM: React.FC<StudioClientsCRMProps> = ({
  clients,
  onUpdateClients,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | ClientStatus>('todos');
  const [selectedClient, setSelectedClient] = useState<StudioClient | null>(null);
  const [newClientModalOpen, setNewClientModalOpen] = useState(false);

  // New Client Form
  const [name, setName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState<EventType>('Casamento');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [contractValue, setContractValue] = useState('6500');
  const [notes, setNotes] = useState('');

  const filtered = clients.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.partnerName && c.partnerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.eventType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'todos' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ClientStatus) => {
    switch (status) {
      case 'contrato_assinado':
        return { label: 'Contrato Assinado', bg: 'bg-emerald-100 text-emerald-800' };
      case 'sessao_agendada':
        return { label: 'Sessão Agendada', bg: 'bg-teal-100 text-teal-800' };
      case 'orcamento_enviado':
        return { label: 'Orçamento Enviado', bg: 'bg-sky-100 text-sky-800' };
      case 'fotos_entregues':
        return { label: 'Fotos Entregues', bg: 'bg-purple-100 text-purple-800' };
      case 'concluido':
        return { label: 'Concluído', bg: 'bg-slate-100 text-slate-800' };
      default:
        return { label: 'Novo Lead', bg: 'bg-amber-100 text-amber-800' };
    }
  };

  const handleCreateClient = () => {
    if (!name || !phone) {
      alert('Por favor, informe o nome e o WhatsApp do cliente.');
      return;
    }

    const newCli: StudioClient = {
      id: `cli-${Date.now()}`,
      name,
      partnerName: partnerName || undefined,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone,
      eventType,
      eventDate: eventDate || 'A definir',
      location: location || 'São Paulo - SP',
      status: 'orcamento_enviado',
      totalContractValue: parseFloat(contractValue) || 4500,
      paidValue: 0,
      notes: notes || 'Lead cadastrado via Studio Manager.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };

    onUpdateClients([newCli, ...clients]);
    setNewClientModalOpen(false);
    setName('');
    setPartnerName('');
    setEmail('');
    setPhone('');
    setEventDate('');
    setLocation('');
    setNotes('');
  };

  const getWhatsAppLink = (c: StudioClient) => {
    const cleanPhone = c.phone.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Olá ${c.name.split(' ')[0]}! Tudo bem?\n\n` +
      `Aqui é o Cadu do estúdio de fotografia. Passando para conversar sobre os detalhes da cobertura do seu ${c.eventType}!\n\n` +
      `Como estão os preparativos?`
    );
    return `https://wa.me/55${cleanPhone}?text=${text}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, parceiro, local ou evento..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          onClick={() => setNewClientModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Novo Cliente / Lead</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setStatusFilter('todos')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            statusFilter === 'todos'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Todos ({clients.length})
        </button>
        <button
          onClick={() => setStatusFilter('contrato_assinado')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            statusFilter === 'contrato_assinado'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Contratos Assinados
        </button>
        <button
          onClick={() => setStatusFilter('sessao_agendada')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            statusFilter === 'sessao_agendada'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Sessão Agendada
        </button>
        <button
          onClick={() => setStatusFilter('orcamento_enviado')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            statusFilter === 'orcamento_enviado'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Orçamentos
        </button>
        <button
          onClick={() => setStatusFilter('lead')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            statusFilter === 'lead'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Novos Leads
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(client => {
          const badge = getStatusBadge(client.status);
          const percentPaid = client.totalContractValue > 0 ? Math.round((client.paidValue / client.totalContractValue) * 100) : 0;

          return (
            <div
              key={client.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-500/40 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={client.avatarUrl}
                      alt={client.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-inner flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {client.name} {client.partnerName ? `& ${client.partnerName}` : ''}
                      </h4>
                      <span className="text-xs text-teal-700 font-semibold block">
                        {client.eventType}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${badge.bg}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Data: <b>{client.eventDate}</b></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{client.location}</span>
                  </div>
                </div>

                {/* Financial Progress */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Valor do Pacote:</span>
                    <span className="text-slate-900">R$ {client.totalContractValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentPaid}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Pago via PIX: <b>R$ {client.paidValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b></span>
                    <span className="text-emerald-700 font-bold">{percentPaid}%</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={getWhatsAppLink(client)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedClient(client)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Ver Ficha
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: VER FICHA DO CLIENTE */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedClient.avatarUrl}
                  alt={selectedClient.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedClient.name} {selectedClient.partnerName ? `& ${selectedClient.partnerName}` : ''}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {selectedClient.eventType} • Cadastrado em {selectedClient.createdAt}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p><b>WhatsApp:</b> {selectedClient.phone}</p>
                <p><b>E-mail:</b> {selectedClient.email}</p>
                <p><b>Data Prevista:</b> {selectedClient.eventDate}</p>
                <p><b>Local:</b> {selectedClient.location}</p>
                <p><b>Contrato Total:</b> R$ {selectedClient.totalContractValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p><b>Quitado até agora:</b> R$ {selectedClient.paidValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                  Notas de Atendimento & Preferências:
                </span>
                <p className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                  {selectedClient.notes}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href={getWhatsAppLink(selectedClient)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NOVO CLIENTE */}
      {newClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Cadastrar Novo Cliente / Lead
                  </h3>
                  <p className="text-xs text-slate-500">
                    Adicione os dados para envio de propostas e contratos
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNewClientModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nome Principal</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ex: Beatriz Vasconcellos"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Noivo / Parceiro(a)</label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={e => setPartnerName(e.target.value)}
                    placeholder="Ex: Thiago Mendes"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">WhatsApp (com DDD)</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="cliente@gmail.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tipo de Evento</label>
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  >
                    <option value="Casamento">Casamento</option>
                    <option value="Pré-Wedding">Pré-Wedding</option>
                    <option value="Ensaio Gestante">Ensaio Gestante</option>
                    <option value="Corporativo & Branding">Corporativo & Branding</option>
                    <option value="15 Anos">15 Anos</option>
                    <option value="Família & Batizado">Família & Batizado</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Valor Estimado (R$)</label>
                  <input
                    type="number"
                    value={contractValue}
                    onChange={e => setContractValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Data do Evento</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    placeholder="Ex: 14/11/2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Local / Cidade</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Ex: Espaço Villa Vérico, SP"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Notas & Observações</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Expectativas do cliente, estilo visual desejado..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs h-20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setNewClientModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateClient}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Salvar Cliente</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
