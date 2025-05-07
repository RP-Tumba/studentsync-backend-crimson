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



export const InsertStudents = async (req, res) => {

  const {first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date}=req.body;
  try {
    
    const exist = await pool.query(`SELECT * FROM students  WHERE student_id = $1 or email=$2 or contact_number=$3`,[student_id, email, contact_number]);

    if(exist.rows.length>0){
       
       return res.status(409).json({
        success:false,
        message: `Student with this StudentID:${student_id} , Email:${email} && Phone_Number${contact_number} already Exist.`
       });
    }

    const students = pool.query(`INSERT INTO students (first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date)VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date]);
    res.status(200).json({
      success: true,
      count: students.rows,
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
