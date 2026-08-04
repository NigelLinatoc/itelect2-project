import express from "express";
import {tasks} from "../src/utils.js";
import {fetchSampleUsers} from "../src/api.js";

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

export default router;