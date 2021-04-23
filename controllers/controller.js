const Model = require('../models/model');
//initialize Class 
const model = new Model();

class Controller {
    async homePage (req,res) {
        const hospital = await model.find_hospital();
        const patient = await model.find_patient();
        const hospital_Top = await model.find_TopThree_hospital();
        res.render("index.ejs" , {hospitals:hospital, patients:patient , hospital_Top:hospital_Top});
    }
    async addPatient_Page(req,res) {
        const hospital = await model.find_hospital();
        res.render("add_patient.ejs" , {message:"" ,hospitals:hospital});
    }
    addhospital_Page(req,res) {
        res.render("add_hospital.ejs" , {message:""});
    }
    async addHospital(req,res) {
        try {
            const {id , name } = req.body;
            if (id == "" || name == "" ) { throw "INPUT_ERROR" }
            const {error , data} = await model.add_hospital(req.body);
            if(error) throw error;
            res.status(200).redirect("/"); 
        }catch(err) {
            if(err == "INPUT_ERROR"){ res.status(401).render("add_hospital.ejs" , {message:"Please fill all input."});}
            else if (err == "ID_EXIST") { res.status(401).render("add_hospital.ejs" , {message:"ID already used."});}
        }
  
    }
    async addPatient(req,res) {
        try {
            const {id ,firstname , lastname , age , status} = req.body;
            if (id == "" || firstname == "" || lastname == "" || age == "" || status == "") { throw "INPUT_ERROR" }
            const {error , data } = await model.add_patient(req.body);
            if(error) throw error;
            res.status(200).redirect("/");

        }catch(err) {
            const hospital = await model.find_hospital();
            if(err == "INPUT_ERROR"){ res.status(401).render("add_patient.ejs" , {message:"Please fill all input."});}
            else if (err == "ID_EXIST") { res.status(401).render("add_patient.ejs" , {message:"ID already used." , hospitals:hospital });}
        }
        
    }
}
module.exports = Controller