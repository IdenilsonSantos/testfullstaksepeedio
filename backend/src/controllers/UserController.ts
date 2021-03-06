import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import secret from "../config/jwtsecret";
import User from "../models/User";

export default class UserController{
    static store = async (req: Request, res: Response) => {
        const { email, name, password } = req.body;

        try {
        
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).json({ error: "User already exists" });
            }

            const user = await User.create({name, email, password});

            return res.status(200).json(user);

        } catch (err) {
            return res.status(400).json({ error: "User registration failed" });
        }
    }

    static login = async (req: Request, res: Response) => {

        const { email, password } = req.body;
        try {

            const user = await User.findOne({ email, password });

            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }

            const token = await jwt.sign({ id: user._id }, secret, {
                expiresIn: 86400
              });;

            return res.json({token, name: user.name});
        } catch(error){
            return res.status(401).json({error: "User authentication failed"});
        }
    }

    static logout = async (req: Request, res: Response) => {
        return res.json({token: null});
    }
}