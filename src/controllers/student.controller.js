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



export const getUserById = async (req, res) => {
  const { id, first_name, last_name } = req.query;

  let getsql = 'SELECT * FROM students WHERE 1 = 1';
  const params = [];

// lets find with id this below process to do it
 if(id){ getsql += 'AND id = $' +(params.length + 1); params.push(id);}
 
 // lets find with first_name this below process to do it
 if(first_name)
  {
     getsql += 'AND first_name  ILIKE $' +(params.length + 1);
     // beacause of case sensitive
     params.push(`%${first_name}%`);}

 // lets find with last_name this below process to do it    
 if(last_name)
  {
     getsql += 'AND last_name  ILIKE $' +(params.length + 1);
     // beacause of case sensitive
     params.push(`%${last_name}%`);}

  try {
    const result = await pool.query(getsql,params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

