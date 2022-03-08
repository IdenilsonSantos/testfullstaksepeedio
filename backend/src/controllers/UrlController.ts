import { NextFunction, Request, Response } from "express";
import { ObjectID } from 'mongodb'
import { nanoid } from "nanoid";
import "dotenv/config";

import Url from "../models/Url";

export interface IUrl {
    urlOrigin: String,
    urlShort: String,
    urlShortHash: String,
    urlTitle: String,
    urlViewsCounter?: 0,
    userId: Object
}

export default class UrlController {
    static store = async (req: Request, res: Response,) => {

        //@ts-ignore
        let id = res.userId != undefined ? res.userId.id : undefined

        const { urlOrigin, urlTitle } = req.body;

        const hash = await nanoid(5);
        const shortUrl = `${'http://localhost:3000'}/${hash}`;


        try {
            const url = await Url.findOne({ urlOrigin: urlOrigin });

            if (!url) {
                await Url.create({
                    urlOrigin,
                    urlShort: shortUrl,
                    urlShortHash: hash,
                    urlTitle,
                    urlViewsCounter: 0,
                    userId: new ObjectID(id)
                });

                res.status(201).json({ shortUrl, hash, message: 'Url shortned' })
                return
            }
            else {
                res.status(200).json({ message: 'Url already shortned' })
            }
        }
        catch (error) {
            return error
        }

    }

    static getByUser = async (req: Request, res: Response): Promise<void> => {

        //@ts-ignore
        let id = res.userId != undefined ? res.userId.id : undefined

        if (id) {
            const url = await Url.find({ userId: id });

            if (url) {
                res.status(200).json(url)
                return
            }
            else {
                res.status(400).json({ error: 'URL not found' })
            }
        }
        else {
            res.status(400).json({ error: 'Id not Provided' })
        }

    }

    static urlViews = async (req: Request, res: Response): Promise<void> => {

        const id  = req.params.id;

        if (id) {
            const url = await Url.findOneAndUpdate({ urlShortHash: id }, { $inc: {'urlViewsCounter': 1 } }, {new: true });

            if (url) {
                res.status(200).json(url)
                return
            }
            else {
                res.status(400).json({ error: 'URL not found' })
            }
        }

    }
}