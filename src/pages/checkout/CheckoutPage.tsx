import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/contexts/CartContext";
import { useCheckout } from "@/contexts/CheckoutContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SHIPPING_COSTS } from "@/types/checkout";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const {
    checkoutState,
    updateCustomerInfo,
    updateDeliveryMethod,
    calculateOrderSummary,
  } = useCheckout();

  // 當頁面加載時計算訂單摘要
  useEffect(() => {
    calculateOrderSummary();
  }, [calculateOrderSummary]);

  // 如果購物車為空，重定向到購物車頁面
  useEffect(() => {
    if (items.length === 0) {
      toast.error("購物車為空，無法結帳");
      navigate("/cart");
    }
  }, [items.length, navigate]);

  // 處理表單提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 驗證必填字段
    const { name, phone, email, address } = checkoutState.customerInfo;
    if (!name || !phone || !email || !address) {
      toast.error("請填寫所有必填項目");
      return;
    }

    // 導航到付款頁面
    navigate("/checkout/payment");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">結帳</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 客戶信息表單 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-6">客戶資料</h2>

                {/* 個人資料 */}
                <div className="space-y-4 mb-8">
                  <div>
                    <Label htmlFor="name">姓名 *</Label>
                    <Input
                      id="name"
                      placeholder="請輸入姓名"
                      value={checkoutState.customerInfo.name}
                      onChange={(e) =>
                        updateCustomerInfo({ name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">電話 *</Label>
                    <Input
                      id="phone"
                      placeholder="請輸入電話號碼"
                      value={checkoutState.customerInfo.phone}
                      onChange={(e) =>
                        updateCustomerInfo({ phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="請���入Email"
                      value={checkoutState.customerInfo.email}
                      onChange={(e) =>
                        updateCustomerInfo({ email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">送貨地址 *</Label>
                    <Textarea
                      id="address"
                      placeholder="請輸入完整送貨地址"
                      value={checkoutState.customerInfo.address}
                      onChange={(e) =>
                        updateCustomerInfo({ address: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* 配送方式 */}
                <h2 className="text-xl font-semibold mb-4">配送方式</h2>
                <RadioGroup
                  value={checkoutState.deliveryMethod}
                  onValueChange={(value) =>
                    updateDeliveryMethod(value as "standard" | "express")
                  }
                  className="mb-8"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md mb-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1">
                      <div className="flex justify-between items-center">
                        <span>標準配送（3-5個工作日）</span>
                        <span className="font-semibold">
                          NT$ {SHIPPING_COSTS.standard}
                        </span>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1">
                      <div className="flex justify-between items-center">
                        <span>快速配送（1-2個工作日）</span>
                        <span className="font-semibold">
                          NT$ {SHIPPING_COSTS.express}
                        </span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* 下一步按鈕 */}
                <div className="mt-6">
                  <Button type="submit" className="w-full">
                    前往付款
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* 訂單摘要 */}
          <div className="md:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
