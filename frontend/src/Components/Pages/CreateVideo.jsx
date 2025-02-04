import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    youtubeId: '',
    duration: '',
    views: '',
    channel: '',
    videoId: null,  // Start as null since we will handle file input
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle the file input separately
      setFormData({ ...formData, videoId: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data with FormData API
    const form = new FormData();
    form.append('title', formData.title);
    form.append('youtubeId', formData.youtubeId);
    form.append('duration', formData.duration);
    form.append('views', formData.views);
    form.append('channel', formData.channel);

    // If a file has been selected, append it
    if (formData.videoId) {
      form.append('videoId', formData.videoId);
    }

    try {
      const response = await axios.post('/api/video/addvideo', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Video added successfully:', response.data);
      navigate("/video"); // Navigate after successful form submission
      setFormData({
        title: '',
        youtubeId: '',
        duration: '',
        views: '',
        channel: '',
        videoId: null,
      });
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Failed to add video.');
    }
  };

  return (
    <div className="w-full mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New Video</h1>
      <form onSubmit={handleSubmit} className="mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="youtubeId">
            YouTube ID
          </label>
          <input
            type="text"
            id="youtubeId"
            name="youtubeId"
            value={formData.youtubeId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="duration">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="views">
            Views
          </label>
          <input
            type="text"
            id="views"
            name="views"
            value={formData.views}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="channel">
            Channel
          </label>
          <input
            type="text"
            id="channel"
            name="channel"
            value={formData.channel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="videoId">
            Video File
          </label>
          <input
            type="file"
            id="videoId"
            name="videoId"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Add Video
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
