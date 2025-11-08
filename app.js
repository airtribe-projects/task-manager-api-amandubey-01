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
app.put("/tasks/:id", (req,res)=>{
    const id = req.params.id;
    const task = tasks.find((task)=>task.id === parseInt(id));
    if(!task){
        return res.status(404).json({error: "The task with the given id is not present"})
    }
    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;
    if(!task.title || typeof task.completed !== "boolean") return res.status(400).json({ error: "Invalid task data" });
    res.send(task);
})

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