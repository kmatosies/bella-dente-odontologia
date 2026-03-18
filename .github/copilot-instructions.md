# Copilot instructions — Bella Dente Odontologia

Resumo rápido
- Projeto: SPA React + Vite (TypeScript), UI em `src/components`, páginas em `src/pages`.
- Entrypoint: [index.tsx](index.tsx#L1-L20) imports `App` (arquivo `App.tsx` na raiz).
- Dev: `npm install` → `npm run dev` (Vite server na porta 3000, host 0.0.0.0).

Objetivo do agente
- Ajudar com features React/TS, refatoração em componentes, e integrações com Google GenAI.
- Ser explícito sobre mudanças de arquivo e evitar renomear arquivos para pastas (ver aviso abaixo).

Arquitetura e padrões importantes
- Monolítico no frontend: grande parte da lógica central está em [App.tsx](App.tsx#L1-L40). Para manutenção prefira extrair lógica para `src/hooks` e apresentar pequenos componentes em `src/components`.
- Padrão de dados: estado local (useState/useMemo) para `patients`, `transactions` e `aiAnalysis`. Não há backend por padrão; as `services/` existem mas estão vazias (`src/services/*`).
- Integração AI: o front-end deve consumir o proxy backend em `server/gemini-proxy.mjs`; a chave `GEMINI_API_KEY` deve existir apenas no servidor/local env e nunca no bundle do navegador.

Dependências e integrações externas
- `@google/genai` — usado para geração e análise (ver `getAiInsight` e `captureAndScan` em `App.tsx`).
- `recharts`, `jspdf`, `lucide-react` — visualização, export e ícones.
- Browser APIs: `navigator.mediaDevices.getUserMedia` é usado para leitura de câmera.

Developer workflow (prático)
- Instalar e rodar localmente:

```bash
npm install
npm run dev
```

- Defina `.env.local` a partir de `.env.example` antes de usar o proxy Gemini, Firebase ou o login de demonstração (README já documenta isso).
- Para depurar a IA, valide primeiro `GET /health` no proxy e só então revise as variáveis do servidor/local env.

Conventions específicas deste repo
- Componentes UI: `src/components/*` (ex.: `src/components/patients/PatientCard.tsx`).
- Páginas: `src/pages/*` (ex.: `src/pages/Login.tsx`).
- Hooks reutilizáveis: `src/hooks/*` (ex.: `usePatients.ts`).
- Services: `src/services/*` — local para lógica de rede; hoje estão vazios, mova a lógica de fetch/CRUD para aqui quando adicionar API.

Gotchas e avisos detectados
- Estrutura inválida: há diretórios com nomes de arquivo em `src/` (ex.: `src/App.tsx/` e `src/main.tsx/` são pastas vazias). Isso causa erros de resolução e ferramentas podem tratar `App.tsx` como pasta em vez de arquivo. Quando for criar/renomear, sempre usar arquivo único `App.tsx` (não uma pasta com esse nome).
- Autenticação: o login de demonstração deve ser configurado por variáveis de ambiente locais (`VITE_DEMO_LOGIN_EMAIL` e `VITE_DEMO_LOGIN_PASSWORD`). Nunca commitar credenciais reais no repositório; para produção, mover validação para um serviço de autenticação real.
- Serviços vazios: `src/services/auth.service.ts`, `patient.service.ts`, `transaction.service.ts` estão vazios. Implementar chamadas de rede/abstrações lá evita lógica dispersa.

Exemplos práticos (copiar/colar)
- Chamada rápida ao GenAI (exemplo usado no projeto):

```ts
const response = await fetch('/api/gemini/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ totalRevenue: 1000, totalExpenses: 350, transactions: [] })
});
```

- Exportar relatório em PDF (usado em `App.tsx`): `const doc = new jsPDF(); doc.save('relatorio.pdf')`.

Como o agente deve operar
- Proponha mudanças pequenas e reversíveis (PRs pequenos).
- Ao refatorar `App.tsx`, extraia em passos: 1) mover lógica para `src/hooks`, 2) criar componentes em `src/components`, 3) atualizar `App.tsx` para montar esses hooks/componentes.
- Quando sugerir adicionar dependência, inclua linha `npm install <pkg>` e motivo curto.

Solicitação de feedback
- Revise estas instruções e diga se quer que eu:
  - Documente contratos/props para componentes principais; ou
  - Normalize a estrutura movendo `App.tsx` para `src/` e removendo pastas conflitantes automaticamente.

---
Arquivo gerado automaticamente — reporte divergências e eu ajusto.
