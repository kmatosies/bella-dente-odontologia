<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Bella Dente — Sistema de Gestão Odontológica

Sistema completo de gestão odontológica com dashboard, agenda, financeiro, prontuário e relatórios, integrado ao Firebase e Gemini AI.

---

## Demo pública

Este repositório possui uma versão demonstrativa estática do Bella Dente, criada para fins de portfólio.

A demo utiliza apenas dados fictícios e não possui conexão com banco de dados, autenticação ou APIs reais.

Acesse:
[Ver demo pública](https://kmatosies.github.io/bella-dente/demo/)

---

## 🚀 Rodar o Sistema Real Localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env.local` com suas chaves Firebase e Gemini:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_GEMINI_API_KEY=...
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 🛠️ Tecnologias

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Firebase Firestore (tempo real) + Firebase Auth
- **IA:** Google Gemini (escaneamento de prontuários via câmera)
- **Deploy:** Firebase Hosting
- **Demo:** HTML + CSS + JavaScript puro (sem dependências)
