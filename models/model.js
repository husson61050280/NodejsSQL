const db = require("../database/connection");
//model 
class Model { 

  async find_hospital () {
    try {
      const sql = "SELECT h.id , h.name , count(*) as num FROM hospital as h , patient as p WHERE (h.id = p.hospital_id)  GROUP BY h.name ORDER BY h.id ";
      const response = await db.query(sql);
      return response;
    }
    catch(err) {
      console.log(err.message);
    }
  }

  async find_patient () {
    try {
      const sql = "SELECT * FROM patient";
      const response = await db.query(sql);
      return response;
    }
    catch(err) {
      console.log(err.message);
    }
  }

  async find_TopThree_hospital () {
    try {
      const sql = "SELECT h.id , h.name , count(*) as num FROM hospital as h , patient as p WHERE (h.id = p.hospital_id) AND (p.status = 'positive') GROUP BY h.name ORDER BY num DESC LIMIT 3  ";
      const response = await db.query(sql);
      console.log("Response" , response)
      return response;
    }
    catch(err) {
      console.log(err.message);
    }
  }

  async add_hospital (data_input) {
    let response = {};
    try {
      const {id , name } = data_input;
      const sql = "INSERT INTO hospital (id , name) VALUES ('" +id+"', '" +name+"')";
      //เช็คว่า INSERT ซ้ำไหม 
      const sql_checkID = "SELECT * FROM hospital WHERE (id = '"+id+"')"
      const check_id = await db.query(sql_checkID)
      if(check_id != "") {
        response = { error: "ID_EXIST", data: "" };
        return response;
      }
      const data = await db.query(sql);
      response = {error: "" , data: data}
      return response;
    }
    catch(err) {
      console.log(err.message);
    }
  }

  async add_patient (data_input) {
    let response = {};
    try {
      const { id, firstname, lastname, age ,status , hospital_id } = data_input;
      const sql = "INSERT INTO patient (id , firstname , lastname , age , status , hospital_id) VALUES ('" +id+"', '" +firstname+"' , '" +lastname+"' , '" +age+"', '" +status+"', '" +hospital_id+"')";
      const sql_checkID = "SELECT * FROM patient WHERE (id = '"+id+"')"
      const check_id = await db.query(sql_checkID)
      if(check_id != "") {
        response = { error: "ID_EXIST", data: "" };
        return response;
      }
      const data = await db.query(sql);
      response = {error: "" , data: data}
      return response;
    }
    catch(err) {
      console.log(err.message);
    }
  
  }

}
module.exports = Model;