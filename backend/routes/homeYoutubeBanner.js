const express = require('express');
const router = express.Router();
const { createContent, getAllContent, getContentById, updateContent, deleteContent } = require('../controller/homeYoutubeBanner');
const {uploadImage} = require('../middleware/imageUpload')
// Routes
router.post('/create', uploadImage, createContent);
router.get('/getAll', getAllContent);
router.get('/getById', getContentById);
router.put('/update', uploadImage, updateContent);
router.delete('/delete', deleteContent);

module.exports = router;
