// mission.routes.js
const express = require('express');
const router = express.Router();
const AboutcompanyController = require('../controller/aboutcompany');
const {uploadPhoto} = require('../middleware/fileUpload')
const { requireAuth } = require('../middleware/authmiddleware');

router.get('/getAboutcompany',requireAuth, AboutcompanyController.getAllAboutcompany);
router.put('/updateAboutcompany', uploadPhoto,AboutcompanyController.updateAboutcompany);
router.delete('/image/:imageFilename/:index',requireAuth,AboutcompanyController.deletePhotoAndAltText )
router.get('/getAboutData', AboutcompanyController.getAllAboutcompany);

module.exports = router;
