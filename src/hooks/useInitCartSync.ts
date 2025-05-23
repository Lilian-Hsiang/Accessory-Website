import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

/**
 * 確保頁面加載時與localStorage同步購物車數據的鉤子
 * 解決頁面間跳轉購物車數據丟失問題
 */
export const useInitCartSync = () => {
  const { items, addToCart } = useCart();

  useEffect(() => {
    // 只在購物車為空且localStorage有數據時執行
    if (items.length === 0) {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            console.log("從localStorage恢復購物車:", parsedCart.length, "項目");

            // 遍歷並恢復每個商品
            parsedCart.forEach((item) => {
              if (item.product && item.quantity) {
                addToCart(item.product, item.quantity);
              }
            });
          }
        }
      } catch (error) {
        console.error("恢復購物車失敗:", error);
      }
    }
  }, [items.length, addToCart]);
};
