import { Product } from "@/types/product";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
}

// 創建上下文
const CartContext = createContext<CartContextType | undefined>(undefined);

// 購物車提供者props
interface CartProviderProps {
  children: ReactNode;
}

// 購物車提供者組件
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // 從本地存儲加載購物車或初始化空購物車
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        // 嘗試解析存儲的購物車數據
        const parsedCart = JSON.parse(savedCart);
        // 確認解析後的數據是一個數組
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          return parsedCart;
        }
      }
      return [];
    } catch (error) {
      console.error("從localStorage加載購物車失敗:", error);
      return [];
    }
  });

  // 當購物車更新時保存到本地存儲
  useEffect(() => {
    try {
      // 確保items是有效的並且可以被序列化
      localStorage.setItem("cart", JSON.stringify(items));
      // 可以在開發模式下驗證存儲是否成功
      console.log("購物車已保存，項目數:", items.length);
    } catch (error) {
      console.error("儲存購物車到localStorage失敗:", error);
    }
  }, [items]);

  // 添加商品到購物車
  const addToCart = (product: Product, quantity: number) => {
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
      try {
        localStorage.setItem("cart", JSON.stringify(newItems));
        console.log("購物車已即時更新到localStorage，項目數:", newItems.length);
      } catch (error) {
        console.error("更新購物車到localStorage失敗:", error);
      }

      return newItems;
    });
  };

  // 從購物車移除商品
  const removeFromCart = (productId: string) => {
    const newItems = items.filter((item) => item.product.id !== productId);
    setItems(newItems);

    // 立即更新localStorage
    try {
      localStorage.setItem("cart", JSON.stringify(newItems));
      console.log("移除商品後更新localStorage，剩餘項目:", newItems.length);
    } catch (error) {
      console.error("移除商品後更新localStorage失敗:", error);
    }
  };

  // 更新購物車中商品的數量
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const newItems = items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item,
    );

    setItems(newItems);

    // 立即更新localStorage
    try {
      localStorage.setItem("cart", JSON.stringify(newItems));
      console.log("更新數量後同步localStorage，項目數:", newItems.length);
    } catch (error) {
      console.error("更新數量後同步localStorage失敗:", error);
    }
  };

  // 清空購物車
  const clearCart = () => {
    setItems([]);
    // 清空localStorage中的購物車
    try {
      localStorage.removeItem("cart");
      console.log("購物車已清空");
    } catch (error) {
      console.error("清空購物車localStorage失敗:", error);
    }
  };

  // 計算購物車中的總項目數
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // 計算購物車中的總價格
  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  // 提供上下文值
  const contextValue: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
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
