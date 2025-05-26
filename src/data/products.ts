import { Product, ProductCategory } from "@/types/product";
import necklace1_1 from "@/assets/homePage/bestSellers/bs_necklace1-1.png";
import necklace1_2 from "@/assets/homePage/bestSellers/bs_necklace1-2.png";
import necklace1_3 from "@/assets/homePage/bestSellers/bs_necklace1-3.png";
import necklace2_1 from "@/assets/homePage/bestSellers/bs_necklace2-1.png";
import necklace2_2 from "@/assets/homePage/bestSellers/bs_necklace2-2.png";
import necklace2_3 from "@/assets/homePage/bestSellers/bs_necklace2-3.png";
import bracelet1_1 from "@/assets/homePage/bestSellers/bs_bracelet1-1.png";
import bracelet1_2 from "@/assets/homePage/bestSellers/bs_bracelet1-2.png";
import bracelet1_3 from "@/assets/homePage/bestSellers/bs_bracelet1-3.png";
import bracelet2_1 from "@/assets/homePage/bestSellers/bs_bracelet2-1.png";
import bracelet2_2 from "@/assets/homePage/bestSellers/bs_bracelet2-2.png";
import bracelet2_3 from "@/assets/homePage/bestSellers/bs_bracelet2-3.png";
import ring1_1 from "@/assets/homePage/bestSellers/bs_ring1-1.png";
import ring1_2 from "@/assets/homePage/bestSellers/bs_ring1-2.png";
import ring1_3 from "@/assets/homePage/bestSellers/bs_ring1-3.png";
import ring2_1 from "@/assets/homePage/bestSellers/bs_ring2-1.png";
import ring2_2 from "@/assets/homePage/bestSellers/bs_ring2-2.png";
import ring2_3 from "@/assets/homePage/bestSellers/bs_ring2-3.png";
import earrings1_1 from "@/assets/homePage/bestSellers/bs_earrings1-1.png";
import earrings1_2 from "@/assets/homePage/bestSellers/bs_earrings1-2.png";
import earrings1_3 from "@/assets/homePage/bestSellers/bs_earrings1-3.png";
import earrings2_1 from "@/assets/homePage/bestSellers/bs_earrings2-1.png";
import earrings2_2 from "@/assets/homePage/bestSellers/bs_earrings2-2.png";
import earrings2_3 from "@/assets/homePage/bestSellers/bs_earrings2-3.png";

// 用於生成隨機ID的輔助函數
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// 產品圖片佔位符 URL
const getImagePlaceholder = (index: number): string => {
  // 使用不同顏色的佔位符圖片以便區分
  const colors = ["9CA3AF", "D1D5DB", "E5E7EB", "F3F4F6", "F9FAFB"];
  const color = colors[index % colors.length];
  return `https://via.placeholder.com/400x400/${color}/FFFFFF?text=珠寶商品`;
};

// 建立模擬產品數據
const createProducts = (): Product[] => {
  const categories: ProductCategory[] = ["項鍊", "手鍊", "戒指", "耳環"];
  const products: Product[] = [];

  // 為每個類別創建多個產品
  categories.forEach((category) => {
    const count = 8; // 每個類別的產品數量

    for (let i = 0; i < count; i++) {
      const id = generateId();
      const isFeatured = i < 2; // 前兩個是精選產品

            // 根據類別和索引自訂圖片
      let images: string[] = [];
      if (category === "項鍊" && i === 0) {
        images = [necklace1_1, necklace1_2, necklace1_3];
      } else if (category === "項鍊" && i === 1) {
        images = [necklace2_1, necklace2_2, necklace2_3];
      } else if (category === "手鍊" && i === 0) {
        images = [bracelet1_1, bracelet1_2, bracelet1_3];
      } else if (category === "手鍊" && i === 1) {
        images = [bracelet2_1, bracelet2_2, bracelet2_3];
      } else if (category === "戒指" && i === 0) {
        images = [ring1_1, ring1_2, ring1_3];
      } else if (category === "戒指" && i === 1) {
        images = [ring2_1, ring2_2, ring2_3];
      } else if (category === "耳環" && i === 0) {
        images = [earrings1_1, earrings1_2, earrings1_3];
      } else if (category === "耳環" && i === 1) {
        images = [earrings2_1, earrings2_2, earrings2_3];
      } 
      else {
        images = [
          getImagePlaceholder(i),
          getImagePlaceholder(i + 1),
          getImagePlaceholder(i + 2),
        ];
      }

      products.push({
        id,
        name: `精美${category} - ${i + 1}`,
        price: Math.floor(Math.random() * 10000) + 1000, // 1000-11000 之間的價格
        description: `這是一款精美的${category}，設計靈感來自大自然，採用優質材料精心打造。這件作品展現出精湛的工藝和獨特的風格，適合各種場合佩戴。`,
        category,
        images,
        stock: Math.floor(Math.random() * 50) + 1, // 1-50 之間的庫存
        featured: isFeatured,
      });
    }
  });

  return products;
};

export const products = createProducts();

// 獲取特定分類的產品
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter((product) => product.category === category);
};

// 獲取精選產品
export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

// 根據ID獲取產品
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
