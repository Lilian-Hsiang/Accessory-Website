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
import { Slider, Filter, SlidersHorizontal } from "lucide-react";

const ProductsPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [productCategory, setProductCategory] =
    useState<ProductCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // 分頁
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // 每頁顯示 8 筆

  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  console.log("products", products, "totalPages", totalPages);

  const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 捲到頂部
  }
};
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
        // 如果找不到對應的分類，顯示所有產品
        sortProducts(allProducts, sortBy);
      }
    } else {
      // 如果沒有指定分類，顯示所有產品
      sortProducts(allProducts, sortBy);
    }
    // 當 category 或排序變動時，重設頁碼
    setCurrentPage(1);
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

  // 英文分類名稱轉換
  const getCategoryTitle = (cat: ProductCategory | null): string => {
    if (!cat) return "All Jewelry";

    const categoryTitles: Record<ProductCategory, string> = {
      項鍊: "Necklaces",
      手鍊: "Bracelets",
      戒指: "Rings",
      耳環: "Earrings",
    };

    return categoryTitles[cat] || "Jewelry";
  };

  return (
    <Layout>
      {/* 頁面標題 - 拱門風格 */}
      <div className="bg-[#FBF9F2] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mx-auto w-32 h-1 bg-[#C0A062] mb-6"></div>
            <h1 className="text-4xl font-serif text-[#C0A062] mb-4">
              {getCategoryTitle(productCategory)}
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              {productCategory
                ? `探索我們精選的${productCategory}系列，為您的風格增添光彩。`
                : "瀏覽我們所有的精美飾品，總有一款適合您。"}
            </p>
          </div>
        </div>
      </div>

      {/* 產品列表 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* 產品過濾與排序 */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm border border-gray-300 rounded-full py-2 px-4 md:hidden"
            >
              <Filter className="h-4 w-4" />
              篩選
            </button>

            {/* 桌面版篩選器 */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-sm font-medium">價格範圍</div>
              <div className="text-sm font-medium">材質</div>
              <div className="text-sm font-medium">設計風格</div>
            </div>

            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
                排序方式：
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#C0A062] focus:border-[#C0A062]"
              >
                <option value="default">預設排序</option>
                <option value="price-low">價格：低至高</option>
                <option value="price-high">價格：高至低</option>
                <option value="name-asc">名稱：A-Z</option>
                <option value="name-desc">名稱：Z-A</option>
              </select>
            </div>
          </div>

          {/* 移動版篩選面板 */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 md:hidden">
              <h3 className="font-medium mb-3">篩選選項</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">價格範圍</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="最低"
                      className="border p-2 w-1/2 rounded-md text-sm"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="最高"
                      className="border p-2 w-1/2 rounded-md text-sm"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">材質</h4>
                  <div className="space-y-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">黃金</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">銀飾</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">鑽石</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="bg-[#C0A062] text-white rounded-full px-4 py-2 text-sm">
                  套用
                </button>
                <button
                  className="border border-gray-300 rounded-full px-4 py-2 text-sm"
                  onClick={() => setShowFilters(false)}
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {/* 產品網格 */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">沒有找到相關產品</p>
            </div>
          )}

          {/* 分頁 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  currentPage === idx + 1
                    ? "bg-[#C0A062] text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
              </nav>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
