import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">優雅飾品</h3>
            <p className="text-sm">
              專注於提供高品質、精美的珠寶飾品，滿足您對美的追求。
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">產品分類</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products/necklaces" className="hover:text-primary">
                  項鍊
                </Link>
              </li>
              <li>
                <Link to="/products/bracelets" className="hover:text-primary">
                  手鍊
                </Link>
              </li>
              <li>
                <Link to="/products/rings" className="hover:text-primary">
                  戒指
                </Link>
              </li>
              <li>
                <Link to="/products/earrings" className="hover:text-primary">
                  耳環
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">幫助中心</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary">
                  購買指南
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  退換貨政策
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  付款方式
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  常見問題
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">聯絡我們</h3>
            <ul className="space-y-2 text-sm">
              <li>客服電話：(02) 1234-5678</li>
              <li>服務時間：週一至週五 9:00-18:00</li>
              <li>Email：service@elegantjewelry.com</li>
              <li>地址：台北市信義區忠孝東路五段123號</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} 優雅飾品 - 版權所有</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
