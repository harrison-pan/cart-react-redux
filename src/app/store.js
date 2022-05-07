import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import modalReducer from "../features/modal/modalSlice";
import { cartApi } from "../services/cartApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (gDM) => gDM().concat(cartApi.middleware),
});
