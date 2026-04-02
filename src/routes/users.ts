import 'dotenv/config';
import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import requireAuth from '../middleware/auth';

const router = Router();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET /users — list all
router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

// GET /users/:id — get one
router.get('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// POST /users — create
router.post('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'name, email and password required' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });

    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);
  } catch (e) {
    next(e);
  }
});

// PATCH /users/:id — update
router.patch('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(user);
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE /users/:id  ← also fix: was router.patch, should be router.delete
router.delete('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
});

export default router;  // ← was module.exports = router