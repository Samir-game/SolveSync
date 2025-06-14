const axios = require("axios");
const Student = require("../models/student.model");

const addStudent = async(req,res)=> {

    const {name,email,phoneNumber,codeforcesHandle} = req.body;

    if(!name || !email || !phoneNumber || !codeforcesHandle){
        return res.status(400).json({
            message: "Please fill all credentials"
        });
    }

    try {

        const existingStudent= await Student.findOne({codeforcesHandle});
        if(existingStudent){
            return res.status(409).json({
                message: "Student with this Codeforces handle already exists"
            });
        }
        
        const response= await axios.get(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`);

        if(response.status!==200){
            return res.status(400).json({
                message: "Invalid Codeforces handle or error fetching data"
            });
        }

        const student= response.data.result[0];
        const currentRating= student.rating || 0;
        const maxRating= student.maxRating || 0;

        const newStudent= new Student({
            name,
            email,
            phoneNumber,
            codeforcesHandle,
            currentRating,
            maxRating,
            lastSyncedAt: Date.now(),
        });

        await newStudent.save();

        return res.status(201).json({
            message: "Student added successfully",
            student: newStudent
        });

    } catch (error) {
        console.error("Error adding student:", error.message);
        return res.status(500).json({
            message: "Error fetching Codeforces data or saving student"
        });
    }
};

module.exports = {
    addStudent
};
