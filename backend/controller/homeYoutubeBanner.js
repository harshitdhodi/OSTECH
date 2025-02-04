const Content = require('../model/HomeYoutubBanner');

// Create new content
exports.createContent = async (req, res) => {
  try {
    const { title, subtitle, videoLink } = req.body;
    const images = req.file ? req.file.filename : null;

    if (!title || !subtitle || !images || !videoLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContent = new Content({ title, subtitle, images, videoLink });
    const savedContent = await newContent.save();

    res.status(201).json({ message: 'Content created successfully', data: savedContent });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all content
exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.status(200).json({ message: 'Content fetched successfully', data: content });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get content by ID
exports.getContentById = async (req, res) => {
  try {
    const { id } = req.query;
    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content fetched successfully', data: content });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update content
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.query;
    const updates = req.body;
    if (req.file) updates.images = req.file.path;

    const updatedContent = await Content.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content updated successfully', data: updatedContent });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete content
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedContent = await Content.findByIdAndDelete(id);

    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
