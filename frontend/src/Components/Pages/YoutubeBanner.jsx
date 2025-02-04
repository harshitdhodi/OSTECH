import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const YoutubeBanner = () => {
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axios.get('/api/banner1/getAll');
                setContents(response.data.data);
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
        };

        fetchContents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/banner1/delete?id=${id}`);
            setContents(contents.filter((content) => content._id !== id));
            alert('Content deleted successfully!');
        } catch (error) {
            console.error('Error deleting content:', error);
            alert('Failed to delete content.');
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Content List</h1>
                <button
                    onClick={() => navigate('/add-youtub-banner')}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    Add Content
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Subtitle</th>
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Video Link</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contents.map((content) => (
                            <tr key={content._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{content.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{content.subtitle}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img
                                        src={`/api/upload/download/${content.images}`}
                                        alt={content.title}
                                        className="h-16 w-16 object-cover"
                                    />
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <a href={content.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        View Video
                                    </a>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/edit-youtub-banner/${content._id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(content._id)}
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

export default YoutubeBanner;
