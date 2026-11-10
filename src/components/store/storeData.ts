export interface LabPartner {
  id: 'indimagem' | 'digipix';
  name: string;
  tagline: string;
  badge: string;
  location: string;
  specialty: string;
  turnaroundDays: string;
  logo: string;
}

export const labPartners: Record<'indimagem' | 'digipix', LabPartner> = {
  indimagem: {
    id: 'indimagem',
    name: 'Indimagem Álbuns & Encadernação',
    tagline: 'Laboratório Oficial de Álbuns Panorâmicos de Alta Costura',
    badge: 'Parceiro Homologado',
    location: 'Caxias do Sul - RS • Distribuição Brasil',
    specialty: 'Álbuns 180° Layflat, Capas em Linho Francês e Couro Legítimo, Gravação a Laser',
    turnaroundDays: '7 a 10 dias úteis',
    logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
  },
  digipix: {
    id: 'digipix',
    name: 'Digipix Pro Fine Art & Quadros',
    tagline: 'Maior Laboratório Fotográfico Profissional da América Latina',
    badge: 'Parceiro Homologado',
    location: 'Alphaville, Barueri - SP • Distribuição Brasil',
    specialty: 'Quadros Filete, Telas Canvas 100% Algodão, Papéis Hahnemühle e Caixas Nobres',
    turnaroundDays: '3 a 5 dias úteis',
    logo: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=150&q=80',
  },
};

export interface ProductOptionChoice {
  id: string;
  name: string;
  priceModifier: number;
  costModifier: number;
  previewColor?: string;
  previewImg?: string;
}

export interface ProductOptionGroup {
  id: string;
  name: string;
  description: string;
  choices: ProductOptionChoice[];
}

export interface StoreProduct {
  id: string;
  title: string;
  category: 'albuns' | 'quadros' | 'caixas' | 'revelacoes' | 'digitais';
  categoryLabel: string;
  labId: 'indimagem' | 'digipix';
  description: string;
  highlights: string[];
  basePrice: number;      // Preço de venda ao cliente final
  baseLabCost: number;   // Custo cobrado pelo laboratório
  defaultImageUrl: string;
  mockupType: 'album-panoramico' | 'room-view-frame' | 'canvas-3d' | 'box-wood' | 'print-stack' | 'digital-download';
  sizes: {
    id: string;
    label: string;
    dimensions: string;
    price: number;
    labCost: number;
  }[];
  materials?: ProductOptionGroup;
  finishes?: ProductOptionGroup;
}

export const storeProducts: StoreProduct[] = [
  // 1. ÁLBUM PANORÂMICO LUXO (INDIMAGEM)
  {
    id: 'album-panoramico-180',
    title: 'Álbum Panorâmico 180° Layflat Luxo',
    category: 'albuns',
    categoryLabel: 'Álbuns de Casamento',
    labId: 'indimagem',
    description: 'Abertura total 180° sem corte no meio. Papel Silk Seda 800g/m² com laminação UV que não mancha e não retém marcas de dedo. Encadernação manual artesanal com costura de alta resistência.',
    highlights: [
      'Abertura 180° panorâmica contínua',
      'Papel Fotográfico Silk 800g de alta gramatura',
      'Capa dura almofadada em Linho Cru ou Couro Nobre',
      'Gravação personalizada a laser ou Hot Stamping Dourado',
      'Garantia vitalícia contra descolamento de lâminas'
    ],
    basePrice: 1450,
    baseLabCost: 390,
    defaultImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'album-panoramico',
    sizes: [
      { id: '20x30', label: '20x30 cm Fechado (20x60 aberto)', dimensions: '20x30 cm • 40 páginas', price: 1190, labCost: 320 },
      { id: '30x30', label: '30x30 cm Quadrado (30x60 aberto)', dimensions: '30x30 cm • 40 páginas', price: 1450, labCost: 390 },
      { id: '30x42', label: '30x42 cm Panorâmico Master', dimensions: '30x42 cm • 50 páginas', price: 1980, labCost: 520 },
    ],
    materials: {
      id: 'revestimento-capa',
      name: 'Revestimento da Capa',
      description: 'Acabamentos nobres selecionados para a capa do álbum',
      choices: [
        { id: 'linho-areia', name: 'Linho Francês Cru Areia', priceModifier: 0, costModifier: 0, previewColor: '#E6DFD5' },
        { id: 'linho-terracota', name: 'Linho Rústico Terracota', priceModifier: 60, costModifier: 20, previewColor: '#BD6D4D' },
        { id: 'couro-havana', name: 'Couro Legítimo Café Havana', priceModifier: 150, costModifier: 50, previewColor: '#4A2C18' },
        { id: 'veludo-musgo', name: 'Veludo Imperial Verde Musgo', priceModifier: 120, costModifier: 40, previewColor: '#243C2E' },
      ],
    },
    finishes: {
      id: 'gravacao-capa',
      name: 'Personalização da Capa',
      description: 'Inscrição do nome dos noivos e data',
      choices: [
        { id: 'hot-stamping-ouro', name: 'Hot Stamping Dourado Metalizado', priceModifier: 0, costModifier: 0 },
        { id: 'baixo-relevo-cego', name: 'Baixo Relevo Cego Tradicional', priceModifier: 40, costModifier: 15 },
        { id: 'laser-alta-precisao', name: 'Gravação a Laser Queima Profunda', priceModifier: 50, costModifier: 20 },
      ],
    },
  },

  // 2. QUADRO FILETE FINE ART (DIGIPIX PRO)
  {
    id: 'quadro-filete-fineart',
    title: 'Quadro Fine Art com Moldura Filete Nobre',
    category: 'quadros',
    categoryLabel: 'Quadros Emoldurados',
    labId: 'digipix',
    description: 'Impressão Giclée com tintas pigmentadas minerais UltraChrome HDR sobre papel 100% algodão ou fotográfico Lustre 260g. Moldura filete de perfil fino com espaçador e vidro cristalino antirreflexo.',
    highlights: [
      'Moldura de madeira maciça de reflorestamento',
      'Vidro antirreflexo Museum Glass 2mm',
      'Passe-partout livre de ácido (não amarela com o tempo)',
      'Durabilidade museológica estimada em +100 anos',
      'Já vai pronto para pendurar com suporte e cabo de aço'
    ],
    basePrice: 480,
    baseLabCost: 145,
    defaultImageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'room-view-frame',
    sizes: [
      { id: '30x40', label: '30x40 cm (Tamanho Médio)', dimensions: '30x40 cm com paspatur', price: 340, labCost: 110 },
      { id: '50x70', label: '50x70 cm (Mais Vendido para Sala)', dimensions: '50x70 cm com paspatur', price: 480, labCost: 145 },
      { id: '60x90', label: '60x90 cm (Grande Formato Master)', dimensions: '60x90 cm com paspatur', price: 790, labCost: 240 },
    ],
    materials: {
      id: 'cor-moldura',
      name: 'Acabamento da Moldura Filete',
      description: 'Escolha a cor que harmoniza com a decoração',
      choices: [
        { id: 'carvalho-natural', name: 'Carvalho Natural Escandinavo', priceModifier: 0, costModifier: 0, previewColor: '#C8A97E' },
        { id: 'preto-fosco', name: 'Preto Fosco Minimalista', priceModifier: 0, costModifier: 0, previewColor: '#1A1A1A' },
        { id: 'branco-acetinado', name: 'Branco Acetinado Clássico', priceModifier: 0, costModifier: 0, previewColor: '#F5F5F5' },
        { id: 'filete-champagne', name: 'Filete Metálico Champagne', priceModifier: 70, costModifier: 25, previewColor: '#D4AF37' },
      ],
    },
    finishes: {
      id: 'tipo-papel',
      name: 'Papel & Substrato',
      description: 'Certificação e textura fotográfica',
      choices: [
        { id: 'lustre-pro', name: 'Lustre Pro 260g (Acetinado Vibrante)', priceModifier: 0, costModifier: 0 },
        { id: 'hahnemuhle-rag', name: 'Hahnemühle Photo Rag 308g (100% Algodão Fine Art)', priceModifier: 95, costModifier: 35 },
      ],
    },
  },

  // 3. TELA CANVAS EM CHASSI DE MADEIRA (DIGIPIX PRO)
  {
    id: 'tela-canvas-chassi',
    title: 'Tela Canvas Fine Art em Chassi Nobre 4cm',
    category: 'quadros',
    categoryLabel: 'Quadros Emoldurados',
    labId: 'digipix',
    description: 'Tecido Canvas 100% algodão natural impresso com alta saturação e esticado sobre chassi de madeira pinus tratada de 4cm. O acabamento com borda dobrada dispensa moldura e confere ar contemporâneo estilo galeria de arte.',
    highlights: [
      'Tecido canvas genuíno de algodão 380g',
      'Chassi de madeira 4cm de espessura imunizada contra pragas',
      'Borda espelhada contínua para continuidade da foto',
      'Laminação fosca de proteção contra raios solares e umidade',
      'Efeito pintura a óleo realista'
    ],
    basePrice: 390,
    baseLabCost: 120,
    defaultImageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'canvas-3d',
    sizes: [
      { id: '40x60', label: '40x60 cm Clássico', dimensions: '40x60 cm • Chassi 4cm', price: 390, labCost: 120 },
      { id: '60x90', label: '60x90 cm Impacto Sala', dimensions: '60x90 cm • Chassi 4cm', price: 580, labCost: 175 },
      { id: '80x120', label: '80x120 cm Painel Monumental', dimensions: '80x120 cm • Chassi 4cm', price: 920, labCost: 290 },
    ],
  },

  // 4. CAIXA DE MEMÓRIAS EM MADEIRA CARVALHO C/ PEN DRIVE E FOTOS (DIGIPIX/INDIMAGEM)
  {
    id: 'caixa-madeira-fotos-pendrive',
    title: 'Caixa de Memórias em Carvalho c/ Pen Drive & 50 Fotos',
    category: 'caixas',
    categoryLabel: 'Caixas de Memórias & Pen Drives',
    labId: 'indimagem',
    description: 'Caixa artesanal produzida em madeira maciça de carvalho com fecho magnético oculto e tampa personalizada gravada a laser. Contém 50 impressões 10x15 em Papel Silk Seda com borda de 3mm e Pen Drive USB 3.0 de 32GB em madeira correspondente.',
    highlights: [
      'Madeira maciça nobre de reflorestamento com toque acetinado',
      '50 impressões 10x15cm em Papel Fotográfico Silk Seda',
      'Pen Drive 32GB USB 3.0 Ultra Rápido gravado a laser',
      'Berço interno almofadado em linho natural cru',
      'O presente mais emocionante para pais e padrinhos'
    ],
    basePrice: 520,
    baseLabCost: 160,
    defaultImageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'box-wood',
    sizes: [
      { id: 'box-50', label: 'Caixa Carvalho + 50 Fotos 10x15 + Pen Drive 32GB', dimensions: '20x15x6 cm', price: 520, labCost: 160 },
      { id: 'box-100', label: 'Caixa Carvalho Master + 100 Fotos 10x15 + Pen Drive 64GB', dimensions: '20x15x9 cm', price: 740, labCost: 230 },
    ],
  },

  // 5. PACK DE REVELAÇÕES FINE ART EM PAPEL SEDA (DIGIPIX PRO)
  {
    id: 'pack-revelacoes-seda',
    title: 'Pack Revelações em Papel Fotográfico Seda (20 Fotos)',
    category: 'revelacoes',
    categoryLabel: 'Impressões Avulsas',
    labId: 'digipix',
    description: 'Kit com 20 ampliações em papel fotográfico profissional Fujifilm DPII Silk Touch. Textura sofisticada que impede marcas de dedos e reflexos incômodos sob luz direta. Acompanha envelope protetor rígido em papel kraft premium.',
    highlights: [
      'Papel fotográfico químico original Fujifilm DPII Silk 240g',
      'Bordas brancas clássicas de 4mm opcionais',
      'Cores fiéis com calibração sRGB certificada',
      'Envelope protetor kraft com selo de cera para presentear'
    ],
    basePrice: 160,
    baseLabCost: 38,
    defaultImageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'print-stack',
    sizes: [
      { id: 'pack-15x21', label: '20 Fotos Tamanho 15x21 cm', dimensions: '15x21 cm • 20 cópias', price: 160, labCost: 38 },
      { id: 'pack-20x30', label: '15 Fotos Tamanho 20x30 cm', dimensions: '20x30 cm • 15 cópias', price: 210, labCost: 52 },
    ],
  },

  // 6. PACOTE DIGITAL MASTER EM ALTA RESOLUÇÃO (ZERO CUSTO)
  {
    id: 'pacote-digital-alta',
    title: 'Download Oficial em Resolução Máxima (24 Megapixels)',
    category: 'digitais',
    categoryLabel: 'Arquivos Digitais',
    labId: 'digipix',
    description: 'Arquivos originais em resolução total de estúdio (6000x4000 pixels a 300 DPI) com licença perpétua e irrestrita para reprodução pessoal, impressão e postagem em redes sociais.',
    highlights: [
      'Zero custo gráfico de produção (100% de lucro líquido para você)',
      'Liberação instantânea após compensação do PIX ou Cartão',
      'Sem compressão de qualidade (qualidade idêntica ao arquivo da câmera)',
      'Backup em nuvem garantido por 10 anos no Cadu\'s Fotos'
    ],
    basePrice: 390,
    baseLabCost: 0,
    defaultImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'digital-download',
    sizes: [
      { id: 'single-photo', label: '1 Foto Avulsa em Alta Resolução (300 DPI)', dimensions: 'Arquivo Digital 24MP', price: 45, labCost: 0 },
      { id: 'all-photos', label: 'Galeria Completa em Alta Resolução (+300 Fotos)', dimensions: 'Coleção Digital Completa', price: 390, labCost: 0 },
    ],
  },
];

export interface CartItem {
  cartId: string;
  product: StoreProduct;
  selectedPhotoUrl: string;
  selectedPhotoFilename: string;
  selectedSize: StoreProduct['sizes'][0];
  selectedMaterial?: ProductOptionChoice;
  selectedFinish?: ProductOptionChoice;
  customText?: string;
  quantity: number;
  unitPrice: number;
  unitLabCost: number;
}

export interface StoreOrder {
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  shippingAddress: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  shippingMethod: string;
  shippingCost: number;
  items: CartItem[];
  totalPrice: number;
  totalLabCost: number;
  photographerProfit: number;
  paymentMethod: 'PIX' | 'Cartão 12x';
  paymentStatus: 'pago' | 'aguardando_pix';
  labStatus: 'hold_fotografo' | 'enviado_lab' | 'em_producao' | 'enviado_transportadora' | 'entregue';
  labPartner: 'Indimagem' | 'Digipix Pro';
  trackingCode?: string;
  createdAt: string;
  pixQrCodeUrl?: string;
  pixCopyPaste?: string;
}

export const initialOrders: StoreOrder[] = [
  {
    orderNumber: 'CF-2026-9812',
    clientName: 'Isabela Silveira & Rodrigo Prado',
    clientPhone: '(11) 98765-4321',
    clientEmail: 'isabela.silveira@gmail.com',
    shippingAddress: {
      street: 'Alameda Gabriel Monteiro da Silva',
      number: '1420, Apto 82',
      neighborhood: 'Jardim América',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01442-001',
    },
    shippingMethod: 'Jadlog Express',
    shippingCost: 38.5,
    items: [
      {
        cartId: 'c1',
        product: storeProducts[0],
        selectedPhotoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        selectedPhotoFilename: 'DSC_0520.jpg',
        selectedSize: storeProducts[0].sizes[1],
        selectedMaterial: storeProducts[0].materials?.choices[0],
        selectedFinish: storeProducts[0].finishes?.choices[0],
        customText: 'Isabela & Rodrigo • 24.10.2026',
        quantity: 1,
        unitPrice: 1450,
        unitLabCost: 390,
      },
      {
        cartId: 'c2',
        product: storeProducts[1],
        selectedPhotoUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        selectedPhotoFilename: 'DSC_0312.jpg',
        selectedSize: storeProducts[1].sizes[1],
        selectedMaterial: storeProducts[1].materials?.choices[0],
        selectedFinish: storeProducts[1].finishes?.choices[1],
        quantity: 1,
        unitPrice: 575,
        unitLabCost: 180,
      },
    ],
    totalPrice: 2063.5,
    totalLabCost: 570,
    photographerProfit: 1455,
    paymentMethod: 'PIX',
    paymentStatus: 'pago',
    labStatus: 'hold_fotografo',
    labPartner: 'Indimagem',
    trackingCode: 'JAD-BR-9982410-SP',
    createdAt: 'Hoje às 10:45',
  },
  {
    orderNumber: 'CF-2026-9784',
    clientName: 'Mariana Drummond (Mãe da Noiva)',
    clientPhone: '(11) 99123-8877',
    clientEmail: 'mariana.drummond@uol.com.br',
    shippingAddress: {
      street: 'Rua Bela Cintra',
      number: '980',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01415-000',
    },
    shippingMethod: 'Sedex',
    shippingCost: 26.0,
    items: [
      {
        cartId: 'c3',
        product: storeProducts[3],
        selectedPhotoUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
        selectedPhotoFilename: 'DSC_0411.jpg',
        selectedSize: storeProducts[3].sizes[0],
        customText: 'Lembrança Especial • Família Silveira',
        quantity: 1,
        unitPrice: 520,
        unitLabCost: 160,
      },
    ],
    totalPrice: 546.0,
    totalLabCost: 160,
    photographerProfit: 360,
    paymentMethod: 'Cartão 12x',
    paymentStatus: 'pago',
    labStatus: 'em_producao',
    labPartner: 'Indimagem',
    trackingCode: 'SEDEX-SP-7712390BR',
    createdAt: 'Ontem às 16:20',
  },
];

// 🎁 MELHORIA 1: LISTA DE PRESENTES DE CASAMENTO & COTAS DE ÁLBUM
export interface GiftCrowdfundOption {
  id: string;
  title: string;
  description: string;
  amount: number;
  badge?: string;
  iconType: 'cota' | 'album-integral' | 'parent-duo';
}

export const initialGiftCotas: GiftCrowdfundOption[] = [
  {
    id: 'cota-100',
    title: 'Cota Abraço de Amor',
    description: 'Contribuição para a impressão das lâminas de alta gramatura do álbum.',
    amount: 100,
    iconType: 'cota',
  },
  {
    id: 'cota-250',
    title: 'Cota Padrinhos Especiais',
    description: 'Ajude os noivos a garantirem a encadernação nobre em linho francês com hot stamping.',
    amount: 250,
    badge: 'Mais Escolhida',
    iconType: 'cota',
  },
  {
    id: 'cota-500',
    title: 'Cota Família de Ouro',
    description: 'Garante 50% de todo o custo de produção do álbum panorâmico 180° dos noivos.',
    amount: 500,
    badge: 'Destaque',
    iconType: 'cota',
  },
  {
    id: 'presente-album-integral',
    title: 'Presentear o Álbum 180° Inteiro',
    description: 'Presente inesquecível: cubra integralmente o Álbum Panorâmico de Casamento com dedicatória especial gravada.',
    amount: 1450,
    badge: 'Presente dos Pais/Padrinhos',
    iconType: 'album-integral',
  },
  {
    id: 'combo-album-pais',
    title: 'Combo 2 Mini-Álbuns dos Pais (20x20)',
    description: '2 réplicas exatas do álbum principal produzidas pela Indimagem para presentear os pais dos noivos com 35% OFF.',
    amount: 790,
    badge: '35% de Desconto',
    iconType: 'parent-duo',
  },
];

// 🤖 MELHORIA 2: IA RECOMENDAÇÃO INTELIGENTE DE DECORAÇÃO & LAYOUT
export interface AiDecorRecommendation {
  id: string;
  photoId: number;
  photoUrl: string;
  photoTitle: string;
  recommendedProductTitle: string;
  recommendedSize: string;
  recommendedFrame: string;
  aiRationale: string;
  simulatedPrice: number;
  type: 'room-frame' | 'canvas' | 'album-spread';
}

export const sampleAiRecommendations: AiDecorRecommendation[] = [
  {
    id: 'ai-rec-1',
    photoId: 10,
    photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    photoTitle: 'O Grande Sim no Altar',
    recommendedProductTitle: 'Quadro Fine Art com Moldura Filete',
    recommendedSize: '60x90 cm (Impacto Sala)',
    recommendedFrame: 'Carvalho Natural Escandinavo',
    aiRationale: 'A iluminação natural difusa e a composição horizontal com o casal ao centro tornam esta foto ideal para destaque sobre o sofá na sala de estar.',
    simulatedPrice: 790,
    type: 'room-frame',
  },
  {
    id: 'ai-rec-2',
    photoId: 3,
    photoUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    photoTitle: 'O Olhar dos Noivos na Cerimônia',
    recommendedProductTitle: 'Álbum Panorâmico 180° Layflat',
    recommendedSize: 'Lâmina Dupla Central (Abertura 180°)',
    recommendedFrame: 'Linho Francês Cru Areia',
    aiRationale: 'Classificada com 5 estrelas pela noiva. O enquadramento fechado e a alta carga emotiva fazem desta foto a peça perfeita para a página central do álbum.',
    simulatedPrice: 1450,
    type: 'album-spread',
  },
  {
    id: 'ai-rec-3',
    photoId: 5,
    photoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    photoTitle: 'Primeira Dança dos Noivos',
    recommendedProductTitle: 'Tela Canvas Fine Art em Chassi 4cm',
    recommendedSize: '50x70 cm',
    recommendedFrame: 'Borda Infinita Dobrada',
    aiRationale: 'O contraste da iluminação cenográfica e o movimento do vestido criam uma textura artística perfeita para a trama de algodão canvas.',
    simulatedPrice: 480,
    type: 'canvas',
  },
];
