import express from "express";
import db from "../models/index.cjs";
import verifyToken from "../middleware/verifyToken.js";
import requireRole from "../middleware/requireRole.js";
const { Task, User, Sequelize } = db;
const { Op } = Sequelize;
const router = express.Router();
const BOOK_FIELDS = ["title", "publishedDate", "available", "authorId",];

router.get("/tasks", async (req, res) => {
  const { search } = req.query;
  const where = {};
  if (search) {
    where.title = { [Op.iLike]: `%${search}%` };
  }
  const tasks = await Task.findAll({
    where,
    include: User,
    order: [["id", "ASC"]],

  });
    res.json(tasks);
});

router.get("/tasks/:id", async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
});

router.get("/users", async (req, res) => {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    res.json(users);
});

router.post("/tasks", verifyToken, async (req, res) => {
    const { title, dueDate } = req.body;
        if (!title || !dueDate) {
        return res.status(400).json({
            error: "title and dueDate are required"
        });
    }
    const task = await Task.create(req.body, { fields: BOOK_FIELDS });
    res.status(201).json(task);
});

router.put("/tasks/:id", verifyToken, async (req, res) => {
    const id = Number(req.params.id);
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    await task.update(req.body, { fields: BOOK_FIELDS });
    res.json(task);
});

router.delete("/tasks/:id", verifyToken, requireRole("admin"), async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.json({ message: "Task deleted" });
});

export default router;