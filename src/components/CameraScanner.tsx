import React, { useRef, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Patient } from '../types';
import { scanMedicalRecord } from '../services/geminiService';

interface CameraScannerProps {
  onScanComplete: (data: any) => void;
  onClose: () => void;
  isOpen: boolean;
  currentPatients: Patient[];
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ isOpen, onClose, onScanComplete, currentPatients }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      alert('Erro ao acessar câmera. Verifique as permissões.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  React.useEffect(() => {
    if (isOpen) startCamera();
    else stopCamera();
    return () => stopCamera();
  }, [isOpen]);

  const captureAndProcess = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

      try {
        const extractedData = await scanMedicalRecord(base64Image, 'image/jpeg');
        const maxId = currentPatients.reduce((max, p) => (p.displayId || 0) > max ? (p.displayId || 0) : max, 0);
        const nextDisplayId = maxId + 1;

        const finalData = {
          ...extractedData,
          displayId: nextDisplayId,
        };

        onScanComplete(finalData);
        stopCamera();
        onClose();
      } catch (err) {
        console.error(err);
        alert('Erro ao processar imagem no proxy da IA. Verifique se o servidor proxy está ativo.');
      } finally {
        setIsScanning(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
        <div className="p-4 flex justify-between items-center bg-slate-800">
          <h3 className="text-white font-bold flex items-center gap-2"><Sparkles className="text-teal-400" size={18} /> Scanner IA</h3>
          <button onClick={() => { stopCamera(); onClose(); }} className="text-slate-400 hover:text-white"><X /></button>
        </div>

        <div className="relative aspect-[3/4] bg-black">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />

          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[70%] border-2 border-dashed border-teal-500/50 rounded-2xl" />
            </div>
          )}

          {isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-teal-900/80 backdrop-blur-sm z-10">
              <div className="w-12 h-12 border-4 border-white/20 border-t-teal-400 rounded-full animate-spin mb-4" />
              <p className="text-white font-bold animate-pulse">Lendo Prontuário...</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-900 flex justify-center">
          <button onClick={captureAndProcess} disabled={isScanning} className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition disabled:opacity-50">
            <div className="w-14 h-14 border-2 border-black rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
};
