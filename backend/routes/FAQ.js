const express = require('express');
const router = express.Router();
const {insertFAQ ,getAllFAQ, getFAQ, updateFAQ ,deleteFAQ, getFAQById ,countFaq} = require('../controller/FAQ')
const { requireAuth } = require('../middleware/authmiddleware');
const {uploadPhoto} = require('../middleware/fileUpload')


router.post('/insertFAQ',requireAuth,uploadPhoto,insertFAQ);
router.get('/getFaq',requireAuth, getFAQ);
router.put('/updateFaq',requireAuth, uploadPhoto,updateFAQ);
router.delete('/deleteFAQ' ,requireAuth, deleteFAQ)
router.get('/getFAQById',requireAuth,getFAQById);
router.get('/countFaq',requireAuth,countFaq);
router.get('/getAllFAQ', getAllFAQ);
module.exports = router;