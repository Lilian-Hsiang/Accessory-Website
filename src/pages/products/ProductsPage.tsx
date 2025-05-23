import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import {
  getProductsByCategory,
  products as allProducts,
} from "@/data/products";
import { Product, ProductCategory, getCategoryFromPath } from "@/types/product";
import { useInitCartSync } from "@/hooks/useInitCartSync";

const ProductsPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [productCategory, setProductCategory] =
    useState<ProductCategory | null>(null);

  // 確保購物車同步
  useInitCartSync();

  useEffect(() => {
    if (category) {
      const categoryName = getCategoryFromPath(category);
      setProductCategory(categoryName);

      if (categoryName) {
        let filteredProducts = getProductsByCategory(categoryName);
        sortProducts(filteredProducts, sortBy);
      } else {
        // 如果找不到對應的分類���顯示所有產品
        sortProducts(allProducts, sortBy);
      }
    } else {
      // 如果沒有指定分類，顯示所有產品
      sortProducts(allProducts, sortBy);
    }
  }, [category, sortBy]);

  // 根據選擇的排序方式進行排序
  const sortProducts = (productsToSort: Product[], sortMethod: string) => {
    let sortedProducts = [...productsToSort];

    switch (sortMethod) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 預設排序，保持原順序
        break;
    }

    setProducts(sortedProducts);
  };

  // 處理排序變更
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            {productCategory || "所有產品"}
          </h1>
          <p className="text-center text-gray-600 mt-4">
            {productCategory
              ? `探索我們精選的${productCategory}系列，為您的風格增添光彩。`
              : "瀏覽我們所有的精美飾品，總有一款適合您。"}
          </p>
        </div>
      </div>

      {/* 產品列表 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* 排序選項 */}
          <div className="flex justify-end mb-8">
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-600">
                排序方式：
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="default">預設排序</option>
                <option value="price-low">價格：低至高</option>
                <option value="price-high">價格：高至低</option>
                <option value="name-asc">名稱：A-Z</option>
                <option value="name-desc">名稱：Z-A</option>
              </select>
            </div>
          </div>

          {/* 產品網格 */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">沒有找到相關產品</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
