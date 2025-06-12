import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, X, Search, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";
import { users } from "@/data/users";
import { toast } from "sonner";

// import { getAllProducts } from "@/data/products"

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

// 導航鏈接元件
const NavLink = ({ to, label, isActive, onClick }: NavLinkProps) => (
  <Link
    to={to}
    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive ? "text-[#C0A062]" : "text-gray-600 hover:text-[#C0A062]"
    }`}
    onClick={onClick}
  >
    {label}
  </Link>
);

// 導航欄元件
const Navbar = () => {
  const { getFavoritesCount, clearFavorites } = useFavorites();
  const { clearCart } = useCart();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false); // 控制登入 Dialog
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState(""); // 使用者輸入的密碼

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true"); // 將登入狀態存入 localStorage
      localStorage.setItem("username", user.username); // 儲存使用者名稱
      setLoginDialogOpen(false);
      toast.success("登入成功！");
    } else {
      toast.error("帳號或密碼錯誤！");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // 移除登入狀態
    localStorage.removeItem("username"); // 移除使用者名稱
    // localStorage.removeItem("elegant_jewelry_favorites"); // 移除收藏
    localStorage.removeItem("favorites");
    localStorage.removeItem("elegant_jewelry_cart"); // 移除購物車
    clearFavorites(); // 清空收藏
    clearCart(); // 清空購物車
    toast.success("登出成功！");
    window.dispatchEvent(new Event("storage")); // 通知其他元件更新
  };
  // const navigate = useNavigate();
  // const allProducts = getAllProducts();
  // const [ searchOpen, setSearchOpen ] = useState(false);
  // const [ search, setSearch ] = useState("");

  // // 搜尋結果
  // const filtered = allProducts.filter(
  //   (p) =>
  //     p.name.includes(search) ||
  //     p.category.includes(search) ||
  //     p.description.includes(search)
  // );

  // 檢查當前路徑是否活躍
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // 處理移動端菜單關閉
  const closeMobileMenu = () => {
    setMobileSheetOpen(false);
  };

  // 桌面導航鏈接
  const desktopNavLinks = (
    <div className="hidden md:flex space-x-1">
      <NavLink to="/" label="首頁" isActive={isActive("/")} />
      <NavLink to="/about" label="關於我們" isActive={isActive("/about")} />

      <Collapsible
        open={isProductsOpen}
        onOpenChange={setIsProductsOpen}
        className="relative"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/products") ? "text-[#C0A062]" : "text-gray-600"
            }`}
          >
            <span>產品分類</span>
            <span className="ml-1">{isProductsOpen ? "▲" : "▼"}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute bg-white shadow-md rounded-md mt-1 py-2 w-36 z-10">
          <div className="flex flex-col">
            <NavLink
              to="/products/necklaces"
              label="項鍊"
              isActive={isActive("/products/necklaces")}
              onClick={() => setIsProductsOpen(false)}
            />
            <NavLink
              to="/products/bracelets"
              label="手鍊"
              isActive={isActive("/products/bracelets")}
              onClick={() => setIsProductsOpen(false)}
            />
            <NavLink
              to="/products/rings"
              label="戒指"
              isActive={isActive("/products/rings")}
              onClick={() => setIsProductsOpen(false)}
            />
            <NavLink
              to="/products/earrings"
              label="耳環"
              isActive={isActive("/products/earrings")}
              onClick={() => setIsProductsOpen(false)}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

       {/* 幫助中心下拉選單 */}
      <Collapsible
        open={isHelpOpen}
        onOpenChange={setIsHelpOpen}
        className="relative"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/help") ? "text-[#C0A062]" : "text-gray-600"
            }`}
          >
            幫助中心
            <span className="ml-1">{isHelpOpen ? "▲" : "▼"}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute bg-white shadow-md rounded-md mt-1 py-2 w-40 z-10">
          <div className="flex flex-col">
            <NavLink
              to="/help/buying-guide"
              label="購買指南"
              isActive={isActive("/help/buying-guide")}
              onClick={() => setIsHelpOpen(false)}
            />
            <NavLink
              to="/help/return-policy"
              label="退換貨政策"
              isActive={isActive("/help/return-policy")}
              onClick={() => setIsHelpOpen(false)}
            />
            <NavLink
              to="/help/payment-methods"
              label="付款方式"
              isActive={isActive("/help/payment-methods")}
              onClick={() => setIsHelpOpen(false)}
            />
            <NavLink
              to="/help/faq"
              label="常見問題"
              isActive={isActive("/help/faq")}
              onClick={() => setIsHelpOpen(false)}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  // 移動端導航鏈接
  const mobileNavLinks = (
    <div className="flex flex-col space-y-2 mt-6">
      <NavLink
        to="/"
        label="首頁"
        isActive={isActive("/")}
        onClick={closeMobileMenu}
      />
      <NavLink
        to="/about"
        label="關於我們"
        isActive={isActive("/about")}
        onClick={closeMobileMenu}
      />

      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex w-full px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-[#C0A062] justify-between items-center">
          <span>產品分類</span>
          <span>▼</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 border-l border-gray-100 ml-3 mt-1">
          <div className="flex flex-col space-y-1">
            <NavLink
              to="/products/necklaces"
              label="項鍊"
              isActive={isActive("/products/necklaces")}
              onClick={closeMobileMenu}
            />
            <NavLink
              to="/products/bracelets"
              label="手鍊"
              isActive={isActive("/products/bracelets")}
              onClick={closeMobileMenu}
            />
            <NavLink
              to="/products/rings"
              label="戒指"
              isActive={isActive("/products/rings")}
              onClick={closeMobileMenu}
            />
            <NavLink
              to="/products/earrings"
              label="耳環"
              isActive={isActive("/products/earrings")}
              onClick={closeMobileMenu}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
      {/* 幫助中心下拉選單 */}
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex w-full px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-[#C0A062] justify-between items-center">
          <span>幫助中心</span>
          <span>▼</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 border-l border-gray-100 ml-3 mt-1">
          <div className="flex flex-col space-y-1">
            <NavLink
              to="/help/buying-guide"
              label="購買指南"
              isActive={isActive("/help/buying-guide")}
              onClick={closeMobileMenu}
            />
            <NavLink
              to="/help/return-policy"
              label="退換貨政策"
              isActive={isActive("/help/return-policy")}
              onClick={closeMobileMenu}
            />
            <NavLink
              to="/help/payment-methods"
              label="付款方式"
              isActive={isActive("/help/payment-methods")}
              onClick={closeMobileMenu}
            />
            <NavLink
              to="/help/faq"
              label="常見問題"
              isActive={isActive("/help/faq")}
              onClick={closeMobileMenu}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo區域 */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-xl text-[#C0A062]">
                典雅飾品
              </span>
            </Link>
          </div>

          {/* 桌面導航 */}
          {desktopNavLinks}

          {/* 購物車和移動端菜單按鈕 */}
          <div className="flex items-center space-x-2">
            {/* 搜索按鈕 */}
            {/* <Button variant="ghost" size="icon" className="text-gray-600">
              <Search className="h-5 w-5" />
            </Button> */}

                  {/* 搜尋 Dialog
       {searchOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="搜尋商品名稱、分類、描述"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <div>
              {search.length === 0 && (
                <div className="text-gray-400 text-sm">請輸入關鍵字</div>
              )}
              {search.length > 0 && filtered.length === 0 && (
                <div className="text-gray-400 text-sm">查無結果</div>
              )}
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="py-2 px-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearch("");
                    navigate(`/products/${p.category}/${p.id}`);
                  }}
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="ml-2 text-xs text-gray-500">{p.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
            <span>{isLoggedIn ? `哈囉，${username}`: ''}</span>
            {/* 用戶按鈕 */}
            <Button variant="ghost" size="icon" className="text-gray-600" onClick={() => (isLoggedIn ? handleLogout() : setLoginDialogOpen(true))}>
              {/* <User className="h-5 w-5" /> */}
              {isLoggedIn ? <LogOut className="h-5 w-5"/> : <LogIn className="h-5 w-5"/>}
            </Button>

            {/* 登入 Dialog */}
          {loginDialogOpen && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setLoginDialogOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-medium mb-4">登入</h2>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded mb-4"
                  placeholder="帳號"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full border px-3 py-2 rounded mb-4"
                  placeholder="密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleLogin}
                >
                  登入
                </Button>
              </div>
            </div>
          )}

             {/* 收藏按鈕 */}
            <Link
              to={isLoggedIn ? "/favorites" : "#"}
              className={`relative p-2 transition-colors ${
                isActive("/favorites")
                  ? "text-red-500"
                  : "text-gray-600 hover:text-red-500"
              } ${!isLoggedIn ? "cursor-not-allowed opacity-50" : ""}`}
              title={isLoggedIn ? "我的收藏" : "請先登入"}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  toast.error("請先登入才能使用收藏功能！");
                }
              }}
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isActive("/favorites")
                    ? "fill-red-500 text-red-500"
                    : "hover:fill-red-100"
                }`}
              />
              {isLoggedIn && getFavoritesCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {getFavoritesCount()}
                </span>
              )}
            </Link>

            {/* 購物車按鈕 */}
            <Link
              to={isLoggedIn ? "/cart" : "#"}
              className={`relative p-2 ${
                !isLoggedIn ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  toast.error("請先登入才能使用購物車功能！");
                }
              }}
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
                {isLoggedIn && getTotalItems() > 0 && (
                  <span className="absolute top-0 right-0 bg-[#C0A062] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
            </Link>

            {/* 移動端菜單按鈕 */}
            <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-4/5 sm:w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="font-serif text-xl text-[#C0A062]">
                      典雅飾品
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileSheetOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  {mobileNavLinks}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
