import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request & { userId?: number}, res: Response) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.userId },
  });
  res.json(projects);
};



export const createProject = async (req: Request & { userId?: number}, res: Response) => {
    const { name, type } = req.body;
    const project = await prisma.project.create({
      data: { name, type, userId: req.userId },
    });
    res.json(project);
  };