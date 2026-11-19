// Komponen FT-02: Input estimasi berat cucian dengan tombol langkah 0,1 kg dan notifikasi minimum charge 3 kg

import type { RefObject } from 'react';
import { AlertCircle, Info, Minus, Plus } from 'lucide-react';
import { STORE_INFO, WEIGHT_RULES } from '../config';
import { formatDecimal, parseWeightInput } from '../lib/format';

interface WeightInputProps {
  weightRaw: string;
  billedWeightKg: number;
  isValidWeight: boolean;
  isMinimumChargeApplied: boolean;
  error?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChangeWeight: (nextRaw: string) => void;
}

export function WeightInput({
  weightRaw,
  billedWeightKg,
  isValidWeight,
  isMinimumChargeApplied,
  error,
  inputRef,
  onChangeWeight,
}: WeightInputProps) {
  const handleStep = (delta: number) => {
    const parsed = parseWeightInput(weightRaw);
    const baseValue = parsed !== null && parsed > 0 ? parsed : 0;
    const nextValue = Math.max(
      WEIGHT_RULES.minKg,
      Math.round((baseValue + delta) * 10) / 10,
    );
    onChangeWeight(formatDecimal(nextValue));
  };

  return (
    <section aria-labelledby="weight-input-heading">
      <h2
        id="weight-input-heading"
        className="text-lg font-semibold text-neutral-900"
      >
        Estimasi Berat
      </h2>

      <div className="mt-3 rounded-2xl bg-white p-4 sm:p-6">
        <label
          htmlFor="weight-input"
          className="block text-sm font-medium text-neutral-900"
        >
          Berat cucian (kg)
        </label>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleStep(-WEIGHT_RULES.stepKg)}
            aria-label="Kurangi 0,1 kg"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 transition-[transform,background-color] duration-150 ease-out hover:bg-neutral-50 active:scale-[0.98] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Minus className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="relative flex-1">
            <input
              ref={inputRef}
              id="weight-input"
              name="weight"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={weightRaw}
              onChange={(event) => onChangeWeight(event.target.value)}
              placeholder="Contoh: 3,5"
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? 'weight-error weight-helper' : 'weight-helper'
              }
              className={`min-h-[44px] w-full rounded-xl border bg-white py-2 pr-12 pl-4 text-base font-medium tabular-nums text-neutral-900 placeholder:text-neutral-500 transition-[border-color] duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                error ? 'border-red-600' : 'border-neutral-200'
              }`}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-neutral-600"
            >
              kg
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleStep(WEIGHT_RULES.stepKg)}
            aria-label="Tambah 0,1 kg"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 transition-[transform,background-color] duration-150 ease-out hover:bg-neutral-50 active:scale-[0.98] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p id="weight-helper" className="mt-2 text-sm text-neutral-600">
          Minimal 0,1 kg. Bisa memakai koma atau titik.
        </p>

        {error && (
          <div
            id="weight-error"
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {!error && isMinimumChargeApplied && (
          <div
            role="status"
            aria-live="polite"
            className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-3 text-sm text-amber-800"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Minimum tagihan {formatDecimal(STORE_INFO.minimumChargeKg)} kg
              berlaku. Berat ditagih otomatis dihitung{' '}
              <strong className="font-semibold tabular-nums">
                {formatDecimal(billedWeightKg)} kg
              </strong>
              .
            </span>
          </div>
        )}

        {!error && isValidWeight && !isMinimumChargeApplied && (
          <p className="mt-3 text-sm text-neutral-600 tabular-nums">
            Berat ditagih:{' '}
            <span className="font-semibold text-neutral-900">
              {formatDecimal(billedWeightKg)} kg
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
