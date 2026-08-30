'use client';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
  sublabel?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div style={{ width: '100%' }}>
      {/* Desktop: Horizontal */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, width: '100%' }}>
        {steps.map((step, index) => {
          const isDone = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} style={{ display: 'flex', alignItems: 'flex-start', flex: isLast ? 0 : 1 }}>
              {/* Step Circle + Label */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
                  border: isDone ? '2px solid var(--mw-accent)'
                    : isActive ? '2px solid var(--mw-secondary)'
                    : '2px solid var(--mw-border)',
                  background: isDone ? 'var(--mw-accent)'
                    : isActive ? 'var(--mw-secondary)'
                    : 'var(--mw-white)',
                  color: isDone || isActive ? 'white' : 'var(--mw-muted)',
                  boxShadow: isActive ? '0 4px 12px rgba(22,119,168,0.3)' : 'none',
                }}>
                  {isDone ? <Check size={16} /> : step.number}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--mw-primary)' : isDone ? 'var(--mw-accent)' : 'var(--mw-muted)',
                    whiteSpace: 'nowrap',
                  }}>
                    {step.label}
                  </div>
                  {step.sublabel && (
                    <div style={{ fontSize: '0.7rem', color: 'var(--mw-muted)', whiteSpace: 'nowrap' }}>
                      {step.sublabel}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: isDone ? 'var(--mw-accent)' : 'var(--mw-border)',
                  marginTop: '1.25rem',
                  transition: 'background 0.3s ease',
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
