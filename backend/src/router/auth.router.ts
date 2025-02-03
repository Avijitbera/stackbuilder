import express, { Request, Response } from 'express'
import {PrismaClient} from '@prisma/client'
import { generateToken } from '../utils/jwt'
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient()
const authRouter = express.Router()


authRouter.post("/register", async (req: Request, res: Response):Promise<any> => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name:name },
      });
     return res.json({ message: 'User registered successfully', success:true });
    } catch (error) {
      return res.status(400).json({ message: 'User already exists', error:true });
    }
})

authRouter.post("/login", async (req: Request, res: Response):Promise<any> => {
    const { email, password } = req.body;
  
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    const token = generateToken(user.id);
    return res.json({ token, success:true });
})

export default authRouter