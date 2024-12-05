import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const router = Router();

// Get all users
router.get("/", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

// Create a new user
router.post("/", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create(req.body);
  const savedUser = await userRepository.save(newUser);
  res.status(201).json(savedUser);
});

export default router;
