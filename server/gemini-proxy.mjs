import { createServer } from 'node:http';
import { GoogleGenAI } from '@google/genai';

const HOST = process.env.GEMINI_PROXY_HOST || '0.0.0.0';
const PORT = Number(process.env.GEMINI_PROXY_PORT || process.env.PORT || 8787);
const ALLOWED_ORIGIN = process.env.GEMINI_PROXY_ALLOWED_ORIGIN || '*';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, status, payload) {
  setCorsHeaders(res);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function buildAnalysisPrompt({ totalRevenue, totalExpenses }) {
  return [
    'Você é a Bella IA, consultora financeira de uma clínica odontológica.',
    'Analise os dados resumidos abaixo e responda em português usando Markdown.',
    `- Faturamento: R$ ${Number(totalRevenue || 0).toFixed(2)}`,
    `- Despesas: R$ ${Number(totalExpenses || 0).toFixed(2)}`,
    `- Saldo: R$ ${(Number(totalRevenue || 0) - Number(totalExpenses || 0)).toFixed(2)}`,
    'Entregue uma leitura breve do cenário e 3 recomendações práticas e priorizadas.',
  ].join('\n');
}

function buildScanPrompt() {
  return [
    'Aja como um assistente odontológico.',
    'Extraia da imagem manuscrita ou fotografada os campos abaixo.',
    'Responda apenas com JSON válido, sem markdown, sem comentários e sem texto adicional.',
    '{"name":"","phone":"","email":"","treatmentHistory":""}',
  ].join('\n');
}

function safeJsonParse(input) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  if (!rawBody) return {};

  const parsed = safeJsonParse(rawBody);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('JSON inválido no corpo da requisição.');
  }

  return parsed;
}

async function generateText(parts) {
  if (!ai) {
    throw new Error('GEMINI_API_KEY não configurada no servidor.');
  }

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: parts,
  });

  return response.text?.trim() || '';
}

async function handleAnalyze(body) {
  const prompt = buildAnalysisPrompt(body);
  const analysis = await generateText(prompt);
  return { analysis };
}

async function handleScanRecord(body) {
  const { base64Image, mimeType = 'image/jpeg' } = body;

  if (!base64Image || typeof base64Image !== 'string') {
    throw new Error('base64Image é obrigatório.');
  }

  const text = await generateText([
    { text: buildScanPrompt() },
    { inlineData: { data: base64Image, mimeType } },
  ]);

  const sanitized = text.replace(/```json|```/g, '').trim();
  const extracted = safeJsonParse(sanitized);

  if (!extracted) {
    throw new Error('A resposta do Gemini não retornou JSON válido.');
  }

  return { extracted };
}

const server = createServer(async (req, res) => {
  setCorsHeaders(res);

  if (!req.url) {
    sendJson(res, 400, { error: 'Requisição inválida.' });
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    sendJson(res, 200, {
      ok: true,
      hasGeminiKey: Boolean(GEMINI_API_KEY),
      model: MODEL,
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/gemini/analyze') {
    try {
      const body = await readJsonBody(req);
      const payload = await handleAnalyze(body);
      sendJson(res, 200, payload);
    } catch (error) {
      sendJson(res, 500, {
        error: error instanceof Error ? error.message : 'Falha ao gerar análise com Gemini.',
      });
    }
    return;
  }

  if (req.method === 'POST' && req.url === '/api/gemini/scan-record') {
    try {
      const body = await readJsonBody(req);
      const payload = await handleScanRecord(body);
      sendJson(res, 200, payload);
    } catch (error) {
      sendJson(res, 500, {
        error: error instanceof Error ? error.message : 'Falha ao processar imagem com Gemini.',
      });
    }
    return;
  }

  sendJson(res, 404, { error: 'Rota não encontrada.' });
});

server.listen(PORT, HOST, () => {
  console.info(`[proxy-gemini] em execução em http://${HOST}:${PORT}`);
  console.info(`[proxy-gemini] chave do Gemini configurada: ${GEMINI_API_KEY ? 'sim' : 'não'}`);
});
