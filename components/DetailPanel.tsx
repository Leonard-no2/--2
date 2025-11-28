import React from 'react';
import { ProcessStep } from '../types';
import { Thermometer, Clock, Box, Info } from 'lucide-react';

interface DetailPanelProps {
  step: ProcessStep | null;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ step }) => {
  if (!step) {
    return (
      <div className="h-full bg-slate-50 border-l border-slate-200 p-8 flex flex-col items-center justify-center text-slate-400 text-center">
        <Info size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">点击流程节点查看详细参数</p>
        <p className="text-sm">Select a process step to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-l border-slate-200 p-6 shadow-lg overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <step.icon size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{step.title}</h2>
          <p className="text-sm text-slate-500">工艺详情</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">关键参数 Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Thermometer size={18} className="text-orange-500 mt-0.5" />
              <div>
                <span className="block text-xs text-slate-400">运行温度</span>
                <span className="font-medium text-slate-700">{step.temperature || 'N/A'}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={18} className="text-blue-500 mt-0.5" />
              <div>
                <span className="block text-xs text-slate-400">停留/处理时间</span>
                <span className="font-medium text-slate-700">{step.duration || 'N/A'}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 col-span-2">
              <Box size={18} className="text-green-500 mt-0.5" />
              <div>
                <span className="block text-xs text-slate-400">主要产物</span>
                <span className="font-medium text-slate-700">{step.output || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">原理说明</h3>
          <p className="text-slate-600 leading-relaxed text-justify">
            {step.details}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100">
           <h3 className="text-sm font-semibold text-slate-500 mb-2">操作要点</h3>
           <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
             <li>需严格控制输入参数以保证效率。</li>
             <li>设备维护对于连续运行至关重要。</li>
             <li>需实时监测{step.temperature ? '温度变化' : '处理状态'}。</li>
           </ul>
        </div>
      </div>
    </div>
  );
};