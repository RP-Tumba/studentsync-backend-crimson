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

// my insertion trial ===============================================

export const InsertStudents = async (req, res) => {

  const {id, first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date,profile_picture}=req.body;
  try {
    const students = pool.query(`INSERT INTO students (id,first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date, profile_picture)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [id,first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date]);
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
