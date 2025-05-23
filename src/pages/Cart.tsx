import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCart();
  const [processingOrder, setProcessingOrder] = useState(false);

  // 處理結帳
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("購物車為空，無法結帳");
      return;
    }

    setProcessingOrder(true);

    // 模擬結帳處理
    setTimeout(() => {
      toast.success("��單已成功提交！感謝您的購買。");
      clearCart();
      setProcessingOrder(false);
    }, 1500);
  };

  // 格式化價格
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // 購物車為空的顯示
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-center mb-8">購物車</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-4">您的購物車是空的</h2>
            <p className="text-gray-600 mb-8">
              看起來您還沒有將任何商品加入購物車。
              <br />
              探索我們的產品，找到您喜愛的珠寶飾品吧！
            </p>
            <Button asChild size="lg">
              <Link to="/products/necklaces">繼續購物</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-12">購物車</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 購物車商品列表 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.product.id}>
                      <CartItem
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 訂單摘要和結帳按鈕 */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6">訂單摘要</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">小計</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">運費</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold">
                  <span>總計</span>
                  <span className="text-primary">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2"
                  size="lg"
                  disabled={processingOrder}
                >
                  {processingOrder ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      處理中...
                    </>
                  ) : (
                    <>
                      前往結帳
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="mt-4 text-center">
                  <Link
                    to="/products/necklaces"
                    className="text-sm text-primary hover:underline"
                  >
                    繼續購物
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
