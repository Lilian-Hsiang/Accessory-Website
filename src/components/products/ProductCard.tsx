import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, images, category } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      addToCart(product, 1);
      toast.success(`已將 ${name} 加入購物車`);
      // 驗證數據已存入本地存儲
      const cartItems = localStorage.getItem("cart");
      console.log(
        "購物車已更新:",
        cartItems ? JSON.parse(cartItems).length : 0,
        "項目",
      );
    } catch (error) {
      console.error("加入購物車失敗:", error);
      toast.error("加入購物車失敗，請稍後再試");
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
    <Link
      to={`/products/${getCategoryPath(category)}/${id}`}
      className="group block"
    >
      <div className="bg-white rounded-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 truncate">{name}</h3>
          <p className="text-primary font-semibold mt-1">{formattedPrice}</p>

          <div className="mt-3">
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              加入購物車
            </Button>
          </div>
        </div>
      </div>
    </Link>
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

export default ProductCard;
