import React, { useState } from 'react';
import { Camera, Check, ShoppingBag, ShieldCheck, Heart, Sparkles, Smartphone, Calendar, FileText, ArrowRight, Download } from 'lucide-react';

export const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'entrega' | 'prova' | 'loja' | 'gestao' | 'app'>('entrega');

  const tabs = [
    {
      id: 'entrega' as const,
      label: '1. Entrega & Apresentação',
      badge: 'Galeria VIP',
      title: 'Uma entrega que emociona e valoriza cada centavo do seu trabalho',
      desc: 'Substitua links frios de nuvens genéricas por uma experiência de luxo. Suas fotos exibidas em alta fidelidade com capa editorial, música ambiente opcional e organização em coleções.',
      bullets: [
        'Upload ilimitado em resolução máxima sem compressão destrutiva',
        'Download seletivo ou completo com proteção por PIN de segurança',
        'Layouts responsivos adaptados para iPhone, iPad e telas Retina',
        'Controle fino de privacidade (pública, com senha ou restrita por email)'
      ],
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Casamento Lucas & Beatriz • 480 fotos entregues'
    },
    {
      id: 'prova' as const,
      label: '2. Prova & Seleção com Favoritos',
      badge: 'Zero Retrabalho',
      title: 'Chega de listas de números no WhatsApp e prints desencontrados',
      desc: 'O cliente favorita as fotos com um clique no coração, adiciona notas de retouche e envia a seleção final aprovada com um único botão. O sistema gera a lista para o Lightroom automaticamente.',
      bullets: [
        'Marcação rápida de favoritos com limite configurável pelo fotógrafo',
        'Exportação direta de lista de nomes de arquivos para busca no Lightroom',
        'Comentários específicos foto a foto (ex: "Clarear fundo", "Foto do porta-retrato")',
        'Notificação instantânea para o fotógrafo assim que o cliente aprova'
      ],
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Modo de Seleção Ativo • 65 de 70 fotos selecionadas'
    },
    {
      id: 'loja' as const,
      label: '3. Loja de Produtos & Álbuns',
      badge: 'Faturamento Extra',
      title: 'Seus clientes compram quadros, álbuns e impressões enquanto admiram as fotos',
      desc: 'Venda diretamente dentro da galeria sem precisar orçar manualmente. O cliente visualiza a foto aplicada em quadros de madeira maciça, telas canvas ou em álbuns panorâmicos luxuosos.',
      bullets: [
        'Lucro 100% sob seu controle: defina suas margens para cada produto',
        'Prévia realista em salas decoradas para aumentar o ticket médio',
        'Checkout simplificado com PIX instantâneo e parcelamento em até 12x',
        'Integração direta com os melhores laboratórios de encadernação do Brasil'
      ],
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Loja Integrada • Álbum Panorâmico + Quadro Canvas 60x90'
    },
    {
      id: 'gestao' as const,
      label: '4. Gestão, Agenda & Contratos',
      badge: 'Studio CRM',
      title: 'Automatize agendamentos, contratos digitais e recebimentos',
      desc: 'Envie propostas interativas que se transformam em contratos com assinatura digital com validade jurídica. Receba sinal e parcelas automaticamente sem cobrar o cliente de forma desconfortável.',
      bullets: [
        'Contratos digitais assinados na tela do celular pelo cliente',
        'Agendamento online integrado com Google Agenda / Apple Calendar',
        'Cobrança amigável via WhatsApp com chave PIX Copia-e-Cola',
        'Controle financeiro de receitas, custos e faturas pendentes'
      ],
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Contrato Assinado Digitalmente • Sinal de R$ 1.500 Recebido via PIX'
    },
    {
      id: 'app' as const,
      label: '5. App Mobile do Cliente',
      badge: 'Marketing Espontâneo',
      title: 'Um aplicativo exclusivo com o seu nome e as fotos do cliente',
      desc: 'Entregue um web app instalável (PWA) no smartphone do cliente. Ele exibe para familiares e amigos em jantares e eventos, gerando indicações espontâneas e novos contratos para você.',
      bullets: [
        'Instalação rápida sem necessidade de baixar pela App Store/Google Play',
        'Ícone personalizado com a foto preferida do casal ou da família',
        'Funciona até em modo offline para exibição rápida de fotos',
        'Botão direto "Indicar Fotógrafo" para os amigos do cliente entrarem em contato'
      ],
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
      tagline: 'App Instalado • Acessível com 1 toque na tela inicial'
    }
  ];

  const current = tabs.find(t => t.id === activeTab)!;

  return (
    <section id="produtos" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-400/10 dark:bg-brand-sky/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 dark:bg-brand-mint/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-teal-600 dark:text-brand-mint font-bold mb-3">
            O Ecossistema Completo
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Tudo o que seu estúdio precisa. <br />
            <span className="text-gradient">Integrado em um só fluxo.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Cada módulo foi pensado para potencializar o outro. Menos ferramentas soltas, menos assinaturas duplicadas e mais dinheiro no seu bolso.
          </p>
        </div>

        {/* Tab Buttons Navigation */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-brand-gradient text-slate-950 border-brand-mint shadow-brand-glow font-bold'
                    : 'bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5 hover:border-teal-500/40 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-brand-mint'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content Showcase */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl bg-white dark:bg-slate-900/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Details & Bullets */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 dark:bg-brand-mint/15 text-teal-700 dark:text-brand-mint text-xs font-bold border border-teal-200 dark:border-brand-mint/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{current.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                {current.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.desc}
              </p>

              <div className="space-y-3 pt-2">
                {current.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-teal-50 dark:bg-brand-mint/15 text-teal-600 dark:text-brand-mint flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="#cadastro"
                  className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-brand-mint hover:text-teal-700 dark:hover:text-brand-sky transition-colors group"
                >
                  Explorar todos os recursos deste módulo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Visual Mockup / Interface Preview */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900 shadow-xl group">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                </div>

                {/* Bottom Overlay Pill */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-3.5 border border-white/20 dark:border-white/15 flex items-center justify-between bg-white/90 dark:bg-slate-900/80">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500 dark:bg-brand-mint animate-ping" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {current.tagline}
                    </span>
                  </div>
                  <span className="text-[11px] text-teal-700 dark:text-brand-mint font-extrabold px-2 py-0.5 rounded bg-teal-50 dark:bg-brand-mint/10 border border-teal-200 dark:border-brand-mint/20">
                    Ao Vivo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
