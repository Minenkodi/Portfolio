import { Request, Response, NextFunction } from "express";

export default (_req: Request, _res: Response, next: NextFunction) => {
    next();
};
