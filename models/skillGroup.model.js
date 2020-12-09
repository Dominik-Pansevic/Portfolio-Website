const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillGroupSchema = new mongoose.Schema({
  category: String,
  categoryIconHtml: String,
  skills: [String]
});

const skillGroup = mongoose.model('skillGroup', skillGroupSchema);

module.exports = skillGroup;
