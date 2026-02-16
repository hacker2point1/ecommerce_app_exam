import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";
import productReducer from "../slice/productSlice";

const CART_KEY = "my_app_cart";

// Try to load saved cart items (runs only in browser).
const loadCart = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? { items: JSON.parse(raw) } : undefined;
  } catch {
    return undefined;
  }
};

// Save only the items array to localStorage.
const saveCart = (cart: { items?: any[] } | undefined) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart?.items ?? []));
  } catch {}
};

const preloaded = loadCart();

export const store = configureStore({
  reducer: { cart: cartReducer, products: productReducer },
  preloadedState: preloaded ? { cart: preloaded } : undefined,
});

if (typeof window !== "undefined") store.subscribe(() => saveCart(store.getState().cart));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;