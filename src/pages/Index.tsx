import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { getCategoryPath } from "@/types/product";

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* 英雄區域 - 高雅風格 */}
      <section className="relative bg-[#FBF9F2] overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif text-[#C0A062] mb-4">
                Timeless Elegance
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                每一件飾品都是藝術品，精心打造以展現您的個人風格。無論是日常佩戴還是特殊場合，我們的珠寶都能讓您脫穎而出。
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  asChild
                  className="bg-[#C0A062] hover:bg-[#A8894F] text-white rounded-full px-8"
                >
                  <Link to="/products/necklaces">探索精選系列</Link>
                </Button>
              </div>

              {/* 高雅指標數據 */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-[#C0A062] font-serif text-2xl mb-1">98%</p>
                  <p className="text-xs text-gray-600">顧客滿意度</p>
                </div>
                <div className="text-center">
                  <p className="text-[#C0A062] font-serif text-2xl mb-1">
                    100%
                  </p>
                  <p className="text-xs text-gray-600">優質材料</p>
                </div>
                <div className="text-center">
                  <p className="text-[#C0A062] font-serif text-2xl mb-1">
                    500+
                  </p>
                  <p className="text-xs text-gray-600">獨特設計</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-full bg-[#F5F0E4] p-6 mx-auto max-w-md aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src="https://via.placeholder.com/500x500/F3F4F6/000000?text=優雅飾品"
                  alt="精美珠寶展示"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F9F5EA] rounded-full flex items-center justify-center z-10">
                <div className="text-center">
                  <p className="text-[#C0A062] font-serif text-lg">全新系列</p>
                  <p className="text-xs text-gray-600">立即探索</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 裝飾元素 */}
        <div className="absolute top-1/4 right-10 w-20 h-20 text-[#C0A062] opacity-20">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 left-10 w-16 h-16 text-[#C0A062] opacity-20">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>
      </section>

      {/* 分類導航 - 拱門風格 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center text-[#C0A062] mb-6">
            Shop by Category
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            探索我們精心打造的珠寶系列，每一件作品都融合了精湛工藝和獨特設計
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* 項鍊分類 - 拱門樣式 */}
            <div className="text-center">
              <div className="arch-container mx-auto">
                <div className="arch-shape">
                  <img
                    src="https://via.placeholder.com/300x300/E5E7EB/000000?text=項鍊"
                    alt="項鍊"
                    className="arch-image"
                  />
                </div>
              </div>
              <h3 className="font-serif text-xl text-[#C0A062] mt-4 mb-1">
                Earrings
              </h3>
              <p className="text-sm text-gray-600 mb-3">精緻設計的耳環系列</p>
              <Link
                to="/products/necklaces"
                className="text-xs text-[#C0A062] border-b border-[#C0A062] pb-1 hover:text-[#A8894F]"
              >
                Explore Shop
              </Link>
            </div>

            {/* 手鍊分類 - 拱門樣式 */}
            <div className="text-center">
              <div className="arch-container mx-auto">
                <div className="arch-shape">
                  <img
                    src="https://via.placeholder.com/300x300/E5E7EB/000000?text=手鍊"
                    alt="手鍊"
                    className="arch-image"
                  />
                </div>
              </div>
              <h3 className="font-serif text-xl text-[#C0A062] mt-4 mb-1">
                Necklaces
              </h3>
              <p className="text-sm text-gray-600 mb-3">優雅迷人的項鍊系列</p>
              <Link
                to="/products/bracelets"
                className="text-xs text-[#C0A062] border-b border-[#C0A062] pb-1 hover:text-[#A8894F]"
              >
                Explore Shop
              </Link>
            </div>

            {/* 戒指分類 - 拱門樣式 */}
            <div className="text-center">
              <div className="arch-container mx-auto">
                <div className="arch-shape">
                  <img
                    src="https://via.placeholder.com/300x300/E5E7EB/000000?text=戒指"
                    alt="戒指"
                    className="arch-image"
                  />
                </div>
              </div>
              <h3 className="font-serif text-xl text-[#C0A062] mt-4 mb-1">
                Rings
              </h3>
              <p className="text-sm text-gray-600 mb-3">永恆的戒指系列</p>
              <Link
                to="/products/rings"
                className="text-xs text-[#C0A062] border-b border-[#C0A062] pb-1 hover:text-[#A8894F]"
              >
                Explore Shop
              </Link>
            </div>

            {/* 耳環分類 - 拱門樣式 */}
            <div className="text-center">
              <div className="arch-container mx-auto">
                <div className="arch-shape">
                  <img
                    src="https://via.placeholder.com/300x300/E5E7EB/000000?text=耳環"
                    alt="耳環"
                    className="arch-image"
                  />
                </div>
              </div>
              <h3 className="font-serif text-xl text-[#C0A062] mt-4 mb-1">
                Bracelets
              </h3>
              <p className="text-sm text-gray-600 mb-3">精美手工製作的手鍊</p>
              <Link
                to="/products/earrings"
                className="text-xs text-[#C0A062] border-b border-[#C0A062] pb-1 hover:text-[#A8894F]"
              >
                Explore Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 精選產品 - 金色風格 */}
      <section className="py-16 bg-[#FBF9F2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-[#C0A062] mb-4">
              Best Sellers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              探索我們最受歡迎的珠寶系列，這些作品以其卓越的品質和獨特的設計深受顧客喜愛
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="border-[#C0A062] text-[#C0A062] hover:bg-[#C0A062] hover:text-white rounded-full px-8"
            >
              <Link to="/products/necklaces">瀏覽全部商品</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 新品上市 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-[#C0A062] mb-4">
              New Arrivals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              探索我們最新推出的珠寶系列，融合當代設計與傳統工藝的精美作品
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <div
                key={`new-${product.id}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-serif text-lg">{product.name}</h3>
                    <p className="text-sm opacity-80">
                      {new Intl.NumberFormat("zh-TW", {
                        style: "currency",
                        currency: "TWD",
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="border-[#C0A062] text-[#C0A062] hover:bg-[#C0A062] hover:text-white rounded-full px-8"
            >
              <Link to="/products/necklaces">查看更多新品</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-16 bg-[#FBF9F2]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-[#C0A062] mb-6">
                Designs Beyond Imagination
              </h2>
              <p className="text-gray-700 mb-6">
                在優雅飾品，我們相信每一件珠寶都應該訴說一個故事，體現佩戴者的獨特個性。我們的設計師團隊從自然、藝術和文化中汲取靈感，創造出既經典又現代的作品。
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#C0A062] rounded-full mr-3"></span>
                  <span>精湛工藝：每件作品均經過精心打造</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#C0A062] rounded-full mr-3"></span>
                  <span>創新設計：融合傳統與現代的獨特理念</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#C0A062] rounded-full mr-3"></span>
                  <span>限量系列：獨一無二的珍貴作品</span>
                </li>
              </ul>
              <Button
                asChild
                variant="link"
                className="text-[#C0A062] hover:text-[#A8894F] p-0 mt-6"
              >
                <Link to="/about">探索非凡設計 →</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://via.placeholder.com/600x400/F3F4F6/000000?text=品牌故事"
                alt="品牌故事"
                className="rounded-lg"
              />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 border-8 border-white rounded-full overflow-hidden">
                <img
                  src="https://via.placeholder.com/200x200/E5E7EB/000000?text=細節"
                  alt="珠寶細節"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 訂閱區域 */}
      <section className="py-16 bg-[#2D2C2A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-[#C0A062] mb-4">
            NEVER MISS A MOMENT OF LUXURY
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            訂閱我們的電子報，搶先了解最新產品、獨家優惠和珠寶保養小貼士
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="請輸入您的Email"
              className="flex-grow bg-[#3D3C3A] border-none text-white px-4 py-3 rounded-l-full focus:outline-none"
            />
            <Button className="bg-[#C0A062] hover:bg-[#A8894F] text-white rounded-r-full">
              訂閱
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
