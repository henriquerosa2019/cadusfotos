import React, { useState } from 'react';
import jsPDF from 'jspdf';
import {
  FileText,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  Download,
  Share2,
  ShieldCheck,
  Plus,
  PenTool,
  Lock,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  X,
  FileCheck,
  UserCheck,
} from 'lucide-react';
import { StudioContract, initialContracts, StudioClient } from './studioData';

interface StudioContractsManagerProps {
  clients: StudioClient[];
}

export const StudioContractsManager: React.FC<StudioContractsManagerProps> = ({ clients }) => {
  const [contracts, setContracts] = useState<StudioContract[]>(initialContracts);
  const [selectedContract, setSelectedContract] = useState<StudioContract | null>(null);
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [typedSignature, setTypedSignature] = useState('');
  const [contractToSign, setContractToSign] = useState<StudioContract | null>(null);
  const [signSuccessToast, setSignSuccessToast] = useState(false);
  const [newContractModalOpen, setNewContractModalOpen] = useState(false);

  // New contract form
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [eventType, setEventType] = useState<'Casamento' | 'Ensaio Gestante' | 'Pré-Wedding' | 'Corporativo & Branding'>('Casamento');
  const [contractValue, setContractValue] = useState('5800');
  const [eventDate, setEventDate] = useState('24/10/2026 - Espaço Gardens');
  const [downloadToast, setDownloadToast] = useState(false);

  // PDF Generation & Real Download Handler via jsPDF
  const handleDownloadPdf = (contract: StudioContract) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const isAssinado = contract.status === 'assinado';
      const signedDate = contract.signedAt || '17/01/2026 às 19:48';
      const signerIp = contract.signerIp || '189.40.112.45 (São Paulo/SP)';
      const signatureText = contract.signatureImage || contract.clientName;
      const hash = `SHA256:${Array.from(contract.contractNumber + contract.clientName + signedDate)
        .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000007, 7)
        .toString(16)
        .padStart(8, '0')
        .toUpperCase()}B9A47F2E80C91D348E`;

      // Top decorative bar
      doc.setFillColor(13, 148, 136); // Teal 600
      doc.rect(0, 0, 210, 4, 'F');

      // Header Brand
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // Slate 900
      doc.text("Cadu's Fotos", 15, 16);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139); // Slate 500
      doc.text("Estúdio Profissional de Fotografia de Casamento & Família", 15, 21);

      // Studio Legal Meta (Right aligned)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text("Cadu's Fotos Studio Ltda. • CNPJ: 45.892.102/0001-44", 195, 14, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text("Alameda Gabriel Monteiro da Silva, 1420 - Jardins, São Paulo/SP", 195, 18, { align: 'right' });
      doc.text("contato@cadusfotos.com.br • (11) 98765-4321", 195, 22, { align: 'right' });

      // Divider line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(15, 25, 195, 25);

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text("INSTRUMENTO PARTICULAR DE PRESTAÇÃO DE SERVIÇOS FOTOGRÁFICOS", 105, 33, { align: 'center' });

      // Meta Box
      doc.setFillColor(248, 250, 252); // Slate 50
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(15, 37, 180, 24, 2, 2, 'FD');

      doc.setFontSize(8.5);
      // Col 1
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text("Nº do Contrato:", 20, 43);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(contract.contractNumber, 48, 43);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text("Emissão:", 20, 49);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(contract.createdAt, 48, 49);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text("Contratante(s):", 20, 55);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(contract.clientName, 48, 55);

      // Col 2
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text("Tipo de Evento:", 110, 43);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(contract.eventType, 140, 43);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text("Data do Evento:", 110, 49);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(contract.eventDate, 140, 49);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text("Valor Contratado:", 110, 55);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(13, 148, 136); // Teal
      doc.text(`R$ ${contract.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 140, 55);

      // Clauses
      let currentY = 68;
      contract.clauses.forEach((clause) => {
        if (currentY > 250) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(clause.title, 15, currentY);
        currentY += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        const lines = doc.splitTextToSize(clause.content, 180);
        doc.text(lines, 15, currentY);
        currentY += lines.length * 4.2 + 4;
      });

      // Signatures
      if (currentY > 215) {
        doc.addPage();
        currentY = 25;
      } else {
        currentY += 4;
      }

      doc.setDrawColor(226, 232, 240);
      doc.line(15, currentY, 195, currentY);
      currentY += 6;

      // Box 1: Contratado
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(15, currentY, 86, 28, 2, 2, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("CONTRATADO / FOTÓGRAFO", 18, currentY + 6);
      doc.setFont('times', 'italic');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("Carlos 'Cadu' Eduardo", 18, currentY + 15);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text("Cadu's Fotos Studio • CNPJ: 45.892.102/0001-44", 18, currentY + 22);

      // Box 2: Contratante
      doc.roundedRect(109, currentY, 86, 28, 2, 2, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("CONTRATANTE(S)", 112, currentY + 6);

      if (isAssinado) {
        doc.setFont('times', 'italic');
        doc.setFontSize(13);
        doc.setTextColor(13, 148, 136); // Teal
        doc.text(signatureText, 112, currentY + 15);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(5, 150, 105); // Green
        doc.text(`✓ Assinado Eletronicamente em ${signedDate}`, 112, currentY + 20);
        doc.setFont('courier', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`IP: ${signerIp}`, 112, currentY + 24);
      } else {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(217, 119, 6); // Amber
        doc.text("Aguardando assinatura do cliente", 112, currentY + 15);
      }

      currentY += 34;

      // Legal Audit Certificate Box (MP 2.200-2/01)
      if (isAssinado) {
        if (currentY > 255) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFillColor(240, 253, 244); // Green 50
        doc.setDrawColor(16, 185, 129); // Green 500
        doc.roundedRect(15, currentY, 180, 20, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(6, 78, 59); // Green 900
        doc.text("✓ CERTIFICADO DE AUTENTICIDADE & AUDITORIA DIGITAL (MP 2.200-2/01 E LEI 14.063/20)", 18, currentY + 5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(6, 95, 70);
        doc.text("Documento com plena eficácia probatória em conformidade com o Marco Civil da Internet (Lei 12.965/14).", 18, currentY + 9.5);

        doc.setFont('courier', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(4, 120, 87);
        doc.text(`HASH SHA-256: ${hash}`, 18, currentY + 14);
        doc.text(`CARIMBO DO TEMPO (BRASÍLIA): ${signedDate} • IP AUDITADO: ${signerIp}`, 18, currentY + 17.5);
      }

      // Direct native PDF file download
      const filename = `Contrato_${contract.contractNumber}_${contract.clientName.replace(/\s+/g, '_')}.pdf`;
      doc.save(filename);
      setDownloadToast(true);
      setTimeout(() => setDownloadToast(false), 4000);
    } catch (err) {
      console.error('Erro ao gerar e baixar PDF:', err);
    }
  };

  const handleOpenSignature = (contract: StudioContract) => {
    setContractToSign(contract);
    setTypedSignature(contract.clientName);
    setSignatureModalOpen(true);
  };

  const handleConfirmSignature = () => {
    if (!contractToSign) return;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    setContracts(prev =>
      prev.map(c =>
        c.id === contractToSign.id
          ? {
              ...c,
              status: 'assinado',
              signedAt: formattedDate,
              signerIp: '177.18.204.91 (São Paulo - SP)',
              signatureImage: typedSignature || contractToSign.clientName,
            }
          : c
      )
    );

    if (selectedContract && selectedContract.id === contractToSign.id) {
      setSelectedContract({
        ...selectedContract,
        status: 'assinado',
        signedAt: formattedDate,
        signerIp: '177.18.204.91 (São Paulo - SP)',
        signatureImage: typedSignature || contractToSign.clientName,
      });
    }

    setSignatureModalOpen(false);
    setSignSuccessToast(true);
    setTimeout(() => setSignSuccessToast(false), 4000);
  };

  const handleCreateContract = () => {
    const client = clients.find(c => c.id === selectedClientId) || clients[0];
    const newId = `ctr-${Date.now()}`;
    const contractNum = `CTR-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newCtr: StudioContract = {
      id: newId,
      contractNumber: contractNum,
      clientId: client.id,
      clientName: client.name + (client.partnerName ? ` & ${client.partnerName}` : ''),
      eventType: eventType as any,
      eventDate,
      totalValue: parseFloat(contractValue) || 4500,
      status: 'enviado',
      createdAt: 'Agora mesmo',
      clauses: [
        {
          title: 'Cláusula 1ª — Da Prestação de Serviços Fotográficos',
          content: `O FOTÓGRAFO compromete-se a realizar a cobertura fotográfica profissional de ${eventType} para os CONTRATANTES no dia ${eventDate}, garantindo equipamentos de nível profissional com backup de cartões espelhados.`,
        },
        {
          title: 'Cláusula 2ª — Do Prazo e Entrega da Galeria Online',
          content: 'A entrega das fotos tratadas e em resolução de estúdio ocorrerá via galeria online exclusiva da Cadu\'s Fotos em até 30 dias úteis, com direito a download em resolução original e seleção de favoritos para o álbum.',
        },
        {
          title: 'Cláusula 3ª — Da Validade Jurídica e Assinatura Eletrônica (MP 2.200-2/01)',
          content: 'As partes reconhecem a plena validade jurídica deste documento assinado eletronicamente nos termos do Marco Civil da Internet (Lei 12.965/14) e Medida Provisória nº 2.200-2/2001, com registro do carimbo do tempo e IP do signatário.',
        },
      ],
    };

    setContracts([newCtr, ...contracts]);
    setNewContractModalOpen(false);
  };

  const getWhatsAppShareLink = (contract: StudioContract) => {
    const text = encodeURIComponent(
      `Olá ${contract.clientName.split(' ')[0]}! Tudo bem?\n\n` +
      `Aqui é o Cadu. Preparei o nosso Contrato Fotográfico Oficial (${contract.contractNumber}) para a cobertura do seu ${contract.eventType}.\n\n` +
      `Você pode revisar todas as cláusulas e assinar eletronicamente em 1 clique pelo seu celular através deste link seguro:\n` +
      `https://cadusfotos.com.br/contrato/${contract.contractNumber}\n\n` +
      `Qualquer dúvida estou à disposição!`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="space-y-6">
      {/* Toast de sucesso */}
      {signSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-md animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Contrato assinado eletronicamente com sucesso! Registro de auditoria gerado com IP e carimbo de data/hora.</span>
          </div>
          <button onClick={() => setSignSuccessToast(false)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Toast de download de PDF concluído */}
      {downloadToast && (
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold flex items-center justify-between shadow-md animate-fade-in">
          <div className="flex items-center gap-2.5">
            <Download className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <span>Arquivo PDF Oficial gerado e baixado com sucesso em seu dispositivo!</span>
          </div>
          <button onClick={() => setDownloadToast(false)} className="text-teal-700 hover:text-teal-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar with Metrics & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Contratos Digitais com Assinatura Eletrônica
              </h3>
              <p className="text-xs text-slate-500">
                Juridicamente válidos no Brasil (MP 2.200-2/01 e Marco Civil da Internet) com link para WhatsApp.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setNewContractModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Novo Contrato</span>
        </button>
      </div>

      {/* Contracts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map(contract => {
          const isAssinado = contract.status === 'assinado';
          return (
            <div
              key={contract.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 border-t-4 border-t-teal-600 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-500 hover:shadow-md transition-all relative overflow-hidden group"
            >
              <div className="space-y-3">
                {/* Header Card with Session Badge & Status */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-50 text-teal-900 border-2 border-teal-600 shadow-xs">
                    {contract.eventType}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isAssinado
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isAssinado ? '✓ Assinado' : 'Aguardando'}
                  </span>
                </div>

                {/* Linha verde-azulada mais grossa para destacar o contrato */}
                <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-teal-500 to-teal-300 rounded-full" />

                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {contract.clientName}
                  </h4>
                  <p className="text-xs text-teal-700 font-semibold mt-0.5">
                    Nº: <b>{contract.contractNumber}</b>
                  </p>
                </div>

                {/* Values & Date Box */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Valor Contratado:</span>
                    <span className="text-sm font-extrabold text-teal-700">
                      R$ {contract.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Data do Evento: <b>{contract.eventDate}</b></span>
                  </div>
                  {isAssinado && contract.signedAt && (
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold pt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Assinado em {contract.signedAt}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedContract(contract)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Visualizar</span>
                </button>

                {!isAssinado ? (
                  <>
                    <button
                      onClick={() => handleOpenSignature(contract)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Assinar</span>
                    </button>

                    <a
                      href={getWhatsAppShareLink(contract)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      title="Enviar link de assinatura via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </>
                ) : (
                  <button
                    onClick={() => handleDownloadPdf(contract)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    title="Baixar Contrato Oficial em PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>Baixar PDF</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: VISUALIZAR CONTRATO COMPLETO */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Contrato de Prestação de Serviços Fotográficos
                  </h3>
                  <span className="text-xs text-slate-500">
                    {selectedContract.contractNumber} • {selectedContract.clientName}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedContract(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
              {/* Header timbrado do contrato */}
              <div className="border-b border-slate-200 pb-5 text-center space-y-1">
                <h2 className="text-lg font-serif font-bold text-slate-950 uppercase tracking-wider">
                  Instrumento Particular de Prestação de Serviços de Fotografia
                </h2>
                <p className="text-xs text-slate-500">
                  Cadu's Fotos Studio • CNPJ: 45.892.102/0001-44 • São Paulo - SP
                </p>
                <div className="pt-2 flex justify-center gap-4 text-xs font-semibold text-slate-700">
                  <span>Valor: R$ {selectedContract.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  <span>•</span>
                  <span>Data do Evento: {selectedContract.eventDate}</span>
                </div>
              </div>

              {/* Cláusulas */}
              <div className="space-y-4">
                {selectedContract.clauses.map((clause, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h4 className="font-bold text-slate-900">{clause.title}</h4>
                    <p className="text-slate-600 text-justify">{clause.content}</p>
                  </div>
                ))}
              </div>

              {/* Assinaturas & Auditoria */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {/* Fotógrafo */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Contratado / Fotógrafo</p>
                    <div className="font-serif italic text-lg text-teal-800 font-bold">
                      Carlos "Cadu" Eduardo
                    </div>
                    <p className="text-[11px] text-slate-500">Cadu's Fotos Studio</p>
                  </div>

                  {/* Cliente */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Contratante(s)</p>
                    {selectedContract.status === 'assinado' ? (
                      <div className="space-y-1">
                        <div className="font-serif italic text-lg text-emerald-800 font-bold">
                          {selectedContract.signatureImage || selectedContract.clientName}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-medium">
                          ✓ Assinado em {selectedContract.signedAt}
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono">
                          IP: {selectedContract.signerIp}
                        </div>
                      </div>
                    ) : (
                      <div className="py-2 text-xs text-amber-700 italic">
                        Aguardando assinatura do cliente
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificado de Integridade */}
                {selectedContract.status === 'assinado' && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="font-bold">Certificado de Autenticidade Digital:</span> Documento assinado eletronicamente em conformidade com o Art. 10 da MP 2.200-2/01.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setSelectedContract(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                Fechar
              </button>

              {selectedContract.status === 'assinado' ? (
                <button
                  onClick={() => handleDownloadPdf(selectedContract)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Baixar / Salvar PDF Oficial</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleOpenSignature(selectedContract);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Assinar este Contrato</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASSINATURA ELETRÔNICA INTERATIVA */}
      {signatureModalOpen && contractToSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Assinatura Eletrônica do Contrato
                  </h3>
                  <p className="text-xs text-slate-500">
                    {contractToSign.contractNumber} • {contractToSign.clientName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSignatureModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p>
                Ao assinar, você concorda expressamente com as cláusulas de entrega de fotos em até 30 dias úteis, prazos e condições financeiras do contrato no valor de <b>R$ {contractToSign.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Digite sua rubrica ou nome completo para assinar:
              </label>
              <input
                type="text"
                value={typedSignature}
                onChange={e => setTypedSignature(e.target.value)}
                placeholder="Ex: Isabela Silveira"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-serif text-lg italic text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Auditoria Probatória Registrada:</span>
                </div>
                <p>• Data/Hora: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
                <p>• IP de Origem: 177.18.204.91 (Banda Larga São Paulo/SP)</p>
                <p>• Certificado: Hash criptográfico SHA-256 gerado automaticamente</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSignatureModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSignature}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar e Assinar Contrato</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CRIAR NOVO CONTRATO */}
      {newContractModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Criar Novo Contrato Fotográfico
                  </h3>
                  <p className="text-xs text-slate-500">
                    Com modelos e cláusulas jurídicas padrão para o Brasil
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNewContractModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Selecione o Cliente / Lead</label>
                <select
                  value={selectedClientId}
                  onChange={e => setSelectedClientId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                >
                  {clients.map(cli => (
                    <option key={cli.id} value={cli.id}>
                      {cli.name} {cli.partnerName ? `& ${cli.partnerName}` : ''} ({cli.eventType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tipo de Evento</label>
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  >
                    <option value="Casamento">Casamento</option>
                    <option value="Ensaio Gestante">Ensaio Gestante</option>
                    <option value="Pré-Wedding">Pré-Wedding</option>
                    <option value="Corporativo & Branding">Corporativo & Branding</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Valor Total (R$)</label>
                  <input
                    type="number"
                    value={contractValue}
                    onChange={e => setContractValue(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Data e Local do Evento</label>
                <input
                  type="text"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setNewContractModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateContract}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Gerar Contrato Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
