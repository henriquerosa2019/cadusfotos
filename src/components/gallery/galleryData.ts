export interface RetouchComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface GalleryPhoto {
  id: number;
  filename: string;
  category: 'making-of' | 'cerimonia' | 'ensaio' | 'festa';
  title: string;
  url: string;
  aspectRatio: 'horizontal' | 'vertical' | 'square';
  isFavorite: boolean;
  comments: RetouchComment[];
  resolution: string;
  filesize: string;
}

export interface GalleryConfig {
  id: string;
  title: string;
  coupleNames: string;
  eventDate: string;
  location: string;
  coverImage: string;
  welcomeMessage: string;
  albumSelectionLimit: number;
  pinCode: string;
  downloadsEnabled: boolean;
  totalViews: number;
}

export const initialGalleryConfig: GalleryConfig = {
  id: 'galeria-isabela-rodrigo',
  title: 'Isabela & Rodrigo — A Celebração do Amor',
  coupleNames: 'Isabela & Rodrigo',
  eventDate: '24 de Outubro de 2026',
  location: 'Villa Bisutti • São Paulo, SP',
  coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85',
  welcomeMessage: 'Queridos amigos e familiares, sejam muito bem-vindos à nossa galeria oficial de fotos. Selecionem suas favoritas com o coração e aproveitem cada momento desta data inesquecível!',
  albumSelectionLimit: 70,
  pinCode: '2026',
  downloadsEnabled: true,
  totalViews: 342,
};

export const initialPhotos: GalleryPhoto[] = [
  // Making-of
  {
    id: 1,
    filename: 'DSC_0102.jpg',
    category: 'making-of',
    title: 'Os Últimos Toques no Vestido',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'horizontal',
    isFavorite: true,
    comments: [
      {
        id: 'c1',
        author: 'Isabela (Noiva)',
        text: 'Amei este ângulo da renda! Por favor, usar na abertura do capítulo do making-of no álbum.',
        createdAt: 'Ontem às 19:40'
      }
    ],
    resolution: '6000 x 4000 (24 MP)',
    filesize: '14.2 MB'
  },
  {
    id: 2,
    filename: 'DSC_0145.jpg',
    category: 'making-of',
    title: 'O Buquê de Orquídeas e Flores do Campo',
    url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'vertical',
    isFavorite: false,
    comments: [],
    resolution: '4000 x 6000 (24 MP)',
    filesize: '12.8 MB'
  },
  {
    id: 3,
    filename: 'DSC_0188.jpg',
    category: 'making-of',
    title: 'Ajuste da Gravata do Noivo',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'vertical',
    isFavorite: true,
    comments: [],
    resolution: '4000 x 6000 (24 MP)',
    filesize: '13.1 MB'
  },

  // Cerimônia
  {
    id: 4,
    filename: 'DSC_0224.jpg',
    category: 'cerimonia',
    title: 'Entrada Emocionante com o Pai',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'horizontal',
    isFavorite: true,
    comments: [
      {
        id: 'c2',
        author: 'Isabela (Noiva)',
        text: 'Consegue suavizar o brilho da luz no teto ao fundo nesta foto?',
        createdAt: 'Hoje às 10:15'
      }
    ],
    resolution: '6000 x 4000 (24 MP)',
    filesize: '15.6 MB'
  },
  {
    id: 5,
    filename: 'DSC_0267.jpg',
    category: 'cerimonia',
    title: 'A Troca de Alianças e Votos',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'horizontal',
    isFavorite: true,
    comments: [],
    resolution: '6000 x 4000 (24 MP)',
    filesize: '14.9 MB'
  },
  {
    id: 6,
    filename: 'DSC_0312.jpg',
    category: 'cerimonia',
    title: 'O Primeiro Beijo de Casados',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'horizontal',
    isFavorite: true,
    comments: [
      {
        id: 'c3',
        author: 'Rodrigo (Noivo)',
        text: 'Candidata fortíssima para o quadro Fine Art da sala!',
        createdAt: 'Hoje às 11:02'
      }
    ],
    resolution: '6000 x 4000 (24 MP)',
    filesize: '16.4 MB'
  },

  // Ensaio dos Noivos
  {
    id: 7,
    filename: 'DSC_0350.jpg',
    category: 'ensaio',
    title: 'Pôr do Sol Dourado no Bosque',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'horizontal',
    isFavorite: true,
    comments: [],
    resolution: '6000 x 4000 (24 MP)',
    filesize: '17.2 MB'
  },
  {
    id: 8,
    filename: 'DSC_0395.jpg',
    category: 'ensaio',
    title: 'Abraço e Luz de Contorno',
    url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'vertical',
    isFavorite: false,
    comments: [],
    resolution: '4000 x 6000 (24 MP)',
    filesize: '13.8 MB'
  },
  {
    id: 9,
    filename: 'DSC_0420.jpg',
    category: 'ensaio',
    title: 'Retrato Íntimo com o Véu',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'vertical',
    isFavorite: true,
    comments: [],
    resolution: '4000 x 6000 (24 MP)',
    filesize: '12.5 MB'
  },

  // Festa & Recepção
  {
    id: 10,
    filename: 'DSC_0488.jpg',
    category: 'festa',
    title: 'Brinde dos Noivos com Champanhe',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'horizontal',
    isFavorite: true,
    comments: [],
    resolution: '6000 x 4000 (24 MP)',
    filesize: '15.1 MB'
  },
  {
    id: 11,
    filename: 'DSC_0524.jpg',
    category: 'festa',
    title: 'A Dança dos Noivos sob as Luzes',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'horizontal',
    isFavorite: true,
    comments: [
      {
        id: 'c4',
        author: 'Isabela (Noiva)',
        text: 'Retirar a pessoa de blusa vermelha desfocada no canto direito se for para o álbum.',
        createdAt: 'Hoje às 11:20'
      }
    ],
    resolution: '6000 x 4000 (24 MP)',
    filesize: '14.7 MB'
  },
  {
    id: 12,
    filename: 'DSC_0580.jpg',
    category: 'festa',
    title: 'A Pista de Dança Fervendo',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'horizontal',
    isFavorite: false,
    comments: [],
    resolution: '6000 x 4000 (24 MP)',
    filesize: '13.9 MB'
  }
];
