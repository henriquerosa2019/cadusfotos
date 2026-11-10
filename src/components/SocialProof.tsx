import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Award, Zap, Heart, MessageSquare } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const stats = [
    { value: '+480.000', label: 'Fotos entregues com segurança', sub: 'em resolução original' },
    { value: 'R$ 6.8M+', label: 'Transacionados em vendas de produtos', sub: 'direto para a conta dos fotógrafos' },
    { value: '99.4%', label: 'Índice de aprovação dos clientes', sub: 'avaliação 5 estrelas' },
    { value: '100% Brasil', label: 'PIX instantâneo & Gráficas parceiras', sub: 'sem IOF nem burocracia em dólar' }
  ];

  const testimonials = [
    {
      name: 'Camila & Tiago',
      studio: 'Camila & Tiago Fotografia de Casamento',
      location: 'Florianópolis, SC',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Especialistas em Casamentos no Campo',
      quote: 'Antes eu perdia noites cobrando cliente no WhatsApp e mandando links que expiravam. No Cadu’s Fotos a entrega virou um evento: os noivos se emocionam e quase 70% deles já encomendam o álbum encadernado direto na galeria!'
    },
    {
      name: 'Matheus Alencar',
      studio: 'Alencar Retratos & Editorial',
      location: 'São Paulo, SP',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Fotógrafo de Retratos & Família',
      quote: 'A venda de quadros emoldurados na mesma página da galeria aumentou meu faturamento mensal em R$ 3.800 sem eu precisar fechar nenhum cliente a mais. É dinheiro na mesa que antes eu deixava passar.'
    },
    {
      name: 'Mariana Prado',
      studio: 'Mariana Prado Fotografia Afetiva',
      location: 'Belo Horizonte, MG',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Newborn e Ensaios de Gestante',
      quote: 'O App Mobile instalado no celular da mãe é um sucesso absoluto. Ela mostra para as amigas no almoço de domingo com o meu logotipo visível e eu recebo orçamentos orgânicos toda semana.'
    }
  ];

  const integrations = [
    { name: 'PIX Banco Central', desc: 'Recebimento Instantâneo' },
    { name: 'Indimagem & Digipix', desc: 'Encadernação & Fine Art' },
    { name: 'WhatsApp Business', desc: 'Avisos Automáticos' },
    { name: 'Adobe Lightroom', desc: 'Exportação de Seleção' }
  ];

  return (
    <section className="py-24 bg-white dark:bg-brand-dark relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:glass-panel text-center hover:border-teal-500/40 transition-all duration-300 group shadow-sm"
            >
              <div className="text-3xl sm:text-5xl font-black text-gradient group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-2">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-teal-600 dark:text-brand-mint font-bold mb-2">
            Comunidade de Criadores
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Amado por fotógrafos independentes e grandes estúdios
          </h2>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:glass-panel flex flex-col justify-between hover:border-teal-500/30 transition-all duration-300 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-teal-500/40"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{t.name}</h4>
                  <p className="text-[11px] text-teal-700 dark:text-brand-mint font-bold truncate">{t.studio}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Badges */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:glass-panel flex flex-wrap items-center justify-around gap-6 text-center shadow-sm">
          {integrations.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-brand-mint" />
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.name}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
