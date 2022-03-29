import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import secret from "../config/jwtsecret";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {

  const token = <string>req.headers["authorization"];

  if (token !== undefined) {
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(404).json({
                message: error,
                error
            });
        } else {
            //@ts-ignore
            res.userId = decoded;
            next();
        }
    });
} else {
    //@ts-ignore
    res.userId = undefined;
    next();
}
};