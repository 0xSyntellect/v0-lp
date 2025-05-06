import { z } from 'zod';

export const GetOfferSchema = z.object({
  pickup: z.string().min(3),
  dropoff: z.string().min(3),
  vehicle: z.string(),
  discountCode: z.string().optional(),
});

export type GetOfferRequest = z.infer<typeof GetOfferSchema>;
export interface GetOfferResponse {
  offerId: string;
  price: number;
  expiresAt: string;
}

export const AcceptOfferSchema = z.object({
  offerId: z.string().uuid(),
});
export type AcceptOfferRequest = z.infer<typeof AcceptOfferSchema>;
export interface AcceptOfferResponse {
  offerId: string;
  paymentUrl: string;
}

export type OfferStatus = 'pending' | 'accepted' | 'expired';
