import express from "express";
import {tasks} from "../src/utils.js";
import {fetchSampleUsers} from "../src/api.js";
import {mergeTaskUpdate, validateTask} from "../src/utils.js";
const router = express.Router();

router.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

router.get("/tasks/:id", (req, res) => {
    console.log(req.params.id); 
    console.log(req.query.sort); 
    console.log(req.body); 
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].id.toString() === req.params.id) {
            return res.status(200).json(tasks[i]);
        }
    }
    res.status(404).json({ message: "Task not found" });
});


router.get("/users", async (req, res) => {
    const users = await fetchSampleUsers();
    res.status(200).json(users);
});

let nextId = 4;
router.post("/tasks", (req, res) => {
if (!validateTask(req.body)) {
return res.status(400).json({ error: "title and due date required" });
}
const task = { id: nextId++, ...req.body };
tasks.push(task);
res.status(201).json(task);
});

router.put("/tasks/:id", (req, res) => {
const id = Number(req.params.id);
const index = tasks.findIndex((t) => t.id === id);
if (index === -1) {
return res.status(404).json({ error: "Task not found" });
}
tasks[index] = mergeTaskUpdate(tasks[index], req.body);
res.status(200).json(tasks[index]);
});

router.delete("/tasks/:id", (req, res) => {
const id = Number(req.params.id);
const index = tasks.findIndex((t) => t.id === id);
if (index === -1) {
return res.status(404).json({ error: "Task not found" });
}
const [removed] = tasks.splice(index, 1);
res.status(200).json({ message: "Deleted", task: removed });
});

export default router;