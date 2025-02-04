import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateVideoForm = () => {
  const { id } = useParams(); // Get video ID from URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    youtubeId: '',
    duration: '',
    views: '',
    channel: '',
    videoId: '',
  });
  const [previewVideo, setPreviewVideo] = useState(''); // To show the previously selected video

  useEffect(() => {
    // Fetch the existing video data to populate the form
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`/api/video/getVideoById?id=${id}`);
        const videoData = response.data.data;
        setFormData(videoData);
        setPreviewVideo(videoData.videoId); // Assuming `videoId` is a URL or file path
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, videoId: file });
      setPreviewVideo(URL.createObjectURL(file)); // Preview the newly selected video
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.put(`/api/video/editVideo?id=${id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/video'); // Redirect to the video list
    } catch (error) {
      console.error('Error updating video:', error);
      alert('Failed to update video.');
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Update Video</h1>
      <form onSubmit={handleSubmit} className=" mx-auto bg-white p-6 rounded shadow">
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
            Upload New Video
          </label>
          <input
            type="file"
            id="videoId"
            name="videoId"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        {previewVideo && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Current Video Preview:</label>
            <video
              controls
              src={`/api/upload/play/${previewVideo}`}
              className="w-full rounded shadow"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Update Video
        </button>
      </form>
    </div>
  );
};

export default UpdateVideoForm;
