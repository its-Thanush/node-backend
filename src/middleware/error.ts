import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { ApiError } from '../types';

export default function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(`[${req.method}] ${req.path}`, err.message);

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation failed',
      issues: err.issues.map((e: ZodIssue) => ({  // ← err.issues, not err.errors; ZodIssue type
        field: e.path.join('.'),
        message: e.message
      }))
    });
    return;
  }

  const status = err.status ?? 500;
  res.status(status).json({ error: err.message || 'Something went wrong' });
}