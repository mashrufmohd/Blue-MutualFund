import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3 backdrop-blur-sm">
      <AlertTriangle className="w-5 h-5 shrink-0" />
      <p className="font-mono text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;