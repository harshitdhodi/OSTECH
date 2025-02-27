import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
  ],
  clipboard: {
      matchVisual: false,
  }
};

const sections = [
  { value: "Home", label: "Home" },
  { value: "About", label: "About" },
  { value: "Services", label: "Services" },
  { value: "Contact", label: "Contact" },
  { value: "Products", label: "Products" },
  { value: "Resources", label: "Resources" },
  { value: "Global Presence", label: "Global Presence" },
];

const NewBannerForm = () => {
  const [section, setSection] = useState("Home");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [video, setVideo] = useState(null);  // State for video file
  const [status, setStatus] = useState("active");
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(1); // State to hold selected priority
  const [imgTitles, setImgTitles] = useState([]);
  
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 5) {
      toast.error("You can only upload up to 5 photos");
      return;
    }
    setPhotos([...photos, ...files]);
    
    const newPhotoAlts = Array.from({ length: files.length }, () => "");
    setPhotoAlts([...photoAlts, ...newPhotoAlts]);
  
    const newImgTitles = Array.from({ length: files.length }, () => "");
    setImgTitles([...imgTitles, ...newImgTitles]);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
    }
  };

  const fetchPriorityOptions = async (section) => {
    try {
        const response = await axios.get(`/api/banner/getCountBySection?section=${section}`, { withCredentials: true });
        const count = response.data;
        if (count > 0) {
            const options = Array.from({ length: count + 1 }, (_, i) => i + 1);
            setPriorityOptions(options);
        } else {
            setPriorityOptions([1]);
        }
    } catch (error) {
        console.error(error);
        setPriorityOptions([1]);
    }
  };

  useEffect(() => {
    fetchPriorityOptions(section);
  }, [section]);

  const handleDeleteImage = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setPhotoAlts((prevPhotoAlts) => prevPhotoAlts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('section', section);
      formData.append('title', title);
      formData.append('details', details);
      formData.append('status', status);
      formData.append('priority', selectedPriority);

      // Append photos
      photos.forEach((photo, index) => {
        formData.append(`photo`, photo);
        formData.append(`alt`, photoAlts[index]);
      });

      // Append video if selected
      if (video) {
        formData.append('video', video);
      }

      const response = await axios.post('/api/banner/insertBanner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      setSection("");
      setTitle("");
      setDetails("");
      setPhotos([]);
      setStatus("active");
      setPhotoAlts([]);
      setVideo(null); // Reset video field after submission
      navigate('/banner');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <ToastContainer />
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Banner</h1>
      <div className="mb-4">
        <label htmlFor="section" className="block font-semibold mb-2">
          Section
        </label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          {sections.map((section, index) => (
            <option key={index} value={section.value}>{section.label}</option>
          ))}
        </select>
      </div>
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
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="details" className="block font-semibold mb-2">
          Description
        </label>
        <ReactQuill
          value={details}
          onChange={setDetails}
          modules={modules} // Include modules for image/video handling
          className="quill"
        />
      </div>
      <div className="mt-12">
        <label htmlFor="photo" className="block font-semibold mb-2">
          Photos
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          multiple
          onChange={handlePhotoChange}
          className="border rounded focus:outline-none"
          accept="image/*"
        />
        {photos.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group flex flex-col items-center">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Service ${index + 1}`}
                    className="h-32 w-56 object-cover"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                  >
                    X
                  </button>
                </div>
                <label className="block mt-2">
                  Alt Text:
                  <input
                    type="text"
                    value={photoAlts[index]}
                    onChange={(e) => {
                      const newPhotoAlts = [...photoAlts];
                      newPhotoAlts[index] = e.target.value;
                      setPhotoAlts(newPhotoAlts);
                    }}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Field */}
      <div className="mt-4 mb-4">
        <label htmlFor="video" className="block font-semibold mb-2">
          Video
        </label>
        <input
          type="file"
          name="video"
          id="video"
          onChange={handleVideoChange}
          className="border rounded focus:outline-none"
          accept="video/*"
        />
        {video && (
          <div className="mt-2">
            <video controls className="w-full h-auto">
              <source src={URL.createObjectURL(video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="status" className="block font-semibold mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="priority" className="block font-semibold mb-2">
          Priority
        </label>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(Number(e.target.value))}
          className="w-full p-2 border rounded focus:outline-none"
        >
          {priorityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full p-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
}; 

export default NewBannerForm;
 