import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddYouTubBanner = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('images', image);
    formData.append('videoLink', videoLink);

    try {
      await axios.post('/api/banner1/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Content created successfully!');
      navigate('/youtub-banner'); // Redirect to content list
    } catch (error) {
      console.error('Error creating content:', error);
      alert('Failed to create content.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
            accept="image/*"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Video Link</label>
          <input
            type="url"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate('/content-list')}
            className="ml-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddYouTubBanner;
