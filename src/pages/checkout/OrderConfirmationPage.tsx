import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useCheckout } from "@/contexts/CheckoutContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { checkoutState, resetCheckout } = useCheckout();

  // 生成訂單號碼
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  // 完成訂單
  useEffect(() => {
    // 如果是從其他頁面直接訪問確認頁面且沒有商品，重定向到首頁
    if (items.length === 0 && !checkoutState.customerInfo.name) {
      navigate("/");
      return;
    }

    // 清空購物車和結帳信息
    const timer = setTimeout(() => {
      clearCart();
      resetCheckout();
    }, 3000);

    return () => clearTimeout(timer);
  }, [
    clearCart,
    items.length,
    navigate,
    resetCheckout,
    checkoutState.customerInfo,
  ]);

  // 格式化價格
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // 配送方式名稱
  const deliveryMethodName = {
    standard: "標準配送（3-5個工作日）",
    express: "快速配送（1-2個工作日）",
  };

  // 付款方式名稱
  const paymentMethodName = {
    cod: "貨到付款",
    credit: "信用卡付款",
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold mb-4">訂單已確認</h1>
            <p className="text-gray-600 mb-8">
              感謝您的購買！您的訂單已成功提交。
              <br />
              我們將盡快為您安排發貨。
            </p>

            <div className="border p-5 rounded-md text-left mb-8">
              <div className="text-lg font-semibold mb-4">訂單詳情</div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">訂單編號</div>
                  <div className="font-medium">{orderNumber}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">訂單日期</div>
                  <div className="font-medium">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">付款方式</div>
                  <div className="font-medium">
                    {paymentMethodName[checkoutState.paymentMethod]}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">配送方式</div>
                  <div className="font-medium">
                    {deliveryMethodName[checkoutState.deliveryMethod]}
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="text-sm text-gray-500">配送地址</div>
                  <div className="font-medium">
                    {checkoutState.customerInfo.address}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="text-sm text-gray-500 mb-2">訂單金額</div>
                <div className="flex justify-between mb-1">
                  <span>小計</span>
                  <span>
                    {formatPrice(checkoutState.orderSummary.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>運費</span>
                  <span>
                    {formatPrice(checkoutState.orderSummary.shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>總計</span>
                  <span className="text-primary">
                    {formatPrice(checkoutState.orderSummary.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1 sm:flex-auto"
              >
                返回首頁
              </Button>

              <Button
                onClick={() => navigate("/")}
                className="flex-1 sm:flex-auto"
              >
                繼續購物
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
