import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useCart } from "@/contexts/CartContext";
import {
  CheckoutState,
  CustomerInfo,
  DeliveryMethod,
  PaymentMethod,
  CreditCardInfo,
  SHIPPING_COSTS,
} from "@/types/checkout";

interface CheckoutContextType {
  checkoutState: CheckoutState;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  updateDeliveryMethod: (method: DeliveryMethod) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
  updateCreditCardInfo: (info: Partial<CreditCardInfo>) => void;
  calculateOrderSummary: () => void;
  resetCheckout: () => void;
}

// 創建結帳上下文
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

// 結帳提供者組件Props
interface CheckoutProviderProps {
  children: ReactNode;
}

// 默認值
const defaultCustomerInfo: CustomerInfo = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

const defaultCreditCardInfo: CreditCardInfo = {
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: "",
};

// 結帳提供者組件
export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const { getTotalPrice } = useCart();

  // 初始化結帳狀態
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    customerInfo: defaultCustomerInfo,
    deliveryMethod: "standard",
    paymentMethod: "cod",
    creditCardInfo: defaultCreditCardInfo,
    orderSummary: {
      subtotal: 0,
      shipping: SHIPPING_COSTS.standard,
      total: 0,
    },
  });

  // 更新客戶信息
  const updateCustomerInfo = useCallback((info: Partial<CustomerInfo>) => {
    setCheckoutState((prevState) => ({
      ...prevState,
      customerInfo: {
        ...prevState.customerInfo,
        ...info,
      },
    }));
  }, []);

  // 更新配送方式
  const updateDeliveryMethod = useCallback((method: DeliveryMethod) => {
    setCheckoutState((prevState) => {
      const shipping = SHIPPING_COSTS[method];
      const subtotal = prevState.orderSummary.subtotal;

      return {
        ...prevState,
        deliveryMethod: method,
        orderSummary: {
          ...prevState.orderSummary,
          shipping,
          total: subtotal + shipping,
        },
      };
    });
  }, []);

  // 更新付款方式
  const updatePaymentMethod = useCallback((method: PaymentMethod) => {
    setCheckoutState((prevState) => ({
      ...prevState,
      paymentMethod: method,
    }));
  }, []);

  // 更新信用卡信息
  const updateCreditCardInfo = useCallback((info: Partial<CreditCardInfo>) => {
    setCheckoutState((prevState) => ({
      ...prevState,
      creditCardInfo: {
        ...(prevState.creditCardInfo || defaultCreditCardInfo),
        ...info,
      },
    }));
  }, []);

  // 計算訂單摘要
  const calculateOrderSummary = useCallback(() => {
    const subtotal = getTotalPrice();
    const shipping = SHIPPING_COSTS[checkoutState.deliveryMethod];
    const total = subtotal + shipping;

    setCheckoutState((prevState) => ({
      ...prevState,
      orderSummary: {
        subtotal,
        shipping,
        total,
      },
    }));
  }, [getTotalPrice, checkoutState.deliveryMethod]);

  // 重置結帳狀態
  const resetCheckout = useCallback(() => {
    setCheckoutState({
      customerInfo: defaultCustomerInfo,
      deliveryMethod: "standard",
      paymentMethod: "cod",
      creditCardInfo: defaultCreditCardInfo,
      orderSummary: {
        subtotal: 0,
        shipping: SHIPPING_COSTS.standard,
        total: 0,
      },
    });
  }, []);

  // 提供上下文值
  const contextValue: CheckoutContextType = {
    checkoutState,
    updateCustomerInfo,
    updateDeliveryMethod,
    updatePaymentMethod,
    updateCreditCardInfo,
    calculateOrderSummary,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

// 使用結帳上下文的自定義hook
export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
