const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the directories for catalogue, photo, and video uploads
const catalogueDir = path.join(__dirname, '../catalogues');
const photoDir = path.join(__dirname, '../images');
const videoDir = path.join(__dirname, '../uploads/videos');

// Ensure the directories exist
const ensureDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};
ensureDirectory(catalogueDir);  
ensureDirectory(photoDir);
ensureDirectory(videoDir);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determine the directory based on the field name
        let uploadDir;
        if (file.fieldname === 'catalogue') {
            uploadDir = catalogueDir;
        } else if (file.fieldname === 'photo') { 
            uploadDir = photoDir;
         } else if (file.fieldname === 'video') {
            uploadDir = videoDir;
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        let fileName;
        if (file.fieldname === 'catalogue') {
            fileName = file.originalname;
            req.fileName = fileName; // Store the original file name in the request object
        } else if (file.fieldname === 'photo' || file.fieldname === 'video') {
            fileName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        }
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
    fileFilter: function (req, file, cb) {
        // Optional: Check file types here if needed
        const allowedMimeTypes = {
            catalogue: ['application/pdf'],
            photo: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
            video: ['video/mp4', 'video/mkv', 'video/avi', 'video/mov']
        };
        const allowedTypes = allowedMimeTypes[file.fieldname];
        if (allowedTypes && allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type for ${file.fieldname}`));
        }
    }
});

// Middleware function to handle uploads for catalogue, photo, and video
const uploadPhoto = (req, res, next) => {
    upload.fields([
        { name: 'catalogue', maxCount: 1 },
        { name: 'photo', maxCount: 5 },
        { name: 'video', maxCount: 1 }
    ])(req, res, function (err) {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        next();
    });
};




module.exports = { uploadPhoto };
