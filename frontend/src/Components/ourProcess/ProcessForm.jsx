import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles
import {
  useCreateManufactureProcessMutation,
  useGetManufactureProcessByIdQuery,
  useUpdateManufactureProcessMutation,
} from '@/slice/ourProcess';

const OurProcessForm = () => {
  const { id } = useParams(); // Get the process ID from the URL
  const navigate = useNavigate();

  const { data: existingProcess, isLoading, error } = useGetManufactureProcessByIdQuery(id, {
    skip: !id, // Skip query if no ID
    refetchOnMountOrArgChange: true, // Ensure data is refetched on mount or when ID changes
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [createProcess, { isLoading: isCreating }] = useCreateManufactureProcessMutation();
  const [updateProcess, { isLoading: isUpdating }] = useUpdateManufactureProcessMutation();

  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Pre-fill form with existing process data
  useEffect(() => {
    if (existingProcess?.data) {
      const process = existingProcess.data;
      setValue('title', process.title);
      setDescription(process.description || '');
      setValue('imgTitle', process.imgTitle);
      setValue('altName', process.altName);
      if (process.photo) {
        setImagePreview(`/api/image/download/${process.photo}`);
      }
    }
  }, [existingProcess, setValue]);

  // Clean up image preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', description);
    formData.append('imgTitle', data.imgTitle);
    formData.append('altName', data.altName);
    
    if (data.photo?.[0]) {
        formData.append('photo', data.photo[0]);
    }
    
    try {
        if (id) {
            // Update process
            await updateProcess({ id, formData }).unwrap();
        } else {
            // Create process
            await createProcess(formData).unwrap();
        }
        navigate('/process-table');
    } catch (e) {
        console.error('Submission failed:', e);
    }
    
};


  if (isLoading) return <div>Loading process...</div>;
  if (error) return <div>Error loading process: {error.message}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {id ? 'Edit Process' : 'Add New Process'}
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
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="bg-white"
          />
        </div>

        {/* Photo Field */}
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">Photo</label>
          <input
            type="file"
            id="photo"
            {...register('photo', {
              validate: (value) =>
                !value[0] || value[0]?.type.startsWith('image/') || 'Only image files are allowed',
            })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
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
            {isCreating || isUpdating ? 'Submitting...' : id ? 'Update Process' : 'Add Process'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OurProcessForm;
