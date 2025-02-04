import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetManufactureProcessesQuery, useDeleteManufactureProcessMutation } from '@/slice/ourProcess';

const OurProcessTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading } = useGetManufactureProcessesQuery(currentPage);
    const [deleteManufactureProcess] = useDeleteManufactureProcessMutation();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching processes</div>;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        try {
            await deleteManufactureProcess(id);
        } catch (error) {
            console.error('Error deleting process', error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4">Manufacture Processes</h2>
                <Link to="/process-form">
                    <button className="border p-2 rounded-md bg-blue-600 text-white mb-3">
                        Add Process
                    </button>
                </Link>
            </div>

            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Photo</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((process) => (
                        <tr key={process._id} className="border-b">
                            <td className="px-4 py-2">{process.title}</td>
                            <td className="px-4 py-2">
                                <div
                                    dangerouslySetInnerHTML={{ __html: process.description }}
                                    className="line-clamp-3 overflow-hidden text-ellipsis"
                                ></div>
                            </td>
                            <td className="px-4 py-2">
                                <img
                                    src={`/api/image/download/${process.photo}`}
                                    alt={process.title}
                                    className="w-16 h-16 object-contain"
                                />
                            </td>
                            <td className="px-4 flex justify-center items-center py-2">
                                <Link to={`/edit-process-form/${process._id}`}>
                                    <button className="bg-blue-500 text-white px-2 py-2 rounded">
                                        <FaEdit />
                                    </button>
                                </Link>
                                <button
                                    className="bg-red-500 text-white px-2 py-2 ml-2 rounded"
                                    onClick={() => handleDelete(process._id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 text-black rounded-l"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-black">{`Page ${currentPage}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 text-black rounded-r"
                    disabled={!data?.hasNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OurProcessTable;
