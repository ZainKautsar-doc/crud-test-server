import React from 'react';
import { useMembers } from '../context/MemberContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toasts, dismissToast } = useMembers();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`flex items-start justify-between p-4 border-2 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937] text-white font-medium transition-all transform translate-y-0 ${
              isSuccess
                ? 'bg-[#16A34A]'
                : isError
                ? 'bg-[#DC2626]'
                : 'bg-[#FDB913] text-[#1F2937]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-white" />}
                {isError && <AlertCircle className="w-5 h-5 text-white" />}
                {isInfo && <Info className="w-5 h-5 text-[#1F2937]" />}
              </div>
              <div className="text-sm font-semibold tracking-wide leading-snug">
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-3 p-1 hover:bg-black/10 active:scale-95 transition-transform flex-shrink-0"
              aria-label="Tutup"
            >
              <X className={`w-4 h-4 ${isInfo ? 'text-[#1F2937]' : 'text-white'}`} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
