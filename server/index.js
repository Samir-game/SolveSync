const dotenv= require("dotenv")
const {connectionDB}= require("./database/db.js");
const app= require("./app.js");

dotenv.config({
    path:"./.env"
})

const PORT= process.env.PORT || 3001;


connectionDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("SERVER started at PORT: ",PORT)
    })
})
.catch((error)=>{
    console.log("CONNECTION FAILED",error.message)
})