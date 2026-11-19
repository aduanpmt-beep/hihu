// Komponen FT-06: Tombol kirim pesanan ke WhatsApp

import { MessageCircle } from 'lucide-react';

interface WhatsAppSubmitButtonProps {
  onClick: () => void;
  fullWidth?: boolean;
}

export function WhatsAppSubmitButton({
  onClick,
  fullWidth = false,
}: WhatsAppSubmitButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-base font-semibold whitespace-nowrap text-white transition-[transform,background-color] duration-150 ease-out hover:bg-blue-800 active:scale-[0.98] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>Kirim ke WhatsApp</span>
    </button>
  );
}
