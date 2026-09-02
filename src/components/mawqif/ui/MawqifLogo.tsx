'use client';
import Image from 'next/image';
import Link from 'next/link';

interface MawqifLogoProps {
  variant?: 'horizontal' | 'icon' | 'app' | 'full';
  isWhite?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  href?: string;
}

export default function MawqifLogo({
  variant = 'horizontal',
  isWhite = false,
  size = 'md',
  showText = true,
  className = '',
  href = '/mawqif',
}: MawqifLogoProps) {
  // Height & dimensions mapping
  const heightMap = {
    xs: { icon: 24, horizontalH: 26, horizontalW: 90 },
    sm: { icon: 32, horizontalH: 34, horizontalW: 115 },
    md: { icon: 40, horizontalH: 42, horizontalW: 145 },
    lg: { icon: 52, horizontalH: 54, horizontalW: 180 },
    xl: { icon: 72, horizontalH: 76, horizontalW: 250 },
  };

  const dim = heightMap[size] || heightMap.md;

  const getSource = () => {
    if (variant === 'app') return '/mawqif/logo-app.png';
    if (variant === 'icon') return isWhite ? '/mawqif/logo-icon-white.png' : '/mawqif/logo-icon.png';
    if (variant === 'full') return isWhite ? '/mawqif/logo-white.png' : '/mawqif/logo.png';
    return isWhite ? '/mawqif/logo-horizontal-white.png' : '/mawqif/logo-horizontal.png';
  };

  const logoImg = (
    <div className={`inline-flex items-center gap-2.5 select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}>
      {variant === 'horizontal' ? (
        <div className="flex items-center gap-3">
          <Image
            src={getSource()}
            alt="شعار مواقف MAWAQIF"
            width={dim.horizontalW}
            height={dim.horizontalH}
            className="object-contain h-auto"
            priority
          />
          {showText && (
            <div className="flex flex-col text-right justify-center">
              <span
                className={`font-black tracking-tight leading-none ${
                  isWhite ? 'text-white' : 'text-[#123B5D]'
                } ${size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-sm' : 'text-base'}`}
              >
                مواقف
              </span>
              <span
                className={`text-[9px] font-bold tracking-widest uppercase mt-0.5 ${
                  isWhite ? 'text-white/70' : 'text-[#1677A8]'
                }`}
              >
                المنصة الوطنية
              </span>
            </div>
          )}
        </div>
      ) : variant === 'app' ? (
        <div className="flex items-center gap-2.5">
          <div className="rounded-2xl overflow-hidden shadow-sm shrink-0">
            <Image
              src="/mawqif/logo-app.png"
              alt="أيقونة مواقف"
              width={dim.icon}
              height={dim.icon}
              className="object-contain"
              priority
            />
          </div>
          {showText && (
            <div className="flex flex-col text-right justify-center">
              <span
                className={`font-black tracking-tight leading-none ${
                  isWhite ? 'text-white' : 'text-[#123B5D]'
                } ${size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-sm' : 'text-base'}`}
              >
                مواقف
              </span>
              <span
                className={`text-[9px] font-bold tracking-widest uppercase mt-0.5 ${
                  isWhite ? 'text-white/70' : 'text-slate-400'
                }`}
              >
                MAWAQIF
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Image
            src={getSource()}
            alt="شعار مواقف"
            width={dim.icon}
            height={dim.icon}
            className="object-contain shrink-0"
            priority
          />
          {showText && (
            <div className="flex flex-col text-right justify-center">
              <span
                className={`font-black tracking-tight leading-none ${
                  isWhite ? 'text-white' : 'text-[#123B5D]'
                } ${size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-sm' : 'text-base'}`}
              >
                مواقف
              </span>
              <span
                className={`text-[9px] font-bold tracking-widest uppercase mt-0.5 ${
                  isWhite ? 'text-white/70' : 'text-[#1677A8]'
                }`}
              >
                MAWAQIF
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block text-decoration-none">
        {logoImg}
      </Link>
    );
  }

  return logoImg;
}
