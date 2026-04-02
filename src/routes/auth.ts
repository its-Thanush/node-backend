import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import requireAuth from '../middleware/auth';
import prisma from '../lib/prisma';          

const router = Router();

// TypeScript handler signature — explicit types on req, res, next
router.post('/register', async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = registerSchema.parse(req.body);
    const hashed = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: { name: body.name, email: body.email, password: hashed }
    });
    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);
  } catch (e) { next(e); }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) { res.status(401).json({ error: 'Invalid credentials' }); return; }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) { res.status(401).json({ error: 'Invalid credentials' }); return; }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (e) { next(e); }
});

router.get('/me', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },  // ! = "I know this exists" (after requireAuth)
      select: { id: true, name: true, email: true, createdAt: true }
    });
    res.json(user);
  } catch (e) { next(e); }
});

export default router;