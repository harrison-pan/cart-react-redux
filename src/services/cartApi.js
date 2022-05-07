import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://course-api.com" }),
  reducerPath: "cartApi",
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => "/react-useReducer-cart-project",
    }),
  }),
});

export const { useGetCartItemsQuery } = cartApi;
