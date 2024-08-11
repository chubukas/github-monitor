import express, { Request, Response, NextFunction } from "express";

export const ErrorHandler = (
  err: any, // Use 'any' if you need to handle different types of errors
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  if (err.status) {
    res.status(err.status).json({
      message: err.message,
      error: err.error || err.message,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
