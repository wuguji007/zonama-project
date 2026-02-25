import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 從 localStorage 讀取購物車資料，確保重新整理後資料還在
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('zonama-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 當購物車更新時，存入 localStorage
  useEffect(() => {
    localStorage.setItem('zonama-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 加入購物車功能
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        // 如果已存在，數量 +1
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // 如果不存在，新增該商品
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
    alert('已成功加入購物車！');
  };

  // 清空購物車功能 (結帳後使用)
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};