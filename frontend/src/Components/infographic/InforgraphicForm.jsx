import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {
  useCreateInfographicMutation,
  useUpdateInfographicMutation,
  useGetInfographicByIdQuery,
} from '@/slice/infographic';

const InfographicsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: existingInfographics, isLoading, error } = useGetInfographicByIdQuery(id, { skip: !id });
  const existingInfographic = existingInfographics?.data;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [addInfographic, { isLoading: isAdding }] = useCreateInfographicMutation();
  const [updateInfographic, { isLoading: isUpdating }] = useUpdateInfographicMutation();

  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState(''); // State for React Quill

  useEffect(() => {
    if (existingInfographic) {
      setValue('title', existingInfographic.title);
      setValue('imgTitle', existingInfographic.imgTitle);
      setValue('altName', existingInfographic.altName);
      setDescription(existingInfographic.description || '');
      if (existingInfographic.photo) {
        setImagePreview(`/api/image/download/${existingInfographic.photo}`);
      }
    }
  }, [existingInfographic, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', description); // Append the Quill description
    formData.append('imgTitle', data.imgTitle);
    formData.append('altName', data.altName);
    if (data.photo[0]) formData.append('photo', data.photo[0]);

    if (id) {
      await updateInfographic({ id, formData });
    } else {
      await addInfographic(formData);
    }

    navigate('/infographic-table');
  };

  if (isLoading) return <div>Loading existing infographic...</div>;
  if (error) return <div>Error fetching infographic</div>;

  return (
    <div className="p-6 mx-auto bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {id ? 'Edit Infographic' : 'Add New Infographic'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            {...register('title', { required: 'Title is required' })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "link",
              "image",
            ]}
            className="bg-white border border-gray-300 rounded-lg"
          />

          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
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
              <img src={imagePreview} alt="Image Preview" className="w-1/4 h-auto rounded-lg" />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="imgTitle" className="block text-gray-700 font-medium mb-2">Image Title</label>
          <input
            type="text"
            id="imgTitle"
            name="imgTitle"
            {...register('imgTitle')}
            className="w-1/2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="altName" className="block text-gray-700 font-medium mb-2">Alt Text for Image</label>
          <input
            type="text"
            id="altName"
            name="altName"
            {...register('altName')}
            className="w-1/2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className={`w-full p-2 rounded-lg text-white ${isAdding || isUpdating ? 'bg-gray-400' : 'bg-blue-500'}`}
            disabled={isAdding || isUpdating}
          >
            {isAdding || isUpdating ? 'Submitting...' : (id ? 'Update Infographic' : 'Add Infographic')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfographicsForm;
