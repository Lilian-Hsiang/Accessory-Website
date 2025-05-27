import { Product } from "../contexts/FavoritesContext";

// 示例商品數據
export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "經典珍珠項鍊",
    price: 2580,
    description: "採用優質淡水珍珠，經典百搭設計",
    category: "項鍊",
    images: [
      "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=珍珠項鍊",
      "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=珍珠項鍊2",
    ],
    stock: 15,
    featured: true,
  },
  {
    id: "2",
    name: "925銀鑽石戒指",
    price: 3280,
    description: "925純銀材質，鑲嵌精緻鋯石",
    category: "戒指",
    images: [
      "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=銀戒指",
      "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=銀戒指2",
    ],
    stock: 8,
    featured: true,
  },
  {
    id: "3",
    name: "玫瑰金手鍊",
    price: 1980,
    description: "時尚玫瑰金色澤，精緻鏈條設計",
    category: "手鍊",
    images: [
      "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=玫瑰金手鍊",
      "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=玫瑰金手鍊2",
    ],
    stock: 20,
    featured: false,
  },
  {
    id: "4",
    name: "水晶耳環",
    price: 1580,
    description: "閃亮水晶材質，典雅垂墜設計",
    category: "耳環",
    images: [
      "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=水晶耳環",
      "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=水晶耳環2",
    ],
    stock: 12,
    featured: true,
  },
  {
    id: "5",
    name: "蝴蝶結項鍊",
    price: 2180,
    description: "可愛蝴蝶結造型，甜美風格",
    category: "項鍊",
    images: [
      "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=蝴蝶結項鍊",
      "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=蝴蝶結項鍊2",
    ],
    stock: 18,
    featured: false,
  },
  {
    id: "6",
    name: "簡約鍊式手鍊",
    price: 1380,
    description: "極簡風格，日常百搭",
    category: "手鍊",
    images: [
      "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=簡約手鍊",
      "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=簡約手鍊2",
    ],
    stock: 25,
    featured: false,
  },
];
