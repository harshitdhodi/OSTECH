const Infographic = require("../model/infographic");

// Create a new Infographic
exports.createInfographic = async (req, res) => {
  try {
    const { title, description ,imgTitle ,altName } = req.body;
    const photo = req.file.filename; // Photo filename from multer

    const newInfographic = new Infographic({ title, photo, description ,imgTitle ,altName });
    await newInfographic.save();

    res.status(201).json({
      success: true,
      message: "Infographic created successfully",
      data: newInfographic,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Infographics
exports.getInfographics = async (req, res) => {
  try {
    const Infographics = await Infographic.find();
    res.status(200).json({
      success: true,
      data: Infographics,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single Infographic by ID
exports.getInfographicById = async (req, res) => {
  try {
    const Infographics = await Infographic.findById(req.query.id);
    if (!Infographics) {
      return res.status(404).json({ success: false, message: "Infographic not found" });
    }
    res.status(200).json({ success: true, data: Infographics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a Infographic by ID
exports.updateInfographic = async (req, res) => {
  try {
    const { title, description , imgTitle , altName } = req.body;
    const photo = req.file ? req.file.filename : undefined;

    const updatedFields = { title, description , imgTitle , altName };
    if (photo) updatedFields.photo = photo;

    const updatedInfographic = await Infographic.findByIdAndUpdate(req.query.id, updatedFields, { new: true });
    if (!updatedInfographic) {
      return res.status(404).json({ success: false, message: "Infographic not found" });
    }
    res.status(200).json({ success: true, data: updatedInfographic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Infographic by ID
exports.deleteInfographic = async (req, res) => {
  try {
    const deletedInfographic = await Infographic.findByIdAndDelete(req.query.id);
    if (!deletedInfographic) {
      return res.status(404).json({ success: false, message: "Infographic not found" });
    }
    res.status(200).json({ success: true, message: "Infographic deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
