const express = require('express');
const router = express.Router();
const { createInquiry, getCountsAndData, deleteInquiry } = require('../controller/productInquiry');

router.post('/createproductinquiries', createInquiry);
router.get('/getproductinquiries', getCountsAndData);
router.delete('/deleteinquiries', deleteInquiry);

module.exports = router;
 