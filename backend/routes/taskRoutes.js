const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// @route POST/api/tasks/create-task
// @desc Create a new task
// @access Public

router.post("/create-task",  async (req, res) => {
  const { title, description} = req.body;
  try {
    const task = new Task({
      title,
      description
    });
    const saveTask = await task.save();
    return res.status(201).json(saveTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route GET/api/tasks/get-tasks
// @desc Get all tasks in the database
// @access Public

router.get("/get-tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Error" });
  }
});

// @route PUT/api/tasks/update-task/:id
// @desc Update task
// @access Public

router.put("/update-task/:id", async (req, res) => {
  const {id } = req.params;
  const {title,description}=req.body
  try {
    const updateTask = await Task.findById({ _id: id });
    if (updateTask) {
      if (title !== undefined) {
        updateTask.title = title;
      }
      if (description !== undefined) {
        updateTask.description = description;
      }
      await updateTask.save();
      return res.status(200).json({ message: "Success" });
    } else {
      console.log("No task found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Error" });

  }
});

// @route DELETE/api/tasks/delete-task/:id
// @description Delete a task
// @access Public

router.delete('/delete-task/:id',async (req,res)=>{
  const {id}=req.params 
  try {
    const deleteTask=await Task.findById({_id:id})
    await Task.deleteOne(deleteTask)
    return res.status(200).json({message:"Task deleted Successfully"})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
})

module.exports = router;
