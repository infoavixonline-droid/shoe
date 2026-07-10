import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Shoe } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (shoe: Shoe, size: string, color: string, qty: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, qty: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('shoe_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse shoe_cart', e);
      }
    }
  }, []);

  // Save cart on every update
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('shoe_cart', JSON.stringify(newCart));
  };

  const addToCart = (shoe: Shoe, size: string, color: string, qty: number) => {
    const existingIndex = cart.findIndex(item => item.id === shoe.id && item.size === size);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += qty;
      saveCart(newCart);
    } else {
      const newItem: CartItem = {
        id: shoe.id,
        name: shoe.name,
        price: shoe.price,
        image: shoe.image,
        size: size,
        color: color,
        quantity: qty
      };
      saveCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: string, size: string) => {
    const newCart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart(newCart);
  };

  const updateQuantity = (id: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id, size);
      return;
    }
    const newCart = cart.map(item => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    saveCart(newCart);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      clearCart,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
