import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, X, Search, User } from "lucide-react";
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
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { getFavoritesCount } = useFavorites();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
   const [isHelpOpen, setIsHelpOpen] = useState(false);

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
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Search className="h-5 w-5" />
            </Button>

            {/* 用戶按鈕 */}
            <Button variant="ghost" size="icon" className="text-gray-600">
              <User className="h-5 w-5" />
            </Button>

             {/* 收藏按鈕 */}
            <Link
              to="/favorites"
              className={`relative p-2 transition-colors ${
                isActive("/favorites")
                  ? "text-red-500"
                  : "text-gray-600 hover:text-red-500"
              }`}
              title="我的收藏"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isActive("/favorites")
                    ? "fill-red-500 text-red-500"
                    : "hover:fill-red-100"
                }`}
              />
              {getFavoritesCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {getFavoritesCount()}
                </span>
              )}
            </Link>

            {/* 購物車按鈕 */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {getTotalItems() > 0 && (
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
