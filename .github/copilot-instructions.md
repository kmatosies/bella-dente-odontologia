# Instruções do Copilot — Bella Dente Odontologia

## Resumo rápido
- Projeto: SPA em React + Vite + TypeScript, com interface em `src/components` e páginas em `src/pages`.
- Ponto de entrada: [index.tsx](index.tsx#L1-L20) importa `App` (arquivo `App.tsx` na raiz).
- Desenvolvimento: `npm install` → `npm run dev` (servidor Vite e proxy do Gemini em execução local).

## Objetivo do agente
- Ajudar com funcionalidades em React/TypeScript, refatoração em componentes e integrações com Google GenAI.
- Ser explícito sobre mudanças de arquivo e evitar renomear arquivos para pastas sem necessidade.

## Arquitetura e padrões importantes
- Estrutura monolítica no front-end: boa parte da lógica central ainda vive em `App.tsx`. Sempre que possível, prefira extrair lógica para `src/hooks` e apresentar pequenos componentes em `src/components`.
- Padrão de dados: uso predominante de estado local (`useState` / `useMemo`) para `patients`, `transactions` e `aiAnalysis`.
- Integração com IA: o front-end deve consumir o proxy local em `server/gemini-proxy.mjs`; a chave `GEMINI_API_KEY` deve existir somente no servidor/ambiente local e nunca no bundle do navegador.

## Dependências e integrações externas
- `@google/genai` — usado para geração e análise por meio do proxy.
- `recharts`, `jspdf`, `lucide-react` — gráficos, exportação e ícones.
- APIs do navegador: `navigator.mediaDevices.getUserMedia` é usado para leitura de câmera.

## Fluxo de trabalho prático

```bash
npm install
npm run dev
```

- Defina `.env.local` a partir de `.env.example` antes de usar o proxy do Gemini, Firebase ou o login de demonstração.
- Para depurar a IA, valide primeiro `GET /health` no proxy e só depois revise as variáveis do servidor/ambiente local.

## Convenções deste repositório
- Componentes de UI: `src/components/*`.
- Páginas: `src/pages/*`.
- Hooks reutilizáveis: `src/hooks/*`.
- Serviços: `src/services/*` — local recomendado para lógica de rede, integração e CRUD.

## Cuidados e avisos detectados
- Há sinais de estrutura antiga/inconsistente no projeto. Ao criar ou mover arquivos, mantenha `App.tsx` e `main.tsx` como arquivos únicos, evitando diretórios com esses nomes.
- O login de demonstração deve ser configurado com `VITE_DEMO_LOGIN_EMAIL` e `VITE_DEMO_LOGIN_PASSWORD`. Nunca commitar credenciais reais.
- A evolução natural do projeto pede consolidação dos serviços em `src/services/*`, evitando espalhar lógica de integração pelos componentes.

## Exemplos práticos

```ts
const response = await fetch('/api/gemini/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ totalRevenue: 1000, totalExpenses: 350, transactions: [] })
});
```

## Como o agente deve operar
- Propor mudanças pequenas, reversíveis e de baixo risco.
- Ao refatorar `App.tsx`, trabalhar em etapas: extrair lógica, criar componentes e só então reorganizar a composição final.
- Ao sugerir dependências, incluir o comando de instalação e o motivo.

---
Arquivo gerado automaticamente — reporte divergências para ajuste.
