'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  function handlePrint() {
    // Open all closed <details> before printing
    const allDetails = Array.from(document.querySelectorAll('details')) as HTMLDetailsElement[];
    const closedOnes = allDetails.filter(d => !d.open);
    closedOnes.forEach(d => { d.open = true; });

    // Restore after print dialog is dismissed
    const afterPrint = () => {
      closedOnes.forEach(d => { d.open = false; });
      window.removeEventListener('afterprint', afterPrint);
    };
    window.addEventListener('afterprint', afterPrint);

    window.print();
  }

  return (
    <button
      onClick={handlePrint}
      className="print:hidden flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
    >
      <Printer size={15} />
      Save as PDF
    </button>
  );
}
