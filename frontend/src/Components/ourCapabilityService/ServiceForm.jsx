import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useCreateOurcapabilityServiceMutation,
  useGetOurcapabilityServiceByIdQuery,
  useUpdateOurcapabilityServiceMutation,
} from '@/slice/ourCapabilityService';

const ServiceForm = () => {
  const { id } = useParams(); // Get the capability service ID from the URL
  const navigate = useNavigate();

  const { data: existingService, isLoading, error } = useGetOurcapabilityServiceByIdQuery(id, {
    skip: !id, // Skip query if no ID
    refetchOnMountOrArgChange: true, // Ensure data is refetched on mount or when ID changes
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [createService, { isLoading: isCreating }] = useCreateOurcapabilityServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateOurcapabilityServiceMutation();

  const [imagePreview, setImagePreview] = useState(null);

  // Pre-fill form with existing service data
  useEffect(() => {
    if (existingService?.data) {
      const service = existingService.data;
      setValue('title', service.title);
      setValue('description', service.description);
      setValue('imgTitle', service.imgTitle);
      setValue('altName', service.altName);
      if (service.photo) {
        setImagePreview(`/api/image/download/${service.photo}`);
      }
    }
  }, [existingService, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('imgTitle', data.imgTitle);
    formData.append('altName', data.altName);
    if (data.photo?.[0]) formData.append('photo', data.photo[0]);

    try {
      if (id) {
        // Update existing service
        await updateService({ id, formData }).unwrap();
      } else {
        // Create new service
        await createService(formData).unwrap();
      }

      // Navigate to list view after success
      navigate('/capability-service-table');
    } catch (e) {
      console.error('Submission failed:', e);
    }
  };

  if (isLoading) return <div>Loading service...</div>;
  if (error) return <div>Error loading service: {error.message}</div>;

  return (
    <div className="p-6  mx-auto bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {id ? 'Edit Service' : 'Add New Service'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Photo Field */}
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">Photo</label>
          <input
            type="file"
            id="photo"
            {...register('photo')}
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="w-1/4 h-auto rounded-lg" />
            </div>
          )}
        </div>

        {/* Image Title Field */}
        <div className="mb-4">
          <label htmlFor="imgTitle" className="block text-gray-700 font-medium mb-2">Image Title</label>
          <input
            type="text"
            id="imgTitle"
            {...register('imgTitle', { required: 'Image Title is required' })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {errors.imgTitle && <p className="text-red-500 text-sm">{errors.imgTitle.message}</p>}
        </div>

        {/* Alt Name Field */}
        <div className="mb-4">
          <label htmlFor="altName" className="block text-gray-700 font-medium mb-2">Alt Name</label>
          <input
            type="text"
            id="altName"
            {...register('altName', { required: 'Alt Name is required' })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {errors.altName && <p className="text-red-500 text-sm">{errors.altName.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className={`w-full p-2 rounded-lg text-white ${isCreating || isUpdating ? 'bg-gray-400' : 'bg-blue-500'}`}
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? 'Submitting...' : id ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
