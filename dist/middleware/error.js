"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const zod_1 = require("zod");
function errorHandler(err, req, res, _next) {
    console.error(`[${req.method}] ${req.path}`, err.message);
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: 'Validation failed',
            issues: err.issues.map((e) => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
        return;
    }
    const status = err.status ?? 500;
    res.status(status).json({ error: err.message || 'Something went wrong' });
}
