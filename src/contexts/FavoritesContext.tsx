import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

import { Product } from "@/types/product";
// 產品類型定義
// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   category: string;
//   images: string[];
//   stock: number;
//   featured?: boolean;
// }

// 收藏上下文類型
interface FavoritesContextType {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
    getFavoritesCount: () => number;
}

// 創建收藏上下文
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

// 收藏提供者組件Props
interface FavoritesProviderProps {
  children: ReactNode;
}

// 收藏數據存儲的鍵名
const FAVORITES_STORAGE_KEY = "elegant_jewelry_favorites";

// 從localStorage獲取收藏數據
const getStoredFavorites = (): Product[] => {
  try {
    const favoritesJSON = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!favoritesJSON) return [];

    const favorites = JSON.parse(favoritesJSON);
    // if (!Array.isArray(favorites)) return [];
    // // 驗證收藏項目的結構
    // return favorites.filter((product) => product && product.id && product.name);
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error("讀取收藏數據失敗:", error);
    return [];
  }
};

// 將收藏數據存儲到localStorage
const storeFavorites = (favorites: Product[]): boolean => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error("存儲收藏數據失敗:", error);
    return false;
  }
};

// 收藏提供者組件
export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  // 從本地存儲加載收藏
  const [favorites, setFavorites] = useState<Product[]>(() => {
    return getStoredFavorites();
  });

  // 當收藏更新時保存到本地存儲
  useEffect(() => {
    // storeFavorites(favorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    console.log("收藏已保存，項目數:", favorites.length);
  }, [favorites]);

  // 添加商品到收藏
  const addToFavorites = useCallback((product: Product) => {
    console.log("添加到收藏:", product.name);

    setFavorites((currentFavorites) => {
      // 檢查商品是否已在收藏中
      const isAlreadyFavorite = currentFavorites.some(
        (fav) => String(fav.id) === String(product.id),
      );

      if (isAlreadyFavorite) {
        console.log("商品已在收藏中");
        return currentFavorites;
      }
      

      const newFavorites = [...currentFavorites, product];
      console.log("收藏已更新，目前有", newFavorites.length, "個商品");
      return newFavorites;
    });
  }, []);

  // 從收藏移除商品
  const removeFromFavorites = useCallback((productId: string) => {
    console.log("從收藏移除商品:", productId);

    setFavorites((currentFavorites) => {
      const newFavorites = currentFavorites.filter(
        (product) => String(product.id) !== String(productId),
      );
      console.log("商品已移除，剩餘", newFavorites.length, "個收藏");
      return newFavorites;
    });
  }, []);

  // 檢查商品是否已收藏
  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some((fav) => String(fav.id) === String(productId));
    },
    [favorites],
  );

  // 清空收藏
  const clearFavorites = useCallback(() => {
    console.log("清空收藏");
    setFavorites([]);
    try {
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
    } catch (error) {
      console.error("清空收藏localStorage失敗:", error);
    }
  }, []);

  // 計算收藏中的總項目數
  const getFavoritesCount = useCallback(() => {
    return favorites.length;
  }, [favorites]);

  // 提供上下文值
  const contextValue: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    getFavoritesCount,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
// 使用收藏上下文的自定義hook
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};