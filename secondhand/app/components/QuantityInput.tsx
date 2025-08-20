import { useCallback, useMemo } from "react";
import type {
  Quantities,
  QuantityInputButtonReact,
  QuantityInputReact,
} from "../types";
import useOnchainStoreContext from "./OnchainStoreProvider";
import PlusSvg from "../svg/PlusSvg";
import MinusSvg from "../svg/MinusSvg";

function QuantityInputButton({
  onClick,
  svg,
  label,
}: QuantityInputButtonReact) {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 p-0"
      onClick={onClick}
      type="button"
    >
      <span className="sr-only">{label}</span>
      {svg}
    </button>
  );
}

export default function QuantityInput({ productId }: QuantityInputReact) {
  const { quantities, addToCart, removeFromCart } = useOnchainStoreContext();

  const currentItemQuantity = useMemo(() => {
    return quantities[productId] || 0;
  }, [quantities, productId]);

  const handleIncrement = useCallback(() => {
    addToCart(productId);
  }, [addToCart, productId]);

  const handleDecrement = useCallback(() => {
    if (currentItemQuantity > 0) {
      removeFromCart(productId);
    }
  }, [currentItemQuantity, removeFromCart, productId]);

  return (
    <div className="flex items-center space-x-2">
      <QuantityInputButton
        label="Decrease quantity"
        svg={<MinusSvg />}
        onClick={handleDecrement}
      />
      <span className="w-8 text-center font-medium text-sm">
        {currentItemQuantity}
      </span>
      <QuantityInputButton
        label="Increase quantity"
        svg={<PlusSvg />}
        onClick={handleIncrement}
      />
    </div>
  );
}
