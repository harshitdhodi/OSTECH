const express = require("express");
const multer = require("multer");
const {
  createOurcapabilityService,
  getOurcapabilityServices,
  getOurcapabilityServiceById,
  updateOurcapabilityService,
  deleteOurcapabilityService,
} = require("../controller/ourCapabilityService");

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
router.post("/add", upload.single("photo"), createOurcapabilityService); // Create OurcapabilityService
router.get("/get", getOurcapabilityServices); // Get all OurcapabilityServices
router.get("/getById", getOurcapabilityServiceById); // Get OurcapabilityService by ID
router.put("/update", upload.single("photo"), updateOurcapabilityService); // Update OurcapabilityService
router.delete("/delete", deleteOurcapabilityService); // Delete OurcapabilityService

module.exports = router;
