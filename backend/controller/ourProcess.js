const ManufactureProcess = require("../model/ourProcess");

// Create a new ManufactureProcess
exports.createManufactureProcess = async (req, res) => {
  try {
    const { title, description ,imgTitle ,altName } = req.body;
    const photo = req.file.filename; // Photo filename from multer

    const newManufactureProcess = new ManufactureProcess({ title, photo, description ,imgTitle ,altName });
    await newManufactureProcess.save();

    res.status(201).json({
      success: true,
      message: "ManufactureProcess created successfully",
      data: newManufactureProcess,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all ManufactureProcesss
exports.getManufactureProcesss = async (req, res) => {
  try {
    const ManufactureProcesss = await ManufactureProcess.find();
    res.status(200).json({
      success: true,
      data: ManufactureProcesss,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single ManufactureProcess by ID
exports.getManufactureProcessById = async (req, res) => {
  try {
    const ManufactureProcesss = await ManufactureProcess.findById(req.query.id);
    if (!ManufactureProcesss) {
      return res.status(404).json({ success: false, message: "ManufactureProcess not found" });
    }
    res.status(200).json({ success: true, data: ManufactureProcesss });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a ManufactureProcess by ID
exports.updateManufactureProcess = async (req, res) => {
  try {
    const { title, description , imgTitle , altName } = req.body;
    const photo = req.file ? req.file.filename : undefined;

    const updatedFields = { title, description , imgTitle , altName };
    if (photo) updatedFields.photo = photo;

    const updatedManufactureProcess = await ManufactureProcess.findByIdAndUpdate(req.query.id, updatedFields, { new: true });
    if (!updatedManufactureProcess) {
      return res.status(404).json({ success: false, message: "ManufactureProcess not found" });
    }
    res.status(200).json({ success: true, data: updatedManufactureProcess });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a ManufactureProcess by ID
exports.deleteManufactureProcess = async (req, res) => {
  try {
    const deletedManufactureProcess = await ManufactureProcess.findByIdAndDelete(req.query.id);
    if (!deletedManufactureProcess) {
      return res.status(404).json({ success: false, message: "ManufactureProcess not found" });
    }
    res.status(200).json({ success: true, message: "ManufactureProcess deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
