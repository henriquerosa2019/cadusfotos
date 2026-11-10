export type ClientStatus = 'lead' | 'orcamento_enviado' | 'contrato_assinado' | 'sessao_agendada' | 'fotos_entregues' | 'concluido';

export type EventType = 'Casamento' | 'Pré-Wedding' | 'Ensaio Gestante' | 'Corporativo & Branding' | '15 Anos' | 'Família & Batizado';

export interface StudioClient {
  id: string;
  name: string;
  partnerName?: string;
  email: string;
  phone: string; // WhatsApp
  eventType: EventType;
  eventDate: string;
  location: string;
  status: ClientStatus;
  totalContractValue: number;
  paidValue: number;
  notes: string;
  avatarUrl: string;
  createdAt: string;
}

export interface StudioContract {
  id: string;
  contractNumber: string;
  clientId: string;
  clientName: string;
  eventType: EventType;
  eventDate: string;
  totalValue: number;
  status: 'rascunho' | 'enviado' | 'assinado' | 'recusado';
  createdAt: string;
  signedAt?: string;
  signerIp?: string;
  signatureImage?: string;
  clauses: {
    title: string;
    content: string;
  }[];
}

export interface StudioInvoice {
  id: string;
  contractId: string;
  clientId: string;
  clientName: string;
  description: string;
  installmentNumber: number;
  totalInstallments: number;
  amount: number;
  dueDate: string;
  status: 'pago' | 'pendente' | 'atrasado';
  paidAt?: string;
  pixCode: string;
  pixQrCodeUrl: string;
}

export interface StudioBooking {
  id: string;
  clientId: string;
  clientName: string;
  eventType: EventType;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  status: 'confirmado' | 'pendente' | 'realizado';
  photographerTeam: string;
  equipmentChecklist: string[];
  notes: string;
}

export const initialClients: StudioClient[] = [
  {
    id: 'cli-1',
    name: 'Isabela Silveira',
    partnerName: 'Rodrigo Prado',
    email: 'isabela.silveira@gmail.com',
    phone: '(11) 98765-4321',
    eventType: 'Casamento',
    eventDate: '24/10/2026',
    location: 'Espaço Villa Vérico, Itaim Bibi - SP',
    status: 'contrato_assinado',
    totalContractValue: 9800,
    paidValue: 3920,
    notes: 'Pacote Master: Cobertura Completa 10h + Álbum 30x30 Indimagem + Ensaio Pré-Wedding incluso.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: '15/01/2026',
  },
  {
    id: 'cli-2',
    name: 'Mariana Duarte',
    partnerName: 'Lucas Ferreira',
    email: 'mari.duarte@hotmail.com',
    phone: '(19) 99123-8877',
    eventType: 'Ensaio Gestante',
    eventDate: '18/11/2026',
    location: 'Campos de Lavanda, Holambra - SP',
    status: 'sessao_agendada',
    totalContractValue: 2400,
    paidValue: 1200,
    notes: '28ª semana de gestação. Quer ensaio ao pôr do sol no campo de lavandas com troca de 2 vestidos.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    createdAt: '02/02/2026',
  },
  {
    id: 'cli-3',
    name: 'Dr. Felipe Arantes',
    email: 'contato@arantesadvocacia.com.br',
    phone: '(11) 97654-1122',
    eventType: 'Corporativo & Branding',
    eventDate: '28/11/2026',
    location: 'Edifício Birmann 32, Av. Faria Lima - SP',
    status: 'orcamento_enviado',
    totalContractValue: 3800,
    paidValue: 0,
    notes: 'Retratos corporativos de posicionamento para 6 sócios e fotos do ambiente do escritório para novo website.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    createdAt: '08/02/2026',
  },
  {
    id: 'cli-4',
    name: 'Beatriz Vasconcellos',
    partnerName: 'Thiago Mendes',
    email: 'bia.vasconcellos@gmail.com',
    phone: '(12) 98844-3322',
    eventType: 'Pré-Wedding',
    eventDate: '05/12/2026',
    location: 'Praia da Feiticeira, Ilhabela - SP',
    status: 'contrato_assinado',
    totalContractValue: 3200,
    paidValue: 3200,
    notes: 'Ensaio de praia no nascer do sol. Contrato integralmente quitado via PIX com 5% de desconto.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    createdAt: '20/01/2026',
  },
  {
    id: 'cli-5',
    name: 'Camila & Roberto Guimarães',
    email: 'camila.guimaraes@uol.com.br',
    phone: '(11) 99432-1100',
    eventType: 'Família & Batizado',
    eventDate: '12/12/2026',
    location: 'Paróquia Nossa Senhora do Brasil, Jardins - SP',
    status: 'lead',
    totalContractValue: 1900,
    paidValue: 0,
    notes: 'Batizado da Cecília. Enviada apresentação de portfólio. Aguardando retorno da mãe.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    createdAt: '09/02/2026',
  },
];

export const initialContracts: StudioContract[] = [
  {
    id: 'ctr-101',
    contractNumber: 'CTR-2026-084',
    clientId: 'cli-1',
    clientName: 'Isabela Silveira & Rodrigo Prado',
    eventType: 'Casamento',
    eventDate: '24 de Outubro de 2026',
    totalValue: 9800,
    status: 'assinado',
    createdAt: '16/01/2026 às 14:32',
    signedAt: '17/01/2026 às 19:48',
    signerIp: '189.40.112.45 (São Paulo/SP)',
    signatureImage: 'Isabela Silveira & Rodrigo Prado',
    clauses: [
      {
        title: 'Cláusula 1ª — Do Objeto da Prestação de Serviços',
        content: 'O presente contrato tem por objeto a prestação de serviços de cobertura fotográfica profissional do casamento dos CONTRATANTES, a ser realizado no dia 24/10/2026 no Espaço Villa Vérico, com duração prevista de até 10 (dez) horas ininterruptas de cobertura por 2 fotógrafos profissionais.',
      },
      {
        title: 'Cláusula 2ª — Da Entrega das Fotos e Prazos',
        content: 'O FOTÓGRAFO disponibilizará a galeria online completa contendo todas as fotografias tratadas individualmente em alta resolução (300 DPI) no prazo improrrogável de até 35 (trinta e cinco) dias úteis após a data do evento.',
      },
      {
        title: 'Cláusula 3ª — Do Álbum Panorâmico de Alta Costura',
        content: 'Está incluso no pacote contratado 1 (um) Álbum Fotográfico Panorâmico 30x30 cm com abertura 180° Layflat, 40 páginas em Papel Silk Seda 800g/m², com capa dura almofadada em Linho Francês e gravação a laser personalizada, confeccionado pelo laboratório parceiro homologado Indimagem.',
      },
      {
        title: 'Cláusula 4ª — Dos Direitos Autorais e Divulgação (Lei 9.610/98)',
        content: 'Os direitos autorais das obras fotográficas pertencem ao FOTÓGRAFO nos termos da Lei Federal 9.610/98, sendo concedida aos CONTRATANTES licença de uso pessoal e irrestrito. Os CONTRATANTES autorizam a veiculação seletiva e ética de imagens para fins exclusivos de divulgação de portfólio autoral do estúdio.',
      },
      {
        title: 'Cláusula 5ª — Das Condições de Pagamento via PIX Parcelado',
        content: 'O valor total de R$ 9.800,00 será liquidado em 3 parcelas: 1ª parcela de R$ 3.920,00 paga como sinal para reserva exclusiva da data; 2ª parcela de R$ 2.940,00 até 10/09/2026; e 3ª parcela de R$ 2.940,00 até 10/10/2026 (14 dias antes do evento).',
      },
    ],
  },
  {
    id: 'ctr-102',
    contractNumber: 'CTR-2026-092',
    clientId: 'cli-2',
    clientName: 'Mariana Duarte & Lucas Ferreira',
    eventType: 'Ensaio Gestante',
    eventDate: '18 de Novembro de 2026',
    totalValue: 2400,
    status: 'enviado',
    createdAt: '03/02/2026 às 10:15',
    clauses: [
      {
        title: 'Cláusula 1ª — Do Ensaio Fotográfico Gestante',
        content: 'Cobertura fotográfica de ensaio externo em Holambra/SP com duração de 2h30min, incluindo direção de poses, 50 fotos digitais tratadas em alta resolução e 1 Caixa de Memórias em Carvalho com pen drive de 32GB.',
      },
      {
        title: 'Cláusula 2ª — Da Condição de Clima e Reagendamento',
        content: 'Em caso de chuva torrencial ou tempestade no local do ensaio externo, fica assegurado à CONTRATANTE o direito de reagendamento sem incidência de multa ou taxa adicional em até 15 dias.',
      },
    ],
  },
];

export const initialInvoices: StudioInvoice[] = [
  {
    id: 'inv-1',
    contractId: 'ctr-101',
    clientId: 'cli-1',
    clientName: 'Isabela Silveira & Rodrigo Prado',
    description: 'Sinal de Reserva da Data (40% do Contrato de Casamento)',
    installmentNumber: 1,
    totalInstallments: 3,
    amount: 3920,
    dueDate: '17/01/2026',
    status: 'pago',
    paidAt: '17/01/2026 às 19:52',
    pixCode: '00020126580014br.gov.bcb.pix0136cadusfotos-inv-1-pago5204000053039865403920.005802BR5925CADUS FOTOS6009SAO PAULO62070503***630489AB',
    pixQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=cadus-fotos-pix-inv-1',
  },
  {
    id: 'inv-2',
    contractId: 'ctr-101',
    clientId: 'cli-1',
    clientName: 'Isabela Silveira & Rodrigo Prado',
    description: '2ª Parcela Intermediária do Casamento',
    installmentNumber: 2,
    totalInstallments: 3,
    amount: 2940,
    dueDate: '10/09/2026',
    status: 'pendente',
    pixCode: '00020126580014br.gov.bcb.pix0136cadusfotos-inv-2-pendente5204000053039865402940.005802BR5925CADUS FOTOS6009SAO PAULO62070503***6304C1D4',
    pixQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=cadus-fotos-pix-inv-2',
  },
  {
    id: 'inv-3',
    contractId: 'ctr-101',
    clientId: 'cli-1',
    clientName: 'Isabela Silveira & Rodrigo Prado',
    description: '3ª Parcela Final (Saldo Pré-Evento)',
    installmentNumber: 3,
    totalInstallments: 3,
    amount: 2940,
    dueDate: '10/10/2026',
    status: 'pendente',
    pixCode: '00020126580014br.gov.bcb.pix0136cadusfotos-inv-3-pendente5204000053039865402940.005802BR5925CADUS FOTOS6009SAO PAULO62070503***6304E5F6',
    pixQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=cadus-fotos-pix-inv-3',
  },
  {
    id: 'inv-4',
    contractId: 'ctr-102',
    clientId: 'cli-2',
    clientName: 'Mariana Duarte',
    description: 'Entrada 50% Ensaio Gestante Holambra',
    installmentNumber: 1,
    totalInstallments: 2,
    amount: 1200,
    dueDate: '05/02/2026',
    status: 'pago',
    paidAt: '04/02/2026 às 11:20',
    pixCode: '00020126580014br.gov.bcb.pix0136cadusfotos-inv-4-pago5204000053039865401200.005802BR5925CADUS FOTOS6009SAO PAULO62070503***6304A1B2',
    pixQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=cadus-fotos-pix-inv-4',
  },
  {
    id: 'inv-5',
    contractId: 'ctr-102',
    clientId: 'cli-2',
    clientName: 'Mariana Duarte',
    description: 'Saldo Final 50% Ensaio Gestante',
    installmentNumber: 2,
    totalInstallments: 2,
    amount: 1200,
    dueDate: '15/11/2026',
    status: 'pendente',
    pixCode: '00020126580014br.gov.bcb.pix0136cadusfotos-inv-5-pendente5204000053039865401200.005802BR5925CADUS FOTOS6009SAO PAULO62070503***6304B2C3',
    pixQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=cadus-fotos-pix-inv-5',
  },
];

export const initialBookings: StudioBooking[] = [
  {
    id: 'bk-1',
    clientId: 'cli-2',
    clientName: 'Mariana Duarte & Lucas Ferreira',
    eventType: 'Ensaio Gestante',
    title: 'Ensaio Gestante Lavandas ao Pôr do Sol',
    date: '18/11/2026 (Sábado)',
    time: '15:30 às 18:00',
    location: 'Campos de Lavanda Floricultura',
    address: 'Rodovia SP-107, km 32, Holambra - SP',
    status: 'confirmado',
    photographerTeam: 'Cadu (Fotógrafo Principal)',
    equipmentChecklist: [
      'Sony A7 IV + Lente 85mm f/1.4 GM',
      'Sony A7 III + Lente 24-70mm f/2.8 GM',
      'Rebatedor Oval 5 em 1 (Dourado/Prata)',
      '4 Baterias NP-FZ100 carregadas',
      'Cartões de Memória SD UHS-II V90',
    ],
    notes: 'Chegar às 15h00 para reconhecer o campo e orientar a troca de vestido antes do Golden Hour.',
  },
  {
    id: 'bk-2',
    clientId: 'cli-1',
    clientName: 'Isabela Silveira & Rodrigo Prado',
    eventType: 'Casamento',
    title: 'Casamento Religioso & Recepção de Gala',
    date: '24/10/2026 (Sábado)',
    time: '14:00 às 02:00 (12h de cobertura)',
    location: 'Espaço Villa Vérico',
    address: 'R. Santa Justina, 329 - Vila Olímpia, São Paulo - SP',
    status: 'confirmado',
    photographerTeam: 'Cadu (Principal) + Marcos (2º Fotógrafo) + Assistente de Luz',
    equipmentChecklist: [
      '2x Sony A7 IV + Lentes 35mm f/1.4 e 85mm f/1.4',
      '2x Flashes Godox V1 + Transmissor XPro',
      '2x Softboxes portáteis octogonais 60cm',
      'Baterias extras e carregador rápido',
      'Cartões de backup espelhados (Slot 1 + Slot 2 gravando RAW duplo)',
    ],
    notes: 'Making-of da Noiva começa às 14h no Hotel Fasano Jardins. Cerimônia às 18h no Villa Vérico.',
  },
  {
    id: 'bk-3',
    clientId: 'cli-4',
    clientName: 'Beatriz & Thiago',
    eventType: 'Pré-Wedding',
    title: 'Ensaio Pré-Wedding Praia & Costão',
    date: '05/12/2026 (Sábado)',
    time: '05:30 às 09:00 (Nascer do Sol)',
    location: 'Praia da Feiticeira',
    address: 'Ilhabela - SP (Acesso pela balsa de São Sebastião)',
    status: 'confirmado',
    photographerTeam: 'Cadu + Drone DJI Mini 4 Pro',
    equipmentChecklist: [
      'Drone homologado ANAC + 3 baterias',
      'Lente 50mm f/1.2 GM para retratos cremosos',
      'Filtro Polarizador Circular (CPL) contra reflexos do mar',
    ],
    notes: 'Travessia da balsa às 04h45 da manhã para pegar a primeira luz no costão de pedras.',
  },
];
