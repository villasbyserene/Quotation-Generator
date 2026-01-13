export type PricingMode = "UNIT" | "LUMPSUM";

export default interface QuotationItemDTO {
  id: string;
  description: string;
  quantity: number;
  unitPrice?: number;
  amount: number;
  pricingMode: PricingMode;
}
