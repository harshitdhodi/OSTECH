// src/services/ourcapabilityApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Set the base URL for your API
const baseUrl = '/api/ourCapabilityService';

export const ourcapabilityApi = createApi({
  reducerPath: 'ourcapabilityApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['OurCapabilityService'], // Add tagTypes for cache management
  endpoints: (builder) => ({
    // Create Our Capability Service
    // Updated mutation for creating a capability service
createOurcapabilityService: builder.mutation({
  query: (formData) => ({
    url: '/add',
    method: 'POST',
    body: formData, // Send FormData directly
  }),
  invalidatesTags: ['OurCapabilityService'],
}),

// Updated mutation for updating a capability service
updateOurcapabilityService: builder.mutation({
  query: ({ id, formData }) => ({
    url: `/update?id=${id}`, // Append `id` as a query parameter
    method: 'PUT',
    body: formData, // Send FormData directly
  }),
  invalidatesTags: (result, error, { id }) => [
    { type: 'OurCapabilityService', id },
    { type: 'OurCapabilityService' },
  ],
}),

 
    // Get All Our Capability Services
    getOurcapabilityServices: builder.query({
      query: () => '/get',
      providesTags: ['OurCapabilityService'], // Cache the list of services
    }),

    // Get Our Capability Service by ID
    getOurcapabilityServiceById: builder.query({
      query: (id) => `/getById?id=${id}`,
      providesTags: (result, error, id) => [{ type: 'OurCapabilityService', id }], // Tag specific to the ID for cache invalidation
    }),

    // Delete Our Capability Service
    deleteOurcapabilityService: builder.mutation({
      query: (id) => ({
        url: '/delete',
        method: 'DELETE',
        params: { id },
      }),
      // Invalidating the cache after deletion
      invalidatesTags: ['OurCapabilityService'],
    }),
  }),
});

export const {
  useCreateOurcapabilityServiceMutation,
  useGetOurcapabilityServicesQuery,
  useGetOurcapabilityServiceByIdQuery,
  useUpdateOurcapabilityServiceMutation,
  useDeleteOurcapabilityServiceMutation,
} = ourcapabilityApi;
