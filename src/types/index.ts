
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;  // ← reuse JwtPayload instead of duplicating the shape
    }
  }
}

export interface JwtPayload {  // ← was jwtPayload (wrong casing, caused TS2724 error)
  userId: number;              // ← was userID (caused TS2551 error in auth.ts)
  email: string;
  iat?: number;                // ← was int (issued-at is iat, not int)
  exp?: number;
}

export interface ApiError extends Error {
  status?: number;
}