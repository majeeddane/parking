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
  const currentStepData = steps.find(s => s.number === currentStep) || steps[0];

  return (
    <div className="w-full">
      {/* Mobile Indicator (< 640px) */}
      <div className="block sm:hidden space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#1677A8] text-white flex items-center justify-center font-bold text-xs">
              {currentStep}
            </span>
            <span className="font-bold text-[#123B5D]">
              {currentStepData.label}
            </span>
          </div>
          <span className="text-slate-400 font-medium">
            الخطوة {currentStep} من {steps.length}
          </span>
        </div>

        {/* 4 Segments Progress Bar */}
        <div className="grid grid-cols-4 gap-1.5 h-2">
          {steps.map((step) => {
            const isDone = step.number < currentStep;
            const isActive = step.number === currentStep;

            return (
              <div
                key={step.number}
                className={`h-full rounded-full transition-all duration-300 ${
                  isDone
                    ? 'bg-[#19A974]'
                    : isActive
                    ? 'bg-[#1677A8]'
                    : 'bg-slate-200'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Desktop / Tablet Indicator (>= 640px) */}
      <div className="hidden sm:flex items-start gap-0 w-full">
        {steps.map((step, index) => {
          const isDone = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className={`flex items-start ${isLast ? 'flex-none' : 'flex-1'}`}>
              {/* Step Circle + Label */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    border: isDone
                      ? '2px solid var(--mw-accent)'
                      : isActive
                      ? '2px solid var(--mw-secondary)'
                      : '2px solid var(--mw-border)',
                    background: isDone
                      ? 'var(--mw-accent)'
                      : isActive
                      ? 'var(--mw-secondary)'
                      : 'var(--mw-white)',
                    color: isDone || isActive ? 'white' : 'var(--mw-muted)',
                    boxShadow: isActive ? '0 4px 12px rgba(22,119,168,0.3)' : 'none',
                  }}
                >
                  {isDone ? <Check size={16} /> : step.number}
                </div>
                <div className="text-center">
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--mw-primary)' : isDone ? 'var(--mw-accent)' : 'var(--mw-muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
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
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    background: isDone ? 'var(--mw-accent)' : 'var(--mw-border)',
                    marginTop: '1.25rem',
                    transition: 'background 0.3s ease',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
