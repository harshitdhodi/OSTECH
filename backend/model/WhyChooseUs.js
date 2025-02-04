const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const whyChooseUsSchema = new Schema({
  photo: [{
    type: String, 
  }],
  title: {
    type: String,
    
  },
  alt: [{
    type: String,
    
  }],
  imgTitle: [{
    type: String,
         
  }],
  description: {
    type: String,
    
  }
});

const WhyChooseUS = mongoose.model('WhyChooseUs', whyChooseUsSchema);

module.exports = WhyChooseUS;
