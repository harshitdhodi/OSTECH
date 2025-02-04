const OurcapabilityService = require("../model/ourCapabilityService");

// Create a new OurcapabilityService
exports.createOurcapabilityService = async (req, res) => {
  try {
    const { title, description ,imgTitle ,altName } = req.body;
    const photo = req.file.filename; // Photo filename from multer

    const newOurcapabilityService = new OurcapabilityService({ title, photo, description ,imgTitle ,altName });
    await newOurcapabilityService.save();

    res.status(201).json({
      success: true,
      message: "OurcapabilityService created successfully",
      data: newOurcapabilityService,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all OurcapabilityServices
exports.getOurcapabilityServices = async (req, res) => {
  try {
    const OurcapabilityServices = await OurcapabilityService.find();
    res.status(200).json({
      success: true,
      data: OurcapabilityServices,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single OurcapabilityService by ID
exports.getOurcapabilityServiceById = async (req, res) => {
  try {
    const OurcapabilityServices = await OurcapabilityService.findById(req.query.id);
    if (!OurcapabilityServices) {
      return res.status(404).json({ success: false, message: "OurcapabilityService not found" });
    }
    res.status(200).json({ success: true, data: OurcapabilityServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a OurcapabilityService by ID
exports.updateOurcapabilityService = async (req, res) => {
  try {
    const { title, description , imgTitle , altName } = req.body;
    const photo = req.file ? req.file.filename : undefined;

    const updatedFields = { title, description , imgTitle , altName };
    if (photo) updatedFields.photo = photo;

    const updatedOurcapabilityService = await OurcapabilityService.findByIdAndUpdate(req.query.id, updatedFields, { new: true });
    if (!updatedOurcapabilityService) {
      return res.status(404).json({ success: false, message: "OurcapabilityService not found" });
    }
    res.status(200).json({ success: true, data: updatedOurcapabilityService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a OurcapabilityService by ID
exports.deleteOurcapabilityService = async (req, res) => {
  try {
    const deletedOurcapabilityService = await OurcapabilityService.findByIdAndDelete(req.query.id);
    if (!deletedOurcapabilityService) {
      return res.status(404).json({ success: false, message: "OurcapabilityService not found" });
    }
    res.status(200).json({ success: true, message: "OurcapabilityService deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
