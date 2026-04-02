"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = require("express");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
// GET /users — list all
router.get('/', auth_1.default, async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (e) {
        next(e);
    }
});
// GET /users/:id — get one
router.get('/:id', auth_1.default, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (e) {
        next(e);
    }
});
// POST /users — create
router.post('/', auth_1.default, async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: 'name, email and password required' });
            return;
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashed }
        });
        const { password: _, ...safeUser } = user;
        res.status(201).json(safeUser);
    }
    catch (e) {
        next(e);
    }
});
// PATCH /users/:id — update
router.patch('/:id', auth_1.default, async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.json(user);
    }
    catch {
        res.status(404).json({ error: 'User not found' });
    }
});
// DELETE /users/:id  ← also fix: was router.patch, should be router.delete
router.delete('/:id', auth_1.default, async (req, res, next) => {
    try {
        await prisma.user.delete({ where: { id: Number(req.params.id) } });
        res.status(204).send();
    }
    catch {
        res.status(404).json({ error: 'User not found' });
    }
});
exports.default = router; // ← was module.exports = router
