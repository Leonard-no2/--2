import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { COMPARISON_METRICS } from '../constants';

export const ComparisonChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4">核心指标对比：传统 vs 热解</h3>
      <ResponsiveContainer width="100%" height="100%" className="pb-8">
        <BarChart
          data={COMPARISON_METRICS}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} />
          <YAxis stroke="#64748b" tick={{fill: '#64748b'}} />
          <Tooltip 
            cursor={{fill: '#f1f5f9'}}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="traditional" name="传统工艺 (Traditional)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pyrolysis" name="污泥热解 (Pyrolysis)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};