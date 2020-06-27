const TsCtr = {};
const connect = require('../model/task');

TsCtr.getTask = async(req,res) =>{
    const task = await connect.find();
    res.json(task);
}

TsCtr.setTask = async(req,res) => {
    const task = new connect(req.body);
    await task.save();
    res.json("Succesful");
}

TsCtr.unTask = async(req,res) => {
    const task = await connect.findById(req.params.id);
    res.json(task);
}

TsCtr.editTask = async(req,res) => {
    const new_task = {
        descripcion:req.body.descripcion
    }
    await connect.findByIdAndUpdate(req.params.id,{$set: new_task}, {new:true});
    res.json("Task Updated");
}

TsCtr.deleteTask = async(req,res) => {
    await connect.findByIdAndRemove(req.params.id);
        res.json("Task Deleted")
}

module.exports=TsCtr;