const {addStudent}= require("../controllers/addStudent.controller.js");
const {deleteStudent}= require("../controllers/deleteStudent.controller.js");
const {getAllStudentsInfo}= require("../controllers/getAllStudentsInfo.controller.js");
const {updateStudent}= require("../controllers/updateStudent.controller.js")
const express=require('express');
const router=express.Router();

router.route("/students").get(getAllStudentsInfo);
router.route("/addStudent").post(addStudent);
router.route("/deleteStudent/:studentId").delete(deleteStudent);
router.route("/updateStudent/:studentId").patch(updateStudent);


module.exports=router;