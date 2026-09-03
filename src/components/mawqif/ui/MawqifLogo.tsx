'use client';
import Image from 'next/image';
import Link from 'next/link';

interface MawqifLogoProps {
  variant?: 'horizontal' | 'icon' | 'app' | 'full';
  isWhite?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  className?: string;
  href?: string;
}

export default function MawqifLogo({
  variant = 'icon',
  isWhite = false,
  size = 'md',
  showText = true,
  subtitle,
  className = '',
  href = '/mawqif',
}: MawqifLogoProps) {
  const heightMap = {
    xs: { icon: 26, text: 'text-sm', sub: 'text-[8px]', gap: 'gap-2' },
    sm: { icon: 34, text: 'text-base', sub: 'text-[9px]', gap: 'gap-2.5' },
    md: { icon: 42, text: 'text-xl', sub: 'text-[10px]', gap: 'gap-3' },
    lg: { icon: 52, text: 'text-2xl', sub: 'text-[11px]', gap: 'gap-3.5' },
    xl: { icon: 68, text: 'text-3xl', sub: 'text-xs', gap: 'gap-4' },
  };

  const dim = heightMap[size] || heightMap.md;

  const getSource = () => {
    if (variant === 'app') return '/mawqif/logo-app.png';
    if (variant === 'full') return isWhite ? '/mawqif/logo-white.png' : '/mawqif/logo.png';
    if (variant === 'horizontal') return isWhite ? '/mawqif/logo-horizontal-white.png' : '/mawqif/logo-horizontal.png';
    return isWhite ? '/mawqif/logo-icon-white.png' : '/mawqif/logo-icon.png';
  };

  const subText = subtitle ?? (isWhite ? 'المنصة الوطنية' : 'MAWAQIF');

  const content = (
    <div className={`inline-flex items-center ${dim.gap} select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}>
      <Image
        src={getSource()}
        alt="شعار مواقف MAWAQIF"
        width={dim.icon}
        height={dim.icon}
        className="object-contain shrink-0 drop-shadow-xs"
        priority
      />
      {showText && (
        <div className="flex flex-col text-right justify-center">
          <span
            className={`font-black tracking-tight leading-none ${
              isWhite ? 'text-white' : 'text-[#123B5D]'
            } ${dim.text}`}
          >
            مواقف
          </span>
          <span
            className={`font-black tracking-widest uppercase mt-0.5 ${
              isWhite ? 'text-emerald-300' : 'text-[#1677A8]'
            } ${dim.sub}`}
          >
            {subText}
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block text-decoration-none">
        {content}
      </Link>
    );
  }

  return content;
}
