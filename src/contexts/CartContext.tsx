import { Product } from "@/types/product";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  getStoredCart,
  storeCart,
  clearStoredCart,
  validateCart,
  debugLocalStorage,
} from "@/lib/cartStorage";

// 購物車項目類型
export interface CartItem {
  product: Product;
  quantity: number;
}

// 購物車上下文類型
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncCart: () => void; // 新增：顯性同步購物車
  debugCart: () => { memory: CartItem[]; storage: CartItem[] }; // 新增：用於調試
}

// 創建上下文
const CartContext = createContext<CartContextType | undefined>(undefined);

// 購物車提供者props
interface CartProviderProps {
  children: ReactNode;
}

// 購物車提供者組件
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // 從本地存儲加載購物車
  const [items, setItems] = useState<CartItem[]>(() => {
    return getStoredCart();
  });

  // 將內存中的購物車數據同步到存儲
  const syncCartToStorage = useCallback(() => {
    if (items.length === 0) return;

    console.log("正在同步購物車數據到localStorage...", items.length, "個項目");
    const success = storeCart(items);
    if (success) {
      console.log("購物車同步成功!");
    }
  }, [items]);

  // 顯性同步方法，可以在需要的地方主動調用
  const syncCart = useCallback(() => {
    console.log("手動同步購物車...");

    // 從存儲讀取，確保最新數據
    const storedItems = getStoredCart();

    // 如果存儲中有數據且內存中沒有，使用存儲中的數據
    if (storedItems.length > 0 && items.length === 0) {
      console.log("從存儲恢復購物車數據:", storedItems.length, "個項目");
      setItems(storedItems);
      return;
    }

    // 如果內存中有數據，確保寫入存儲
    if (items.length > 0) {
      console.log("將內存中的購物車寫入存儲:", items.length, "個項目");
      storeCart(items);
    }
  }, [items]);

  // 當購物車更新時保存到本地存儲
  useEffect(() => {
    syncCartToStorage();
  }, [items, syncCartToStorage]);

  // 頁面加載時檢查購物車
  useEffect(() => {
    console.log("購物車提供者初始化，檢查存儲...");

    const storedCart = getStoredCart();
    if (validateCart(storedCart) && storedCart.length > 0) {
      console.log("找到有效的存儲購物車數據:", storedCart.length, "個項目");
      if (items.length === 0) {
        console.log("使用存儲的購物車數據");
        setItems(storedCart);
      }
    } else if (items.length > 0) {
      console.log("存儲中沒有有效購物車，但內存中有，正在保存...");
      storeCart(items);
    }

    // 在瀏覽器關閉或刷新時，確保購物車被保存
    const handleBeforeUnload = () => {
      if (items.length > 0) {
        storeCart(items);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [items]);

  // 調試用：獲取當前購物車狀態
  const debugCart = useCallback(() => {
    return {
      memory: items,
      storage: getStoredCart(),
    };
  }, [items]);

  // 添加商品到購物車
  const addToCart = useCallback((product: Product, quantity: number) => {
    console.log("添加商品到購物車:", product.name, "數量:", quantity);

    setItems((currentItems) => {
      // 檢查商品是否已在購物車中
      const existingItemIndex = currentItems.findIndex(
        (item) => item.product.id === product.id,
      );

      let newItems;
      if (existingItemIndex > -1) {
        // 如果商品已存在，更新數量
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        newItems = updatedItems;
      } else {
        // 否則添加新商品
        newItems = [...currentItems, { product, quantity }];
      }

      // 立即更新localStorage
      storeCart(newItems);
      console.log("購物車已更新，目前有", newItems.length, "個項目");

      return newItems;
    });
  }, []);

  // 從購物車移除商品
  const removeFromCart = useCallback((productId: string) => {
    console.log("從購物車移除商品:", productId);

    setItems((currentItems) => {
      const newItems = currentItems.filter(
        (item) => item.product.id !== productId,
      );
      storeCart(newItems);
      console.log("商品已移除，剩餘", newItems.length, "個項目");
      return newItems;
    });
  }, []);

  // 更新購物車中商品的數量
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      console.log("更新購物車商品數量:", productId, "新數量:", quantity);

      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems((currentItems) => {
        const newItems = currentItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        );

        storeCart(newItems);
        console.log("商品數量已更新");
        return newItems;
      });
    },
    [removeFromCart],
  );

  // 清空購物車
  const clearCart = useCallback(() => {
    console.log("清空購物車");
    setItems([]);
    clearStoredCart();
  }, []);

  // 計算購物車中的總項目數
  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  // 計算購物車中的總價格
  const getTotalPrice = useCallback(() => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }, [items]);

  // 提供上下文值
  const contextValue: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    syncCart,
    debugCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// 使用購物車上下文的自定義hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
