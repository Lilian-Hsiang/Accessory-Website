import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 添加 useNavigate 導入
import Layout from "@/components/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/contexts/CartContext";
import { useInitCartSync } from "@/hooks/useInitCartSync";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { getStoredCart } from "@/lib/cartStorage";

const Cart = () => {
  const navigate = useNavigate(); // 使用 useNavigate hook
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
    syncCart,
    debugCart,
  } = useCart();
  const [processingOrder, setProcessingOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 使用購物車同步鉤子確保數據一致性
  useInitCartSync();

  // 頁面加載時主動同步購物車
  useEffect(() => {
    console.log("購物車頁面加載中...");

    // 同步購物車並顯示加載狀態
    setIsLoading(true);

    // 獲取存儲中的購物車
    const storedCart = getStoredCart();
    console.log("購物車頁面檢測到存儲購物車項目數:", storedCart.length);

    // 強制同步購物車
    syncCart();

    // 給同步一些時間完成
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("購物車頁面準備就緒，項目數:", items.length);
    }, 300);

    return () => clearTimeout(timer);
  }, [syncCart, items.length]);

  // 檢查購物車數據一致性
  useEffect(() => {
    const debugInfo = debugCart();
    console.log("購物車調試信息:", {
      記憶體項目數: debugInfo.memory.length,
      存儲項目數: debugInfo.storage.length,
    });
  }, [debugCart, items]);

  // 手動刷新購物車
  const handleRefreshCart = () => {
    setIsLoading(true);
    toast.info("正在刷新購物車...");

    // 強制同步購物車
    syncCart();

    // 給同步一些時間完成
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`購物車已刷新, ${items.length} 件商品`);
    }, 500);
  };

  // 處理結帳
  const handleCheckout = () => {
    // 先同步購物車，確保數據最新
    syncCart();

    if (items.length === 0) {
      toast.error("購物車為空，無法結帳");
      return;
    }

    setProcessingOrder(true);

    // 確保購物車數據同步後再處理結帳
    setTimeout(() => {
      // 再次檢查購物車
      if (items.length === 0) {
        toast.error("結帳時發現購物車為空");
        setProcessingOrder(false);
        return;
      }

      // 導航到結帳頁面
      navigate("/checkout");
      setProcessingOrder(false);
    }, 300);
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

  // 加載中顯示
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-center mb-8">購物車</h1>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-3 text-lg">正在載入購物車...</span>
          </div>
        </div>
      </Layout>
    );
  }

  // 購物車為空的顯示
  if (items.length === 0) {
    const storedCart = getStoredCart();
    const hasStoredItems = storedCart && storedCart.length > 0;

    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">購物車</h1>
            {hasStoredItems && (
              <Button
                variant="outline"
                onClick={handleRefreshCart}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                刷新購物車
              </Button>
            )}
          </div>

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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/products/necklaces">繼續購物</Link>
              </Button>

              {hasStoredItems && (
                <Button variant="outline" onClick={handleRefreshCart} size="lg">
                  恢復購物車
                </Button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">購物車</h1>
          <Button
            variant="outline"
            onClick={handleRefreshCart}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            刷新購物車
          </Button>
        </div>

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
