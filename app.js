const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [{
      "id": 1,
      "title": "Set up environment",
      "description": "Install Node.js, npm, and git",
      "completed": true
    },
    {
      "id": 2,
      "title": "Create a new project",
      "description": "Create a new project using the Express application generator",
      "completed": true
    }]

let nextId = 3;


//get all tasks
app.get("/tasks",(req,res)=>{
    res.send(tasks);
})

//get task with given id
app.get("/tasks/:id", (req,res)=>{
    const id = req.params.id;
    const task = tasks.find((task)=> task.id === parseInt(id));
    if(!task){
        return res.status(404).json({error: "The task with the given id is not present"})
    }
    res.send(task);
})

// Create a task
app.post("/tasks", (req,res)=>{
    const task = req.body;
    if(!task.title || typeof task.completed !== "boolean") return res.status(400).json({ error: "Invalid task data" });
    task.id = nextId++;
    tasks.push(task);
    res.status(201).json(task);
})

// Update a task changing complete body.
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "The task with the given id is not present" });
  }

  const { title, description, completed } = req.body;

  // === SAFE VALIDATION: Only validate if field is provided ===
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "Title must be a non-empty string" });
    }
    task.title = title;
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      return res.status(400).json({ error: "Description must be a string" });
    }
    task.description = description;
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Completed must be a boolean" });
    }
    task.completed = completed;
  }

  // === FINAL: Ensure title is always valid (required field) ===
  if (!task.title || task.title.trim() === "") {
    return res.status(400).json({ error: "Title is required and cannot be empty" });
  }

  res.json(task);
});

//delete a task with a given id
app.delete("/tasks/:id", (req,res)=>{
    const id = req.params.id;
    const task = tasks.find((task)=>task.id === parseInt(id));
    if(!task){
        return res.status(404).json({error: "The task with the given id is not present"})

    }
    const index = tasks.indexOf(task);
    tasks.splice(index,1);
    res.send(task);
})


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});




module.exports = app;
