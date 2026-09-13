import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Clock, Sparkles, ExternalLink } from 'lucide-react';

interface NoticeModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  phoneNumber?: string;
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  title,
  subtitle,
  description,
  badge = '준비 중',
  phoneNumber,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-sm rounded-2xl bg-[#14120e] border border-amber-500/30 p-6 shadow-2xl text-stone-100 overflow-hidden"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/50">
                <Clock className="w-3.5 h-3.5" />
                {badge}
              </span>
              {subtitle && (
                <span className="text-sm text-stone-300 font-medium">
                  {subtitle}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight mb-2.5">
              {title}
            </h3>

            <p className="text-[15px] sm:text-base text-stone-200 leading-relaxed mb-6 whitespace-pre-line">
              {description}
            </p>

            <div className="flex flex-col gap-2.5">
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  전화로 직접 문의하기
                </a>
              )}
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl text-sm font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
