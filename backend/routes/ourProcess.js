const express = require("express");
const multer = require("multer");
const {
  createManufactureProcess,
  getManufactureProcesss,
  getManufactureProcessById,
  updateManufactureProcess,
  deleteManufactureProcess,
} = require("../controller/ourProcess");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${file.fieldname}_${timestamp}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extName = fileTypes.test(file.mimetype);
    if (extName) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, and PNG files are allowed!"));
    }
  },
});

// Routes
router.post("/add", upload.single("photo"), createManufactureProcess); // Create ManufactureProcess
router.get("/get", getManufactureProcesss); // Get all ManufactureProcesss
router.get("/getById", getManufactureProcessById); // Get ManufactureProcess by ID
router.put("/update", upload.single("photo"), updateManufactureProcess); // Update ManufactureProcess
router.delete("/delete", deleteManufactureProcess); // Delete ManufactureProcess

module.exports = router;
 