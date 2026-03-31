const express = require('express');
const router = express.Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { PrismaClient } = require('@prisma/client');

// const { Pool } = require('pg');
// const { PrismaPg } = require('@prisma/adapter-pg');
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({ adapter });
const prisma = require('../lib/prisma');


const requireAuth = require('../middleware/requireAuth');
const { registerSchema, loginSchema } = require('../schemas/auth.schema');


router.post('/register', async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);

    const hashed = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashed
      }
    });

    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);

  } catch (e) {
    next(e);
  }
});



//POST /auth/login

router.post('/login', async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: body.email }
    });

    if (!user)
      return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(body.password, user.password);

    if (!valid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });

  } catch (e) {
    next(e);
  }
});


module.exports = router;