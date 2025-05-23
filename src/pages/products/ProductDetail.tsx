import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getProductById } from "@/data/products";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useInitCartSync } from "@/hooks/useInitCartSync";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
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

        // 打印調試信息
        console.log("立即購買: 添加商品到購物車完成");

        // 顯示進度提示
        toast.loading("正在準備結帳...", { id: "checkout-loading" });

        // 使用較長的延遲確保數據同步完成
        setTimeout(() => {
          toast.dismiss("checkout-loading");
          console.log("立即購買: 準備導航到購物車頁面");
          navigate("/cart");
        }, 500);
      } catch (error) {
        console.error("立即購買失敗:", error);
        toast.error("處理訂單時發生錯誤，請稍後再試");
      }
    }
  };

  // 處理立即購買
  const handleBuyNow = () => {
    if (product) {
      try {
        addToCart(product, quantity);

        // 確保數據已儲存到localStorage後再導航
        setTimeout(() => {
          navigate("/cart");
        }, 100);
      } catch (error) {
        console.error("立即購買失敗:", error);
        toast.error("處理訂單時發生錯誤，請稍後再試");
      }
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

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">找不到產品</h2>
          <p className="mb-8">抱歉，我們找不到您要查看的產品。</p>
          <Button asChild>
            <a href="/products/necklaces">返回產品列表</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* 產品圖片區 */}
          <div>
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>

            {/* 縮圖列表 */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`border p-1 w-20 h-20 rounded-md overflow-hidden ${
                    selectedImage === image
                      ? "border-primary"
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
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="mb-6">
              <p className="text-sm text-gray-500">分類：{product.category}</p>
              <p className="text-primary text-3xl font-bold my-4">
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
              <div className="flex items-center border rounded-md w-32">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="flex-1 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
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

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleAddToCart}
                className="px-8 flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                加入購物車
              </Button>
              <Button variant="outline" onClick={handleBuyNow} className="px-8">
                立即購買
              </Button>
            </div>
          </div>
        </div>

        {/* 產品詳細信息 */}
        <div className="mt-16">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-8">商品詳細</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">商品特色</h3>
                <ul className="space-y-2 list-disc pl-5 text-gray-700">
                  <li>精選優質材料，確保產品的品質與耐用性</li>
                  <li>獨特設計，展現個人風格與品味</li>
                  <li>精湛工藝，每個細節都經過精心打造</li>
                  <li>多種場合適用，日常佩戴或特殊場合皆宜</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">保養方法</h3>
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
      </div>
    </Layout>
  );
};

export default ProductDetail;
