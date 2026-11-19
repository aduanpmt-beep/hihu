// Komponen FT-03: Pilihan layanan tambahan Antar-Jemput dan Pewangi Premium

import { Check } from 'lucide-react';
import { ADD_ONS, type AddOnCode } from '../config';
import { formatRupiah } from '../lib/format';

interface AddonSelectorProps {
  hasDelivery: boolean;
  hasFragrance: boolean;
  fragranceCost: number;
  isValidWeight: boolean;
  onToggleDelivery: (checked: boolean) => void;
  onToggleFragrance: (checked: boolean) => void;
}

export function AddonSelector({
  hasDelivery,
  hasFragrance,
  fragranceCost,
  isValidWeight,
  onToggleDelivery,
  onToggleFragrance,
}: AddonSelectorProps) {
  const isChecked = (code: AddOnCode): boolean =>
    code === 'T01' ? hasDelivery : hasFragrance;

  const handleToggle = (code: AddOnCode, checked: boolean) => {
    if (code === 'T01') {
      onToggleDelivery(checked);
    } else {
      onToggleFragrance(checked);
    }
  };

  return (
    <section aria-labelledby="addon-selector-heading">
      <h2
        id="addon-selector-heading"
        className="text-lg font-semibold text-neutral-900"
      >
        Layanan Tambahan
      </h2>

      <div className="mt-3 space-y-3">
        {ADD_ONS.map((addon) => {
          const checked = isChecked(addon.code);
          const inputId = `addon-${addon.code}`;
          const unitLabel =
            addon.calculationType === 'flat'
              ? `+${formatRupiah(addon.price)}`
              : `+${formatRupiah(addon.price)}/kg`;

          return (
            <label
              key={addon.code}
              htmlFor={inputId}
              className={`flex min-h-[44px] cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-[background-color,border-color] duration-200 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                checked
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                id={inputId}
                type="checkbox"
                name={`addon-${addon.code}`}
                checked={checked}
                onChange={(event) => handleToggle(addon.code, event.target.checked)}
                className="sr-only"
              />

              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-[background-color,border-color] duration-150 ease-out motion-reduce:transition-none ${
                    checked
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-neutral-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>

                <div>
                  <span className="block text-base font-semibold text-neutral-900">
                    {addon.name}
                  </span>
                  <span className="mt-1 block text-sm text-neutral-600">
                    {addon.notes}
                  </span>
                </div>
              </div>

              <div className="shrink-0 text-right tabular-nums">
                <span
                  className={`block text-base font-semibold ${
                    checked ? 'text-blue-700' : 'text-neutral-900'
                  }`}
                >
                  {unitLabel}
                </span>
                {addon.code === 'T02' && checked && isValidWeight && (
                  <span className="mt-1 block text-sm font-medium text-blue-700">
                    Total {formatRupiah(fragranceCost)}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
