const Student= require("../models/student.model.js");

const deleteStudent= async (req,res)=>{
    const {studentId}= req.params;

    try {
       const delStudent= await Student.findByIdAndDelete(studentId);

       if(!delStudent){
        return res.status(404).json({
            message:"STUDENT NOT FOUND"
        });
       }

       return res.status(200).json({
        message:"Student Deleted Successfully ",
       });
    

    } catch (error) {
        console.log("ERROR DELETING STUDENT",error.message);
        res.status(500).json({ 
            message: "INTERNAL SERVER ERROR"
        });
    }
}

module.exports={
    deleteStudent
};