import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { useInitCartSync } from "@/hooks/useInitCartSync";

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  // 確保購物車同步
  useInitCartSync();

  return (
    <Layout>
      {/* 英雄區域 */}
      <section className="relative bg-gradient-to-r from-violet-50 to-purple-100 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                優雅飾品，襯托您的獨特魅力
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                每一件飾品都是藝術品，精心打造以展現您的個人風格。無論是日常佩戴還是特殊場合，我們的珠寶都能讓您脫穎而出。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/products/necklaces">探索項鍊系列</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">了解更多</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://via.placeholder.com/600x400/F3F4F6/000000?text=優雅飾品"
                alt="精美珠寶展示"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 分類導航 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">精選分類</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard
              title="項鍊"
              image="https://via.placeholder.com/300x300/E5E7EB/000000?text=項鍊"
              link="/products/necklaces"
            />
            <CategoryCard
              title="手鍊"
              image="https://via.placeholder.com/300x300/E5E7EB/000000?text=手鍊"
              link="/products/bracelets"
            />
            <CategoryCard
              title="戒指"
              image="https://via.placeholder.com/300x300/E5E7EB/000000?text=戒指"
              link="/products/rings"
            />
            <CategoryCard
              title="耳環"
              image="https://via.placeholder.com/300x300/E5E7EB/000000?text=耳環"
              link="/products/earrings"
            />
          </div>
        </div>
      </section>

      {/* 精選產品 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">精選產品</h2>
            <Link
              to="/products/necklaces"
              className="text-primary hover:underline font-medium"
            >
              查看全部 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 關於我們簡介 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://via.placeholder.com/600x400/F3F4F6/000000?text=品牌故事"
                alt="品牌故事"
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">關於優雅飾品</h2>
              <p className="text-gray-700 mb-4">
                優雅飾品創立於2010年，我們的使命是為每位顧客提供精緻、獨特且價格合理的珠寶飾品。
              </p>
              <p className="text-gray-700 mb-6">
                每一件作品都由專業設計師設計，並由技術精湛的工匠手工製作，使用高品質的材料，確保每件飾品都能經得起時間的考驗。
              </p>
              <Button asChild variant="outline">
                <Link to="/about">了解更多我們的故事</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 客戶評價 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">顧客評價</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="王小姐"
              text="買了優雅飾品的銀手鍊作為送給母親的禮物，她非常喜歡！質感很棒，包裝也很精美。"
              rating={5}
            />
            <TestimonialCard
              name="李先生"
              text="在這裡買了訂婚戒指，服務很周到，設計獨特，女友收到非常驚喜。"
              rating={5}
            />
            <TestimonialCard
              name="張小姐"
              text="項鍊的質量很好，戴了很久都沒有變色。設計很時尚，收到了很多朋友的讚美。"
              rating={4}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

// 分類卡片元件
interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard = ({ title, image, link }: CategoryCardProps) => (
  <Link to={link} className="group block">
    <div className="relative rounded-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity group-hover:bg-opacity-40">
        <span className="text-white text-xl font-bold">{title}</span>
      </div>
    </div>
  </Link>
);

// 客戶評價卡片元件
interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
}

const TestimonialCard = ({ name, text, rating }: TestimonialCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex text-yellow-400 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-current" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-600 mb-4">{text}</p>
    <p className="font-semibold">{name}</p>
  </div>
);

export default Index;
