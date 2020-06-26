const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tasks",{useNewUrlParser:true})
.then(db=>console.log("Connection Sucessful"))
.catch(err=>console.error);

module.exports=mongoose;