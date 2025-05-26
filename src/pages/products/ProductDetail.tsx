import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  getProductById,
  getProductsByCategory as getProductsByCat,
} from "@/data/products";
import { Product, ProductCategory, getCategoryPath } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useInitCartSync } from "@/hooks/useInitCartSync";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string; category: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // 確保購物車同步
  useInitCartSync();

  // 加載產品數據
  useEffect(() => {
    if (id) {
      setLoading(true);
      const foundProduct = getProductById(id);

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
      }

      setLoading(false);
    }
  }, [id]);

  // 處理數量變更
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 10)) {
      setQuantity(value);
    }
  };

  // 處理加入購物車
  const handleAddToCart = () => {
    if (product) {
      try {
        addToCart(product, quantity);
        toast.success(`已將 ${quantity} 件 ${product.name} 加入購物車`);
      } catch (error) {
        console.error("加入購物車失敗:", error);
        toast.error("加入購物車失敗，請稍後再試");
      }
    }
  };

  // 處理立即購買
  const handleBuyNow = () => {
    if (product) {
      try {
        // 添加到購物車
        addToCart(product, quantity);

        // 顯示加載提示
        toast.loading("正在準備結帳...", { id: "checkout-loading" });

        // 給數據同步一點時間
        setTimeout(() => {
          toast.dismiss("checkout-loading");
          navigate("/cart");
        }, 500);
      } catch (error) {
        console.error("立即購買失敗:", error);
        toast.error("處理訂單時發生錯誤，請稍後再試");
      }
    }
  };

  // 處理收藏
  const handleWishlist = () => {
    if (product) {
      toast.success(`已將 ${product.name} 加入收藏`);
    }
  };

  // 格式化價格
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // 加載中顯示
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C0A062]"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // 產品未找到
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-serif text-[#C0A062] mb-4">
            找不到產品
          </h2>
          <p className="mb-8 text-gray-600">抱歉，我們找不到您要查看的產品。</p>
          <Button
            asChild
            className="bg-[#C0A062] hover:bg-[#A8894F] rounded-full"
          >
            <a href="/products/necklaces">返回產品列表</a>
          </Button>
        </div>
      </Layout>
    );
  }

  // 取得相關產品
  const relatedProducts = product.category
    ? getProductsByCat(product.category)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  // 渲染產品詳情
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* 產品圖片區 */}
          <div>
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-100">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto object-contain aspect-square bg-[#F9F7F2]"
              />
            </div>

            {/* 縮圖列表 */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`border p-1 w-20 h-20 rounded-md overflow-hidden ${
                    selectedImage === image
                      ? "border-[#C0A062]"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 產品詳情區 */}
          <div>
            <div className="mb-1 text-sm text-gray-500">{product.category}</div>
            <h1 className="text-3xl font-serif text-[#C0A062] mb-2">
              {product.name}
            </h1>

            <div className="mb-6">
              <p className="text-2xl font-serif text-[#C0A062] my-4">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">產品描述</h3>
              <div className="prose prose-sm text-gray-700">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">數量</h3>
              <div className="flex items-center border border-gray-300 rounded-full w-32">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-l-full"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="flex-1 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-r-full"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                庫存：{product.stock} 件
              </p>
            </div>

            {/* 購買按鈕 */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#C0A062] hover:bg-[#A8894F] rounded-full flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                加入購物車
              </Button>
              <Button
                variant="outline"
                onClick={handleBuyNow}
                className="flex-1 border-[#C0A062] text-[#C0A062] hover:bg-[#C0A062] hover:text-white rounded-full"
              >
                立即購買
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWishlist}
                className="w-10 h-10 rounded-full border border-gray-300"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full border border-gray-300"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* 商品保證 */}
            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="flex gap-3 items-center text-sm">
                <Truck className="h-5 w-5 text-[#C0A062]" />
                <span>全台免運費，海外配送另計</span>
              </div>
              <div className="flex gap-3 items-center text-sm">
                <Shield className="h-5 w-5 text-[#C0A062]" />
                <span>正品保證，假一賠二</span>
              </div>
              <div className="flex gap-3 items-center text-sm">
                <RotateCw className="h-5 w-5 text-[#C0A062]" />
                <span>7天無理由退換</span>
              </div>
            </div>
          </div>
        </div>

        {/* 產品詳細信息 */}
        <div className="mt-16">
          <div className="border-t border-gray-200 pt-12 text-center">
            <h2 className="text-2xl font-serif text-[#C0A062] mb-12">
              商品詳細
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-left">
              <div>
                <h3 className="text-lg font-medium mb-4 font-serif text-[#C0A062]">
                  商品特色
                </h3>
                <ul className="space-y-2 list-disc pl-5 text-gray-700">
                  <li>精選優質材料，確保產品的品質與耐用性</li>
                  <li>獨特設計，展現個人風格與品味</li>
                  <li>精湛工藝，每個細節都經過精心打造</li>
                  <li>多種場合適用，日常佩戴或特殊場合皆宜</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4 font-serif text-[#C0A062]">
                  保養方法
                </h3>
                <ul className="space-y-2 list-disc pl-5 text-gray-700">
                  <li>避免接觸化學物質，如香水、洗髮精等</li>
                  <li>不佩戴時，請妥善收納於首飾盒中</li>
                  <li>避免長時間暴露在陽光下或潮濕環境中</li>
                  <li>定期使用專業飾品清潔布輕擦，保持光澤</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 相關商品 */}
        <div className="mt-16">
          <div className="border-t border-gray-200 pt-12 text-center">
            <h2 className="text-2xl font-serif text-[#C0A062] mb-8">
              相關商品
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="cursor-pointer group"
                  onClick={() =>
                    navigate(
                      `/products/${getCategoryPath(relatedProduct.category)}/${relatedProduct.id}`,
                    )
                  }
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-[#F9F7F2]">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-medium">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-[#C0A062] font-serif">
                    {formatPrice(relatedProduct.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
