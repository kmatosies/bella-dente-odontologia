import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa a IA
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// IMPORTANTE: Use o modelo 'gemini-1.5-flash' que é o padrão atual
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const analyzeData = async (transactions: any[], totalRevenue: number, totalExpenses: number) => {
  try {
    const financialContext = `
      Você é a Bella IA, consultora financeira de uma clínica.
      Dados do mês:
      - Faturamento: R$ ${totalRevenue}
      - Despesas: R$ ${totalExpenses}
      - Saldo: R$ ${totalRevenue - totalExpenses}
      
      Analise esses números brevemente e dê 3 dicas práticas. Use formatação Markdown.
    `;

    const result = await model.generateContent(financialContext);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    throw new Error("Erro ao conectar com a IA. Verifique sua chave API.");
  }
};