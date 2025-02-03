import express, {  Request, Response} from "express";

import { createProject, updateProject, getProject } from "../controller/project.controller";
import { authenticate } from "../middleware/auth";
import { RequestType } from "../RequestType";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const router = express.Router();

router.post("/create", authenticate, async (req:RequestType, res: Response):Promise<any> =>{
    const { name } = req.body;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const project = await prisma.project.create({
      data: { userId: req.userId, name, data: "[]" }, // Start with an empty project structure
    });

    return res.json({ message: "Project created successfully", project });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create project", error });
  }
});
router.post("/update", authenticate, updateProject);
router.get("/get", authenticate, getProject);


export default router
