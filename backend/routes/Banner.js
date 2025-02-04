const express = require('express');
const router = express.Router();
const { uploadPhoto } = require('../middleware/fileUpload');
const {insertBanner,getAllBanner, getBanner,getBannersBySection, updateBanner, deleteBanner, getBannerById,deletePhotoAndAltText,getCountBySection,countBanner} = require('../controller/Banner');
const { requireAuth } = require('../middleware/authmiddleware');
const {HomeVideo} = require('../middleware/video')

router.post("/insertBanner",uploadPhoto,insertBanner);
router.get('/getBanner',requireAuth, getBanner);
router.get('/countBanner',requireAuth, countBanner);
router.get('/getCountBySection',requireAuth, getCountBySection);
router.put('/updateBanner',uploadPhoto,updateBanner);
router.delete('/deleteBanner',requireAuth, deleteBanner);
router.get('/getBannerById',requireAuth,getBannerById);
router.delete('/image/:imageFilename/:index',requireAuth,deletePhotoAndAltText);
router.get('/getAllBanner', getAllBanner);
router.get('/getBannersBySection', getBannersBySection);
module.exports = router;     