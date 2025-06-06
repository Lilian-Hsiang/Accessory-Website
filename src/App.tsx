import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetail from "./pages/products/ProductDetail";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PaymentPage from "./pages/checkout/PaymentPage";
import Favorites from "./pages/Favorites";
import OrderConfirmationPage from "./pages/checkout/OrderConfirmationPage";
// 幫助頁面
import BuyingGuide from "./pages/help/BuyingGuide";
import ReturnPolicy from "./pages/help/ReturnPolicy";
import PaymentMethods from "./pages/help/PaymentMethods";
import FAQ from "./pages/help/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/Accessory-Website">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/products/:category/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/payment" element={<PaymentPage />} />
          <Route
            path="/checkout/confirmation"
            element={<OrderConfirmationPage />}
          />
          {/* 幫助頁面路由 */}
          <Route path="/help/buying-guide" element={<BuyingGuide />} />
          <Route path="/help/return-policy" element={<ReturnPolicy />} />
          <Route path="/help/payment-methods" element={<PaymentMethods />} />
          <Route path="/help/faq" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
