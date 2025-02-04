const multer = require('multer');
const fs = require('fs');
const path = require('path');

const ensureUploadsDir = (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };
  
// Configure storage
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadsDir = path.join(__dirname, '../uploads/videos');
      ensureUploadsDir(uploadsDir);  // Ensure the directory exists
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  });
 
// File filter to allow only video files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi', 'video/mov'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only video files are allowed.'));
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  limits: { fileSize: 1000 * 1024 * 1024 }, // 100MB limit
  fileFilter
});
const uploadVideo = upload.single('videoId');
const HomeVideo = upload.single('video')
module.exports = {uploadVideo , HomeVideo};
