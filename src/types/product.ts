export type ProductCategory = "項鍊" | "手鍊" | "戒指" | "耳環";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  images: string[];
  stock: number;
  featured?: boolean;
}

export const getCategoryPath = (category: ProductCategory): string => {
  const pathMap: Record<ProductCategory, string> = {
    項鍊: "necklaces",
    手鍊: "bracelets",
    戒指: "rings",
    耳環: "earrings",
  };

  return pathMap[category];
};

export const getCategoryFromPath = (path: string): ProductCategory | null => {
  const pathMap: Record<string, ProductCategory> = {
    necklaces: "項鍊",
    bracelets: "手鍊",
    rings: "戒指",
    earrings: "耳環",
  };

  return pathMap[path] || null;
};
