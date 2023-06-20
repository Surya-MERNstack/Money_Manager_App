import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "https://moneymanager-acen.onrender.com/api";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories https://moneymanager-acen.onrender.com/api/categories
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["categories"],
    }),

    // get labels
    getLabels: builder.query({
      query: () => "/labels",
      providesTags: ["transaction"],
    }),

    // add new Transaction https://moneymanager-acen.onrender.com/api/transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: "/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // delete record

    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        url: `/transaction/${recordId}`,
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

// Export the useGetLabelsQuery hook
export const { useGetLabelsQuery } = apiSlice;

export default apiSlice;
