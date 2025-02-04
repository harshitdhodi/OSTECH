import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateYouTubeBanner = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(''); // For displaying the current image
  const [videoLink, setVideoLink] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing data
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/banner1/getById?id=${id}`);
        const data = response.data.data;
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setVideoLink(data.videoLink);

        if (data.images) {
          setCurrentImageUrl(`/api/upload/download/${data.images}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load data.');
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    if (image) {
      formData.append('images', image); // Only append image if it's changed
    }
    formData.append('videoLink', videoLink);

    try {
      await axios.put(`/api/banner1/update?id=${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Content updated successfully!');
      navigate('/youtub-banner'); // Redirect after update
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to update content.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Update Content</h1>
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
          <label className="block font-medium">Current Image</label>
          {currentImageUrl ? (
            <img src={currentImageUrl} alt="Current" className="w-32 h-32 object-cover" />
          ) : (
            <p>No image available</p>
          )}
          <label className="block font-medium mt-2">Upload New Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
            accept="image/*"
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
            Update
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

export default UpdateYouTubeBanner;
