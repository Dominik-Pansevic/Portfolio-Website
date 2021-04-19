//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require('fs');

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended:true
}));

const emailBeginningTemplate = "A new message has been left on your portfolio website! <br> <br> <b>Email From:</b> ";


//Connect to database
mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.set("useCreateIndex", true);


const skillGroup = require('./models/skillGroup.model');
const project = require('./models/project.model');
const email = require("./email");
const { Console } = require('console');


const ImageSchema = mongoose.Schema({
    type: String,
    data: Buffer
});

const Image = mongoose.model('projectImage', ImageSchema);

let emailMessage = "";

// GET _____________________________

app.get("/", function(req, res) {

    skillGroup.find({}, function(err, groupsFound) {
        if(err){
            console.log(err);
        } else {   
            project.find({}, function(err, projectsFound) {
                if(err){
                    console.log(err);
                } else {
                     res.render("index", {allGroups: groupsFound, allProjects: projectsFound, emailMessage: emailMessage});
                     emailMessage = "";
                }
            });
            
        }
    });


  });

  app.get("/projects", function(req, res) {

    project.find({}, function(err, projectsFound) {
        if(err){
            console.log(err);
        } else {
             res.render("projects", {allProjects: projectsFound});
        }
    });
             
  });

// POST ____________________________

app.post("/", function(req, res) {
    const emailText = emailBeginningTemplate + req.body.email + "<br> <b>Name:</b> " + req.body.name + "<br> <b>Message:</b> " + req.body.messageLeft;
    try{
        email(process.env.TO_EMAIL, emailText);
        emailMessage = "Your message has been sent successfully!"
    } catch(err) {
        Console.log(err);
        emailMessage = "Something went wrong. Please try again later."
    }
    res.redirect("/#Contact");
  });



  app.get("/", function(req, res) {

    skillGroup.find({}, function(err, groupsFound) {
        if(err){
            console.log(err);
        } else {   
            project.find({}, function(err, projectsFound) {
                if(err){
                    console.log(err);
                } else {
                     res.render("index", {allGroups: groupsFound, allProjects: projectsFound, emailMessage: emailMessage});
                     emailMessage = "";
                }
            });
            
        }
    });


  });

  app.get("/ding", function(req, res) {
      res.send("Dong");
  });
  
// Server start _____________________________
app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  });