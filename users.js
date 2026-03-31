require('dotenv').config();
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const requireAuth = require('./middleware/auth');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


// GET /users — list all
router.get('/', requireAuth, async (req, res, next) => {
  try{
  const users = await prisma.user.findMany();
  res.json(users);
  }catch(e){
    next(e);
  }
});

// GET /users/:id — get one
router.get('/:id', requireAuth, async (req, res, next) => {

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    next(e);
  }
});



// POST /users — create
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'name and email required' });
    }

    const user = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json(user);

  } catch (e) {
  next(e);
}
});

// PATCH /users/:id — update
router.patch('/:id', requireAuth, async (req, res, next) => {
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

// DELETE /users/:id
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;