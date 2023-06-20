import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://moneymanager-acen.onrender.com/" }),
  endpoints: (builder) => ({
    // get categories https://moneymanager-acen.onrender.com/api/categories
    getCategories: builder.query({
      query: () => "api/categories",
      providesTags: ["categories"],
    }),

    // get labels
    getLabels: builder.query({
      query: () => "api/labels",
      providesTags: ["transaction"],
    }),

    // add new Transaction https://moneymanager-acen.onrender.com/api/transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: "api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // delete record

    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        url: `api/transaction/${recordId}`,
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
