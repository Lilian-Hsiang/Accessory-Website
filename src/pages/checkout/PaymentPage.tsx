import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/contexts/CartContext";
import { useCheckout } from "@/contexts/CheckoutContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  const { checkoutState, updatePaymentMethod, updateCreditCardInfo } =
    useCheckout();
  const [isLoading, setIsLoading] = useState(false);

  // 檢查客戶信息是否已填寫，如未填寫則返回結帳頁面
  useEffect(() => {
    if (
      !checkoutState.customerInfo.name ||
      !checkoutState.customerInfo.phone ||
      !checkoutState.customerInfo.email ||
      !checkoutState.customerInfo.address
    ) {
      toast.error("請先填寫客戶資料");
      navigate("/checkout");
    }

    // 如果購物車為空，重定向到購物車頁面
    if (items.length === 0) {
      toast.error("購物車為空，無法結帳");
      navigate("/cart");
    }
  }, [checkoutState.customerInfo, items.length, navigate]);

  // 處理表單提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 信用卡付款方式需要驗證卡片信息
    if (checkoutState.paymentMethod === "credit") {
      const { cardNumber, cardHolder, expiryDate, cvv } =
        checkoutState.creditCardInfo || {};
      if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        toast.error("請填寫完整的信用卡資料");
        return;
      }

      // 簡單的信用卡號驗證 (16位數字)
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        toast.error("請輸入有效的信用卡號");
        return;
      }
    }

    // 模擬處理付款流程
    setIsLoading(true);
    toast.loading("處理付款中...", { id: "payment-loading" });

    setTimeout(() => {
      setIsLoading(false);
      toast.dismiss("payment-loading");
      navigate("/checkout/confirmation");
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">選擇付款方式</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 付款方式表單 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">付款方式</h2>

                <RadioGroup
                  value={checkoutState.paymentMethod}
                  onValueChange={(value) =>
                    updatePaymentMethod(value as "cod" | "credit")
                  }
                  className="mb-6"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md mb-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1">
                      <div className="flex items-center">
                        <span>貨到付款</span>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex-1">
                      <div className="flex items-center">
                        <span>信用卡付款</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* 信用卡付款表單 */}
                {checkoutState.paymentMethod === "credit" && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-md mb-6">
                    <div>
                      <Label htmlFor="cardNumber">卡號</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={checkoutState.creditCardInfo?.cardNumber || ""}
                        onChange={(e) =>
                          updateCreditCardInfo({ cardNumber: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardHolder">持卡人姓名</Label>
                      <Input
                        id="cardHolder"
                        placeholder="請輸入持卡人姓名"
                        value={checkoutState.creditCardInfo?.cardHolder || ""}
                        onChange={(e) =>
                          updateCreditCardInfo({ cardHolder: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">有效期限 (MM/YY)</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={checkoutState.creditCardInfo?.expiryDate || ""}
                          onChange={(e) =>
                            updateCreditCardInfo({ expiryDate: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="cvv">安全碼</Label>
                        <Input
                          id="cvv"
                          placeholder="CVV"
                          type="password"
                          maxLength={3}
                          value={checkoutState.creditCardInfo?.cvv || ""}
                          onChange={(e) =>
                            updateCreditCardInfo({ cvv: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 導航按鈕 */}
                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/checkout")}
                    className="flex-1"
                  >
                    返回客戶資料
                  </Button>

                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "處理中..." : "確認付款"}
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

export default PaymentPage;
