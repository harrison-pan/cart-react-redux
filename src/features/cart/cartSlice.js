import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../data/cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increaseItem: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount++;
    },
    decreaseItem: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount--;
    },
    calculateTotal: (state) => {
      state.total = state.cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.amount,
        0
      );
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
  calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
