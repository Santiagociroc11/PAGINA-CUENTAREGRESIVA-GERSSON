import React from 'react';

interface CountdownCardProps {
  value: number;
  label: string;
}

const CountdownCard: React.FC<CountdownCardProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 p-2 w-16 h-16 sm:p-3 sm:w-20 sm:h-20 md:p-4 md:w-24 md:h-24 lg:p-6 lg:w-32 lg:h-32">
      <span className="font-bold text-cyan-400 tabular-nums text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-medium text-slate-400 uppercase tracking-widest mt-1 sm:mt-2 text-[10px] sm:text-xs lg:text-sm">
        {label}
      </span>
    </div>
  );
};

export default CountdownCard;