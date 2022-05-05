import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

/**
 * https://redux-toolkit.js.org/api/createAsyncThunk#overview
 */
// const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
//   try {
//     const resp = await fetch(url);
//     return await resp.json();
//   } catch (err) {
//     return console.log(err);
//   }
// });

/**
 * option 2: axios
 */
const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (param, thunkAPI) => {
    try {
      return await axios.get(url).then((resp) => resp.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

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
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
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

export { getCartItems };

export default cartSlice.reducer;
