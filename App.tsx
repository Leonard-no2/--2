import React, { useState } from 'react';
import { TRADITIONAL_STEPS, PYROLYSIS_STEPS } from './constants';
import { ProcessType, ProcessStep } from './types';
import { ProcessDiagram } from './components/ProcessDiagram';
import { DetailPanel } from './components/DetailPanel';
import { ComparisonChart } from './components/ComparisonChart';
import { AIAssistant } from './components/AIAssistant';
import { LayoutGrid, Flame, Factory, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [processType, setProcessType] = useState<ProcessType>(ProcessType.PYROLYSIS);
  const [activeStep, setActiveStep] = useState<ProcessStep | null>(PYROLYSIS_STEPS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'flow' | 'compare'>('flow');

  const steps = processType === ProcessType.PYROLYSIS ? PYROLYSIS_STEPS : TRADITIONAL_STEPS;

  const handleProcessChange = (type: ProcessType) => {
    setProcessType(type);
    const newSteps = type === ProcessType.PYROLYSIS ? PYROLYSIS_STEPS : TRADITIONAL_STEPS;
    setActiveStep(newSteps[0]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <LayoutGrid size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">EcoSludge Viz</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Process Visualization Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-1 p-1 bg-slate-800 rounded-lg">
             <button
               onClick={() => setActiveTab('flow')}
               className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'flow' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
             >
               工艺流程 (Flow)
             </button>
             <button
               onClick={() => setActiveTab('compare')}
               className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'compare' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
             >
               数据对比 (Compare)
             </button>
          </nav>

          <button className="md:hidden text-slate-300" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Controls & Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Process Switcher */}
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <button
              onClick={() => handleProcessChange(ProcessType.PYROLYSIS)}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                processType === ProcessType.PYROLYSIS
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-100 hover:border-slate-200 text-slate-500'
              }`}
            >
              <div className={`p-2 rounded-full ${processType === ProcessType.PYROLYSIS ? 'bg-blue-200' : 'bg-slate-100'}`}>
                <Flame size={24} />
              </div>
              <div className="text-left">
                <span className="block font-bold">污泥热解 (Pyrolysis)</span>
                <span className="text-xs opacity-75">资源化、低碳排放</span>
              </div>
            </button>

            <button
              onClick={() => handleProcessChange(ProcessType.TRADITIONAL)}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                processType === ProcessType.TRADITIONAL
                  ? 'border-slate-600 bg-slate-50 text-slate-800'
                  : 'border-slate-100 hover:border-slate-200 text-slate-500'
              }`}
            >
               <div className={`p-2 rounded-full ${processType === ProcessType.TRADITIONAL ? 'bg-slate-300' : 'bg-slate-100'}`}>
                <Factory size={24} />
              </div>
              <div className="text-left">
                <span className="block font-bold">传统处理 (Traditional)</span>
                <span className="text-xs opacity-75">焚烧/填埋，技术成熟</span>
              </div>
            </button>
          </div>

          {/* Main Visualizer Area */}
          {activeTab === 'flow' ? (
             <div className="space-y-6 animate-in fade-in duration-500">
               <ProcessDiagram 
                 steps={steps} 
                 activeStepId={activeStep?.id || null} 
                 onStepClick={setActiveStep} 
               />
               
               {/* Mobile Detail Panel (Below chart on mobile) */}
               <div className="lg:hidden h-[500px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
                 <DetailPanel step={activeStep} />
               </div>

               {/* Stats Grid for the active process */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                   <h4 className="text-slate-400 text-xs font-semibold uppercase">平均处理成本</h4>
                   <p className="text-2xl font-bold text-slate-800 mt-1">
                     {processType === ProcessType.PYROLYSIS ? '¥280' : '¥320'} 
                     <span className="text-sm font-normal text-slate-500 ml-1">/吨</span>
                   </p>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                   <h4 className="text-slate-400 text-xs font-semibold uppercase">减量化比例</h4>
                   <p className="text-2xl font-bold text-slate-800 mt-1">
                     {processType === ProcessType.PYROLYSIS ? '90%' : '85%'}
                   </p>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                   <h4 className="text-slate-400 text-xs font-semibold uppercase">碳足迹评价</h4>
                   <p className={`text-xl font-bold mt-1 ${processType === ProcessType.PYROLYSIS ? 'text-green-600' : 'text-orange-500'}`}>
                     {processType === ProcessType.PYROLYSIS ? '优 (Excellent)' : '中 (Average)'}
                   </p>
                 </div>
               </div>
             </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
               <ComparisonChart />
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <h3 className="font-bold text-lg mb-4">综合评估总结</h3>
                 <p className="text-slate-600 leading-relaxed mb-4">
                   传统污泥处理工艺（特别是焚烧）技术成熟度高，处理彻底，但存在能耗高、尾气治理难度大、碳排放高等问题。
                 </p>
                 <p className="text-slate-600 leading-relaxed">
                   污泥热解技术虽然初期投资较高，但通过<strong>“碳化+气化”</strong>实现了能源的自给自足和物质的资源化利用（生物炭）。它符合当前“双碳”战略背景，具有更好的环境效益和长远的经济潜力。
                 </p>
               </div>
            </div>
          )}
        </div>

        {/* Right Column: Details & AI */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-[calc(100vh-120px)] sticky top-24">
          
          {/* Desktop Detail Panel */}
          <div className="hidden lg:block flex-1 bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 min-h-[300px]">
            <DetailPanel step={activeStep} />
          </div>

          {/* AI Assistant */}
          <div className="h-[400px] lg:h-[450px]">
             <AIAssistant currentProcess={processType} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;