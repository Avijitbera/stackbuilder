import express, {  Request, Response} from "express";


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


router.post("/update", authenticate, async(req:RequestType, res:Response):Promise<any> =>{
    const { projectId, data } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const project = await prisma.project.update({
        where: { id: projectId, userId: req.userId }, // Ensure the user owns the project
        data: { data },
      });
  
      return res.json({ message: "Project updated successfully", project });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update project", error });
    }
});
router.get("/get", authenticate, async(req:RequestType, res:Response):Promise<any> =>{
    const { projectId } = req.query;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId), userId: req.userId }, // Ensure the user owns the project
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json({ project });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch project", error });
  }
});


export default router
