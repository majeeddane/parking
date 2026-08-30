'use client';
import { CheckCircle, Clock, XCircle, AlertCircle, Circle } from 'lucide-react';

type StatusType = 'pending' | 'approved' | 'rejected' | 'needs_edit' | 'completed' | 'draft';

const statusConfig: Record<StatusType, { label: string; icon: React.ReactNode; bg: string; color: string }> = {
  pending: {
    label: 'قيد المراجعة',
    icon: <Clock size={12} />,
    bg: 'var(--mw-warning-bg)',
    color: 'var(--mw-warning)',
  },
  approved: {
    label: 'تمت الموافقة',
    icon: <CheckCircle size={12} />,
    bg: 'var(--mw-success-bg)',
    color: 'var(--mw-success)',
  },
  rejected: {
    label: 'مرفوض',
    icon: <XCircle size={12} />,
    bg: 'var(--mw-error-bg)',
    color: 'var(--mw-error)',
  },
  needs_edit: {
    label: 'يحتاج تعديل',
    icon: <AlertCircle size={12} />,
    bg: '#FFF7ED',
    color: '#EA580C',
  },
  completed: {
    label: 'مكتمل',
    icon: <CheckCircle size={12} />,
    bg: 'var(--mw-info-bg)',
    color: 'var(--mw-info)',
  },
  draft: {
    label: 'مسودة',
    icon: <Circle size={12} />,
    bg: '#F1F5F9',
    color: 'var(--mw-muted)',
  },
};

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;
  const sizeStyles = {
    sm: { padding: '0.2rem 0.6rem', fontSize: '0.75rem' },
    md: { padding: '0.3rem 0.85rem', fontSize: '0.82rem' },
    lg: { padding: '0.4rem 1.1rem', fontSize: '0.9rem' },
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      background: config.bg,
      color: config.color,
      borderRadius: '100px',
      fontWeight: 600,
      ...sizeStyles[size],
    }}>
      {config.icon}
      {config.label}
    </span>
  );
}

export { StatusBadge };
export type { StatusType };
