// Halaman utama LaundryCalc yang menyatukan fitur FT-01 sampai FT-06

import { useMemo, useRef, useState } from 'react';
import {
  DEFAULT_SERVICE_CODE,
  STORE_INFO,
  WEIGHT_RULES,
  type ServiceCode,
} from './config';
import { AddonSelector } from './components/AddonSelector';
import { OrderForm } from './components/OrderForm';
import { PriceSummary } from './components/PriceSummary';
import { ServiceCatalog } from './components/ServiceCatalog';
import { WeightInput } from './components/WeightInput';
import { calculateEstimate } from './lib/calculator';
import { formatDecimal, parseWeightInput } from './lib/format';
import {
  validateOrderForm,
  type ValidationErrors,
} from './lib/validation';
import {
  buildWhatsAppUrl,
  openExternalLinkInNewTab,
} from './lib/whatsapp';

export default function App() {
  const [selectedServiceCode, setSelectedServiceCode] =
    useState<ServiceCode>(DEFAULT_SERVICE_CODE);
  const [weightRaw, setWeightRaw] = useState<string>(
    formatDecimal(WEIGHT_RULES.defaultKg),
  );
  const [hasDelivery, setHasDelivery] = useState<boolean>(false);
  const [hasFragrance, setHasFragrance] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isMobileSummaryExpanded, setIsMobileSummaryExpanded] =
    useState<boolean>(false);

  const weightInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLTextAreaElement>(null);

  const parsedWeight = useMemo(() => parseWeightInput(weightRaw), [weightRaw]);

  const estimate = useMemo(
    () =>
      calculateEstimate({
        serviceCode: selectedServiceCode,
        actualWeightKg: parsedWeight,
        hasDelivery,
        hasFragrance,
      }),
    [selectedServiceCode, parsedWeight, hasDelivery, hasFragrance],
  );

  const handleChangeWeight = (nextRaw: string) => {
    setWeightRaw(nextRaw);
    if (errors.weight) {
      setErrors((prev) => ({ ...prev, weight: undefined }));
    }
  };

  const handleToggleDelivery = (checked: boolean) => {
    setHasDelivery(checked);
    if (!checked && errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleChangeName = (value: string) => {
    setCustomerName(value);
    if (errors.customerName) {
      setErrors((prev) => ({ ...prev, customerName: undefined }));
    }
  };

  const handleChangeAddress = (value: string) => {
    setPickupAddress(value);
    if (errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleSubmitOrder = () => {
    const validation = validateOrderForm({
      weightRaw,
      customerName,
      pickupAddress,
      notes,
      hasDelivery,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      if (validation.firstErrorField === 'weight') {
        weightInputRef.current?.focus();
      } else if (validation.firstErrorField === 'customerName') {
        nameInputRef.current?.focus();
      } else if (validation.firstErrorField === 'pickupAddress') {
        addressInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
    const validEstimate = calculateEstimate({
      serviceCode: selectedServiceCode,
      actualWeightKg: validation.parsedWeight,
      hasDelivery,
      hasFragrance,
    });

    const whatsappUrl = buildWhatsAppUrl({
      customerName: validation.cleanedName,
      pickupAddress: validation.cleanedAddress,
      notes: validation.cleanedNotes,
      hasDelivery,
      hasFragrance,
      estimate: validEstimate,
    });

    openExternalLinkInNewTab(whatsappUrl);
  };

  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-5xl px-4 pt-6 pb-28 sm:px-6 lg:pt-8 lg:pb-12">
        <header className="mb-6 lg:mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900">
            {STORE_INFO.appName}
          </h1>
          <p className="mt-1 text-base text-neutral-600">
            Hitung estimasi biaya cucian Anda lalu kirim pesanan ke WhatsApp.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-8 lg:col-span-7">
            <ServiceCatalog
              selectedServiceCode={selectedServiceCode}
              onSelectService={setSelectedServiceCode}
            />

            <WeightInput
              weightRaw={weightRaw}
              billedWeightKg={estimate.billedWeightKg}
              isValidWeight={estimate.isValid}
              isMinimumChargeApplied={estimate.isMinimumChargeApplied}
              error={errors.weight}
              inputRef={weightInputRef}
              onChangeWeight={handleChangeWeight}
            />

            <AddonSelector
              hasDelivery={hasDelivery}
              hasFragrance={hasFragrance}
              fragranceCost={estimate.fragranceCost}
              isValidWeight={estimate.isValid}
              onToggleDelivery={handleToggleDelivery}
              onToggleFragrance={setHasFragrance}
            />

            <OrderForm
              customerName={customerName}
              pickupAddress={pickupAddress}
              notes={notes}
              hasDelivery={hasDelivery}
              errors={errors}
              nameInputRef={nameInputRef}
              addressInputRef={addressInputRef}
              onChangeName={handleChangeName}
              onChangeAddress={handleChangeAddress}
              onChangeNotes={setNotes}
            />
          </div>

          <div className="lg:col-span-5">
            <PriceSummary
              estimate={estimate}
              hasDelivery={hasDelivery}
              hasFragrance={hasFragrance}
              isMobileExpanded={isMobileSummaryExpanded}
              onToggleMobileExpanded={() =>
                setIsMobileSummaryExpanded((prev) => !prev)
              }
              onSubmitOrder={handleSubmitOrder}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
