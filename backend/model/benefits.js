const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const benefitsSchema = new Schema({
  photo: [{
    type: String, 
  }],
  title: {
    type: String,
    required: true
  },
  alt: [{
    type: String,
    required: true
  }],
  imgtitle:[{type:String}],
  description: {
    type: String,
    required: true
  }
});

const Benefits = mongoose.model('Benefits', benefitsSchema);

module.exports = Benefits;
