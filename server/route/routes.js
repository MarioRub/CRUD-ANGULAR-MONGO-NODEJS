const express = require("express");
const router = express.Router();
const task = require("../controller/task_controlller")


router.get("/",task.getTask);

router.post("/", task.setTask);

router.get('/:id',task.unTask);

router.put("/:id", task.editTask);

router.delete("/:id", task.deleteTask);

module.exports=router;