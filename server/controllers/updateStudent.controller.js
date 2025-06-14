const axios= require("axios");
const Student= require("../models/student.model.js");

const updateStudent= async(req,res)=> {
    const {studentId}= req.params;
    const {name,email,phoneNumber,codeforcesHandle}= req.body;

    if (!name || !email || !phoneNumber || !codeforcesHandle) {
        return res.status(400).json({
            message: "Please fill all credentials"
        });
    }

    try {
        const response= await axios.get(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`);

        if(response.status !== 200){
            return res.status(400).json({
                message: "Invalid Codeforces handle or unable to fetch data"
            });
        }

        const student= response.data.result[0];
        const currentRating= student.rating || 0;
        const maxRating= student.maxRating || 0;

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            {
                name,
                email,
                phoneNumber,
                codeforcesHandle,
                currentRating,
                maxRating,
                lastSyncedAt: Date.now()
            },
            {new:true}
        );

        if(!updatedStudent){
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent
        });

    } catch (error) {
        console.error("Error updating student:", error.message);
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        });
    }
};

module.exports = {
    updateStudent
};
