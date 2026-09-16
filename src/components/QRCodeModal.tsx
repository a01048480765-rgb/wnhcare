import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Copy, Check, Share2, Download } from 'lucide-react';
import { Logo } from './Logo';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyLink: () => void;
  cardUrl: string;
  representative: string;
  company: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  onCopyLink,
  cardUrl,
  representative,
  company,
}) => {
  const [copied, setCopied] = useState(false);

  // Encode URL for QR code generation
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=${encodeURIComponent(
    cardUrl
  )}`;

  const handleCopy = () => {
    onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = qrImageSrc;
    link.download = `${company}_${representative}_전자명함_QR.png`;
    link.target = '_blank';
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-sm rounded-2xl bg-[#14120e] border border-amber-500/30 p-6 shadow-2xl text-stone-100 text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-24 h-12 mx-auto mb-2 flex items-center justify-center">
              <Logo className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.35)]" />
            </div>

            <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              {company} QR 명함
            </h3>
            <p className="text-sm text-stone-300 mt-1 mb-5">
              스마트폰 카메라로 스캔하면 전자명함이 바로 열립니다
            </p>

            {/* QR Image Container */}
            <div className="relative mx-auto w-56 h-56 p-3 bg-white rounded-2xl shadow-inner flex items-center justify-center border-4 border-stone-800">
              <img
                src={qrImageSrc}
                alt="전자명함 QR코드"
                className="w-full h-full object-contain rounded-lg"
                crossOrigin="anonymous"
              />
            </div>

            <p className="text-sm text-amber-300 mt-3.5 font-semibold">
              {representative} 대표 · 월앤홈케어
            </p>
            <p className="text-xs text-amber-400/85 mt-1 font-mono tracking-wider">
              {cardUrl.replace(/^https?:\/\//, '')}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>링크 복사완료</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>명함 주소 복사</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadQr}
                className="flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 shadow-md shadow-amber-500/20 transition-all"
                title="QR코드 이미지 저장"
              >
                <Download className="w-4 h-4" />
                <span>QR 저장</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
