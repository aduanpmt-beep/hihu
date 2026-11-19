// Komponen FT-04: Ringkasan biaya langsung (panel lengket desktop dan bar menempel bawah ponsel)

import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  DELIVERY_ADDON,
  FRAGRANCE_ADDON,
  MANDATORY_COPY,
} from '../config';
import type { CalculationResult } from '../lib/calculator';
import { formatDecimal, formatRupiah } from '../lib/format';
import { WhatsAppSubmitButton } from './WhatsAppSubmitButton';

interface PriceSummaryProps {
  estimate: CalculationResult;
  hasDelivery: boolean;
  hasFragrance: boolean;
  isMobileExpanded: boolean;
  onToggleMobileExpanded: () => void;
  onSubmitOrder: () => void;
}

function BreakdownRows({
  estimate,
  hasDelivery,
  hasFragrance,
}: {
  estimate: CalculationResult;
  hasDelivery: boolean;
  hasFragrance: boolean;
}) {
  if (!estimate.isValid) {
    return (
      <p className="text-sm text-neutral-600">
        Masukkan estimasi berat lebih dari 0 kg untuk menghitung biaya.
      </p>
    );
  }

  return (
    <dl className="space-y-2 text-sm">
      <div className="flex items-start justify-between gap-4">
        <dt className="text-neutral-600">
          {estimate.service.name} ({formatDecimal(estimate.billedWeightKg)} kg x{' '}
          {formatRupiah(estimate.service.pricePerKg)})
        </dt>
        <dd className="shrink-0 font-medium tabular-nums text-neutral-900">
          {formatRupiah(estimate.mainServiceCost)}
        </dd>
      </div>

      {hasDelivery && (
        <div className="flex items-start justify-between gap-4">
          <dt className="text-neutral-600">{DELIVERY_ADDON.name}</dt>
          <dd className="shrink-0 font-medium tabular-nums text-neutral-900">
            {formatRupiah(estimate.deliveryCost)}
          </dd>
        </div>
      )}

      {hasFragrance && (
        <div className="flex items-start justify-between gap-4">
          <dt className="text-neutral-600">
            {FRAGRANCE_ADDON.name} ({formatDecimal(estimate.billedWeightKg)} kg
            x {formatRupiah(FRAGRANCE_ADDON.price)})
          </dt>
          <dd className="shrink-0 font-medium tabular-nums text-neutral-900">
            {formatRupiah(estimate.fragranceCost)}
          </dd>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 border-t border-neutral-200 pt-2">
        <dt className="text-neutral-600">Total biaya tambahan</dt>
        <dd className="shrink-0 font-medium tabular-nums text-neutral-900">
          {formatRupiah(estimate.addOnsTotalCost)}
        </dd>
      </div>
    </dl>
  );
}

export function PriceSummary({
  estimate,
  hasDelivery,
  hasFragrance,
  isMobileExpanded,
  onToggleMobileExpanded,
  onSubmitOrder,
}: PriceSummaryProps) {
  const totalDisplay = estimate.isValid
    ? formatRupiah(estimate.totalCost)
    : '-';

  return (
    <>
      {/* Panel ringkasan lengket untuk layar desktop */}
      <aside
        aria-labelledby="desktop-summary-heading"
        className="hidden lg:sticky lg:top-8 lg:block"
      >
        <div className="rounded-2xl bg-white p-6">
          <h2
            id="desktop-summary-heading"
            className="text-lg font-semibold text-neutral-900"
          >
            Ringkasan Biaya
          </h2>

          <div className="mt-4">
            <BreakdownRows
              estimate={estimate}
              hasDelivery={hasDelivery}
              hasFragrance={hasFragrance}
            />
          </div>

          <div className="mt-4 border-t border-neutral-200 pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-base font-medium text-neutral-900">
                Estimasi total
              </span>
              <span className="text-3xl font-semibold tabular-nums text-neutral-900">
                {totalDisplay}
              </span>
            </div>

            <p className="mt-3 text-sm text-neutral-600">
              {MANDATORY_COPY.estimationNotice}
            </p>

            <div className="mt-6">
              <WhatsAppSubmitButton onClick={onSubmitOrder} fullWidth />
            </div>
          </div>
        </div>
      </aside>

      {/* Bar ringkasan menempel di bawah untuk layar ponsel dan tablet */}
      <div
        aria-label="Ringkasan estimasi biaya"
        className="fixed right-0 bottom-0 left-0 z-30 border-t border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] lg:hidden"
      >
        <div className="mx-auto max-w-2xl px-4 py-3">
          {isMobileExpanded && (
            <div className="mb-3 border-b border-neutral-200 pb-3">
              <BreakdownRows
                estimate={estimate}
                hasDelivery={hasDelivery}
                hasFragrance={hasFragrance}
              />
              <p className="mt-3 text-sm text-neutral-600">
                {MANDATORY_COPY.estimationNotice}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onToggleMobileExpanded}
              aria-expanded={isMobileExpanded}
              className="flex min-h-[44px] flex-col items-start justify-center rounded-xl py-1 pr-2 text-left transition-[opacity] duration-150 ease-out hover:opacity-80 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
                <span>Estimasi total</span>
                {isMobileExpanded ? (
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
              <span className="text-2xl font-semibold tabular-nums text-neutral-900">
                {totalDisplay}
              </span>
            </button>

            <WhatsAppSubmitButton onClick={onSubmitOrder} />
          </div>
        </div>
      </div>
    </>
  );
}
