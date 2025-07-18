import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product.ts";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";


interface ProductCardProps {
  product: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const { addToCart } = useCart();
  // 收藏
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { id, name, price, images, category } = product;
  
  // 處理加入購物車事件
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      addToCart(product, 1);
      toast.success(`已將 ${name} 加入購物車`);
      console.log("購物車已更新，產品:", name);
    } catch (error) {
      console.error("加入購物車失敗:", error);
      toast.error("加入購物車失敗，請稍後再試");
    }
  };

  // // 處理收藏按鈕點擊
  // const handleWishlist = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   toast.success(`已將 ${name} 加入收藏`);
  // };

  // 檢查是否已收藏 / 將產品ID轉為字串以匹配收藏存儲格式
  const isProductFavorite = () => {
    // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn && isFavorite(String(id)); // 只有登入時才顯示收藏狀態
  };

  // 處理收藏切換事件
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isProductFavorite()) {
        removeFromFavorites(String(id));
        toast.success(`已將 ${name} 從收藏中移除`);
      } else {
        addToFavorites(product);
        toast.success(`已將 ${name} 加入收藏`);
      }
    } catch (error) {
      console.error("收藏操作失敗:", error);
      toast.error("收藏操作失敗，請稍後再試");
    }
  };

  // 格式化價格，加上千位分隔符
  const formattedPrice = new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (

      <div className="product-card bg-white group">
        {/* 產品圖片 */}
        <div className="aspect-square overflow-hidden relative">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* 愛心收藏按鈕 */}
          <button
            onClick={(e) => {
              const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // 確保每次都檢查最新狀態
              if (!isLoggedIn) {
                e.preventDefault();
                e.stopPropagation();
                toast.error("請先登入會員才能使用收藏功能！");
                return;
              }
              handleToggleFavorite(e);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm z-50"
            aria-label={isProductFavorite() ? "移除收藏" : "加入收藏"}
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-200 ${
                isProductFavorite()
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>

          {/* 快速加入購物車覆蓋層 */}
          <div className="absolute inset-0 z-10 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={(e)=> {
                const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // 確保每次都檢查最新狀態
                if (!isLoggedIn) {
                  e.preventDefault();
                  e.stopPropagation();
                  toast.error("請先登入會員才能使用購物車功能！");
                  return;
                }
                handleAddToCart(e);
              }}
              size="sm"
              className="bg-white text-gray-800 hover:bg-[#C0A062] hover:text-white rounded-full"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              快速購買
            </Button>
          </div>
        </div>

        {/* 產品信息 */}
      <Link
        to={`/products/${getCategoryPath(category)}/${id}`}
        className="group block"
      >
        <div className="p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">
            {categoryName(category)}
          </div>
          <h3 className="font-medium text-gray-900 text-sm mb-1">{name}</h3>
          <p className="product-price font-serif text-base">{formattedPrice}</p>
        </div>
    </Link>
      </div>
  );
};

// 輔助函數從分類獲取路徑
const getCategoryPath = (category: string): string => {
  const pathMap: Record<string, string> = {
    項鍊: "necklaces",
    手鍊: "bracelets",
    戒指: "rings",
    耳環: "earrings",
  };

  return pathMap[category] || "other";
};

// 輔助函數從分類獲取英文名稱
const categoryName = (category: string): string => {
  const nameMap: Record<string, string> = {
    項鍊: "Necklace",
    手鍊: "Bracelet",
    戒指: "Ring",
    耳環: "Earring",
  };

  return nameMap[category] || "Jewelry";
};



export default ProductCard;
