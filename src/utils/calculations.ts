const toNumber = (value: unknown): number => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

/* UNIT pricing calculation */
export const calculateAmount = (
  quantity: unknown,
  unitPrice: unknown
): number => {
  const q = toNumber(quantity);
  const price = toNumber(unitPrice);

  return Math.round(q * price * 100) / 100;
};

/* Grand total calculation (UNIT + LUMPSUM aware) */
export const calculateTotal = (
  items: {
    pricingMode: "UNIT" | "LUMPSUM";
    quantity?: unknown;
    unitPrice?: unknown;
    amount?: unknown;
  }[]
): number => {
  const total = items.reduce((sum, item) => {
    if (item.pricingMode === "UNIT") {
      return sum + calculateAmount(item.quantity, item.unitPrice);
    }

    // LUMPSUM
    return sum + toNumber(item.amount);
  }, 0);

  return Math.round(total * 100) / 100;
};
