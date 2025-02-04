const express = require('express');
const router = express.Router();
const videoController = require('../controller/video');
const {uploadVideo} = require('../middleware/video')
// Create a new video
router.post('/addvideo',uploadVideo, videoController.createVideo);
 
// Get all videos
router.get('/getvideo', videoController.getVideos);

// Get video by videoId
router.get('/getVideoById', videoController.getVideoById);

router.put('/editVideo',uploadVideo, videoController.updateVideo);

// Delete a video by videoId
router.delete('/deleteVideo', videoController.deleteVideo);


router.get('/getLatestOne', videoController.getLatestVideoWithId);
router.get('/getLatestYoutubeId', videoController.getLatestYoutubeId);
router.get('/getLatestTwoVideos', videoController.getLatestTwoVideos);
module.exports = router;
