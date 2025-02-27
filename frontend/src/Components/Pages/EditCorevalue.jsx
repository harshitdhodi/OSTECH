import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const EditCoreValue = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState([]);
    const [status, setStatus] = useState("active");
    const { id } = useParams();
    const [initialPhotos, setInitialPhotos] = useState([]);
    const [photoAlts, setPhotoAlts] = useState([]);
    const [photoTitles, setPhotoTitles] = useState([]);
    const [initialphotoAlts, setInitialPhotoAlts] = useState([]);
    const [initialImgtitle, setInitialImgtitle] = useState([]);
    const navigate = useNavigate();

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


    useEffect(() => {
        fetchCoreValue();
    }, []);

    const fetchCoreValue = async () => {
        try {
            const response = await axios.get(`/api/corevalue/getCoreValueById?id=${id}`, { withCredentials: true });
            const coreValue = response.data;
            setTitle(coreValue.title);
            setDescription(coreValue.description);
            setInitialPhotos(coreValue.photo);
            setStatus(coreValue.status);
            setInitialPhotoAlts(coreValue.alt);
            setInitialImgtitle(coreValue.imgtitle || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('status', status);
            // Combine initial and new photo alts into a single array
            const combinedAlts = [...initialphotoAlts, ...photoAlts];
            const combinedImgtitle = [...initialImgtitle, ...photoTitles];

            // Append photos and their respective alts to FormData
            photo.forEach((p) => {
                formData.append('photo', p);
            });

            combinedAlts.forEach((a) => {
                formData.append('alt', a);
            }); 

            combinedImgtitle.forEach((m) => {
                formData.append('imgtitle', m);
            });
            const response = await axios.put(`/api/corevalue/updateCorevalue?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            navigate('/corevalue');
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (e) => {
        const newPhotos = Array.from(e.target.files);
        setPhoto([...photo, ...newPhotos]);
    };

    const handleInitialAltTextChange = (e, index) => {
        const newPhotoAlts = [...initialphotoAlts];
        newPhotoAlts[index] = e.target.value;

        setInitialPhotoAlts(newPhotoAlts);
    };

    const handleNewAltTextChange = (e, index) => {
        const newPhotoAlts = [...photoAlts];
        newPhotoAlts[index] = e.target.value;

        setPhotoAlts(newPhotoAlts);
    };

    const handleInitialImgtitleChange = (e, index) => {
        const newImgtitles = [...initialImgtitle];
        newImgtitles[index] = e.target.value;
        setInitialImgtitle(newImgtitles);
    };

    const handleNewimgTitleChange = (e, index) => {
        const newphotoTitles = [...photoTitles];
        newphotoTitles[index] = e.target.value;
        setPhotoTitles(newphotoTitles);
    };
    const handleDeleteInitialPhoto = (e, photoFilename, index) => {
        e.preventDefault();
        axios.delete(`/api/corevalue/${id}/image/${photoFilename}/${index}`, { withCredentials: true })
            .then(response => {
                const updatedPhotos = initialPhotos.filter(photo => photo !== photoFilename);
                setInitialPhotos(updatedPhotos);
                const updatedPhotoAlts = [...initialphotoAlts];
                updatedPhotoAlts.splice(index, 1);
                setInitialPhotoAlts(updatedPhotoAlts);
            })
            .catch(error => {
                console.error(error);
            });
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



    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Core Value</h1>
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="details" className="block font-semibold mb-2">Description</label>
                <ReactQuill
                    value={description}
                    onChange={(value) => setDescription(value)}
                    modules={modules}
                    className="bg-white"
                />
            </div>

            <div className="mb-4">
                    <label className="block font-semibold mb-2">Current Photos</label>
                    <div className="flex flex-wrap gap-4">
                        {initialPhotos.map((photo, index) => (
                            <div key={index} className="relative w-56">
                                <img
                                    src={`/api/image/download/${photo}`}
                                    alt={`Photo ${index + 1}`}
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
                                    alt={`New Photo ${index + 1}`}
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
                <label htmlFor="status" className="block font-semibold mb-2">Status</label>
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
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded focus:outline-none">
                Update Core Value
            </button>
        </form>
    );
};

export default EditCoreValue;
