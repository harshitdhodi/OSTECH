import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDeleteOurcapabilityServiceMutation, useGetOurcapabilityServicesQuery } from '@/slice/ourCapabilityService';

const InfographicsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetOurcapabilityServicesQuery(currentPage); // Fetch data based on page number
  const [deleteInfographic] = useDeleteOurcapabilityServiceMutation(); // Use RTK Query mutation for delete

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching infographics</div>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      // Call the delete mutation
      await deleteInfographic(id);
      // Optionally, you can trigger refetch to update the list after deletion
      // This will cause the table to re-render with updated data
    } catch (error) {
      console.error("Error deleting infographic", error);
    }
  };

  return (
    <div className="p-6">
      <div className='flex justify-between items-center'>
        <h2 className="text-xl font-bold mb-4">Infographic Points</h2>
        <Link to="/capability-form">
          <button className='border p-2 rounded-md bg-blue-600 text-white mb-3'>
            Add Point
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
          {data?.data?.map((infographic) => (
            <tr key={infographic.id} className="border-b">
              <td className="px-4 py-2">{infographic.title}</td>
              <td className="px-4 py-2">{infographic.description}</td>
              <td className="px-4 py-2">
                <img src={`/api/image/download/${infographic.photo}`} alt={infographic.title} className="w-16 h-16 object-contain" />
              </td>
              <td className="px-4 md:flex justify-center mt-5 items-center py-2">
                <Link to={`/edit-capability-form/${infographic._id}`}>
                <button className="bg-blue-500 text-white px-2 py-2 rounded">
                  <FaEdit />
                </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-2 py-2 ml-2 rounded"
                  onClick={() => handleDelete(infographic._id)} // Trigger delete
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

export default InfographicsTable;
