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
    const frontNumber = Number.parseInt(req.params.number);
    const numberToReturn = 20;
    let numberToBeFetched = frontNumber*numberToReturn;
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

    const students = await pool.query(`INSERT INTO students (first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date)VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING*`,
      [first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date]);
    res.status(200).json({
      success: true,
      count: students.rows,
      data: students.rows,
    });
  }catch(err){
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in POST/INSERT, ${err?.message}`,
    });
  }
}
  


    export const deleteAnyStudent = async(req,res)=>{
      const id = req.params.id;
      try{
        const getStudent = await pool.query('SELECT *  FROM students where id = $1',[id]);

       
    
        if(getStudent.rows.length > 0){

          const student = await pool.query('DELETE FROM students where id = $1',[id])
          
        res.status(200).json({
          success:true,
          count:student.rows.length,
          data:student.rows
        });
        
    
        }
    
         res.status(400).json({
          success:false,
          message:"student not found"
  
        })
    
      }
    
    
      catch(error){
        logger.error(error.message)
        res.status(500).json({
          success:false,
          message:`Unexpected error occured on DELETE/STUDENT,${error?.message}`
        })
    
      }
    }
    

export const getstudentbyID = async (req, res) => {
 
  try {

    const id = req.params.id
    const students = await pool.query("SELECT * FROM students where id = $1 ", [id]);
    res.status(200).json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    })
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

 if(id){ getsql +='  AND id = $ ' +(params.length + 1); params.push(id);}
 
 // lets find with first_name this below process to do it

 if(first_name)
  {
     getsql +='  AND  first_name  ILIKE $' +(params.length + 1);

     // beacause of case sensitive

     params.push(`%${first_name}%`);}

 // lets find with last_name this below process to do it    

 if(last_name)
  {
     getsql +=' AND  last_name  ILIKE $ ' +(params.length + 1);

     // beacause of case sensitive
     
     params.push(`%${last_name}%`);}

  try {
    const result = await pool.query(getsql,params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Database error' });
  }
}

// this about update process below

export const updateStudent = async(req,res)=>{                                                                          

  const id = req.params.id;

  const {first_name,last_name,student_id,email,date_of_birth,contact_number,enrollment_date,
    profile_picture}=req.body;

    
  try{

    const checkstudent= await pool.query(
      `SELECT * FROM students WHERE(student_id=$1 OR contact_number=$2 OR email=$3) AND id=$4`,[student_id,contact_number,email,id]
    )
    if(checkstudent.rows.length > 0){
      return res.status(409).json({message:"Email,student number,id or student_id allready exist"})
    }

   const result= await pool.query(`UPDATE students SET first_name='${first_name}',
    last_name = '${last_name}',student_id ='${student_id}',email='${email}',
    date_of_birth='${date_of_birth}',contact_number='${contact_number}',
    enrollment_date='${enrollment_date}',profile_picture='${profile_picture}'
     WHERE id=${id} `);
    
    return res.json({
      success: true,
      data: result.rows,
    })

     }catch(err){
      console.error(err.message);

      res.status(500).send({
      success: false,
      message: `An unexpected error occurred in UPDATE/STUDENTS, ${err?.message}`});
  

      }
    }  