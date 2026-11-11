export interface ShowcaseGallery {
  id: string;
  title: string;
  category: 'wedding' | 'portrait' | 'family' | 'commercial' | 'event' | 'adventure';
  categoryLabel: string;
  photographer: string;
  coverImage: string;
  location: string;
  description: string;
  featured?: boolean;
}

export const showcaseGalleries: ShowcaseGallery[] = [
  {
    id: 'bruna-eduardo',
    title: 'Bruna & Eduardo',
    category: 'wedding',
    categoryLabel: 'Wedding',
    photographer: "Cadu's Fotos",
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    location: 'Fazenda Vila Rica • Itatiba, SP',
    description: 'Casamento no campo sob a luz dourada do entardecer com celebração ao ar livre e recepção rústico-chic.',
    featured: true
  },
  {
    id: 'michelle-moore',
    title: 'Michelle Moore',
    category: 'portrait',
    categoryLabel: 'Portrait',
    photographer: 'Michelle Moore Photography',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    location: 'Seattle, WA',
    description: 'Natural light portrait photography featuring bright outdoor settings, soft backgrounds, and elegant casual style.'
  },
  {
    id: 'chris-ruth',
    title: 'Chris & Ruth',
    category: 'wedding',
    categoryLabel: 'Wedding',
    photographer: 'Chris and Ruth Photography',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    location: 'Hedsor House • Buckinghamshire, UK',
    description: 'Elegant wedding photography at Hedsor House featuring grand architecture, stylish bridal portraits, and refined black-tie details.'
  },
  {
    id: 'kt-merry',
    title: 'KT Merry',
    category: 'portrait',
    categoryLabel: 'Portrait',
    photographer: 'KT Merry Fine Art',
    coverImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    location: 'Miami, FL',
    description: 'Fine art portrait photography featuring vintage-inspired interiors, romantic bridal styling, and editorial finesse.'
  },
  {
    id: 'jose-villa',
    title: 'Jose Villa Photography',
    category: 'wedding',
    categoryLabel: 'Wedding',
    photographer: 'Jose Villa',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    location: 'Santa Barbara, CA',
    description: 'Timeless luxury wedding photography of Alissandra and JR with classical bridal portraits, black-tie ceremony, and heirloom details.'
  },
  {
    id: 'isabela-rodrigo',
    title: 'Isabela Silveira & Rodrigo',
    category: 'wedding',
    categoryLabel: 'Wedding',
    photographer: "Cadu's Fotos",
    coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    location: 'Villa Bisutti • Jardins, SP',
    description: 'Cerimônia noturna iluminada por velas, editorial clássico e recepção de alto padrão nos Jardins.'
  },
  {
    id: 'alex-michele',
    title: 'Alex Michele Photography',
    category: 'family',
    categoryLabel: 'Family',
    photographer: 'Alex Michele',
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    location: 'Bondi Beach • Sydney, Australia',
    description: 'Beach family photography of the Wasserman family with children playing in the sand, candid moments, and golden hour light.'
  },
  {
    id: 'kevin-barr',
    title: 'Kevin Barr Photography',
    category: 'event',
    categoryLabel: 'Event',
    photographer: 'Kevin Barr',
    coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    location: 'Austin, TX',
    description: 'Live concert photography of Thunderous Fury with dramatic stage lighting, pyrotechnics, and high-energy crowd shots.'
  },
  {
    id: 'with-luke',
    title: 'WithLuke Photography',
    category: 'adventure',
    categoryLabel: 'Adventure',
    photographer: 'Luke Jackson-Clark',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    location: 'AlUla • Saudi Arabia',
    description: 'Travel photography featuring sandstone rock formations, ancient tombs, camel caravans, and golden desert dunes.'
  },
  {
    id: 'alex-richardson',
    title: 'Alex Richardson Co.',
    category: 'wedding',
    categoryLabel: 'Wedding',
    photographer: 'Alex Richardson',
    coverImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    location: 'Pacific Northwest, USA',
    description: 'Rustic outdoor wedding photography of Natasha and Froilan with forest ceremony, candid getting-ready moments, and scenic backdrops.'
  },
  {
    id: 'culinary-lens',
    title: 'Culinary Lens Studio',
    category: 'commercial',
    categoryLabel: 'Commercial',
    photographer: 'Thyme & Bloom',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    location: 'New York, NY',
    description: 'Food and restaurant photography featuring fresh seasonal dishes, gourmet plating, and vibrant culinary presentations.'
  },
  {
    id: 'brad-flowerdew',
    title: 'Brad Flowerdew',
    category: 'adventure',
    categoryLabel: 'Adventure',
    photographer: 'Brad Flowerdew',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    location: 'Cappadocia • Turkey',
    description: 'Aza Cave Hotel photography gallery featuring sunrise hot air balloons, cave architecture, and poolside portraits.'
  },
  {
    id: 'erich-mcvey',
    title: 'Erich McVey Photography',
    category: 'portrait',
    categoryLabel: 'Portrait',
    photographer: 'Erich McVey',
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    location: 'Big Sur, CA',
    description: 'Editorial beach photography of Courtney Bryant in a flowing gown among coastal rock formations at sunset.'
  },
  {
    id: 'reem-photography',
    title: 'Reem Photography',
    category: 'wedding',
    categoryLabel: 'Wedding',
    photographer: 'Reem',
    coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    location: 'Tuscany • Italy',
    description: 'Luxury garden wedding photography of Tobias and Jasmine featuring floral ceremony arch, bridal preparations, and scenic estate views.'
  },
  {
    id: 'larissa-lucas',
    title: 'Larissa, Thiago & Lucas',
    category: 'family',
    categoryLabel: 'Family',
    photographer: "Cadu's Fotos",
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    location: 'Parque Ibirapuera • São Paulo, SP',
    description: 'Ensaio poético de gestante e acolhimento familiar com luz natural e ternura entre árvores centenárias.'
  }
];
