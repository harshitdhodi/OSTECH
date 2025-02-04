// src/services/ourProcessApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Set the base URL for your API
const baseUrl = '/api/ourProcess';

export const ourProcessApi = createApi({
  reducerPath: 'ourProcessApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['OurProcess'], // Add tagTypes for cache management
  endpoints: (builder) => ({
    // Create Manufacture Process
    createManufactureProcess: builder.mutation({
      query: (formData) => ({
        url: '/add',
        method: 'POST',
        body: formData,
    
      }),
      invalidatesTags: ['OurProcess'],
    }),

    // Get All Manufacture Processes
    getManufactureProcesses: builder.query({
      query: () => '/get',
      providesTags: ['OurProcess'], // Cache the list of processes
    }),

    // Get Manufacture Process by ID
    getManufactureProcessById: builder.query({
      query: (id) => `/getById?id=${id}`,
      providesTags: (result, error, id) => [{ type: 'OurProcess', id }], // Tag specific to the ID for cache invalidation
    }),

    // Update Manufacture Process
    updateManufactureProcess: builder.mutation({
      query: ({ id, formData }) => ({
        url: '/update',
        method: 'PUT',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { id },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'OurProcess', id }, // Invalidate the specific item
        { type: 'OurProcess' },    // Invalidate the global list
      ],
    }),

    // Delete Manufacture Process
    deleteManufactureProcess: builder.mutation({
      query: (id) => ({
        url: '/delete',
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: ['OurProcess'],
    }),
  }),
});
 
export const {
  useCreateManufactureProcessMutation,
  useGetManufactureProcessesQuery,
  useGetManufactureProcessByIdQuery,
  useUpdateManufactureProcessMutation,
  useDeleteManufactureProcessMutation,
} = ourProcessApi;
