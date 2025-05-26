import { CartItem } from "@/contexts/CartContext";

// 購物車數據存儲的鍵名
const CART_STORAGE_KEY = "elegant_jewelry_cart";

/**
 * 從localStorage獲取購物車數據
 */
export const getStoredCart = (): CartItem[] => {
  try {
    const cartJSON = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartJSON) return [];

    const cart = JSON.parse(cartJSON);
    if (!Array.isArray(cart)) return [];

    // 驗證購物車項目的結構
    return cart.filter(
      (item) => item && item.product && item.product.id && item.quantity,
    );
  } catch (error) {
    console.error("讀取購物車數據失敗:", error);
    return [];
  }
};

/**
 * 將購物車數據存儲到localStorage
 */
export const storeCart = (cart: CartItem[]): boolean => {
  try {
    // 深度複製購物車以避免引用問題
    const cartCopy = JSON.parse(JSON.stringify(cart));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartCopy));
    return true;
  } catch (error) {
    console.error("存儲購物車數據失敗:", error);
    return false;
  }
};

/**
 * 清除購物車數據
 */
export const clearStoredCart = (): void => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("清除購物車數據失敗:", error);
  }
};

/**
 * 驗證購物車數據是否有效
 */
export const validateCart = (cart: CartItem[]): boolean => {
  if (!Array.isArray(cart)) return false;
  return cart.every(
    (item) =>
      item &&
      typeof item === "object" &&
      item.product &&
      typeof item.product === "object" &&
      item.product.id &&
      typeof item.quantity === "number" &&
      item.quantity > 0,
  );
};

/**
 * 調試用：獲取本地存儲中的所有資料
 */
export const debugLocalStorage = (): Record<string, any> => {
  const result: Record<string, any> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      try {
        const value = localStorage.getItem(key);
        result[key] = value ? JSON.parse(value) : null;
      } catch (e) {
        result[key] = localStorage.getItem(key);
      }
    }
  }

  return result;
};
