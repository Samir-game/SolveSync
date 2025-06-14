const express= require("express");
const studentRouter= require("./routes/student.route");

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/user/",studentRouter);

module.exports= app;