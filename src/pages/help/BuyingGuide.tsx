import React from "react";
import Layout from "@/components/layout/Layout";
import { ShoppingCart, CreditCard, Truck, Shield } from "lucide-react";

const BuyingGuide = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* 頁面標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">📖 購買指南</h1>
          <p className="text-gray-600 text-lg">
            讓我們引導您完成愉快的購物體驗
          </p>
        </div>

        {/* 購買流程 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ShoppingCart className="mr-3 text-primary" />
            購買流程
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">選擇商品</h3>
              <p className="text-sm text-gray-600">
                瀏覽我們的商品目錄，選擇您喜愛的飾品
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">加入購物車</h3>
              <p className="text-sm text-gray-600">
                點擊「加入購物車」並選擇所需數量
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">結帳付款</h3>
              <p className="text-sm text-gray-600">
                填寫配送資訊並選擇付款方式
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">收貨完成</h3>
              <p className="text-sm text-gray-600">
                等待配送並享受您的精美飾品
              </p>
            </div>
          </div>
        </div>

        {/* 選購建議 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">💡 選購建議</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">
                如何選擇合適的尺寸
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>項鍊長度：</strong> 40-45cm 適合短款，50-60cm
                  適合中長款
                </li>
                <li>
                  • <strong>手鍊長度：</strong> 測量手腕周長後加1-2cm
                </li>
                <li>
                  • <strong>戒指尺寸：</strong> 建議到實體店面試戴或使用測量工具
                </li>
                <li>
                  • <strong>耳環：</strong> 考慮臉型和髮型搭配
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">
                材質介紹
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>925純銀：</strong> 抗過敏、不易氧化，日常配戴首選
                </li>
                <li>
                  • <strong>14K金：</strong> 成色佳、耐久性強，適合長期配戴
                </li>
                <li>
                  • <strong>玫瑰金：</strong> 時尚色澤，適合追求個性的您
                </li>
                <li>
                  • <strong>精鋼材質：</strong> 防水耐磨，運動時也能配戴
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 保養建議 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="mr-3 text-primary" />
            保養小貼士
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-primary">日常保養</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 避免接觸化學物質</li>
                <li>• 運動時建議取下</li>
                <li>• 定期用軟布擦拭</li>
                <li>• 避免長時間日曬</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-primary">收納方式</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 分開存放避免刮傷</li>
                <li>• 使用首飾盒或袋子</li>
                <li>• 保持乾燥環境</li>
                <li>• 避免與其他金屬接觸</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-primary">清潔方法</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 用溫和肥皂水清洗</li>
                <li>• 軟毛刷輕刷細節</li>
                <li>• 清水沖洗後晾乾</li>
                <li>• 避免使用化學清潔劑</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 客服資訊 */}
        <div className="rounded-lg p-8 text-center" style={{backgroundColor: '#efe7d6'}}>
          <h2 className="text-2xl font-bold mb-4">需要協助？</h2>
          <p className="text-gray-600 mb-6">
            我們的專業客服團隊隨時為您提供購買建議和產品諮詢
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="font-semibold">客服電話</p>
              <p className="text-primary">(02) 1234-5678</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="font-semibold">服務時間</p>
              <p className="text-gray-600">週一至週五 9:00-18:00</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="font-semibold">Email</p>
              <p className="text-primary">service@elegantjewelry.com</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyingGuide;
