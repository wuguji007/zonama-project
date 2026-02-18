import axiosClient from './axiosClient';

// 購物車 API 服務層

/**
 * 取得購物車數據
 */
export const getCart = (userId) => {
  return axiosClient.get(`/carts?userId=${userId}`)
    .then(response => response.data[0] || null);
};

/**
 * 更新購物車數量
 */
export const updateQuantity = (cartId, itemId, newQuantity) => {
  return axiosClient.patch(`/carts/${cartId}`, {})
    .then(response => {
      // 更新項目數量的邏輯
      const cart = response.data;
      const item = cart.items.find(i => i.id === itemId);
      if (item) {
        item.quantity = newQuantity;
      }
      return cart;
    });
};

/**
 * 移除購物車商品
 */
export const removeCartItem = (cartId, itemId) => {
  return axiosClient.get(`/carts/${cartId}`)
    .then(response => {
      const cart = response.data;
      cart.items = cart.items.filter(item => item.id !== itemId);
      return axiosClient.put(`/carts/${cartId}`, cart);
    })
    .then(response => response.data);
};

/**
 * 加入購物車 (推薦商品)
 */
export const addToCart = (cartId, product) => {
  return axiosClient.get(`/carts/${cartId}`)
    .then(response => {
      const cart = response.data;
      const existingItem = cart.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({
          ...product,
          quantity: 1,
          selected: true
        });
      }
      
      return axiosClient.put(`/carts/${cartId}`, cart);
    })
    .then(response => response.data);
};

/**
 * 清除失效商品
 */
export const clearInvalidItems = (cartId) => {
  return axiosClient.get(`/carts/${cartId}`)
    .then(response => {
      const cart = response.data;
      cart.invalidItems = [];
      return axiosClient.put(`/carts/${cartId}`, cart);
    })
    .then(response => response.data);
};

/**
 * 結帳 (建立訂單)
 */
export const checkout = (cartId, orderData) => {
  const cart = cartId;
  return axiosClient.post('/orders', {
    cartId,
    items: orderData.items,
    subtotal: orderData.subtotal,
    shippingFee: orderData.shippingFee,
    discount: orderData.discount,
    total: orderData.total,
    createdAt: new Date().toISOString()
  })
    .then(response => response.data);
};

/**
 * 選中/取消選中商品
 */
export const toggleItemSelection = (cartId, itemId, selected) => {
  return axiosClient.get(`/carts/${cartId}`)
    .then(response => {
      const cart = response.data;
      const item = cart.items.find(i => i.id === itemId);
      if (item) {
        item.selected = selected;
      }
      return axiosClient.put(`/carts/${cartId}`, cart);
    })
    .then(response => response.data);
};
