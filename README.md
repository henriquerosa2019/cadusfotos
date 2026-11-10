# Cadu's Fotos — Plataforma All-in-One para Fotógrafos Profissionais

> **A plataforma definitiva para negócios de fotografia de alto padrão no Brasil.**  
> Inspirada na estrutura e elegância internacional do Pixieset, mas 100% sob medida para a realidade do fotógrafo brasileiro (PIX nativo, cálculo de frete Jadlog/Sedex, contratos digitais com validade jurídica e laboratórios integrados como Indimagem e Digipix Pro).

---

## 🚀 Módulos da Plataforma

### 1. 📸 Galerias do Cliente (Client Gallery)
- **Capa Cinematográfica & Experiência Editorial:** Tipografia moderna, fotos em alta resolução e visualização imersiva.
- **Prova & Seleção de Fotos do Álbum:** Seleção por favoritos com 1 clique, notas de retoque personalizadas e aprovação com exportação rápida para o **Adobe Lightroom**.
- **Download Seguro com PIN:** Opções de download em Alta Resolução (Original de Estúdio) ou Otimizada para Redes Sociais com validação de PIN de 4 dígitos.
- **Painel de Gestão do Fotógrafo:** Acompanhamento em tempo real de fotos aprovadas pela cliente e leitura de observações.

### 2. 🛍️ Loja Integrada & Laboratório Gráfico (Store & Print Lab)
- **Integração com Encadernadoras e Laboratórios Nacionais:**
  - **Indimagem Álbuns & Encadernação (Caxias do Sul/RS):** Álbuns Panorâmicos 180° Layflat em Linho Francês Cru, Couro Nobre, gravação a laser e papel Silk Seda 800g/m².
  - **Digipix Pro Fine Art (Alphaville/SP):** Quadros emoldurados com vidro museum antirreflexo, telas canvas em chassi de madeira 4cm, caixas de memórias em carvalho e impressões fine art.
- **Mockup Interativo & Simulador de Ambientes (Room View):** O cliente visualiza a foto escolhida na parede de uma sala moderna em escala real proporcional (30x40, 50x70, 60x90).
- **Lista de Presentes de Casamento & Cotas para Padrinhos:** Padrinhos e familiares presenteiam os noivos com cotas do álbum via PIX, com dedicatória impressa.
- **Carrinho com Cálculo de Frete Real:** Cotação via **Jadlog Express** e **Sedex** com prazos e preços reais.
- **Checkout com PIX Instantâneo e Cartão até 12x:** QR Code dinâmico, código Copia-e-Cola e repasse automático de lucro para o fotógrafo.

### 3. 💼 Studio Manager (CRM, Contratos Digitais & PIX)
- **Contratos Digitais com Assinatura Eletrônica:**
  - Válidos juridicamente no Brasil em conformidade com o **Art. 10, § 2º da MP 2.200-2/2001**, **Lei 14.063/2020** e **Marco Civil da Internet (Lei 12.965/14)**.
  - Registro de auditoria probatória com carimbo de data/hora (Brasília), IP do signatário e protocolo hash SHA-256.
  - **Download nativo de PDF oficial (.pdf)** timbrado com dados do estúdio.
  - Compartilhamento de link de assinatura via WhatsApp com 1 clique.
- **Cobranças Parceladas com PIX:**
  - Faturas com QR Code dinâmico, código Copia-e-Cola e confirmação com baixa imediata no caixa.
  - Lembretes amigáveis de vencimento pré-formatados para WhatsApp.
- **Agenda Visual de Sessões & Casamentos:**
  - Linha verde-azulada destacada em cada sessão (Ensaio Gestante, Casamento, Pré-Wedding).
  - Horários de luz natural (**Golden Hour**), checklist completo de equipamentos e rota direta no Google Maps/Waze.
- **Funil de Clientes & Leads (CRM):** Gestão visual desde o primeiro contato até a entrega final com régua percentual de pagamentos.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React Icons.
- **Geração de Documentos:** jsPDF (PDFs vetoriais e certificados digitais).
- **Tooling & Bundler:** Vite 6.
- **Design System:** Padrão limpo e sofisticado com fundo branco inspirado na Pixieset, responsivo para desktop, tablets e smartphones.

---

## 📦 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/henriquerosa2019/cadusfotos.git

# Acesse o diretório
cd cadusfotos

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Para compilar a versão de produção
npm run build
```

---

## 🌐 Deploy na Vercel

O projeto está configurado para deploy instantâneo na **Vercel**:
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
