import React, { useState } from 'react';
import { Gift, Heart, Sparkles, Check, QrCode, Copy, ShieldCheck, Users, MessageSquare, Send, Award, ArrowRight } from 'lucide-react';
import { initialGiftCotas, GiftCrowdfundOption } from './storeData';

interface StoreGiftRegistryProps {
  coupleNames?: string;
  onOpenStoreCatalog?: () => void;
}

export const StoreGiftRegistry: React.FC<StoreGiftRegistryProps> = ({
  coupleNames = 'Isabela & Rodrigo',
  onOpenStoreCatalog,
}) => {
  const [selectedCota, setSelectedCota] = useState<GiftCrowdfundOption>(initialGiftCotas[1]); // R$ 250
  const [senderName, setSenderName] = useState('Padrinhos Lucas & Camila');
  const [senderMessage, setSenderMessage] = useState('Queridos Isa e Ro, que este álbum guarde para sempre a emoção desse dia tão inesquecível! Amamos vocês!');
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Simulated existing gifts received from friends and family
  const [collectedAmount, setCollectedAmount] = useState(850);
  const totalGoal = 1450; // Total cost of the Panoramic Album
  const progressPercent = Math.min(100, Math.round((collectedAmount / totalGoal) * 100));

  const [receivedMessages, setReceivedMessages] = useState([
    {
      id: 'm1',
      sender: 'Tia Lúcia & Tio Roberto',
      cota: 'Cota Família de Ouro (R$ 500)',
      text: 'Felicidades aos noivos! Que a união de vocês seja tão linda quanto cada uma dessas fotos!',
      time: 'Ontem',
    },
    {
      id: 'm2',
      sender: 'Padrinho Marcelo Costa',
      cota: 'Cota Padrinhos Especiais (R$ 250)',
      text: 'O casamento mais emocionante do ano! Presente com muito carinho pro álbum dos meus afilhados.',
      time: 'Há 2 dias',
    },
    {
      id: 'm3',
      sender: 'Mariana & Felipe',
      cota: 'Cota Abraço de Amor (R$ 100)',
      text: 'Parabéns casal lindo! As fotos estão espetaculares!',
      time: 'Há 3 dias',
    },
  ]);

  const fakePixCode = `00020126580014br.gov.bcb.pix0136cadusfotos-cota-${Date.now()}520400005303986540${selectedCota.amount.toFixed(2)}5802BR5925CADUS FOTOS PRESENTES6009SAO PAULO62070503***6304C882`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(fakePixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const handleSimulatePayment = () => {
    setPaymentConfirmed(true);
    setCollectedAmount(prev => prev + selectedCota.amount);
    setReceivedMessages(prev => [
      {
        id: 'm_' + Date.now(),
        sender: senderName || 'Amigo Anônimo',
        cota: `${selectedCota.title} (R$ ${selectedCota.amount})`,
        text: senderMessage || 'Parabéns aos noivos com muito amor!',
        time: 'Agora mesmo',
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Banner Principal */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white border border-teal-500/30 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/20 border border-brand-mint/30 text-brand-mint text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            Lista de Presentes de Casamento & Cotas do Álbum
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Presenteie {coupleNames} com o Álbum de Memórias Oficial
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Convidados, padrinhos e familiares podem participar da produção do Álbum Panorâmico 180° Layflat da Indimagem escolhendo uma cota de presente ou encomendando réplicas especiais para os pais.
          </p>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Termômetro de Arrecadação do Álbum Oficial */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-brand-mint flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Meta do Álbum Panorâmico 180° Indimagem (40 Lâminas Seda)
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              R$ {collectedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              <span className="text-sm text-slate-400 font-normal"> arrecadados de R$ {totalGoal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-extrabold text-teal-600 dark:text-brand-mint">
              {progressPercent}% Financiado!
            </span>
            <span className="text-[11px] text-slate-500 block">
              {progressPercent >= 100
                ? 'Meta atingida! O casal receberá o álbum 100% quitado!'
                : `Faltam apenas R$ ${(totalGoal - collectedAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-white/10">
          <div
            className="h-full bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Seleção de Cota ou Presente */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>Escolha como Deseja Presentear:</span>
          </h3>
          <span className="text-xs text-slate-400">Pagamento 100% via PIX seguro</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialGiftCotas.map(cota => (
            <div
              key={cota.id}
              onClick={() => setSelectedCota(cota)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between relative group ${
                selectedCota.id === cota.id
                  ? 'border-teal-500 bg-teal-50/70 dark:bg-brand-mint/15 dark:border-brand-mint shadow-lg ring-2 ring-teal-500/20'
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              {cota.badge && (
                <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm">
                  {cota.badge}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {cota.title}
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedCota.id === cota.id ? 'border-teal-500 bg-teal-500' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedCota.id === cota.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cota.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-white/5 flex items-baseline justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Valor da Cota:</span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  R$ {cota.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulário de Dedicatória & Botão de PIX */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-50 dark:bg-brand-mint/20 text-teal-600 dark:text-brand-mint">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Deixe sua Dedicatória para os Noivos
            </h4>
            <p className="text-xs text-slate-500">
              Esta mensagem será impressa num cartão especial de linho que acompanhará a entrega do álbum
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Seu Nome ou da Família
            </label>
            <input
              type="text"
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              placeholder="Ex: Padrinhos Lucas & Camila"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mensagem de Carinho & Felicitações
            </label>
            <textarea
              rows={3}
              value={senderMessage}
              onChange={e => setSenderMessage(e.target.value)}
              placeholder="Escreva seus votos de amor aos noivos..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-white/5">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-500" />
            <span>Repasse seguro direcionado para abater o álbum na Indimagem</span>
          </div>

          <button
            onClick={() => {
              setPaymentConfirmed(false);
              setPixModalOpen(true);
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-brand-glow"
          >
            <Gift className="w-4 h-4" />
            <span>Contribuir com R$ {selectedCota.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} via PIX</span>
          </button>
        </div>
      </div>

      {/* Mensagens Já Enviadas por Amigos & Padrinhos */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Users className="w-4 h-4 text-teal-500" />
          <span>Mural de Carinho dos Padrinhos & Convidados ({receivedMessages.length})</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {receivedMessages.map(msg => (
            <div
              key={msg.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">{msg.sender}</span>
                <span className="text-[10px] text-slate-400">{msg.time}</span>
              </div>
              <span className="inline-block px-2 py-0.5 rounded-md bg-teal-50 dark:bg-brand-mint/20 text-teal-700 dark:text-brand-mint font-semibold text-[10px]">
                {msg.cota}
              </span>
              <p className="text-slate-600 dark:text-slate-400 italic">
                "{msg.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Pagamento da Cota via PIX */}
      {pixModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-white/10 space-y-5 text-center relative">
            <button
              onClick={() => setPixModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {!paymentConfirmed ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-brand-mint/20 text-teal-600 dark:text-brand-mint mx-auto flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedCota.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Valor do presente: <b>R$ {selectedCota.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>
                  </p>
                </div>

                {/* QR Code */}
                <div className="w-44 h-44 mx-auto p-2 bg-white rounded-2xl border border-slate-200 shadow-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(fakePixCode)}`}
                    alt="PIX Cota"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Copy PIX */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={fakePixCode}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 truncate"
                  />
                  <button
                    onClick={handleCopyPix}
                    className="px-3 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold flex items-center gap-1"
                  >
                    {pixCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{pixCopied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-sky via-brand-mint to-brand-emerald text-slate-950 font-bold text-xs uppercase tracking-wider shadow-brand-glow flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Simular Pagamento Confirmado</span>
                </button>
              </>
            ) : (
              <div className="space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-500">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Presente Enviado com Sucesso!
                  </h4>
                  <p className="text-xs text-slate-500">
                    O casal {coupleNames} foi notificado via WhatsApp e sua dedicatória foi registrada no cartão do álbum!
                  </p>
                </div>
                <button
                  onClick={() => setPixModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
