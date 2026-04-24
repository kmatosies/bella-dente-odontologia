<div align="center">
  <img width="1200" height="475" alt="Bella Dente banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # Bella Dente Odontologia

  **Plataforma web para gestão odontológica com painel financeiro, organização clínica e recursos assistidos por IA.**

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-20232A?logo=react" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
    <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" />
    <img alt="Gemini Proxy" src="https://img.shields.io/badge/Gemini-Proxy_Server-0F9D58" />
  </p>
</div>

---

## Sobre o projeto

O **Bella Dente Odontologia** é uma aplicação web pensada para apoiar a rotina operacional de clínicas odontológicas, reunindo informações de gestão em uma interface moderna, visual e preparada para crescimento modular.

O repositório combina:

- **camada de apresentação já funcional**, com login, navegação administrativa e painel financeiro;
- **base arquitetural pronta para evolução**, incluindo agenda, pacientes, financeiro, integração com Firebase e recursos de IA com Gemini;
- **proteção de chave de IA via proxy de backend**, evitando expor o segredo diretamente no navegador.

> **Status atual:** MVP funcional em evolução, com foco em UX, organização do código e preparação para dados persistidos e autenticação real.

---

## Destaques

- Painel financeiro com visão rápida de entradas, saídas, saldo e valores pendentes.
- Interface administrativa responsiva com navegação lateral e tema claro/escuro.
- Estrutura preparada para módulos de **Pacientes**, **Agenda**, **Financeiro** e **Bella IA**.
- Integração com Gemini protegida por **proxy local de backend**, sem chave embutida no pacote do front-end.
- Base preparada para evolução com **Firebase Authentication** e **Cloud Firestore**.

---

## Stack tecnológica

### Interface cliente

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Lucide React**
- **Recharts**

### Integrações e serviços

- **Google Gemini** via proxy de backend
- **Firebase Authentication**
- **Cloud Firestore**
- **jsPDF**

---

## Arquitetura atual

A solução está organizada em duas frentes principais:

### 1. Aplicação cliente
Responsável pela interface, experiência do usuário, navegação, dashboard e módulos visuais.

### 2. Proxy de backend do Gemini
Responsável por receber chamadas de IA do front-end e executar a comunicação com o Gemini no servidor, mantendo `GEMINI_API_KEY` fora do navegador.

### Fluxo resumido

```text
Usuário → aplicação cliente React/Vite → proxy /api/gemini/* → Gemini API
```

Essa abordagem traz dois benefícios importantes:

- **mais segurança**, ao evitar exposição direta da chave no cliente;
- **mais flexibilidade**, ao permitir evolução futura para autenticação, limitação de requisições, registros e auditoria no backend.

---

## Funcionalidades disponíveis

### Em operação no fluxo principal

- Tela de login para ambiente local/demonstração.
- Layout administrativo com sidebar.
- Alternância de tema claro/escuro.
- Dashboard com:
  - resumo financeiro;
  - alertas operacionais;
  - gráficos de apoio gerencial;
  - visão consolidada de caixa e pendências.

### Estruturas já presentes no repositório

- módulo de pacientes;
- módulo financeiro com lançamentos;
- agenda clínica;
- geração de relatórios;
- integração com Firebase;
- recursos assistidos por IA (Bella IA e scanner de prontuário).

---

## Estrutura do repositório

```text
bella-dente-odontologia/
├── server/              # Proxy de backend do Gemini
├── scripts/             # Scripts auxiliares de desenvolvimento
├── src/
│   ├── components/      # Componentes reutilizáveis de UI
│   ├── hooks/           # Hooks da aplicação
│   ├── pages/           # Páginas e módulos
│   ├── providers/       # Providers e contexto
│   ├── services/        # Serviços de integração e acesso a dados
│   ├── types/           # Tipagens centrais
│   ├── App.tsx          # Fluxo principal atual do app
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globais
├── .env.example         # Exemplo seguro de variáveis de ambiente
├── package.json         # Scripts e dependências
└── README.md            # Documentação do projeto
```

## Scripts disponíveis

```bash
npm run dev          # Inicia interface cliente + proxy do Gemini
npm run dev:client   # Inicia apenas a interface cliente
npm run dev:server   # Inicia apenas o proxy do Gemini
npm run build        # Gera a versão de produção da interface
npm run preview      # Faz a pré-visualização da versão de produção da interface
npm run start:server # Inicia apenas o proxy de backend
```

---

## Segurança

O projeto já adota algumas medidas para reduzir exposição indevida de credenciais e dados sensíveis:

- remoção de credenciais hardcoded do repositório;
- versionamento de `.env.example` em vez de `.env` real;
- uso de proxy de backend para chamadas do Gemini;
- sanitização de dados de demonstração e placeholders visuais.

---

## Observação final

Este README foi estruturado para servir tanto como **apresentação pública do repositório no GitHub** quanto como ponto de partida técnico para desenvolvimento local.
