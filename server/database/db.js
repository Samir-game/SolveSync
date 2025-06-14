const mongoose= require("mongoose");

const connectionDB= async()=>{
    try {
        const result= await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("CONNECTION SUCCESSFULL",result.connection.host);
        
    } catch (error) {
        console.log("ERROR CONNECTING TO DATABASE!!",error.message);
        process.exit(1);
    }
}

module.exports={
    connectionDB
}