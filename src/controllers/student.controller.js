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
    let numberToReturn = 5
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
