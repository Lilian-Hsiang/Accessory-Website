export type DeliveryMethod = "standard" | "express";

export type PaymentMethod = "cod" | "credit";

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface CreditCardInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

export interface CheckoutState {
  customerInfo: CustomerInfo;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  creditCardInfo?: CreditCardInfo;
  orderSummary: OrderSummary;
}

export const SHIPPING_COSTS = {
  standard: 80,
  express: 150,
};
