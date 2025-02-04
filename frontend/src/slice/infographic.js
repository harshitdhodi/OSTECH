import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const infographicApi = createApi({
  reducerPath: "infographicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/infographic" }),
  tagTypes: ["Infographic"],
  endpoints: (builder) => ({
    // Create Infographic
    createInfographic: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Infographic"],
    }),

    // Get All Infographics
    getInfographics: builder.query({
      query: () => "/get",
      providesTags: ["Infographic"],
    }),

    // Get Infographic by ID
    getInfographicById: builder.query({
      query: (id) => `/getById?id=${id}`,
      providesTags: (result, error, id) => [{ type: "Infographic", id }],
    }),

    // Update Infographic
    updateInfographic: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update?id=${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Infographic", id }],
    }),

    // Delete Infographic
    deleteInfographic: builder.mutation({
      query: (id) => ({
        url: `/delete?id=${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Infographic"],
    }),
  }),
});

export const {
  useCreateInfographicMutation,
  useGetInfographicsQuery,
  useGetInfographicByIdQuery,
  useUpdateInfographicMutation,
  useDeleteInfographicMutation,
} = infographicApi;
