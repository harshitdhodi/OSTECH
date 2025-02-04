import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProductForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        details: "",
        photo: [],
        slug: "",
        homeDetail: "",
        metatitle: "",
        metadescription: "", 
        metakeywords: "",
        metalanguage: "",
        metacanonical: "",
        metaschema: "",
        otherMeta: "",
        status: "active",
        parentCategoryId: "",
        subCategoryId: "",
        subSubCategoryId: "",
        url: "",
        changeFreq: "",
        priority: "",
        benefits: [],
        catalogue: "",
        keyFeatures: [],
        isVisible: true
    });

    const [categories, setCategories] = useState([]);
    const [allBenefits, setAllBenefits] = useState([]);
    const [initialPhotos, setInitialPhotos] = useState([]);
    const [photoAlts, setPhotoAlts] = useState([]);
    const [photoTitles, setPhotoTitles] = useState([]);
    const [initialphotoAlts, setInitialPhotoAlts] = useState([]);
    const [initialImgtitle, setInitialImgtitle] = useState([]);
    const [photo, setPhoto] = useState([]);

    const { slugs } = useParams();
    const navigate = useNavigate();

    // Helper function to update form data
    const updateFormData = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Fetch product data
    const fetchProduct = useCallback(async () => {
        try {
            const productResponse = await axios.get(`/api/product/getSingleProduct?slugs=${slugs}`, { withCredentials: true });
            const product = productResponse.data;

            // Find the category ID from the categories array
            const categoryId = product.categories?.[0]?._id || "";

            setFormData(prev => ({
                ...prev,
                title: product.title,
                details: product.details,
                homeDetail: product.homeDetail,
                status: product.status,
                slug: product.slug,
                keyFeatures: product.keyFeature || [],
                metatitle: product.metatitle,
                metadescription: product.metadescription,
                metakeywords: product.metakeywords,
                metalanguage: product.metalanguage,
                metacanonical: product.metacanonical,
                metaschema: product.metaschema,
                otherMeta: product.otherMeta,
                benefits: product.benefits,
                url: product.url || `http://localhost:3000/product/${product.slug}`,
                changeFreq: product.changeFreq,
                priority: product.priority,
                catalogue: product.catalogue,
                parentCategoryId: categoryId,
                subCategoryId: product.subcategories?.[0] || "",
                subSubCategoryId: product.subSubcategories?.[0] || "",
                isVisible: product.isVisible        
            }));

            setInitialPhotos(product.photo || []);
            setInitialPhotoAlts(product.alt || []);
            setInitialImgtitle(Array.isArray(product.imgtitle) ? product.imgtitle : 
                product.photo?.map(() => '') || []);

        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }, [slugs]);

    // Fetch categories
    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('/api/product/getAll', { withCredentials: true });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    // Fetch benefits
    const fetchAllBenefits = useCallback(async () => {
        try {
            const response = await axios.get('/api/benefits/getBenefits', { withCredentials: true });
            setAllBenefits(response.data);
        } catch (error) {
            console.error('Error fetching benefits:', error);
        }
    }, []);

    // Initial data loading
    useEffect(() => {
        Promise.all([
            fetchProduct(),
            fetchCategories(),
            fetchAllBenefits()
        ]);
    }, [fetchProduct, fetchCategories, fetchAllBenefits]);

    // Auto-update slug and URL when title changes
    useEffect(() => {
        if (formData.title) {
            const newSlug = formData.title.replace(/\s+/g, '-').toLowerCase();
            updateFormData('slug', newSlug);
            updateFormData('url', `http://localhost:3000/product/${newSlug}`);
        }
    }, [formData.title]);

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            // Append basic form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'photo' && value !== null && value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(item => formDataToSend.append(key, item));
                    } else {
                        formDataToSend.append(key, value);
                    }
                }
            });

            // Append existing photos metadata
            initialPhotos.forEach((photo, index) => {
                formDataToSend.append('photo', photo);
                // Use separate arrays for alt and imgtitle
                formDataToSend.append('alt[]', initialphotoAlts[index] || '');
                formDataToSend.append('imgtitle[]', initialImgtitle[index] || '');
            });

            // Append new photos and their metadata
            if (photo.length > 0) {
                photo.forEach((file, index) => {
                    formDataToSend.append('photo', file);
                    formDataToSend.append('alt[]', photoAlts[index] || '');
                    formDataToSend.append('imgtitle[]', photoTitles[index] || '');
                });
            }

            // Log the FormData contents for debugging
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await axios.put(
                `/api/product/updateProduct?slugs=${slugs}`,
                formDataToSend,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                console.log('Product updated successfully');
                navigate('/product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // File handling functions
    const handleFileChange = (e) => {
        const newPhotos = Array.from(e.target.files);
        setPhoto(prevPhotos => {
            // Combine existing photos with new ones
            const updatedPhotos = [...prevPhotos, ...newPhotos];
            
            // Initialize corresponding alt texts and titles for new photos
            const currentAltTextsLength = photoAlts.length;
            const newAltTexts = Array(newPhotos.length).fill('');
            setPhotoAlts(prev => [...prev, ...newAltTexts]);

            const currentTitlesLength = photoTitles.length;
            const newTitles = Array(newPhotos.length).fill('');
            setPhotoTitles(prev => [...prev, ...newTitles]);

            return updatedPhotos;
        });
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

    // Photo deletion handlers
    const handleDeleteInitialPhoto = async (e, photoFilename, index) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `/api/product/${slugs}/image/${photoFilename}/${index}`, 
                { withCredentials: true }
            );

            if (response.status === 200) {
                // Update the state with the remaining photos and metadata
                setInitialPhotos(response.data.remainingPhotos);
                setInitialPhotoAlts(response.data.remainingAlts);
                setInitialImgtitle(response.data.remainingTitles);
            } else {
                console.error('Failed to delete photo:', response.data.message);
                // Optionally show an error message to the user
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
            // Optionally show an error message to the user
        }
    };

    const handleDeleteNewPhoto = (e, index) => {
        e.preventDefault();
        setPhoto(prev => prev.filter((_, i) => i !== index));
        setPhotoAlts(prev => prev.filter((_, i) => i !== index));
        setPhotoTitles(prev => prev.filter((_, i) => i !== index));
    };

    // Category handling
    const handleParentCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        updateFormData('parentCategoryId', selectedCategoryId);
        updateFormData('subCategoryId', '');
        updateFormData('subSubCategoryId', '');
    };

    const handleSubCategoryChange = (e) => {
        const selectedSubCategoryId = e.target.value;
        updateFormData('subCategoryId', selectedSubCategoryId);
        updateFormData('subSubCategoryId', '');
    };

    // Rich text editor configuration
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

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Product</h1>
            
            {/* Category Selection */}
            <div className="mb-4">
                <label htmlFor="parentCategory" className="block font-semibold mb-2">
                    Parent Category
                </label>
                <select
                    id="parentCategory"
                    value={formData.parentCategoryId}
                    onChange={handleParentCategoryChange}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                >
                    <option value="">Select Parent Category</option>
                    {categories.map(category => (
                        <option 
                            key={category._id} 
                            value={category._id}
                            selected={category._id === formData.parentCategoryId}
                        >
                            {category.category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Title Input */}
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>

            {/* Description Editor */}
            <div className="mb-4">
                <label htmlFor="details" className="block font-semibold mb-2">
                    Description
                </label>
                <ReactQuill
                    id="details"
                    value={formData.details}
                    onChange={(value) => updateFormData('details', value)}
                    modules={modules}
                    className="border rounded focus:outline-none"
                />
            </div>

            {/* Home Detail Editor */}
            <div className="mb-4">
                <label htmlFor="homeDetail" className="block font-semibold mb-2">
                    Home Detail
                </label>
                <ReactQuill
                    id="homeDetail"
                    value={formData.homeDetail}
                    onChange={(value) => updateFormData('homeDetail', value)}
                    modules={modules}
                    className="border rounded focus:outline-none"
                />
            </div>

            {/* Current Photos */}
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
                                Alternative Text:
                                <input
                                    type="text"
                                    id={`alt-${index}`}
                                    value={initialphotoAlts[index] || ''}
                                    onChange={(e) => handleInitialAltTextChange(e, index)}
                                    className="w-full p-2 border rounded focus:outline-none"
                                />
                            </label>
                            <label htmlFor={`imgtitle-${index}`} className="block mt-2">
                                Image Title:
                                <input
                                    type="text"
                                    id={`imgtitle-${index}`}
                                    value={initialImgtitle[index] || ''}
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

            {/* New Photos */}
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
                                Alternative Text:
                                <input
                                    type="text"
                                    id={`alt-new-${index}`}
                                    value={photoAlts[index] || ''}
                                    onChange={(e) => handleNewAltTextChange(e, index)}
                                    className="w-full p-2 border rounded focus:outline-none"
                                />
                            </label>
                            <label htmlFor={`imgtitle-new-${index}`} className="block mt-2">
                                Image Title:
                                <input
                                    type="text"
                                    id={`imgtitle-new-${index}`}
                                    value={photoTitles[index] || ''}
                                    onChange={(e) => handleNewimgTitleChange(e, index)}
                                    className="w-full p-2 border rounded focus:outline-none"
                                />
                            </label>
                            <button
                                onClick={(e) => handleDeleteNewPhoto(e, index)}
                                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center"
                            >
                                <span className="text-xs">X</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Features */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">
                    Key Features
                </label>
                <div className="space-y-2">
                    {formData.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => {
                                    const updatedFeatures = [...formData.keyFeatures];
                                    updatedFeatures[index] = e.target.value;
                                    updateFormData('keyFeatures', updatedFeatures);
                                }}
                                className="flex-1 p-2 border rounded focus:outline-none"
                                placeholder="Enter feature"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedFeatures = formData.keyFeatures.filter((_, i) => i !== index);
                                    updateFormData('keyFeatures', updatedFeatures);
                                }}
                                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => updateFormData('keyFeatures', [...formData.keyFeatures, ''])}
                        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                    >
                        Add Feature
                    </button>
                </div>
            </div>

            {/* Meta Information */}
            <div className="space-y-4">
                {[
                    { label: 'Meta Title', key: 'metatitle' },
                    { label: 'Meta Description', key: 'metadescription' },
                    { label: 'Meta Keywords', key: 'metakeywords' },
                    { label: 'Meta Canonical', key: 'metacanonical' },
                    { label: 'Meta Language', key: 'metalanguage' },
                    { label: 'Other Meta', key: 'otherMeta' },
                    { label: 'Schema', key: 'metaschema' }
                ].map(({ label, key }) => (
                    <div key={key} className="mb-4">
                        <label htmlFor={key} className="block font-semibold mb-2">
                            {label}
                        </label>
                        <textarea
                            id={key}
                            value={formData[key]}
                            onChange={(e) => updateFormData(key, e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none"
                            rows="3"
                        />
                    </div>
                ))}
            </div>

            {/* SEO Information */}
            <div className="mb-4">
                <label htmlFor="priority" className="block font-semibold mb-2">
                    Priority
                </label>
                <input
                    type="number"
                    id="priority"
                    min={0}
                    max={1}
                    step={0.1}
                    value={formData.priority}
                    onChange={(e) => updateFormData('priority', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="changeFreq" className="block font-semibold mb-2">
                    Change Frequency
                </label>
                <select
                    id="changeFreq"
                    value={formData.changeFreq}
                    onChange={(e) => updateFormData('changeFreq', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                >
                    <option value="">Select Change Frequency</option>
                    {['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly'].map(freq => (
                        <option key={freq} value={freq}>
                            {freq.charAt(0).toUpperCase() + freq.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Status */}
            <div className="mb-4">
                <label htmlFor="status" className="block font-semibold mb-2">
                    Status
                </label>
                <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => updateFormData('status', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                >
                    <option value="popular">Popular</option>
                    <option value="normal">Normal</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="isVisible" className="block font-semibold mb-2">
                    Visibility
                </label>
                <select
                    id="isVisible"
                    value={formData.isVisible}
                    onChange={(e) => updateFormData('isVisible', e.target.value === 'true')}
                    className="w-full p-2 border rounded focus:outline-none"
                >
                    <option value="true">Visible</option>
                    <option value="false">Hidden</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
            >
                Update Product
            </button>
        </form>
    );
};

export default EditProductForm;
