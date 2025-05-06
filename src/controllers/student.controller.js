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

export const fetchPaginatedStudent = async(req,res) => {
  try{
    let frontNumber = req.params.number;
    let numberToReturn = 3
    let numberToBeFetched = frontNumber*numberToReturn;
    console.log(frontNumber,numberToBeFetched)
    const students = await pool.query(`SELECT * FROM students limit ${numberToReturn} offset ${numberToBeFetched}`)
    res.status(200).json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    })
  }catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }

}

export const inserting = async(req,res) => {
  try{
    let {id,first_name,last_name,student_id,email,
      date_of_birth,
      contact_number,
      enrollment_date,
      profile_picture,
      created_at,
      updated_at} = req.body
    const students = await pool.query(`insert into students values ('${id}','${first_name}','${last_name}',
      '${student_id}','${email}','${date_of_birth}','${contact_number}','${enrollment_date}','${profile_picture}',
      '${created_at}','${updated_at}'
      )`)
    res.status(200).json({
      success: true,
    })
  }catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }

}
