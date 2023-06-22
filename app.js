const express = require("express");
require("./src/db/conn");
const path = require("path");
const hbs = require("hbs");
const Reg = require("./src/models/regSchema");
const Contact = require("./src/models/contactSchema");
const { json } = require("express/lib/response");
const fs = require("fs");

// App setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 80;

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));

const template_path = path.join(__dirname, "./templates/views");
app.set("views", template_path);

const partials_path = path.join(__dirname, "./templates/partials");
hbs.registerPartials(partials_path);

hbs.registerHelper("inc", function(value, options){
      return parseInt(value) + 1;
});

app.set("view engine", "hbs");

app.use(express.static("./templates/views/images"));

app.get("/", async (req, res) => {
  try {
    var count = await Reg.find().countDocuments();

    var variable2 = await Reg.find();

    variable2.sort((ob1,ob2)=> (ob1.likes>ob2.likes)? -1 : 1);

    res.render("index", { apidata: variable2, count: count });
    
  } catch (error) {
    console.log("prblom catch" + error);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/regform", (req, res) => {
  res.render("regform");
});

app.post("/reg", async (req, res) => {
  try {
    const regNewEmp = new Reg({
      fname: req.body.fname,
      lname: req.body.lname,
      PhoneNumber: req.body.PhoneNumber,
      City: req.body.City,
      Area: req.body.Area,
      AreaPin: req.body.AreaPin,
      WashingMachine: req.body.WashingMachine,
      AirConditioner: req.body.AirConditioner,
      Refrigerator: req.body.Refrigerator,
      InductionStove: req.body.InductionStove,
      VacuumCleaner: req.body.VacuumCleaner,
      Camera: req.body.Camera,
      MicrowaveOven: req.body.MicrowaveOven,
      WaterPurifier: req.body.WaterPurifier,
      Television: req.body.Television,
      MixerGrinder: req.body.MixerGrinder,
      Generator: req.body.Generator,
      CeilingFan: req.body.CeilingFan,
      WaterHeater: req.body.WaterHeater,
      Dryer: req.body.Dryer,
    });

    const regData = await regNewEmp.save();

    res.render("thanks");
  } catch (e) {
    console.log("error from app.post(/reg , async(req , res)" + e);
    res.send(e);
  }
});

app.post("/contact", async (req, res) => {
  try {
    const regComplaint = new Contact({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      ServicemanId: req.body.ServicemanId,
      Complaint: req.body.Complaint,
    });

    const regData = await regComplaint.save();

    res.status(201).redirect("/");
  } catch (e) {
    console.log("error from contact " + e);
  }
});

app.post('/likes', (req,res)=>{
  if (req.body.clicked){
    likes = --req.body.likes;
  }
  else{
    likes = ++req.body.likes;
  }
  Reg.updateOne({_id: req.body.id}, {likes: likes}, (err, result)=>{
    if(err){
      res.sendStatus(err);
    }
    else{
      res.sendStatus(200);
    }
  });
});

app.get("*", (req, res) => {
  res.status(404).render("404");
});
app.post("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`at port ${port}`);
});
