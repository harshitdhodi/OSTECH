// mission.controller.js
const Mission = require('../model/MainMission');
const path = require("path")
const fs = require("fs")
exports.getAllMissions = async (req, res) => {
    try {
        const mission = await Mission.findOne();
        res.status(200).json({ data:mission });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 

exports.updateMission = async (req, res) => {
    const updateFields = req.body;

    try {
        // Convert title and description to strings if they're provided as arrays
        if (Array.isArray(updateFields.title)) {
            updateFields.title = updateFields.title.join(' ');
        }

        if (Array.isArray(updateFields.description)) {
            updateFields.description = updateFields.description.join(' ');
        }

        const existingMission = await Mission.findOne();

        // Handle photo uploads and synchronize imgTitle and alt
        if (req.files?.photo?.length > 0) {
            const newPhotoPaths = req.files.photo.map(file => file.filename);
            
            // Add photo, imgTitle, and alt text for each new image
            updateFields.photo = existingMission 
                ? [...existingMission.photo, ...newPhotoPaths]
                : newPhotoPaths;

            const newImgTitles = newPhotoPaths.map((_, index) => `Image Title ${index + 1}`);
            updateFields.imgTitle = existingMission 
                ? [...(existingMission.imgTitle || []), ...newImgTitles]
                : newImgTitles;

            const newAltTexts = newPhotoPaths.map((_, index) => `Alt Text ${index + 1}`);
            updateFields.alt = existingMission 
                ? [...(existingMission.alt || []), ...newAltTexts]
                : newAltTexts;
        } else {
            updateFields.photo = existingMission?.photo || [];
            updateFields.imgTitle = existingMission?.imgTitle || [];
            updateFields.alt = existingMission?.alt || [];
        }

        // Update or create the mission record
        const updatedMission = await Mission.findOneAndUpdate(
            {},
            { ...updateFields, updatedAt: new Date() },
            { new: true, runValidators: true, upsert: true }
        );

        res.status(200).json(updatedMission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

  

  exports.deletePhotoAndAltText = async (req, res) => {
  
    const { imageFilename, index } = req.params;
  
    try {
      // Find the service by ID
      const mission = await Mission.findOne();
  
      if (!mission) {
        return res.status(404).json({ message: 'mission not found' });
      }
  
      // Remove the photo and its alt text
      mission.photo = mission.photo.filter(photo => photo !== imageFilename);
      mission.alt.splice(index, 1);
  
      const filePath = path.join(__dirname, '..', 'images', imageFilename);

      // Check if the file exists and delete it
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      await mission.save();
  
      res.json({ message: 'Photo and alt text deleted successfully' });
    } catch (error) {
      console.error('Error deleting photo and alt text:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
