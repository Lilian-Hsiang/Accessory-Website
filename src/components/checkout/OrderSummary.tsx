import React from "react";
import { useCheckout } from "@/contexts/CheckoutContext";
import { useCart } from "@/contexts/CartContext";

// 訂單摘要元件
const OrderSummary: React.FC = () => {
  const { checkoutState } = useCheckout();
  const { items } = useCart();
  const { orderSummary, deliveryMethod } = checkoutState;

  // 格式化價格
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // 配送方式顯示名稱
  const deliveryMethodName = {
    standard: "標準配送",
    express: "快速配送",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">訂單摘要</h3>

      {/* 商品列表 */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">商品明細</div>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.product.id} className="flex justify-between">
              <div className="flex-1">
                <span className="text-sm">
                  {item.product.name}{" "}
                  <span className="text-gray-500">x{item.quantity}</span>
                </span>
              </div>
              <div className="text-sm font-medium">
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 分隔線 */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* 小計 */}
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">小計</span>
        <span className="text-sm font-medium">
          {formatPrice(orderSummary.subtotal)}
        </span>
      </div>

      {/* 運費 */}
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">
          運費 ({deliveryMethodName[deliveryMethod]})
        </span>
        <span className="text-sm font-medium">
          {formatPrice(orderSummary.shipping)}
        </span>
      </div>

      {/* 總計 */}
      <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
        <span className="font-semibold">總計</span>
        <span className="font-semibold text-primary">
          {formatPrice(orderSummary.total)}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
