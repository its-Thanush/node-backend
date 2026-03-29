require('dotenv').config();
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


// GET /users — list all
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// GET /users/:id — get one
router.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});



// POST /users — create
router.post('/', async (req, res) => {
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
    console.error("🔥 FULL ERROR:", e);  
    res.status(500).json({ error: e.message });
  }
});

// PATCH /users/:id — update
router.patch('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;