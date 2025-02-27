const Banner = require('../model/banner');
const path = require('path')
const fs = require('fs')


const insertBanner = async (req, res) => {
  try {
    const { section, imgTitle, title, details, alt, status, priority } = req.body;

    // Handle photo uploads
    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];

    // Handle video upload
    const video = req.files['video'] && req.files['video'].length > 0
      ? req.files['video'][0].filename
      : undefined; // If no video is uploaded, default to undefined

    // Increment priorities for existing banners in the same section with higher or equal priority
    await Banner.updateMany(
      { section, priority: { $gte: parseInt(priority) } },
      { $inc: { priority: 1 } }
    );

    // Create a new banner
    const newBanner = new Banner({
      section,
      title,
      photo,
      imgTitle,
      alt,
      details,
      video,
      status,
      priority: parseInt(priority) // Ensure priority is parsed as an integer
    });

    // Save the banner to the database
    await newBanner.save();

    res.status(200).json({
      data: newBanner,
      message: "Your data inserted successfully",
    });
  } catch (err) {
    console.error("Error inserting banner:", err);
    res.status(400).send(err);
  }
};


const getCountBySection = async (req, res) => {
  try {
    const { section } = req.query;
    const count = await Banner.countDocuments({ section });
    res.json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 

const getBanner = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 5;
    const count = await Banner.countDocuments();
    const banners = await Banner.find()
      .skip((page - 1) * limit) // Skip records for previous pages
      .limit(limit);
    res.status(200).json({
      data: banners,
      total: count,
      currentPage: page,
      hasNextPage: count > page * limit,
      message: "Banners fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching banners:", err);
    res.status(400).send(err);
  }
};


// Handle PUT request to update a banner
const updateBanner = async (req, res) => {
  const { id } = req.query;
  const { section, title, details, imgTitle, status, priority, alt } = req.body;

  try {
    console.log('Files:', req.files); // Debugging uploaded files

    // Find the banner by ID and section
    let banner = await Banner.findOne({ _id: id, section });

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    const oldPriority = banner.priority;

    // Ensure fields exist, if not, initialize them
    if (!banner.photo) banner.photo = [];
    if (!banner.alt) banner.alt = [];
    if (!banner.imgTitle) banner.imgTitle = [];

    // Update basic fields
    banner.section = section || banner.section;
    banner.title = title || banner.title;
    banner.details = details || banner.details;
    banner.status = status || banner.status;
    banner.priority = priority ? parseInt(priority) : banner.priority;

    // Handle video uploads
    if (req.files && req.files['video'] && req.files['video'].length > 0) {
      const videoPath = req.files['video'][0].filename; // Get the uploaded video's filename
      banner.video = videoPath; // Update the video field
    }

    // Handle photo uploads
    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename);
      banner.photo = [...banner.photo, ...newPhotoPaths];
    }

    // Process new alt texts
    if (alt) {
      const newAltTexts = Array.isArray(alt) ? alt : [alt];
      // Ensure that the number of alt texts does not exceed the number of images (photos)
      if (newAltTexts.length <= banner.photo.length) {
        banner.alt = [...banner.alt, ...newAltTexts];
      } else {
        return res.status(400).json({ message: 'Alt text count cannot exceed photo count' });
      }
    }

    // Process new image titles
    if (imgTitle) {
      const newImgTitles = Array.isArray(imgTitle) ? imgTitle : [imgTitle];
      // Ensure that the number of image titles does not exceed the number of images (photos)
      if (newImgTitles.length <= banner.photo.length) {
        banner.imgTitle = [...banner.imgTitle, ...newImgTitles];
      } else {
        return res.status(400).json({ message: 'Image title count cannot exceed photo count' });
      }
    }

    // Adjust priorities if priority has changed
    if (oldPriority !== parseInt(priority)) {
      if (oldPriority < parseInt(priority)) {
        await Banner.updateMany(
          { section, _id: { $ne: banner._id }, priority: { $gte: oldPriority + 1, $lte: parseInt(priority) } },
          { $inc: { priority: -1 } }
        );
      } else {
        await Banner.updateMany(
          { section, _id: { $ne: banner._id }, priority: { $gte: parseInt(priority), $lte: oldPriority - 1 } },
          { $inc: { priority: 1 } }
        );
      }
    }

    // Save updated banner
    banner = await banner.save();

    res.status(200).json({ message: 'Banner updated successfully', data: banner });
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const countBanner = async (req, res) => {
  try {
    const count = await Banner.countDocuments();
    res.status(200).json({ total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error counting services' });
  }
};


 

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.query;

    // Find the banner by ID
    const bannerToDelete = await Banner.findById(id);

    if (!bannerToDelete) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Retrieve section and priority for later use
    const { section, priority } = bannerToDelete;

    // Delete associated photos from disk
    await Promise.all(
      bannerToDelete.photo.map(async (filename) => {
        const filePath = path.join(__dirname, '../images', filename); // Adjust the path as per your file structure
        try {
          await fs.unlink(filePath); // Delete the file asynchronously
        } catch (error) {
          console.warn(`Failed to delete file: ${filename}`, error);
        }
      })
    );

    // Delete the banner from database
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Adjust priorities for banners in the same section
    await Banner.updateMany(
      { section, priority: { $gt: priority } },
      { $inc: { priority: -1 } }
    );

    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ message: 'Failed to delete banner' });
  }
};


const getBannerById = async (req, res) => {
  try {
    const { id } = req.query;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json({ data: banner });
  } catch (error) {

    res.status(500).json({ message: "Server error" });
  }
}


const deletePhotoAndAltText = async (req, res) => {

  const { imageFilename, index } = req.params;

  try {
    // Find the service by ID
    const banner = await Banner.findOne();

    if (!banner) {
      return res.status(404).json({ message: 'banner not found' });
    }

    // Remove the photo and its alt text
    banner.photo = banner.photo.filter(photo => photo !== imageFilename);
    banner.alt.splice(index, 1);

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await banner.save();

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo and alt text:', error);
    res.status(500).json({ message: error.message });
  } 
};


const getAllBanner = async (req, res) => {
  try {
    const banners = await Banner.find()
    res.status(200).json({
      data: banners,
      message: "Banners fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching banners:", err);
    res.status(400).send(err);
  }
};

const getBannersBySection = async (req, res) => {
  try {
    const { section } = req.query;

    // Validate input
    if (!section) {
      return res.status(400).json({ message: 'Section is required' });
    }

    // Fetch banners based on the section
    const banners = await Banner.find({ section });

    // Respond with the fetched data
    res.json({ banners });
  } catch (error) {
    console.error('Error fetching banners by section:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { insertBanner,getBannersBySection, getAllBanner, getBanner, getCountBySection, updateBanner, deleteBanner, getBannerById, deletePhotoAndAltText, countBanner };
