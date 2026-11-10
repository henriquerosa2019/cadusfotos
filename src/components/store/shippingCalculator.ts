import { CartItem } from './storeData';

export interface AddressInfo {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  region: 'sp-capital' | 'sp-interior' | 'sul' | 'sudeste' | 'centro-oeste' | 'nordeste' | 'norte';
}

export interface ShippingOption {
  id: string;
  carrier: string;
  serviceName: string;
  price: number;
  originalPrice?: number;
  deliveryDays: string;
  tag?: string;
  iconType: 'truck' | 'plane' | 'package' | 'store' | 'digital';
  description: string;
  insuranceIncluded: boolean;
}

export interface ShippingCalculationResult {
  address: AddressInfo;
  options: ShippingOption[];
  totalWeightKg: number;
  isDigitalOnly: boolean;
  hasFragileItem: boolean;
}

// Fallback CEP prefix database for all Brazilian states in case of offline or network interruption
const getRegionFromCepPrefix = (cleanCep: string): { state: string; city: string; region: AddressInfo['region'] } => {
  const prefix2 = parseInt(cleanCep.substring(0, 2), 10);
  const prefix3 = parseInt(cleanCep.substring(0, 3), 10);

  if (prefix2 >= 1 && prefix2 <= 5) {
    return { state: 'SP', city: 'São Paulo', region: 'sp-capital' };
  }
  if (prefix2 >= 6 && prefix2 <= 9) {
    return { state: 'SP', city: 'Grande São Paulo', region: 'sp-capital' };
  }
  if (prefix2 >= 11 && prefix2 <= 19) {
    return { state: 'SP', city: 'Interior de São Paulo', region: 'sp-interior' };
  }
  if (prefix2 >= 20 && prefix2 <= 28) {
    return { state: 'RJ', city: 'Rio de Janeiro', region: 'sudeste' };
  }
  if (prefix2 === 29) {
    return { state: 'ES', city: 'Vitória', region: 'sudeste' };
  }
  if (prefix2 >= 30 && prefix2 <= 39) {
    return { state: 'MG', city: 'Belo Horizonte', region: 'sudeste' };
  }
  if (prefix2 >= 40 && prefix2 <= 48) {
    return { state: 'BA', city: 'Salvador', region: 'nordeste' };
  }
  if (prefix2 === 49) {
    return { state: 'SE', city: 'Aracaju', region: 'nordeste' };
  }
  if (prefix2 >= 50 && prefix2 <= 56) {
    return { state: 'PE', city: 'Recife', region: 'nordeste' };
  }
  if (prefix2 === 57) {
    return { state: 'AL', city: 'Maceió', region: 'nordeste' };
  }
  if (prefix2 === 58) {
    return { state: 'PB', city: 'João Pessoa', region: 'nordeste' };
  }
  if (prefix2 === 59) {
    return { state: 'RN', city: 'Natal', region: 'nordeste' };
  }
  if (prefix2 >= 60 && prefix2 <= 63) {
    return { state: 'CE', city: 'Fortaleza', region: 'nordeste' };
  }
  if (prefix2 === 64) {
    return { state: 'PI', city: 'Teresina', region: 'nordeste' };
  }
  if (prefix2 === 65) {
    return { state: 'MA', city: 'São Luís', region: 'nordeste' };
  }
  if (prefix2 >= 66 && prefix2 <= 68) {
    return { state: 'PA', city: 'Belém', region: 'norte' };
  }
  if (prefix3 >= 689) {
    return { state: 'AP', city: 'Macapá', region: 'norte' };
  }
  if (prefix2 === 69) {
    return { state: 'AM', city: 'Manaus', region: 'norte' };
  }
  if (prefix2 >= 70 && prefix2 <= 72) {
    return { state: 'DF', city: 'Brasília', region: 'centro-oeste' };
  }
  if (prefix2 >= 73 && prefix2 <= 76) {
    return { state: 'GO', city: 'Goiânia', region: 'centro-oeste' };
  }
  if (prefix2 === 77) {
    return { state: 'TO', city: 'Palmas', region: 'norte' };
  }
  if (prefix2 === 78) {
    return { state: 'MT', city: 'Cuiabá', region: 'centro-oeste' };
  }
  if (prefix2 === 79) {
    return { state: 'MS', city: 'Campo Grande', region: 'centro-oeste' };
  }
  if (prefix2 >= 80 && prefix2 <= 87) {
    return { state: 'PR', city: 'Curitiba', region: 'sul' };
  }
  if (prefix2 >= 88 && prefix2 <= 89) {
    return { state: 'SC', city: 'Florianópolis', region: 'sul' };
  }
  if (prefix2 >= 90 && prefix2 <= 99) {
    return { state: 'RS', city: 'Porto Alegre', region: 'sul' };
  }

  return { state: 'SP', city: 'São Paulo', region: 'sp-capital' };
};

export const fetchAddressFromCep = async (cepInput: string): Promise<AddressInfo> => {
  const clean = cepInput.replace(/\D/g, '');
  if (clean.length !== 8) {
    throw new Error('CEP deve conter exatamente 8 dígitos');
  }

  const fallback = getRegionFromCepPrefix(clean);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`https://viacep.com.br/ws/${clean}/json/`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (!data.erro) {
        let region: AddressInfo['region'] = fallback.region;
        const uf = data.uf || fallback.state;

        if (uf === 'SP') {
          region = clean.startsWith('0') ? 'sp-capital' : 'sp-interior';
        } else if (['PR', 'SC', 'RS'].includes(uf)) {
          region = 'sul';
        } else if (['RJ', 'MG', 'ES'].includes(uf)) {
          region = 'sudeste';
        } else if (['DF', 'GO', 'MS', 'MT'].includes(uf)) {
          region = 'centro-oeste';
        } else if (['AM', 'PA', 'RO', 'AC', 'RR', 'AP', 'TO'].includes(uf)) {
          region = 'norte';
        } else {
          region = 'nordeste';
        }

        return {
          cep: `${clean.slice(0, 5)}-${clean.slice(5)}`,
          street: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.localidade || fallback.city,
          state: uf,
          region,
        };
      }
    }
  } catch {
    // Silent catch, proceed with deterministic Brazilian CEP prefix fallback
  }

  return {
    cep: `${clean.slice(0, 5)}-${clean.slice(5)}`,
    street: '',
    neighborhood: '',
    city: fallback.city,
    state: fallback.state,
    region: fallback.region,
  };
};

export const calculateShipping = (
  items: CartItem[],
  address: AddressInfo
): ShippingCalculationResult => {
  const isDigitalOnly = items.length > 0 && items.every(i => i.product.category === 'digitais');
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Calculate realistic weight & packaging
  let totalWeightKg = 0;
  let hasFragileItem = false;

  items.forEach(item => {
    const qty = item.quantity;
    if (item.product.category === 'albuns') {
      const isLarge = item.selectedSize.id === '30x42';
      totalWeightKg += (isLarge ? 2.5 : 1.8) * qty;
    } else if (item.product.category === 'quadros') {
      hasFragileItem = true;
      const isLarge = item.selectedSize.id === '60x90';
      totalWeightKg += (isLarge ? 3.8 : 2.2) * qty;
    } else if (item.product.category === 'caixas') {
      totalWeightKg += 1.3 * qty;
    } else if (item.product.category === 'revelacoes') {
      totalWeightKg += 0.25 * qty;
    }
  });

  // Digital-only cart: zero shipping fee, instant delivery
  if (isDigitalOnly) {
    return {
      address,
      totalWeightKg: 0,
      isDigitalOnly: true,
      hasFragileItem: false,
      options: [
        {
          id: 'digital-instant',
          carrier: 'Download Digital Direto',
          serviceName: 'Envio Imediato por E-mail',
          price: 0,
          deliveryDays: 'Instantâneo (após confirmação do PIX)',
          tag: 'Grátis & Imediato',
          iconType: 'digital',
          description: 'Link seguro em nuvem com fotos em 24 Megapixels sem compressão',
          insuranceIncluded: true,
        },
      ],
    };
  }

  // Weight & fragility modifiers
  const extraWeight = Math.max(0, totalWeightKg - 1.5);
  const weightSurcharge = Math.round(extraWeight * 3.5); // R$ 3,50 por kg excedente
  const fragilePackagingFee = hasFragileItem ? 9.0 : 0; // Proteção especial antichoque p/ vidros/telas

  // Regional Base Tables for Jadlog and Correios Sedex/PAC (Real rates)
  type RegionalRates = {
    jadlogBase: number;
    jadlogDays: string;
    sedexBase: number;
    sedexDays: string;
    pacBase: number;
    pacDays: string;
  };

  const ratesByRegion: Record<AddressInfo['region'], RegionalRates> = {
    'sp-capital': {
      jadlogBase: 21.9,
      jadlogDays: '2 a 3 dias úteis',
      sedexBase: 26.5,
      sedexDays: '1 dia útil (Expresso)',
      pacBase: 18.0,
      pacDays: '3 a 4 dias úteis',
    },
    'sp-interior': {
      jadlogBase: 25.5,
      jadlogDays: '3 a 4 dias úteis',
      sedexBase: 34.0,
      sedexDays: '1 a 2 dias úteis',
      pacBase: 22.0,
      pacDays: '4 a 6 dias úteis',
    },
    'sul': {
      // Indimagem is in RS! Shipping is very fast & cost-efficient for RS/SC/PR
      jadlogBase: 24.9,
      jadlogDays: '2 a 4 dias úteis',
      sedexBase: 38.0,
      sedexDays: '1 a 2 dias úteis',
      pacBase: 23.5,
      pacDays: '4 a 6 dias úteis',
    },
    'sudeste': {
      jadlogBase: 29.5,
      jadlogDays: '3 a 5 dias úteis',
      sedexBase: 46.0,
      sedexDays: '1 a 2 dias úteis',
      pacBase: 27.0,
      pacDays: '5 a 8 dias úteis',
    },
    'centro-oeste': {
      jadlogBase: 37.9,
      jadlogDays: '4 a 6 dias úteis',
      sedexBase: 58.0,
      sedexDays: '2 a 3 dias úteis',
      pacBase: 35.0,
      pacDays: '6 a 9 dias úteis',
    },
    'nordeste': {
      jadlogBase: 46.9,
      jadlogDays: '5 a 8 dias úteis',
      sedexBase: 74.0,
      sedexDays: '2 a 4 dias úteis',
      pacBase: 43.0,
      pacDays: '8 a 12 dias úteis',
    },
    'norte': {
      jadlogBase: 59.9,
      jadlogDays: '7 a 12 dias úteis',
      sedexBase: 98.0,
      sedexDays: '3 a 5 dias úteis',
      pacBase: 54.0,
      pacDays: '12 a 18 dias úteis',
    },
  };

  const regRates = ratesByRegion[address.region] || ratesByRegion['sp-capital'];

  // Final calculated prices
  let jadlogPrice = Math.round((regRates.jadlogBase + weightSurcharge + fragilePackagingFee) * 10) / 10;
  let sedexPrice = Math.round((regRates.sedexBase + weightSurcharge * 1.4 + fragilePackagingFee) * 10) / 10;
  let pacPrice = Math.round((regRates.pacBase + weightSurcharge * 0.8 + fragilePackagingFee) * 10) / 10;

  // Free shipping condition: If subtotal >= R$ 1.500 (standard high-ticket wedding album perk)
  const isFreeShippingQualified = subtotal >= 1500;

  const options: ShippingOption[] = [];

  // 1. Jadlog .Package (Official Lab Carrier - Best value)
  options.push({
    id: 'jadlog',
    carrier: 'Jadlog .Package Pro',
    serviceName: 'Transportadora Oficial dos Laboratórios',
    price: isFreeShippingQualified ? 0 : jadlogPrice,
    originalPrice: isFreeShippingQualified ? jadlogPrice : undefined,
    deliveryDays: regRates.jadlogDays,
    tag: isFreeShippingQualified ? 'Frete Grátis Cortesia' : 'Mais Econômico',
    iconType: 'truck',
    description: `Entrega segura com seguro de transporte e rastreio em tempo real (${totalWeightKg.toFixed(1)} kg)`,
    insuranceIncluded: true,
  });

  // 2. Correios Sedex (Fastest Express)
  options.push({
    id: 'sedex',
    carrier: 'Correios Sedex Expresso',
    serviceName: 'Aéreo Prioritário',
    price: sedexPrice,
    deliveryDays: regRates.sedexDays,
    tag: 'Mais Rápido',
    iconType: 'plane',
    description: 'Prioridade máxima de postagem para quem tem urgência',
    insuranceIncluded: true,
  });

  // 3. Correios PAC (Alternative Standard)
  options.push({
    id: 'pac',
    carrier: 'Correios PAC',
    serviceName: 'Encomenda Econômica dos Correios',
    price: pacPrice,
    deliveryDays: regRates.pacDays,
    iconType: 'package',
    description: 'Postagem tradicional dos Correios com código de rastreamento',
    insuranceIncluded: true,
  });

  // 4. Retirada no Estúdio do Fotógrafo (Grátis)
  options.push({
    id: 'retirada',
    carrier: 'Retirada no Estúdio',
    serviceName: 'Estúdio Cadu Fotos • Jardins, São Paulo',
    price: 0,
    deliveryDays: 'Disponível após produção do laboratório',
    tag: 'Grátis',
    iconType: 'store',
    description: 'Retire diretamente com o fotógrafo e receba em mãos com café especial',
    insuranceIncluded: true,
  });

  return {
    address,
    options,
    totalWeightKg,
    isDigitalOnly: false,
    hasFragileItem,
  };
};
