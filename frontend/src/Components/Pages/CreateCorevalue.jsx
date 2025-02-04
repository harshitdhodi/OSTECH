import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCoreValueForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [photoTitles, setPhotoTitles] = useState([]);
  const [status, setStatus] = useState("active");
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 5) {
      toast.error("You can only upload up to 5 photos");
      return;
    }
    setPhotos([...photos, ...files]);

    // Add empty placeholders for alt and title texts
    setPhotoAlts([...photoAlts, ...Array(files.length).fill("")]);
    setPhotoTitles([...photoTitles, ...Array(files.length).fill("")]);
  };

  const handleDeleteImage = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoAlts((prev) => prev.filter((_, i) => i !== index));
    setPhotoTitles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      photos.forEach((photo, index) => {
        formData.append("photo", photo);
        formData.append("alt", photoAlts[index]);
        formData.append("imgtitle", photoTitles[index]);
      });
      formData.append("status", status);

      await axios.post("/api/corevalue/createCoreValue", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setPhotos([]);
      setPhotoAlts([]);
      setPhotoTitles([]);
      setStatus("active");
      toast.success("Core Value created successfully!");
      navigate("/CoreValue");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Core Value. Please try again.");
    }
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <ToastContainer />
      <h1 className="text-xl font-bold text-gray-700 uppercase text-center">
        Create New Core Value
      </h1>
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2">
          Description
        </label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules}
          className="bg-white"
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
      <div className="mb-4">
        <label htmlFor="status" className="block font-semibold mb-2">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded focus:outline-none"
      >
        Create Core Value
      </button>
    </form>
  );
};

export default NewCoreValueForm;
