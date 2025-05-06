/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger } from "../utils/index.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM students");
    res.status(200).json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }
};
export const updateStudent =async(req,res)=>{                                                                          

  const id = req.params.id;
console.log(id)
  const {first_name,last_name,student_id,email,date_of_birth,contact_number,enrollment_date,profile_picture,created_at,updated_at}=req.body;

  try{

    const result= await pool.query(`UPDATE students SET first_name='${first_name}',last_name = '${last_name}',student_id ='${student_id}',email='${email}',date_of_birth='${date_of_birth}',contact_number='${contact_number}',enrollment_date='${enrollment_date}',profile_picture='${profile_picture}',created_at='${created_at}',updated_at='${updated_at}' WHERE id=${id} `);
    
    

     }catch(error){
      console.error(err.message);

      res.status(500).send({
      success: false,
      message: `An unexpected error occurred in UPDATE/STUDENTS, ${err?.message}`});
  

      }
    }      
