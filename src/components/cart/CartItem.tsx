import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { getCategoryPath } from "@/types/product";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { product, quantity } = item;
  const { id, name, price, images, category } = product;

  // 格式化價格
  const formattedPrice = new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  // 計算小計
  const subtotal = price * quantity;
  const formattedSubtotal = new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(subtotal);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200">
      {/* 產品圖片 */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link to={`/products/${getCategoryPath(category)}/${id}`}>
          <img
            src={images[0]}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      {/* 產品信��� */}
      <div className="flex flex-1 flex-col mt-4 sm:mt-0 sm:ml-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              <Link to={`/products/${getCategoryPath(category)}/${id}`}>
                {name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{category}</p>
          </div>
          <p className="text-base font-medium text-gray-900">
            {formattedPrice}
          </p>
        </div>

        {/* 數量調整和刪除按鈕 */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => onUpdateQuantity(id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-sm font-medium">
              小計: <span className="text-primary">{formattedSubtotal}</span>
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
