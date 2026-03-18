// src/services/aiService.ts

// Definimos o formato que o Patients.tsx espera receber
interface PatientData {
  name: string;
  phone: string;
  email: string;
  treatment: string;
}

export const processMedicalRecordImage = async (imageFile: string): Promise<PatientData> => {
  console.log("Simulando processamento da imagem...");
  
  // Simulamos um pequeno delay para parecer real
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Retornamos um objeto completo, e não apenas texto
  return {
    name: "Paciente Identificado (IA)",
    phone: "(00) 00000-0099",
    email: "paciente.ia@exemplo.local",
    treatment: "Avaliação Inicial via Imagem"
  };
};