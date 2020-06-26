const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
    
    descripcion:String,

});

module.exports = mongoose.model("TaskCol", TaskSchema);