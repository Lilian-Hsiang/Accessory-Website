import React from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  // 處理清空收藏
  const handleClearFavorites = () => {
    if (window.confirm("確定要清空所有收藏嗎？")) {
      clearFavorites();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              我的收藏
            </h1>
            <p className="text-gray-600 mt-2">
              共有 {favorites.length} 件收藏商品
            </p>
          </div>

          {favorites.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearFavorites}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              清空收藏
            </Button>
          )}
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // 空收藏狀態
          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-4">您還沒有收藏任何商品</h2>
            <p className="text-gray-600 mb-8">
              瀏覽我們的商品，點擊愛心按鈕將喜愛的商品加入收藏吧！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/products/necklaces">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  開始購物
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">返回首頁</Link>
              </Button>
            </div>
          </div>
        )}

        {/* 推薦商品區塊（如果收藏為空時顯示） */}
        {favorites.length === 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">熱門推薦</h2>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                查看我們的熱門商品，也許您會找到心儀的飾品
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="outline">
                  <Link to="/products/necklaces">項鍊系列</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/products/bracelets">手鍊系列</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/products/rings">戒指系列</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/products/earrings">耳環系列</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;