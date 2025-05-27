import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2D2C2A] text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* 頁尾上部 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-[#C0A062] text-xl mb-4">典雅飾品</h3>
            <p className="text-sm opacity-80 mb-6">
              專注於提供高品質、精美的珠寶飾品，滿足您對美的追求。
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-300 hover:text-[#C0A062] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#C0A062] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#C0A062] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-[#C0A062] text-lg mb-4">產品分類</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products/necklaces"
                  className="opacity-80 hover:opacity-100 hover:text-[#C0A062] transition-colors"
                >
                  項鍊
                </Link>
              </li>
              <li>
                <Link
                  to="/products/bracelets"
                  className="opacity-80 hover:opacity-100 hover:text-[#C0A062] transition-colors"
                >
                  手鍊
                </Link>
              </li>
              <li>
                <Link
                  to="/products/rings"
                  className="opacity-80 hover:opacity-100 hover:text-[#C0A062] transition-colors"
                >
                  戒指
                </Link>
              </li>
              <li>
                <Link
                  to="/products/earrings"
                  className="opacity-80 hover:opacity-100 hover:text-[#C0A062] transition-colors"
                >
                  耳環
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-[#C0A062] text-lg mb-4">幫助中心</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help/buying-guide" className="opacity-80 hover:opacity-100 hover:text-[#C0A062] transition-colors">
                  購買指南
                </Link>
              </li>
              <li>
                <Link to="/help/return-policy" className="opacity-80 hover:opacity-100 hover:text-[#C0A062] transition-colors">
                  退換貨政策
                </Link>
              </li>
              <li>
                <Link to="/help/payment-methods" className="opacity-80 hover:opacity-100 hover:text-[#C0A062] transition-colors">
                  付款方式
                </Link>
              </li>
              <li>
                <Link to="/help/faq" className="opacity-80 hover:opacity-100 hover:text-[#C0A062] transition-colors">
                  常見問題
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-[#C0A062] text-lg mb-4">聯絡我們</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="mr-2 opacity-70">•</span>
                <span className="opacity-80">客服電話：(02) 1234-5678</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 opacity-70">•</span>
                <span className="opacity-80">
                  服務時間：週一至週五 9:00-18:00
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 opacity-70">•</span>
                <span className="opacity-80">
                  Email：service@elegantjewelry.com
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 opacity-70">•</span>
                <span className="opacity-80">
                  地址：台北市信義區忠孝東路五段123號
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="border-t border-gray-700 my-8 opacity-50"></div>

        {/* 頁尾下部 */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} 典雅飾品 - 版權所有</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#C0A062]">
              隱私政策
            </a>
            <a href="#" className="hover:text-[#C0A062]">
              使用條款
            </a>
            <a href="#" className="hover:text-[#C0A062]">
              網站地圖
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
