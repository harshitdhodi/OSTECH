const express = require('express');
const router = express.Router();
const path = require('path')
const { requireAuth } = require('../middleware/authmiddleware');
const fs = require("fs")
const Banner = require('../model/banner');
const sharp = require('sharp');
const { LRUCache } = require('lru-cache');

// Initialize LRU cache with strict limits
const imageCache = new LRUCache({
  max: 20, // Maximum number of items
  maxSize: 100 * 1024 * 1024, // Maximum cache size (100MB)
  sizeCalculation: (value, key) => {
    // Calculate size in bytes
    return value.data.length;
  },
  ttl: 1000 * 60 * 60, // 1 hour TTL
  updateAgeOnGet: true, // Update item "freshness" on access
  dispose: (value, key) => {
    // Optional: Log when items are removed from cache
    console.log(`Cache item removed: ${key}`);
  }
});

// Add cache monitoring
setInterval(() => {
  const stats = {
    itemCount: imageCache.size,
    cacheSize: Array.from(imageCache.entries())
      .reduce((size, [key, value]) => size + value.data.length, 0) / (1024 * 1024),
    hits: imageCache.hits,
    misses: imageCache.misses
  };
  
  console.log('Cache Stats:', stats);
}, 5 * 60 * 1000); // Log every 5 minutes

router.get('/download/:filename', async (req, res) => {
    const { filename } = req.params;
    const cacheKey = `image_${filename}`;
    
    try {
        // Try to get from cache
        const cachedImage = imageCache.get(cacheKey);
        if (cachedImage) {
            res.setHeader('Content-Type', cachedImage.contentType);
            res.setHeader('Cache-Control', 'public, max-age=3600');
            return res.send(cachedImage.data);
        }

        const filePath = path.join(__dirname, '../uploads', filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Read file and optimize if it's an image
        let fileData = fs.readFileSync(filePath);
        const contentType = getContentType(filename);

        // Optimize images before caching
        if (contentType.startsWith('image/')) {
            fileData = await sharp(fileData)
                .resize(1920, null, { 
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg({ quality: 80 })
                .toBuffer();
        }

        // Only cache if the file size is reasonable (e.g., < 5MB)
        if (fileData.length < 5 * 1024 * 1024) {
            imageCache.set(cacheKey, {
                data: fileData,
                contentType
            });
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.send(fileData);

    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ message: 'File download failed' });
    }
});

const getContentType = (filename) => {
    const ext = path.extname(filename).toLowerCase();
    const contentTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    };
    return contentTypes[ext] || 'application/octet-stream';
};

router.get('/play/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads/videos', filename);
 
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Video file not found' });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        // Parse Range
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize) {
            return res.status(416).send('Requested range not satisfiable');
        }

        const chunkSize = end - start + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4', // Change this to the appropriate MIME type if different
        });

        fileStream.pipe(res);
    } else {
        // If no range, send the whole video
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4', // Change this to the appropriate MIME type if different
        });

        fs.createReadStream(filePath).pipe(res);
    }
});

const VIDEO_DIRECTORY = path.join(__dirname, '../uploads/videos');


router.get('/video/:filename', async (req, res) => {
    const { filename } = req.params;
    const { section } = req.query;
  
    try {
      if (section) {
        // If section is provided, fetch related banners
        const banners = await Banner.find({ section });
        return res.json({ banners });
      }
  
      // Handle video streaming
      const filePath = path.join(VIDEO_DIRECTORY, filename);
  
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Video file not found' });
      }
  
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;
  
      if (range) {
        // Parse Range
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  
        if (start >= fileSize || end >= fileSize) {
          return res.status(416).send('Requested range not satisfiable');
        }
  
        const chunkSize = end - start + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });
  
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'video/mp4',
        });
  
        fileStream.pipe(res);
      } else {
        // If no range, send the whole video
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        });
  
        fs.createReadStream(filePath).pipe(res);
      }
    } catch (error) {
      console.error('Error handling request:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;