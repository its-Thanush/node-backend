"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// TypeScript handler signature — explicit types on req, res, next
router.post('/register', async (req, res, next) => {
    try {
        const body = auth_schema_1.registerSchema.parse(req.body);
        const hashed = await bcryptjs_1.default.hash(body.password, 10);
        const user = await prisma.user.create({
            data: { name: body.name, email: body.email, password: hashed }
        });
        const { password: _, ...safeUser } = user;
        res.status(201).json(safeUser);
    }
    catch (e) {
        next(e);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = auth_schema_1.loginSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const valid = await bcryptjs_1.default.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    }
    catch (e) {
        next(e);
    }
});
router.get('/me', auth_1.default, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId }, // ! = "I know this exists" (after requireAuth)
            select: { id: true, name: true, email: true, createdAt: true }
        });
        res.json(user);
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
