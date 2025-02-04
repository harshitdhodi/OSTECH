const express = require('express');
const router = express.Router();
const partnerController = require('../controller/partners');
const {uploadPhoto} = require('../middleware/fileUpload')
const { requireAuth } = require('../middleware/authmiddleware');


router.post('/insertpartners', requireAuth,uploadPhoto,partnerController.createPartner);
router.get('/getpartners', requireAuth,partnerController.getAllPartners);
router.get('/singlePartner',requireAuth, partnerController.getPartnerById);
router.put('/updatePartner',uploadPhoto, partnerController.updatePartner);
router.delete('/deletePartner',requireAuth, partnerController.deletePartner);
router.get('/countPartner',requireAuth, partnerController.countPartner);
router.delete('/:id/image/:imageFilename/:index',requireAuth, partnerController.deletePhotoAndAltText);
router.get('/getAllpartners', partnerController.getAllPartners);


module.exports = router;
