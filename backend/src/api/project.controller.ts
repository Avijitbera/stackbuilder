import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request & { userId?: number}, res: Response) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.userId },
  });
  res.json(projects);
};



export const createProject = async (req: Request & { userId?: number }, res: Response) => {
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
};

export const updateProject = async (req: Request & { userId?: number }, res: Response) => {
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
};

export const getProject = async (req: Request & { userId?: number }, res: Response) => {
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
};