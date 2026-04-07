import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity }] };
    });
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
}));