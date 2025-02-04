import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewBenefitsForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [photoTitles, setPhotoTitles] = useState([]);
  
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    // Limit the number of photos to 5
    if (photos.length + files.length > 5) {
        toast.error("You can only upload up to 5 photos");
        return;
    }
    setPhotos([...photos, ...files]);
    // Initialize alt text for each new photo
    const newPhotoAlts = Array.from({ length: files.length }, () => "");
    setPhotoAlts([...photoAlts, ...newPhotoAlts]);
    setPhotoTitles([...photoTitles, ...Array(files.length).fill("")]);
  
  };

  const handleDeleteImage = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setPhotoAlts((prevPhotoAlts) => prevPhotoAlts.filter((_, i) => i !== index));
    setPhotoTitles((prev) => prev.filter((_, i) => i !== index));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      // Append each photo along with its alt text
      photos.forEach((photo, index) => {
        formData.append(`photo`, photo);
        formData.append(`alt`, photoAlts[index]);
        formData.append("imgtitle", photoTitles[index]);
      });

      const response = await axios.post(
        "/api/benefits/createBenefit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );

      setTitle("");
      setDescription("");
      setPhotos([]);
      setPhotoTitles([]);
      setPhotoAlts([]);
      navigate("/benefits");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
        <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Benefit</h1>
      <ToastContainer/>
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Add Photos</label>
        <input
          type="file"
          onChange={handlePhotoChange}
          multiple
          accept="image/*"
          className="p-2 border rounded"
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative w-56">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Photo ${index + 1}`}
                className="w-56 h-32 object-cover"
              />
              <label htmlFor={`alt-${index}`} className="block mt-2">
                Alternative Text:
                <input
                  type="text"
                  id={`alt-${index}`}
                  value={photoAlts[index]}
                  onChange={(e) =>
                    setPhotoAlts((prev) =>
                      prev.map((alt, i) => (i === index ? e.target.value : alt))
                    )
                  }
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <label htmlFor={`imgtitle-${index}`} className="block mt-2">
                Title Text:
                <input
                  type="text"
                  id={`imgtitle-${index}`}
                  value={photoTitles[index]} 
                  onChange={(e) =>
                    setPhotoTitles((prev) =>
                      prev.map((title, i) => (i === index ? e.target.value : title))
                    )
                  }
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-8">
        Add Benefit
      </button>
    </form>
  );
};

export default NewBenefitsForm;
