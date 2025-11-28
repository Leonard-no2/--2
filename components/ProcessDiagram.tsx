import React from 'react';
import { ProcessStep } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface ProcessDiagramProps {
  steps: ProcessStep[];
  activeStepId: string | null;
  onStepClick: (step: ProcessStep) => void;
}

export const ProcessDiagram: React.FC<ProcessDiagramProps> = ({ steps, activeStepId, onStepClick }) => {
  return (
    <div className="w-full overflow-x-auto py-8 px-4 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row items-center justify-between min-w-[800px] md:min-w-0 gap-4 relative">
        
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-slate-100 -z-0 -translate-y-1/2"></div>

        {steps.map((step, index) => {
          const isActive = activeStepId === step.id;
          const isLast = index === steps.length - 1;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step Node */}
              <div className="relative z-10 flex flex-col items-center group">
                <button
                  onClick={() => onStepClick(step)}
                  className={`
                    w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out
                    border-4 shadow-lg
                    ${isActive 
                      ? 'bg-blue-600 border-blue-200 text-white scale-110 shadow-blue-200' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-blue-400 hover:text-blue-500 hover:-translate-y-1'
                    }
                  `}
                >
                  <Icon size={32} strokeWidth={1.5} />
                </button>
                
                {/* Connector Arrow (Mobile) */}
                {!isLast && (
                  <div className="md:hidden my-2 text-slate-300">
                    <ChevronDown />
                  </div>
                )}

                {/* Label */}
                <div className={`mt-4 text-center transition-colors duration-300 ${isActive ? 'text-blue-700 font-bold' : 'text-slate-600 font-medium'}`}>
                  <h3 className="text-sm md:text-base whitespace-nowrap">{step.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{step.temperature}</p>
                </div>
              </div>

              {/* Connector Arrow (Desktop) */}
              {!isLast && (
                <div className="hidden md:flex flex-1 items-center justify-center text-slate-300 z-10">
                   {/* Animated flow effect */}
                   <svg width="100%" height="24" className="overflow-visible">
                     <defs>
                       <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                         <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.5" />
                         <stop offset="100%" stopColor="#94a3b8" stopOpacity="1" />
                       </linearGradient>
                     </defs>
                     <line 
                        x1="0" y1="12" x2="100%" y2="12" 
                        stroke="#e2e8f0" 
                        strokeWidth="2"
                     />
                     {isActive && (
                       <circle r="3" fill="#3b82f6">
                         <animateMotion 
                           dur="1s" 
                           repeatCount="indefinite"
                           path="M 0 12 L 100 12" 
                         />
                       </circle>
                     )}
                     <ArrowRight className={`ml-auto relative top-[2px] ${isActive ? 'text-blue-400' : 'text-slate-300'}`} size={20} />
                   </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};