const Partner = require('../model/partners');
const path=require('path')
const fs=require('fs')

// Create a new partner
exports.createPartner = async (req, res) => {
  try {
    const { partnerName, url,alt, status ,imgtitle } = req.body;
    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];
    const newPartner = new Partner({
      partnerName,
      photo,
      url,
      alt,
      status,
      imgtitle
    });

    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

// Get all partners
exports.getAllPartners = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 5; // Number of records per page
    let partners, count;

    if (page) {
      count = await Partner.countDocuments();
      partners = await Partner.find()
        .skip((page - 1) * limit) // Skip records for previous pages
        .limit(limit);

      res.status(200).json({
        data: partners,
        total: count,
        currentPage: parseInt(page, 10),
        hasNextPage: count > page * limit,
      });
    } else {
      partners = await Partner.find(); // Fetch all records
      res.status(200).json({
        data: partners,
        total: partners.length,
        message: "All partners retrieved",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single partner by ID
exports.getPartnerById = async (req, res) => {
  try {
  
    const { id } = req.query;
    const partner = await Partner.findById(id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updatePartner = async (req, res) => {
  const { id } = req.query;
  const updateFields = { ...req.body }; // Copy the request body

  try {
    const existingPartner = await Partner.findById(id);

    if (!existingPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Handle photo upload (replace old photo)
    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPath = req.files['photo'][0].filename; // Take the first file only
      updateFields.photo = [newPhotoPath]; // Replace the photo array with the new photo
    } else {
      updateFields.photo = existingPartner.photo; // Retain the existing photo if none is uploaded
    }

    // Handle imgTitle (replace old imgTitle)
    if (req.body.imgtitle) {
      updateFields.imgtitle = req.body.imgtitle; // Directly replace imgtitle
    } else {
      updateFields.imgtitle = existingPartner.imgtitle; // Retain the existing imgtitle if not provided
    }

    // Handle alt (replace old alt)
    if (req.body.alt) {
      updateFields.alt = req.body.alt; // Directly replace alt
    } else {
      updateFields.alt = existingPartner.alt; // Retain the existing alt if not provided
    }

    // Update the partner document
    const updatedPartner = await Partner.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};







// Delete a partner by ID
exports.deletePartner = async (req, res) => {
  try {
    const { id } = req.query;

    const partner = await Partner.findById(id); 
    
    partner.photo.forEach(filename => {
      const filePath = path.join(__dirname, '../images', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file synchronously if it exists
      } else {
        console.warn(`File not found: ${filename}`);
      }
    });

    const deletedPartner = await Partner.findByIdAndDelete(id);
    if (!deletedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.countPartner = async (req, res) => {
    try {
      const count = await Partner.countDocuments();
      res.status(200).json({ total: count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error counting services' });
    }
  };
  
  exports.deletePhotoAndAltText = async (req, res) => {
  
    const { id, imageFilename, index } = req.params;
   
  
    try {
      // Find the service by ID
      const partner = await Partner.findById(id);
  
      if (!partner) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Remove the photo and its alt text
      partner.photo = partner.photo.filter(photo => photo !== imageFilename);
      partner.alt.splice(index, 1);
  
      await partner.save();

      const filePath = path.join(__dirname, '..', 'images', imageFilename);

        // Check if the file exists and delete it
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
  
      res.json({ message: 'Photo and alt text deleted successfully' });
    } catch (error) {
      console.error('Error deleting photo and alt text:', error);
      res.status(500).json({ message: error.message });
    }
  };
