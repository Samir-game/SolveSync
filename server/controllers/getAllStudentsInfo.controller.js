const Student= require("../models/student.model.js");

const getAllStudentsInfo = async(req,res)=> {
    try {
        const allstudents =await Student.find({});
        return res.status(200).json({
            students: allstudents,
        });

    } catch (error) {
        console.error("ERROR FETCHING STUDENTS DATA:", error.message);
        return res.status(500).json({
            error: "INTERNAL SERVER ERROR",
        });
    }
};

module.exports = {
    getAllStudentsInfo,
};
