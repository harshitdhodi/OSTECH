import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const VideoTable = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/video/getvideo');
        setVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
   {
      try {
        await axios.delete(`/api/video/deleteVideo?id=${id}`);
        setVideos(videos.filter((video) => video._id !== id)); // Use _id for filtering
        // alert('Video deleted successfully!');
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Failed to delete video.');
      }
    }
  };
  

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Video List</h1>
        <button
          onClick={() => navigate('/add-video')}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Add Video
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">YouTube ID</th>
              <th className="border border-gray-300 px-4 py-2">Duration</th>
              <th className="border border-gray-300 px-4 py-2">Views</th>
              <th className="border border-gray-300 px-4 py-2">Channel</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.videoId} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{video.title}</td>
                <td className="border border-gray-300 px-4 py-2">{video.youtubeId}</td>
                <td className="border border-gray-300 px-4 py-2">{video.duration}</td>
                <td className="border border-gray-300 px-4 py-2">{video.views}</td>
                <td className="border border-gray-300 px-4 py-2">{video.channel}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-video/${video._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoTable;
