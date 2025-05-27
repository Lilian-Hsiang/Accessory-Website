import React from "react";
import Layout from "@/components/layout/Layout";
import { RotateCcw, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* 頁面標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🔄 退換貨政策</h1>
          <p className="text-gray-600 text-lg">
            我們致力於提供最優質的服務，讓您安心購物
          </p>
        </div>

        {/* 政策概覽 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Clock className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="text-lg font-semibold mb-2">30天退換期</h3>
            <p className="text-gray-600 text-sm">
              商品到貨後30天內可申請退換貨
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <h3 className="text-lg font-semibold mb-2">品質保證</h3>
            <p className="text-gray-600 text-sm">所有商品提供品質保證服務</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <RotateCcw className="mx-auto mb-4 text-blue-500" size={48} />
            <h3 className="text-lg font-semibold mb-2">免費退換</h3>
            <p className="text-gray-600 text-sm">符合條件的退換貨免收手續費</p>
          </div>
        </div>

        {/* 退換貨條件 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">📋 退換貨條件</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">
                ✅ 可退換情況
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="mt-1 mr-3 text-green-500" size={16} />
                  商品有瑕疵或損壞
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mt-1 mr-3 text-green-500" size={16} />
                  收到錯誤商品
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mt-1 mr-3 text-green-500" size={16} />
                  尺寸不合適（未配戴過）
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mt-1 mr-3 text-green-500" size={16} />
                  商品與描述不符
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mt-1 mr-3 text-green-500" size={16} />
                  個人因素不喜歡（保持原狀）
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600">
                ❌ 不可退換情況
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <AlertTriangle className="mt-1 mr-3 text-red-500" size={16} />
                  已配戴使用過的商品
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="mt-1 mr-3 text-red-500" size={16} />
                  客製化或特殊訂製商品
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="mt-1 mr-3 text-red-500" size={16} />
                  超過30天退換期限
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="mt-1 mr-3 text-red-500" size={16} />
                  包裝或配件不完整
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="mt-1 mr-3 text-red-500" size={16} />
                  人為損壞的商品
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 退換貨流程 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">🔄 退換貨流程</h2>
          <div className="relative">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">聯繫客服</h3>
                <p className="text-sm text-gray-600">
                  撥打客服電話或發送email說明退換原因
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">填寫申請表</h3>
                <p className="text-sm text-gray-600">
                  完整填寫退換貨申請表並提供訂單資訊
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">寄回商品</h3>
                <p className="text-sm text-gray-600">
                  將商品安全包裝後寄回指定地址
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">完成處理</h3>
                <p className="text-sm text-gray-600">
                  收到商品後3-5個工作日內完成退款或換貨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 退款方式 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">💰 退款方式</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">
                信用卡付款
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 退款將原路退回至原付款信用卡</li>
                <li>• 處理時間：5-10個工作日</li>
                <li>• 退款金額會顯示在信用卡帳單中</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">
                貨到付款
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 需提供銀行帳戶資訊</li>
                <li>• 處理時間：3-5個工作日</li>
                <li>• 退款將匯入指定銀行帳戶</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-amber-800">
            ⚠️ 重要注意事項
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              •
              退換貨運費：商品瑕疵或錯誤配送由本公司負擔，個人因素退換由客戶負擔運費
            </p>
            <p>
              •
              商品檢查：退回商品需保持原包裝完整，包含商品吊牌、說明書、包裝盒等
            </p>
            <p>
              • 特殊情況：節慶期間或促銷活動可能有特殊退換貨規定，詳情請洽客服
            </p>
            <p>• 客服時間：週一至週五 9:00-18:00，例假日暫停服務</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnPolicy;
