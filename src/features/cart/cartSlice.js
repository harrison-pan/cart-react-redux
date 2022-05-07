import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../../services/cartApi";

const initialState = {
  cartItems: [],
  amount: 0,
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
      // state.total = state.cartItems.reduce(
      //   (acc, cur) => acc + cur.price * cur.amount,
      //   0
      // );
      // state.amount = state.cartItems.reduce((acc, cur) => acc + cur.amount, 0);
      let total = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        total += item.price * item.amount;
        amount += item.amount;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.getCartItems.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      cartApi.endpoints.getCartItems.matchFulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.cartItems = payload;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.getCartItems.matchRejected,
      (state) => {
        state.isLoading = true;
      }
    );
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
