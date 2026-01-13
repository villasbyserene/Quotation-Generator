import type GuestDetailsDTO from "./guestDetails";
import type QuotationItem from "./quotationItem";

export default interface QuotationFormDataDTO {
  guest: GuestDetailsDTO;
  items: QuotationItem[];
  notes: string;
}
