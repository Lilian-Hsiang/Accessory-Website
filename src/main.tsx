import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { getStoredCart } from "./lib/cartStorage";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Solid 圖示
import { fab } from "@fortawesome/free-brands-svg-icons"; // Brands 圖示

library.add(fas, fab); // 將圖示加入到 library

// 購物車診斷功能
const CART_STORAGE_KEY = "elegant_jewelry_cart";
const LEGACY_CART_KEY = "cart";

// 應用初始化函數
const initializeApp = () => {
  console.group("電商網站初始化");

  // 檢查localStorage的狀態
  try {
    // 檢查新的購物車存儲
    const storedCart = getStoredCart();
    console.log(
      "新購物車存儲:",
      storedCart.length > 0 ? `找到 ${storedCart.length} 件商品` : "為空",
    );

    // 檢查舊的購物車存儲
    const legacyCart = localStorage.getItem(LEGACY_CART_KEY);
    if (legacyCart) {
      try {
        const parsedLegacyCart = JSON.parse(legacyCart);
        console.log("發現舊購物車數據:", parsedLegacyCart.length, "件商品");

        // 如果新存儲為空但舊存儲有數據，遷移數據
        if (storedCart.length === 0 && parsedLegacyCart.length > 0) {
          localStorage.setItem(CART_STORAGE_KEY, legacyCart);
          console.log("已將舊購物車數據遷移到新存儲");
        }
      } catch (e) {
        console.error("解析舊購物車數據失敗");
      }
    } else {
      console.log("未發現舊購物車數據");
    }

    // 檢查收藏數據
    const favoritesData = localStorage.getItem("elegant_jewelry_favorites");
    console.log(
      "收藏數據:",
      favoritesData
        ? `找到 ${JSON.parse(favoritesData).length} 件收藏`
        : "為空",
    );

    // 顯示其他診斷信息
    console.log("localStorage 可用狀態:", typeof localStorage !== "undefined");
    console.log("用戶代理:", navigator.userAgent);
  } catch (error) {
    console.error("初始化診斷失敗:", error);
  }

  console.groupEnd();

  // 渲染應用
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <CartProvider>
        <CheckoutProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </CheckoutProvider>
      </CartProvider>
    </React.StrictMode>,
  );
};

// 確保DOM加載完成後初始化應用
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
