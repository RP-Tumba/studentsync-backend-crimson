/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";

import { fetchPaginatedStudent } from "../controllers/student.controller.js";
import { getAllStudents, InsertStudents } from "../controllers/student.controller.js";
import { getUserById } from "../controllers/student.controller.js";
import { getstudentbyID } from "../controllers/student.controller.js";
import { deleteAnyStudent } from "../controllers/student.controller.js";
import { updateStudent } from "../controllers/student.controller.js";
import { getAllStudents } from "../controllers/student.controller.js";


const router = express.Router();

router.get("/", getAllStudents);
router.get("/page/:number",fetchPaginatedStudent);
router.post("/Insert-Student", InsertStudents);
router.get("/specificid/:id", getstudentbyID);
router.get("/:d", getUserById);
router.put("/:id", updateStudent);

export default router;
