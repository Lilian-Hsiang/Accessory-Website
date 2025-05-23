import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./contexts/CartContext";

// 確保DOM加載完成後再渲染應用
document.addEventListener("DOMContentLoaded", () => {
  // 檢查localStorage中是否有購物車數據
  const cartData = localStorage.getItem("cart");
  console.log(
    "初始購物車數據:",
    cartData ? JSON.parse(cartData).length : 0,
    "項目",
  );
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
