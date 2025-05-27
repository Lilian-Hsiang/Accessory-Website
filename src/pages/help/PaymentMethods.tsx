import React from "react";
import Layout from "@/components/layout/Layout";
import { CreditCard, Truck, Shield, Clock } from "lucide-react";

const PaymentMethods = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* 頁面標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">💳 付款方式</h1>
          <p className="text-gray-600 text-lg">
            多元化付款選擇，讓您購物更便利安心
          </p>
        </div>

        {/* 付款方式概覽 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 信用卡付款 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <CreditCard className="mr-4 text-primary" size={32} />
              <h2 className="text-2xl font-bold">信用卡付款</h2>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">支援卡別</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-blue-700">VISA</span>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-red-700">MasterCard</span>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-green-700">JCB</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-purple-700">
                    美國運通
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-gray-700">
              <p className="flex items-center">
                <Shield className="mr-2 text-green-500" size={16} />
                SSL加密保護，交易安全有保障
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 text-blue-500" size={16} />
                即時付款確認，快速處理訂單
              </p>
              <p className="flex items-center">
                <CreditCard className="mr-2 text-purple-500" size={16} />
                支援一次付清與分期付款
              </p>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">分期付款說明</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 消費滿NT$3,000可申請3期0利率</li>
                <li>• 消費滿NT$6,000可申請6期0利率</li>
                <li>• 消費滿NT$12,000可申請12期0利率</li>
                <li>• 實際分期條件依各銀行規定為準</li>
              </ul>
            </div>
          </div>

          {/* 貨到付款 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <Truck className="mr-4 text-primary" size={32} />
              <h2 className="text-2xl font-bold">貨到付款</h2>
            </div>

            <div className="space-y-4 text-gray-700 mb-6">
              <p>
                商品送達時再付款，讓您更安心購物。貨到付款服務讓您可以先檢查商品，確認無誤後再付款。
              </p>
            </div>

            <div className="space-y-3 text-gray-700">
              <p className="flex items-center">
                <Shield className="mr-2 text-green-500" size={16} />
                先收貨後付款，降低購物風險
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 text-blue-500" size={16} />
                配送時間：1-3個工作日
              </p>
              <p className="flex items-center">
                <Truck className="mr-2 text-orange-500" size={16} />
                限台灣本島地區配送
              </p>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-semibold mb-2 text-amber-800">收費說明</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 貨到付款手續費：NT$30</li>
                <li>• 消費滿NT$1,500免收手續費</li>
                <li>• 請準備足夠現金給配送人員</li>
                <li>• 恕不找零，請準備剛好金額</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 付款安全保障 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="mr-3 text-primary" />
            付款安全保障
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">SSL加密技術</h3>
              <p className="text-sm text-gray-600">
                採用256位元SSL加密技術，確保交易資料安全傳輸
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">銀行級防護</h3>
              <p className="text-sm text-gray-600">
                與知名金融機構合作，提供銀行級的資安防護
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-purple-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">24小時監控</h3>
              <p className="text-sm text-gray-600">
                全天候交易監控系統，即時偵測異常狀況
              </p>
            </div>
          </div>
        </div>

        {/* 付款流程 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">💡 付款流程</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">選擇商品</h3>
              <p className="text-sm text-gray-600">加入購物車並確認訂單內容</p>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">填寫資料</h3>
              <p className="text-sm text-gray-600">輸入配送地址和聯絡資訊</p>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">選擇付款</h3>
              <p className="text-sm text-gray-600">選擇適合的付款方式</p>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">完成訂單</h3>
              <p className="text-sm text-gray-600">確認付款並等待商品配送</p>
            </div>
          </div>
        </div>

        {/* 常見問題 */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">❓ 付款常見問題</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 text-primary">
                Q: 信用卡付款失敗怎麼辦？
              </h3>
              <p className="text-gray-700">
                A:
                請檢查卡片資訊是否正確、餘額是否足夠，或聯繫發卡銀行確認。也可選擇其他付款方式。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">
                Q: 可以使用多張信用卡付款嗎？
              </h3>
              <p className="text-gray-700">
                A: 目前僅支援單一信用卡付款，無法分拆使用多張卡片。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">
                Q: 貨到付款可以刷卡嗎？
              </h3>
              <p className="text-gray-700">
                A: 貨到付款僅接受現金付款，請準備足夠現金。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">
                Q: 如何申請分期付款？
              </h3>
              <p className="text-gray-700">
                A: 在結帳時選擇分期選項，系統會自動檢查是否符合分期條件。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentMethods;
