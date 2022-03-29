import { Request, Response, NextFunction } from "express";
import { ObjectID } from "mongodb";
import { nanoid } from "nanoid";
import "dotenv/config";

import Url from "../models/Url";

export default class UrlController {
  static store = async (req: Request, res: Response) => {
    //@ts-ignore
    let id = res.userId != undefined ? res.userId.id : undefined;

    const { urlOrigin, urlTitle } = req.body;

    const hash = await nanoid(5);
    const shortUrl = `${"http://localhost:3000"}/${hash}`;

    try {
      const url = await Url.findOne({ urlOrigin: urlOrigin });

      if (!url) {
        const data = await Url.create({
          urlOrigin,
          urlShort: shortUrl,
          urlShortHash: hash,
          urlTitle,
          urlViewsCounter: 0,
          urlFavorite: false,
          userId: new ObjectID(id),
        });

        res.status(201).json({ data, message: "Url shortned" });
        return;
      } else {
        res.status(200).json({ message: "Url already shortned" });
      }
    } catch (error) {
      return res.status(200).json({ message: "Url already shortned" });
    }
  };

  static getTopViews = async (req: Request, res: Response): Promise<void> => {
    try {
      const url = await Url.find({})
        .select("-userId")
        .sort({ urlViewsCounter: -1 })
        .limit(100);

      res.status(200).json(url);
      return;
    } catch (err) {
      res.status(400).json({ error: "URL not found" });
    }
  };

  static urlViews = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    if (id) {
      try {
        const url = await Url.findOneAndUpdate(
          { urlShortHash: id },
          { $inc: { urlViewsCounter: 1 } },
          { new: true }
        );
        res.status(200).json(url);
        return;
      } catch (error) {
        res.status(400).json({ error: "URL not found" });
      }
      res.status(400).json({ message: "Id not provided" });
    }
  };

  static redirect = async (req: Request, res: Response, next: NextFunction) => {
    const hash = req.params.hash;
    let url;

    try {
      url = await Url.findOne({ urlShortHash: hash });
      if (url) {
        return res.redirect(url.urlOrigin);
      } else {
        return res.status(404).json("No url found");
      }
    } catch (err: any) {
      return res.status(500).json("Server Error");
    }
  };
}
