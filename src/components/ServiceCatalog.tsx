// Komponen FT-01: Katalog pilihan paket layanan utama beserta tarif dan durasi pengerjaan

import { MAIN_SERVICES, type ServiceCode } from '../config';
import { formatRupiah } from '../lib/format';

interface ServiceCatalogProps {
  selectedServiceCode: ServiceCode;
  onSelectService: (code: ServiceCode) => void;
}

export function ServiceCatalog({
  selectedServiceCode,
  onSelectService,
}: ServiceCatalogProps) {
  return (
    <section aria-labelledby="service-catalog-heading">
      <h2
        id="service-catalog-heading"
        className="text-lg font-semibold text-neutral-900"
      >
        Pilih Layanan
      </h2>

      <fieldset className="mt-3 space-y-3">
        <legend className="sr-only">Daftar paket layanan utama</legend>
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedServiceCode;
          const inputId = `service-${service.code}`;

          return (
            <label
              key={service.code}
              htmlFor={inputId}
              className={`block min-h-[44px] cursor-pointer rounded-2xl border p-4 transition-[background-color,border-color] duration-200 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                id={inputId}
                type="radio"
                name="mainService"
                value={service.code}
                checked={isSelected}
                onChange={() => onSelectService(service.code)}
                className="sr-only"
              />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-[border-color] duration-150 ease-out motion-reduce:transition-none ${
                      isSelected ? 'border-blue-700' : 'border-neutral-300'
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-700" />
                    )}
                  </span>

                  <div>
                    <span className="block text-base font-semibold text-neutral-900">
                      {service.name}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-neutral-600">
                      Selesai {service.durationDays} hari
                    </span>
                    <span className="mt-1 block text-sm text-neutral-600">
                      {service.description}
                    </span>
                  </div>
                </div>

                <span
                  className={`shrink-0 text-right text-base font-semibold tabular-nums ${
                    isSelected ? 'text-blue-700' : 'text-neutral-900'
                  }`}
                >
                  {formatRupiah(service.pricePerKg)}/kg
                </span>
              </div>
            </label>
          );
        })}
      </fieldset>
    </section>
  );
}
