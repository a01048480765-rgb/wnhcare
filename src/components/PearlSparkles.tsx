import React from 'react';

// 4-point sparkling diamond star SVG
export function SparkleStar({
  className = '',
  style = {},
  size = 12,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`pointer-events-none ${className}`}
      style={style}
    >
      <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" />
    </svg>
  );
}

// Background Pearl Glow, Stardust & Twinkling Sparkles
export function PearlSparklesBackground() {
  // Pre-calculated aesthetic positions for sparkling stars across viewport
  const backgroundSparkles = [
    { top: '8%', left: '12%', size: 13, delay: '0s', duration: '3.8s', color: 'text-amber-200/80' },
    { top: '15%', left: '82%', size: 15, delay: '1.2s', duration: '4.2s', color: 'text-yellow-100/90' },
    { top: '24%', left: '6%', size: 9, delay: '2.5s', duration: '3.4s', color: 'text-amber-300/70' },
    { top: '35%', left: '92%', size: 11, delay: '0.7s', duration: '4.6s', color: 'text-amber-100/75' },
    { top: '48%', left: '10%', size: 14, delay: '2.1s', duration: '3.9s', color: 'text-yellow-200/85' },
    { top: '62%', left: '88%', size: 10, delay: '1.8s', duration: '3.5s', color: 'text-amber-200/70' },
    { top: '75%', left: '14%', size: 12, delay: '3.1s', duration: '4.4s', color: 'text-amber-300/80' },
    { top: '84%', left: '84%', size: 14, delay: '0.4s', duration: '3.7s', color: 'text-yellow-100/85' },
    { top: '92%', left: '38%', size: 10, delay: '2.8s', duration: '4.1s', color: 'text-amber-200/70' },
    { top: '11%', left: '46%', size: 11, delay: '1.9s', duration: '4.8s', color: 'text-amber-100/75' },
  ];

  // Pearl stardust micro dots
  const pearlDots = [
    { top: '18%', left: '22%', size: 3, delay: '0.5s' },
    { top: '28%', left: '78%', size: 2.5, delay: '1.5s' },
    { top: '42%', left: '18%', size: 2, delay: '2.2s' },
    { top: '56%', left: '82%', size: 3, delay: '0.9s' },
    { top: '68%', left: '25%', size: 2.5, delay: '3.0s' },
    { top: '82%', left: '72%', size: 2, delay: '1.7s' },
    { top: '90%', left: '20%', size: 3, delay: '2.4s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Deep Rich Black Gradient Base */}
      <div className="absolute inset-0 bg-radial from-[#0a0a0a] via-[#050505] to-[#000000]" />

      {/* Pearl Sheen / Shimmer Clouds */}
      <div className="absolute inset-0 opacity-40 animate-pearl-shimmer">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-[radial-gradient(circle,rgba(254,240,138,0.08)_0%,rgba(217,119,6,0.04)_45%,transparent_70%)] rounded-full blur-[90px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,rgba(245,158,11,0.03)_50%,transparent_70%)] rounded-full blur-[100px]" />
      </div>

      {/* Fine Pearl Stardust Texture Layer */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, rgba(254, 240, 138, 0.7), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 70px 120px, rgba(255, 255, 255, 0.6), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 150px 80px, rgba(245, 158, 11, 0.6), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 220px 260px, rgba(254, 240, 138, 0.5), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 310px 190px, rgba(255, 255, 255, 0.7), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 380px 340px, rgba(245, 158, 11, 0.5), rgba(0,0,0,0))
          `,
          backgroundSize: '400px 400px',
        }}
      />

      {/* Pearl Micro Dots */}
      {pearlDots.map((dot, idx) => (
        <div
          key={`dot-${idx}`}
          className="absolute rounded-full bg-amber-200/60 shadow-[0_0_6px_rgba(254,240,138,0.6)] animate-twinkle"
          style={{
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: dot.delay,
          }}
        />
      ))}

      {/* Twinkling 4-point Sparkles (빤짝이) */}
      {backgroundSparkles.map((sparkle, idx) => (
        <div
          key={`sparkle-${idx}`}
          className="absolute animate-sparkle"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        >
          <SparkleStar
            size={sparkle.size}
            className={`${sparkle.color} drop-shadow-[0_0_8px_rgba(254,240,138,0.7)]`}
          />
        </div>
      ))}
    </div>
  );
}

// Subtle Pearl & Sparkle Accent inside the Business Card
export function CardPearlGleam() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.2cqw] z-0">
      {/* Subtle Pearl Micro Shimmer Surface */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 30px 40px, rgba(254, 240, 138, 0.5), transparent),
            radial-gradient(1px 1px at 120px 160px, rgba(255, 255, 255, 0.45), transparent),
            radial-gradient(1.2px 1.2px at 240px 90px, rgba(245, 158, 11, 0.5), transparent),
            radial-gradient(1px 1px at 330px 270px, rgba(254, 240, 138, 0.4), transparent)
          `,
          backgroundSize: '360px 360px',
        }}
      />

      {/* 3 Gentle Twinkles on Card Gold Accents */}
      <div
        className="absolute top-[2.5cqw] left-[32cqw] animate-sparkle"
        style={{ animationDelay: '0.8s', animationDuration: '4.2s' }}
      >
        <SparkleStar size={11} className="text-amber-200/80 drop-shadow-[0_0_6px_rgba(254,240,138,0.8)]" />
      </div>

      <div
        className="absolute top-[1.2cqw] right-[16cqw] animate-twinkle"
        style={{ animationDelay: '2.4s', animationDuration: '3.6s' }}
      >
        <SparkleStar size={9} className="text-yellow-100/75 drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]" />
      </div>

      <div
        className="absolute bottom-[3cqw] left-[6cqw] animate-sparkle"
        style={{ animationDelay: '1.6s', animationDuration: '5.0s' }}
      >
        <SparkleStar size={10} className="text-amber-300/70 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
      </div>
    </div>
  );
}
