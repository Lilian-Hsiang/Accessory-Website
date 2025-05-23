import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center max-w-lg">
          <h1 className="text-7xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-3xl font-bold mb-4">頁面不存在</h2>
          <p className="text-gray-600 mb-8">
            抱歉，您要尋找的頁面不存在或已被移除。
            <br />
            請返回首頁或瀏覽其他商品。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/">返回首頁</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/products/necklaces">瀏覽商品</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
