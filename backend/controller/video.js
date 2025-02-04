const Video = require('../model/video');
const mongoose = require('mongoose');
// Create a new video
const createVideo = async (req, res) => {
  try {
    const { title, youtubeId, duration, views, channel } = req.body;
    let videoId = null; // Default value if no file is uploaded

    // If a file is uploaded, set the videoId to the file path
    if (req.file) {
      videoId = req.file.filename;
    }

    const newVideo = new Video({
      title,
      youtubeId,
      duration,
      views,
      channel,
      videoId,  // This can be null if no video file was uploaded
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video created successfully', data: newVideo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating video', error: error.message });
  }
};



// Get all videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ data: videos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
};

// Get a single video by videoId
const getVideoById = async (req, res) => {
  try {
    const { id } = req.query;

    // Ensure ID is valid before querying
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid video ID format' });
    }

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ data: video });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
};


// Update a video by videoId


const updateVideo = async (req, res) => {
  try {
    const { id } = req.query; // Extract the ID from query parameters
    const { title, youtubeId, duration, views, channel } = req.body;
    let videoId = null;

    // Validate and cast the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid video ID format' });
    }

    // If a new file is uploaded, update the videoId
    if (req.file) {
      videoId = req.file.filename;
    }

    // Prepare the update data dynamically
    const updateData = {
      ...(title && { title }),
      ...(youtubeId && { youtubeId }),
      ...(duration && { duration }),
      ...(views && { views }),
      ...(channel && { channel }),
      ...(videoId && { videoId }),
    };

    // Perform the update
    const updatedVideo = await Video.findByIdAndUpdate(
      id, // Use the validated ID directly as a string
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ message: 'Video updated successfully', data: updatedVideo });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'Error updating video', error: error.message });
  }
};




// Delete a video by videoId
const deleteVideo = async (req, res) => {
  try {
    const deletedVideo = await Video.findOneAndDelete({ id: req.query._id });
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted successfully', data: deletedVideo });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error });
  }
};


const getLatestVideoWithId = async (req, res) => {
  try {
    // Fetch all videos
    const videos = await Video.find();

    // Filter videos where videoId is not null or empty
    const validVideos = videos.filter(video => video.videoId !== null && video.videoId !== '');

    // If no valid video exists, return a 404 response
    if (validVideos.length === 0) {
      return res.status(404).json({ message: 'No video found with a valid videoId' });
    }

    // Sort the valid videos by createdAt in descending order (latest first)
    const latestVideo = validVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    // Return the latest valid video
    res.status(200).json({ data: latestVideo });

  } catch (error) {
    // If there's an error, return a 500 response
    res.status(500).json({ message: 'Error fetching the latest video', error });
  }
};

const getLatestYoutubeId = async (req, res) => {
  try {
    // Fetch all videos
    const videos = await Video.find();

    // Filter videos where either videoId or youtubeId is valid
    const validVideos = videos.filter(video => 
      (video.videoId && video.videoId !== '') || (video.youtubeId && video.youtubeId !== '')
    );

    // If no valid video exists, return a 404 response
    if (validVideos.length === 0) {
      return res.status(404).json({ message: 'No video found with a valid videoId or youtubeId' });
    }

    // Sort the valid videos by createdAt in descending order (latest first)
    const latestVideo = validVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    // Return the latest valid video
    res.status(200).json({ data: latestVideo });

  } catch (error) {
    // If there's an error, return a 500 response
    res.status(500).json({ message: 'Error fetching the latest video', error });
  }
};

const getLatestTwoVideos= async (req, res) => {
  try {
    // Fetch all videos
    const videos = await Video.find();

    // Filter videos where videoId is not null or empty
    const validVideos = videos.filter(video => video.videoId !== null && video.videoId !== '');

    // If no valid videos exist, return a 404 response
    if (validVideos.length === 0) {
      return res.status(404).json({ message: 'No videos found with a valid videoId' });
    }

    // Sort the valid videos by createdAt in descending order (latest first)
    const latestVideos = validVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Get the latest two valid videos
    const latestTwoVideos = latestVideos.slice(0, 2);

    // Return the latest two valid videos
    res.status(200).json({ data: latestTwoVideos });

  } catch (error) {
    // If there's an error, return a 500 response
    res.status(500).json({ message: 'Error fetching the latest videos', error });
  }
};

module.exports = { 
  createVideo, 
  getVideos, 
  getVideoById, 
  updateVideo, 
  deleteVideo ,
  getLatestVideoWithId,
  getLatestYoutubeId,
  getLatestTwoVideos
};
