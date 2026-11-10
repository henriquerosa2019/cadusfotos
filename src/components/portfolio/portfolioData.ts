export interface PortfolioCollection {
  id: string;
  title: string;
  category: 'casamentos' | 'pre-wedding' | 'familia' | 'destination';
  categoryLabel: string;
  subtitle: string;
  date: string;
  location: string;
  coverImage: string;
  photosCount: number;
  highlightPhotos: string[];
  story: string;
}

export interface Testimonial {
  id: string;
  coupleNames: string;
  eventDate: string;
  photoUrl: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PortfolioSiteConfig {
  photographerName: string;
  tagline: string;
  subtagline: string;
  aboutText: string[];
  location: string;
  awards: string[];
  stats: { label: string; value: string }[];
  whatsapp: string;
  instagram: string;
  email: string;
  heroImage: string;
  photographerPhoto: string;
}

export const initialPortfolioConfig: PortfolioSiteConfig = {
  photographerName: "Carlos 'Cadu' Eduardo",
  tagline: "Fotografia com alma, luz natural e emoções sem pose.",
  subtagline: "Contando histórias de amor e família por todo o Brasil e pelo mundo há mais de uma década.",
  aboutText: [
    "Olá, eu sou o Cadu. Acredito que as melhores memórias de um casamento ou ensaio não acontecem quando você olha fixamente para a lente, mas sim quando você se esquece completamente de que eu estou ali.",
    "Com um olhar essencialmente documental e poético, busco registrar os abraços apertados, o choro contido do pai ao ver a noiva pronta, as gargalhadas espontâneas na pista e a calmaria da Golden Hour.",
    "Cada casal que fotografo recebe muito mais do que arquivos digitais: entrego um patrimônio visual para as futuras gerações reviverem o que sentiram naquele dia."
  ],
  location: "São Paulo, SP • Atende todo o Brasil & Destination Weddings",
  awards: [
    "Inspiration Photographers Award 2024 & 2025",
    "Top 20 Casamentos Brasil — Bride Association",
    "Membro Oficial Fearless Photographers",
    "Mais de 350 casamentos registrados com nota máxima"
  ],
  stats: [
    { label: "Anos de Carreira", value: "11+" },
    { label: "Casamentos Realizados", value: "380+" },
    { label: "Prêmios Nacionais & Internacionais", value: "24" },
    { label: "Avaliação Média dos Noivos", value: "5.0 ★" }
  ],
  whatsapp: "5511987654321",
  instagram: "@cadusfotos",
  email: "contato@cadusfotos.com.br",
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85",
  photographerPhoto: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80"
};

export const initialCollections: PortfolioCollection[] = [
  {
    id: 'isabela-rodrigo',
    title: 'Isabela & Rodrigo',
    category: 'casamentos',
    categoryLabel: 'Casamento Clássico & Editorial',
    subtitle: 'Uma celebração sofisticada e emocionante nos Jardins',
    date: 'Outubro de 2026',
    location: 'Villa Bisutti • São Paulo, SP',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    photosCount: 184,
    story: 'Um casamento marcado pela elegância e emoção genuína. Cerimônia iluminada por velas, votos profundos e uma festa que durou até o amanhecer.',
    highlightPhotos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1681490405180-bb1638c84d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'bruna-eduardo',
    title: 'Bruna & Eduardo',
    category: 'casamentos',
    categoryLabel: 'Casamento no Campo & Rústico Chic',
    subtitle: 'Luz dourada do entardecer entre árvores centenárias',
    date: 'Setembro de 2026',
    location: 'Fazenda Vila Rica • Itatiba, SP',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    photosCount: 210,
    story: 'Aconchegante, ao ar livre e cercado pela natureza. Um pôr do sol inesquecível de tirar o fôlego que banhou a cerimônia com tons âmbar.',
    highlightPhotos: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'mariana-felipe',
    title: 'Mariana & Felipe',
    category: 'destination',
    categoryLabel: 'Destination & Elopement Wedding',
    subtitle: 'Votos íntimos à beira-mar com o barulho das ondas',
    date: 'Novembro de 2026',
    location: 'Praia do Curral • Ilhabela, SP',
    coverImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    photosCount: 145,
    story: 'Pés descalços na areia, céu com tons lilás e uma conexão intensa entre os dois e seus 25 convidados mais próximos.',
    highlightPhotos: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'camila-andre',
    title: 'Camila & André',
    category: 'pre-wedding',
    categoryLabel: 'Ensaio Pré-Wedding na Serra',
    subtitle: 'O romance nas montanhas com neblina e clima acolhedor',
    date: 'Agosto de 2026',
    location: 'Campos do Jordão, SP',
    coverImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    photosCount: 96,
    story: 'Um passeio leve e descontraído pelas florestas de pinheiros, com café quente e abraços verdadeiros.',
    highlightPhotos: [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'familia-silveira',
    title: 'Larissa, Thiago & Lucas',
    category: 'familia',
    categoryLabel: 'Ensaio de Gestante & Família',
    subtitle: 'A doce espera de uma nova vida',
    date: 'Julho de 2026',
    location: 'Parque Ibirapuera • São Paulo, SP',
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    photosCount: 78,
    story: 'Luz natural suave filtrada pelas árvores, carinho na barriga e a pureza de um momento único na história dessa família.',
    highlightPhotos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    coupleNames: 'Isabela & Rodrigo',
    eventDate: 'Casamento no Villa Bisutti',
    photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80',
    quote: 'O Cadu não registrou apenas imagens bonitas, ele congelou as sensações do dia mais importante das nossas vidas. Quando abrimos a galeria com a trilha sonora, desabamos de chorar de emoção. Simplesmente impecável!',
    rating: 5
  },
  {
    id: 't2',
    coupleNames: 'Bruna & Eduardo',
    eventDate: 'Casamento na Fazenda Vila Rica',
    photoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80',
    quote: 'Minha maior preocupação era ficar engessada nas fotos. O Cadu nos deixou tão à vontade que parecia um amigo de anos. As fotos no campo ficaram surreais, dignas de capa de revista.',
    rating: 5
  },
  {
    id: 't3',
    coupleNames: 'Mariana & Felipe',
    eventDate: 'Elopement em Ilhabela',
    photoUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=300&q=80',
    quote: 'A atenção aos detalhes, a pontualidade, o contrato digital transparente e a agilidade nas prévias nos impressionaram. O álbum encadernado Indimagem que recebemos é a joia da nossa sala.',
    rating: 5
  }
];

export const initialFaqs: FaqItem[] = [
  {
    question: 'Qual é o prazo para a entrega das fotos?',
    answer: 'Entregamos uma prévia de 25 a 40 fotos em até 48 horas úteis para matar a ansiedade e postar nas redes sociais. A galeria completa tratada e em alta resolução é liberada em até 25 dias úteis com acesso exclusivo por PIN.'
  },
  {
    question: 'Você fotografa fora de São Paulo?',
    answer: 'Sim! Mais de 40% dos nossos casamentos e ensaios são realizados em cidades do interior, litoral e em outros estados (Rio de Janeiro, Bahia, Minas Gerais, Paraná e destinos internacionais). Temos pacotes já com logística inclusa.'
  },
  {
    question: 'Como funciona a segurança dos arquivos e backup?',
    answer: 'Utilizamos câmeras profissionais com gravação simultânea em 2 cartões de memória de alta velocidade (backup instantâneo no ato do clique). Logo após o evento, é feito backup triplo em SSDs protegidos e em nuvem criptografada.'
  },
  {
    question: 'Como fazemos para reservar a data do nosso casamento?',
    answer: 'Trabalhamos com reserva exclusiva por data para garantir dedicação total. A reserva é confirmada mediante assinatura do nosso contrato digital com validade jurídica e pagamento do sinal via PIX parcelado.'
  }
];
