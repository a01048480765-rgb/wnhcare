import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  MessageSquare,
  Share2,
  Copy,
  Check,
  Mail,
  Home,
} from 'lucide-react';
import { downloadVCard } from './utils/vcard';
import { Toast } from './components/Toast';
import { NoticeModal } from './components/NoticeModal';
import { QRCodeModal } from './components/QRCodeModal';
import { ToastMessage } from './types';
import { Logo } from './components/Logo';
import { PearlSparklesBackground, CardPearlGleam } from './components/PearlSparkles';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'portfolio' | 'instagram' | 'qr' | null>(null);

  // Business Card Information
  const cardData = {
    company: '월앤홈케어',
    subName: 'WALL & HOME CARE',
    representative: '이영서',
    title: '대표',
    phone: '010-8051-6582',
    phoneFormatted: '010-8051-6582',
    email: 'coco3808@hanmail.net',
    kakaoUrl: 'https://pf.kakao.com/_QxodrX/chat',
    bank: '토스뱅크',
    accountNumber: '1002-5671-6524',
    accountHolder: '이영서',
    area: '서울/경기/인천 외 전국',
    areaBadge: '서울·경기·인천 ∣ 전국 출장',
    services: [
      {
        title: '에어컨 냉매충전',
        desc: '정밀점검∣친환경 냉매완충',
      },
      {
        title: '입주∣이사 청소',
        desc: '디테일 케어 및 안심 살균',
      },
      {
        title: '벽걸이형 TV 설치',
        desc: '안전브라켓 설치∣선정리',
      },
      {
        title: '가전제품 홈케어',
        desc: '분해세척∣소독',
      },
    ],
    links: [
      {
        id: 'portfolio',
        title: '공식 사이트',
        desc: '월앤홈케어 공식 웹사이트',
        badge: '공식 사이트',
        url: 'https://service-880737087362.asia-south1.run.app',
        isReady: true,
        type: 'portfolio',
      },
      {
        id: 'blog',
        title: '네이버 블로그',
        desc: '시공후기',
        badge: '공식 블로그',
        url: 'https://blog.naver.com/dlalstj2637',
        isReady: true,
        type: 'naver',
      },
      {
        id: 'youtube',
        title: '유튜브',
        desc: '월앤홈케어 공식 유튜브',
        badge: '공식 영상',
        url: 'https://www.youtube.com/@월앤홈케어',
        isReady: true,
        type: 'youtube',
      },
      {
        id: 'kakao',
        title: '카카오톡',
        desc: '1:1 실시간 카톡 상담',
        badge: '실시간 상담',
        url: 'https://pf.kakao.com/_QxodrX/chat',
        isReady: true,
        type: 'kakao',
      },
      {
        id: 'instagram',
        title: '인스타그램',
        desc: '월앤홈케어 공식 인스타그램',
        badge: '공식 SNS',
        url: 'https://www.instagram.com/032.6l/',
        isReady: true,
        type: 'instagram',
      },
      {
        id: 'daangn',
        title: '당근마켓',
        desc: '이웃들의 리얼 후기와 단골 소식',
        badge: '단골 맺기',
        url: 'https://www.daangn.com/kr/local-profile/%EC%9B%94%EC%95%A4%ED%99%88%EC%BC%80%EC%96%B4-6q3xgn3y6mkg/',
        isReady: true,
        type: 'daangn',
      },
    ],
  };

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedField(label);
      showToast(`${label} 복사되었습니다`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      showToast('복사에 실패했습니다. 직접 복사해주세요.', 'info');
    }
  };

  const handleDownloadContact = () => {
    downloadVCard({
      name: cardData.representative,
      org: cardData.company,
      title: cardData.title,
      phone: cardData.phone,
      email: cardData.email,
      note: `에어컨 냉매충전 / 입주∣이사 청소 / 벽걸이형 TV설치 / 가전제품 홈케어\n계좌: ${cardData.bank} ${cardData.accountNumber}\n서비스지역: ${cardData.area}`,
    });
    showToast('연락처 파일(.vcf)이 저장되었습니다');
  };

  const handleShareCard = async () => {
    const currentUrl = 'https://wnhcare.com';
    const displayHost = 'wnhcare.com';
    const shareData = {
      title: `${cardData.company} - ${cardData.representative} 대표`,
      text: `${cardData.company} (${cardData.representative} 대표) 전자명함입니다. 에어컨 냉매충전, 입주∣이사 청소, 벽걸이TV, 가전홈케어 전문`,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard(currentUrl, `명함 주소(${displayHost})가`);
      }
    } else {
      copyToClipboard(currentUrl, `명함 주소(${displayHost})가`);
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=1&data=${encodeURIComponent(
    'https://wnhcare.com/'
  )}`;

  return (
    <div
      id="digital-card-page"
      className="min-h-[100dvh] w-full bg-[#030303] text-stone-100 flex flex-col items-center justify-center p-2 sm:p-4 select-none font-sans overflow-x-hidden overflow-y-auto relative py-6"
    >
      {/* Background Pearl Glitter & Twinkling Sparkles */}
      <PearlSparklesBackground />

      {/* Unified Main Business Card Container */}
      <motion.main
        id="business-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          width: 'min(94vw, calc((100dvh - 1.5rem) * (420 / 580)), 420px)',
          aspectRatio: '420 / 580',
          containerType: 'inline-size',
        }}
        className="business-card-container relative z-10 bg-[#0c0a07]/95 rounded-[2.2cqw] border border-amber-500/35 shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(217,119,6,0.15)] backdrop-blur-xl flex flex-col justify-between overflow-hidden shrink-0 select-none text-amber-300"
      >
        {/* Subtle Pearl & Sparkle Gleam on Card */}
        <CardPearlGleam />

        {/* Subtle Top Golden Accent Line */}
        <div className="relative z-10 h-[0.7cqw] w-full bg-gradient-to-r from-[#FEF08A] via-[#F59E0B] to-[#D97706] shrink-0" />

        {/* Unified Card Content - Vertical business card proportion */}
        <div className="relative z-10 px-[3.8cqw] pt-[2.8cqw] pb-[2.6cqw] flex flex-col justify-between flex-1 w-full min-h-0">
          {/* Header Area: Logo, Title & QR buttons */}
          <div id="company-header-block" className="w-full">
            <div className="flex items-center justify-between gap-[1.8cqw] w-full">
              {/* Logo & Company Name */}
              <div className="flex items-center gap-[2cqw] min-w-0 flex-1">
                <div className="relative shrink-0 flex items-center justify-center">
                  <div className="w-[23cqw] h-[15cqw] flex items-center justify-center shrink-0 overflow-visible">
                    <Logo className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]" />
                  </div>
                </div>
                <div className="flex flex-col text-left justify-center min-w-0 flex-1">
                  <h1 className="text-[8.4cqw] font-black tracking-tight leading-none truncate bg-gradient-to-r from-[#FEF08A] via-[#F59E0B] to-[#D97706] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] py-[0.1cqw]">
                    {cardData.company}
                  </h1>
                </div>
              </div>

              {/* Action Button: Embedded QR */}
              <div className="flex items-center shrink-0">
                <button
                  id="header-embedded-qr"
                  onClick={() => setActiveModal('qr')}
                  className="shrink-0 flex items-center justify-center p-[0.6cqw] w-[12cqw] h-[12cqw] aspect-square bg-stone-900/90 hover:bg-stone-850 rounded-[1.4cqw] border border-amber-500/35 shadow-md shadow-black/40 group transition-all active:scale-95 cursor-pointer"
                  title="클릭 시 QR코드 확대 및 저장"
                  aria-label="QR코드 명함 확대"
                >
                  <div className="p-[0.5cqw] bg-white rounded-[1cqw] overflow-hidden shadow-inner w-full h-full flex items-center justify-center">
                    <img
                      src={qrCodeUrl}
                      alt="월앤홈케어 전자명함 QR코드"
                      className="w-full h-full object-contain rounded-[0.5cqw]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Service Area & Phone Number Row */}
            <div className="mt-[1.4cqw] flex items-center justify-between gap-[1.4cqw] w-full px-[0.4cqw]">
              <div className="inline-flex items-center text-[3.8cqw] text-amber-300 font-normal min-w-0">
                <span className="truncate whitespace-nowrap">{cardData.areaBadge}</span>
              </div>
              <div
                id="header-phone-badge"
                className="inline-flex items-center text-[3.8cqw] text-amber-300 font-normal shrink-0"
              >
                <span className="tracking-wide whitespace-nowrap leading-none">{cardData.phoneFormatted}</span>
              </div>
            </div>
          </div>

          {/* Standalone Contact Actions Frame (전화걸기 / 문자상담 / 이메일 독립 프레임) */}
          <div
            id="contact-actions-frame"
            className="w-full p-[1.2cqw] rounded-[1.8cqw] bg-stone-950/75 border border-amber-500/30 shadow-md shadow-black/50 backdrop-blur-sm"
          >
            <div className="grid grid-cols-3 gap-[1.2cqw] w-full">
              <a
                id="call-btn"
                href={`tel:${cardData.phone}`}
                className="flex items-center justify-center gap-[0.8cqw] py-[3.2cqw] px-[0.6cqw] rounded-[1.2cqw] bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 text-amber-300 hover:text-amber-200 font-normal transition-all shadow-md shadow-amber-500/10 border border-amber-400/50 text-[3.6cqw] whitespace-nowrap leading-none"
                title={`${cardData.phone} 전화걸기`}
              >
                <Phone className="w-[4cqw] h-[4cqw] text-amber-400 shrink-0" />
                <span>전화걸기</span>
              </a>

              <a
                id="sms-btn"
                href={`sms:${cardData.phone}`}
                className="flex items-center justify-center gap-[0.8cqw] py-[3.2cqw] px-[0.6cqw] rounded-[1.2cqw] bg-stone-900/80 hover:bg-stone-850 active:scale-95 text-amber-300 hover:text-amber-200 font-normal transition-all border border-amber-500/35 hover:border-amber-400/60 text-[3.6cqw] shadow-sm whitespace-nowrap leading-none"
                title={`${cardData.phone} 문자상담`}
              >
                <MessageSquare className="w-[4cqw] h-[4cqw] text-amber-400 shrink-0" />
                <span>문자상담</span>
              </a>

              <a
                id="email-btn"
                href={`mailto:${cardData.email}`}
                className="flex items-center justify-center gap-[0.8cqw] py-[3.2cqw] px-[0.6cqw] rounded-[1.2cqw] bg-stone-900/80 hover:bg-stone-850 active:scale-95 text-amber-300 hover:text-amber-200 font-normal transition-all border border-amber-500/35 hover:border-amber-400/60 text-[3.6cqw] shadow-sm whitespace-nowrap leading-none"
                title={`${cardData.email} 이메일 보내기`}
              >
                <Mail className="w-[4cqw] h-[4cqw] text-amber-400 shrink-0" />
                <span>이메일</span>
              </a>
            </div>
          </div>

          {/* Standalone Business Services Frame (에어컨 냉매충전 등 사업내용 전용 프레임) */}
          <div
            id="services-frame"
            className="w-full px-[3cqw] py-[2.2cqw] rounded-[1.8cqw] bg-stone-950/75 border border-amber-500/30 shadow-md shadow-black/50 backdrop-blur-sm"
          >
            <div className="grid grid-cols-2 gap-x-[3.2cqw] gap-y-[1.2cqw]">
              {cardData.services.map((item, idx) => (
                <div key={idx} className="flex flex-col justify-center min-w-0">
                  <span className="text-[3.8cqw] font-normal text-amber-300 leading-tight mb-[0.2cqw] truncate whitespace-nowrap tracking-tight">
                    {item.title}
                  </span>
                  <p className="text-[3.2cqw] font-normal text-amber-300/85 leading-tight whitespace-nowrap tracking-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Core Channels (Site, Naver, YouTube, KakaoTalk, Instagram, Daangn) - 3 cols x 2 rows rectangular layout */}
          <div id="channel-links" className="grid grid-cols-3 gap-[1.4cqw] w-full">
            {/* 1. 공식 사이트 */}
            <a
              id="btn-website"
              href="https://service-880737087362.asia-south1.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-[1.4cqw] py-[2.4cqw] px-[2.2cqw] rounded-[1.4cqw] bg-stone-950/75 hover:bg-amber-950/35 border border-amber-500/30 hover:border-amber-400/70 transition-all active:scale-[0.96] group overflow-hidden shadow-sm"
              title="월앤홈케어 공식 홈페이지 바로가기"
            >
              <Home
                className="w-[4.8cqw] h-[4.8cqw] text-amber-400 group-hover:text-amber-300 transition-transform group-hover:scale-105 shrink-0 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
                strokeWidth={2.2}
              />
              <span className="text-[3.6cqw] font-normal text-amber-300/90 group-hover:text-amber-200 tracking-tight truncate whitespace-nowrap text-left">
                홈페이지
              </span>
            </a>

            {/* 2. 네이버 블로그 */}
            <a
              id="btn-naver-blog"
              href="https://blog.naver.com/dlalstj2637"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-[1.4cqw] py-[2.4cqw] px-[2.2cqw] rounded-[1.4cqw] bg-stone-950/75 hover:bg-emerald-950/35 border border-amber-500/30 hover:border-emerald-400/70 transition-all active:scale-[0.96] group overflow-hidden shadow-sm"
              title="네이버 블로그 바로가기"
            >
              <img
                src="/naver-blog-icon.svg"
                alt="네이버 블로그"
                className="w-[4.8cqw] h-[4.8cqw] object-contain rounded-[0.8cqw] shrink-0 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform"
              />
              <span className="text-[3.6cqw] font-normal text-amber-300/90 group-hover:text-amber-200 tracking-tight truncate whitespace-nowrap text-left">
                블로그
              </span>
            </a>

            {/* 3. 유튜브 */}
            <a
              id="btn-youtube"
              href="https://www.youtube.com/@월앤홈케어"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-[1.4cqw] py-[2.4cqw] px-[2.2cqw] rounded-[1.4cqw] bg-stone-950/75 hover:bg-red-950/35 border border-amber-500/30 hover:border-red-500/70 transition-all active:scale-[0.96] group overflow-hidden shadow-sm"
              title="유튜브 바로가기"
            >
              <img
                src="/youtube-app-icon.svg"
                alt="유튜브"
                className="w-[4.8cqw] h-[4.8cqw] object-contain rounded-[0.8cqw] shrink-0 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform"
              />
              <span className="text-[3.6cqw] font-normal text-amber-300/90 group-hover:text-amber-200 tracking-tight truncate whitespace-nowrap text-left">
                유튜브
              </span>
            </a>

            {/* 4. 카카오톡 (당근과 자리 교체) */}
            <a
              id="btn-kakaotalk"
              href={cardData.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-[1.4cqw] py-[2.4cqw] px-[2.2cqw] rounded-[1.4cqw] bg-stone-950/75 hover:bg-yellow-950/35 border border-amber-500/30 hover:border-yellow-400/70 transition-all active:scale-[0.96] group overflow-hidden shadow-sm"
              title="카카오톡 1:1 상담 바로가기"
            >
              <img
                src="/kakaotalk-icon.svg"
                alt="카카오톡"
                className="w-[4.8cqw] h-[4.8cqw] object-contain rounded-[0.8cqw] shrink-0 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform"
              />
              <span className="text-[3.6cqw] font-normal text-amber-300/90 group-hover:text-amber-200 tracking-tight truncate whitespace-nowrap text-left">
                카카오톡
              </span>
            </a>

            {/* 5. 인스타그램 */}
            <a
              id="btn-instagram"
              href="https://www.instagram.com/032.6l/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-[1.4cqw] py-[2.4cqw] px-[2.2cqw] rounded-[1.4cqw] bg-stone-950/75 hover:bg-pink-950/35 border border-amber-500/30 hover:border-pink-400/70 transition-all active:scale-[0.96] group overflow-hidden shadow-sm"
              title="인스타그램 바로가기"
            >
              <img
                src="/instagram.svg"
                alt="인스타그램"
                className="w-[4.8cqw] h-[4.8cqw] object-contain rounded-[0.8cqw] shrink-0 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform"
              />
              <span className="text-[3.6cqw] font-normal text-amber-300/90 group-hover:text-amber-200 tracking-tight truncate whitespace-nowrap text-left">
                인스타그램
              </span>
            </a>

            {/* 6. 당근 (카카오톡과 자리 교체) */}
            <a
              id="btn-daangn"
              href="https://www.daangn.com/kr/local-profile/%EC%9B%94%EC%95%A4%ED%99%88%EC%BC%80%EC%96%B4-6q3xgn3y6mkg/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-[1.4cqw] py-[2.4cqw] px-[2.2cqw] rounded-[1.4cqw] bg-stone-950/75 hover:bg-orange-950/35 border border-amber-500/30 hover:border-orange-400/70 transition-all active:scale-[0.96] group overflow-hidden shadow-sm"
              title="당근 바로가기"
            >
              <img
                src="/daangn-app-icon.svg"
                alt="당근"
                className="w-[4.8cqw] h-[4.8cqw] object-contain rounded-[0.8cqw] shrink-0 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform"
              />
              <span className="text-[3.6cqw] font-normal text-amber-300/90 group-hover:text-amber-200 tracking-tight truncate whitespace-nowrap text-left">
                당근
              </span>
            </a>
          </div>

          {/* Divider Line 3 */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent my-[1cqw] shrink-0" />

          {/* Toss Bank Account Section: Plain text with copy icon and text */}
          <div
            id="toss-bank-section"
            onClick={() => copyToClipboard(cardData.accountNumber, '토스뱅크 계좌번호가')}
            className="w-full flex items-center justify-center gap-[1.8cqw] py-[0.8cqw] text-center select-text cursor-pointer group"
            title="클릭 시 계좌번호 복사"
          >
            <span className="text-[3.8cqw] text-amber-300 font-normal tracking-wide group-hover:text-amber-200 transition-colors">
              {cardData.bank} {cardData.accountNumber}
            </span>
            <span
              id="copy-account-icon"
              className="inline-flex items-center gap-[0.8cqw] py-[0.4cqw] px-[1.4cqw] rounded-[0.6cqw] bg-amber-500/15 group-hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all active:scale-95 text-[3.2cqw] font-normal shrink-0 select-none"
              title="계좌번호 복사"
            >
              {copiedField === '토스뱅크 계좌번호가' ? (
                <>
                  <Check className="w-[3.4cqw] h-[3.4cqw] text-emerald-400" />
                  <span className="text-emerald-300">복사완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-[3.4cqw] h-[3.4cqw] text-amber-400" />
                  <span>계좌복사</span>
                </>
              )}
            </span>
          </div>

          {/* Divider Line 4 */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent my-[1cqw] shrink-0" />

          {/* Footer: Representative Signature & Share Button */}
          <div className="flex items-center justify-between gap-[1.8cqw] w-full pt-[0.1cqw]">
            <span className="font-brush font-normal text-[7.2cqw] leading-none bg-gradient-to-r from-[#FEF08A] via-[#F59E0B] to-[#D97706] bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] whitespace-nowrap tracking-normal shrink-0">
              정성을 다하는 대표 {cardData.representative}
            </span>
            <button
              onClick={handleShareCard}
              className="flex items-center gap-[1cqw] px-[2.2cqw] py-[1cqw] rounded-[1.4cqw] border border-amber-500/35 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-normal transition-all active:scale-95 shadow-sm text-[3.2cqw] shrink-0 whitespace-nowrap cursor-pointer"
            >
              <Share2 className="w-[3.4cqw] h-[3.4cqw] text-amber-400" />
              <span>명함 전달</span>
            </button>
          </div>
        </div>
      </motion.main>

      {/* Notice Modals for Pending Links (Portfolio & Instagram) */}
      <NoticeModal
        isOpen={activeModal === 'portfolio'}
        title="포트폴리오 안내"
        subtitle="월앤홈케어 시공 갤러리"
        badge="준비 중"
        description={`월앤홈케어 온라인 포트폴리오 페이지를 정성껏 준비하고 있습니다.\n\n현재 시공 사례 및 작업 사진은 [네이버 블로그]와 [당근 프로필]에서 바로 확인하실 수 있으며, 전화로 문의 주시면 상세 견적과 시공 사진을 친절히 안내해 드립니다.`}
        phoneNumber={cardData.phone}
        onClose={() => setActiveModal(null)}
      />

      <NoticeModal
        isOpen={activeModal === 'instagram'}
        title="인스타그램 채널 안내"
        subtitle="공식 SNS 준비 중"
        badge="오픈 예정"
        description={`월앤홈케어 공식 인스타그램 계정은 현재 준비 중입니다.\n\n작업 일상 및 빠른 상담은 [네이버 블로그] 및 [당근]을 이용해 주시거나 대표 번호(010-8051-6582)로 편하게 연락 주시기 바랍니다.`}
        phoneNumber={cardData.phone}
        onClose={() => setActiveModal(null)}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={activeModal === 'qr'}
        cardUrl="https://wnhcare.com/"
        company={cardData.company}
        representative={cardData.representative}
        onClose={() => setActiveModal(null)}
        onCopyLink={() => copyToClipboard('https://wnhcare.com/', '전자명함 주소(wnhcare.com)가')}
      />

      {/* Global Toast */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
