import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sections = [
  { value: "Home", label: "Home" },
  { value: "About", label: "About" },
  { value: "Services", label: "Services" },
  { value: "Contact", label: "Contact" },
  { value: "Products", label: "Products" },
];

const modules = {
  toolbar: [
    [{ font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const EditBanner = () => {
  const { id: bannerId } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [photo, setPhoto] = useState([]);
  const [video, setVideo] = useState(null); // State for video
  const [status, setStatus] = useState("active");
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [priority, setPriority] = useState();
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [previewVideo, setPreviewVideo] = useState(''); // To show the previously selected video

  const [photoAlts, setPhotoAlts] = useState([]);
  const [photoTitles, setPhotoTitles] = useState([]);
  const [initialphotoAlts, setInitialPhotoAlts] = useState([]);
  const [initialImgtitle, setInitialImgtitle] = useState([]);
  const fetchPriorityOptions = async (section) => {
    try {
      const response = await axios.get(
        `/api/banner/getCountBySection?section=${section}`,
        { withCredentials: true }
      );
      const count = response.data;
      setPriorityOptions(Array.from({ length: count }, (_, i) => i + 1));
    } catch (error) {
      console.error(error);
      setPriorityOptions([1]);
    }
  };

  useEffect(() => {
    fetchPriorityOptions(section);
  }, [section]);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(
          `/api/banner/getBannerById?id=${bannerId}`,
          { withCredentials: true }
        );
        const bannerData = response.data.data;
        setSection(bannerData.section);
        setTitle(bannerData.title);
        setDetails(bannerData.details);
        setInitialPhotos(bannerData.photo);
        setVideo(bannerData.video || null); // Set initial video if available
        setStatus(bannerData.status);
        setPriority(bannerData.priority);
        setInitialPhotoAlts(bannerData.alt || []);
        setInitialImgtitle(bannerData.imgTitle || []);

      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBannerData();
  }, [bannerId]);

  const handleFileChange = (e) => {
    setPhoto(Array.from(e.target.files));
  };

  const handleInitialAltTextChange = (e, index) => {
    const newPhotoAlts = [...initialphotoAlts];
    newPhotoAlts[index] = e.target.value;
    setInitialPhotoAlts(newPhotoAlts);
  };

  const handleInitialImgtitleChange = (e, index) => {
    const newImgtitles = [...initialImgtitle];
    newImgtitles[index] = e.target.value;
    setInitialImgtitle(newImgtitles);
  };

  const handleNewAltTextChange = (e, index) => {
    const newPhotoAlts = [...photoAlts];
    newPhotoAlts[index] = e.target.value;
    setPhotoAlts(newPhotoAlts);
  };
  
  const handleNewimgTitleChange = (e, index) => {
    const newphotoTitles = [...photoTitles];
    newphotoTitles[index] = e.target.value;
    setPhotoTitles(newphotoTitles);
  };
  

  const handleDeleteNewPhoto = (e, index) => {
    e.preventDefault();
    const updatedPhotos = [...photo];
    updatedPhotos.splice(index, 1);
    setPhoto(updatedPhotos);
    const updatedPhotoAlts = [...photoAlts];
    updatedPhotoAlts.splice(index, 1); 
    setPhotoAlts(updatedPhotoAlts);
  };



  useEffect(() => {
    if (video) {
      console.log("Video file selected:", video);
    }
  }, [video]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
    } else {
      toast.error("Please select a valid video file.");
    }
  };

  const handleDeleteInitialPhoto = (e, photoFilename, index) => {
    e.preventDefault();
    axios
      .delete(`/api/banner/image/${photoFilename}/${index}`, {
        withCredentials: true,
      })
      .then((response) => {
        const updatedPhotos = initialPhotos.filter(
          (photo) => photo !== photoFilename
        );
        setInitialPhotos(updatedPhotos);
        const updatedPhotoAlts = [...initialphotoAlts];
        updatedPhotoAlts.splice(index, 1);
        setInitialPhotoAlts(updatedPhotoAlts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const videoPreviewUrl = video ? URL.createObjectURL(video) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("section", section);
      formData.append("title", title);
      formData.append("details", details);
      formData.append("status", status);
      formData.append("priority", priority);
      const combinedAlts = [...initialphotoAlts, ...photoAlts];
      const combinedImgtitle = [...initialImgtitle, ...photoTitles];

      photo.forEach((p) => {
        formData.append("photo", p);
      });
      combinedAlts.forEach((a) => {
        formData.append('alt', a);
      });
      combinedImgtitle.forEach((m) => {
        formData.append('imgTitle', m);
      });
      if (video) {
        formData.append("video", video); // Append video file
      }

      const endpoint = `/api/banner/updateBanner?id=${bannerId}`;
      await axios.put(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      navigate("/banner");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating banner:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <ToastContainer />
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">
        Edit Banner
      </h1>
      <div className="mb-4">
        <label htmlFor="section" className="block font-semibold mb-2">
          Section
        </label>
        <select
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          {sections.map((sectionOption, index) => (
            <option key={index} value={sectionOption.value}>
              {sectionOption.label}
            </option>
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
          modules={modules}
          className="quill"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Current Photos</label>
        <div className="flex flex-wrap gap-4">
          {initialPhotos.map((photo, index) => (
            <div key={index} className="relative w-56">
              <img
                src={`/api/image/download/${photo}`}
                alt={initialphotoAlts[index] || `Photo ${index + 1}`} // Default alt if empty
                title={initialImgtitle[index] || `Image ${index + 1}`} // Default title if empty
                className="w-56 h-32 object-cover"
              />

              <label htmlFor={`alt-${index}`} className="block mt-2">
                Alternative Text :
                <input
                  type="text"
                  id={`alt-${index}`}
                  value={initialphotoAlts[index]}
                  onChange={(e) => handleInitialAltTextChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <label htmlFor={`imgtitle-${index}`} className="block mt-2">
                Title Text :
                <input
                  type="text"
                  id={`imgtitle-${index}`}
                  value={initialImgtitle[index]}
                  onChange={(e) => handleInitialImgtitleChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <button
                onClick={(e) => handleDeleteInitialPhoto(e, photo, index)}
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Add New Photos</label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="p-2 border rounded"
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {photo.map((file, index) => (
            <div key={index} className="relative w-56">
              <img
                src={URL.createObjectURL(file)}
                alt={photoAlts[index] || `New Photo ${index + 1}`}
                title={photoTitles[index] || `New Image ${index + 1}`}
                className="w-56 h-32 object-cover"
              />


              <label htmlFor={`alt-new-${index}`} className="block mt-2">
                Alternative Text :
                <input 
                  type="text"
                  id={`alt-new-${index}`}
                  value={photoAlts[index] || ""}
                  onChange={(e) => handleNewAltTextChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <button
                onClick={(e) => handleDeleteNewPhoto(e, index)}
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex
                justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Upload Video</label>
        <input
          type="file"
          onChange={handleVideoChange}
          accept="video/*"
          className="p-2 border rounded"
        />
        {video && video instanceof File && (
          <video controls className="w-full mt-4">
            <source src={URL.createObjectURL(video)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}


      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block font-semibold mb-2">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          {priorityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Update Banner
      </button>
    </form>
  );
};

export default EditBanner;
