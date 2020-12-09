const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,  
  features: [String],
  technologies: String,
  demoLink: String,
  codeLink: String,
  inProgress: Boolean
  
});

const project = mongoose.model('project', projectSchema);

module.exports = project;