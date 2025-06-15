const {addStudent}= require("../controllers/addStudent.controller.js");
const {deleteStudent}= require("../controllers/deleteStudent.controller.js");
const {getAllStudentsInfo}= require("../controllers/getAllStudentsInfo.controller.js");
const {updateStudent}= require("../controllers/updateStudent.controller.js");

const {problemSolvingData}= require("../controllers/problemSolvingData.controller.js")
const express=require('express');
const router=express.Router();

router.route("/").get(getAllStudentsInfo);
router.route("/addStudent").post(addStudent);
router.route("/deleteStudent/:studentId").delete(deleteStudent);
router.route("/updateStudent/:studentId").patch(updateStudent);
router.route("/detailed-profile").get(problemSolvingData);



module.exports=router;