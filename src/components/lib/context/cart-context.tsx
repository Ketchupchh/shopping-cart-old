import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type CartItem = {
    item_id: string;
    item_name: string;
    item_image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (newItem: CartItem) => void;
  removeFromCart: (itemId: string) => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({
    children
} : CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(newItem: CartItem) {
    setCartItems([...cartItems, newItem]);
  }

  function removeFromCart(itemId: string) {
    const updatedCartItems = cartItems.filter(item => item.item_id !== itemId);
    setCartItems(updatedCartItems);
  }

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}