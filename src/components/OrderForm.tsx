// Komponen FT-05: Formulir data pemesan dengan validasi nama dan alamat penjemputan kondisional

import type { RefObject } from 'react';
import { AlertCircle } from 'lucide-react';
import type { ValidationErrors } from '../lib/validation';

interface OrderFormProps {
  customerName: string;
  pickupAddress: string;
  notes: string;
  hasDelivery: boolean;
  errors: ValidationErrors;
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
  onChangeName: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onChangeNotes: (value: string) => void;
}

export function OrderForm({
  customerName,
  pickupAddress,
  notes,
  hasDelivery,
  errors,
  nameInputRef,
  addressInputRef,
  onChangeName,
  onChangeAddress,
  onChangeNotes,
}: OrderFormProps) {
  return (
    <section aria-labelledby="order-form-heading">
      <h2
        id="order-form-heading"
        className="text-lg font-semibold text-neutral-900"
      >
        Data Pemesan
      </h2>

      <div className="mt-3 space-y-4 rounded-2xl bg-white p-4 sm:p-6">
        <div>
          <label
            htmlFor="customer-name"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama pemesan
          </label>
          <input
            ref={nameInputRef}
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(event) => onChangeName(event.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-required="true"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={errors.customerName ? 'name-error' : undefined}
            className={`mt-2 min-h-[44px] w-full rounded-xl border bg-white px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-500 transition-[border-color] duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              errors.customerName ? 'border-red-600' : 'border-neutral-200'
            }`}
          />
          {errors.customerName && (
            <div
              id="name-error"
              role="alert"
              className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.customerName}</span>
            </div>
          )}
        </div>

        {hasDelivery ? (
          <div>
            <label
              htmlFor="pickup-address"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat penjemputan
            </label>
            <textarea
              ref={addressInputRef}
              id="pickup-address"
              name="pickupAddress"
              rows={3}
              autoComplete="street-address"
              value={pickupAddress}
              onChange={(event) => onChangeAddress(event.target.value)}
              placeholder="Contoh: Jl. Mawar No. 12, RT 02"
              aria-required="true"
              aria-invalid={Boolean(errors.pickupAddress)}
              aria-describedby={
                errors.pickupAddress ? 'address-error' : 'address-helper'
              }
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 transition-[border-color] duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                errors.pickupAddress ? 'border-red-600' : 'border-neutral-200'
              }`}
            />
            <p id="address-helper" className="mt-1 text-sm text-neutral-600">
              Wajib diisi karena layanan Antar-Jemput aktif.
            </p>
            {errors.pickupAddress && (
              <div
                id="address-error"
                role="alert"
                className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.pickupAddress}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-600">
            Pesanan diantar sendiri ke toko. Centang Antar-Jemput jika perlu
            dijemput.
          </p>
        )}

        <div>
          <label
            htmlFor="order-notes"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan khusus (opsional)
          </label>
          <textarea
            id="order-notes"
            name="notes"
            rows={2}
            value={notes}
            onChange={(event) => onChangeNotes(event.target.value)}
            placeholder="Contoh: Pisahkan pakaian putih dan berwarna"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 transition-[border-color] duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
        </div>
      </div>
    </section>
  );
}
