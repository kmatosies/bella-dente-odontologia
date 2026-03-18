const API_BASE_URL = (import.meta.env.VITE_GEMINI_API_BASE_URL || '').replace(/\/$/, '');

function buildUrl(path: string) {
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof payload?.error === 'string' ? payload.error : 'Falha ao comunicar com o proxy do Gemini.';
    throw new Error(message);
  }

  return payload as T;
}

export async function analyzeData(transactions: unknown[], totalRevenue: number, totalExpenses: number) {
  const payload = await postJson<{ analysis: string }>('/api/gemini/analyze', {
    transactions,
    totalRevenue,
    totalExpenses,
  });

  return payload.analysis;
}

export async function scanMedicalRecord(base64Image: string, mimeType = 'image/jpeg') {
  const payload = await postJson<{ extracted: Record<string, unknown> }>('/api/gemini/scan-record', {
    base64Image,
    mimeType,
  });

  return payload.extracted;
}
