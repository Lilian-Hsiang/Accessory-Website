import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { getStoredCart } from "@/lib/cartStorage";

/**
 * 確保頁面加載時與localStorage同步購物車數據的鉤子
 * 解決頁面間跳轉購物車數據丟失問題
 */
export const useInitCartSync = () => {
  const { items, syncCart } = useCart();

  // 在頁面加載和items變化時同步數據
  useEffect(() => {
    console.log("useInitCartSync: 檢查購物車同步...");

    // 主動同步購物車
    syncCart();

    // 檢查是否有必要進行額外同步
    const storedCart = getStoredCart();
    if (storedCart.length > 0 && items.length === 0) {
      console.log(
        "useInitCartSync: 檢測到存儲中有購物車數據但內存中沒有，同步中...",
      );
      syncCart();
    }
  }, [items.length, syncCart]);

  // 設置定期同步
  useEffect(() => {
    // 每30秒檢查一次購物車同步
    const intervalId = setInterval(() => {
      console.log("useInitCartSync: 執行定期購物車同步檢查");
      syncCart();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [syncCart]);
};
