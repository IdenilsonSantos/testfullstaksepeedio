import { Request, Response } from "express";
import "dotenv/config";

import Url from "../models/Url";

export default class UrlUserController {
  static getByUser = async (req: Request, res: Response): Promise<void> => {
    //@ts-ignore
    let userId = res.userId !== undefined ? res.userId.id : undefined;

    if (userId) {
      const url = await Url.find({ userId: userId })
        .sort({ urlFavorite: -1 })
        .limit(100);

      if (url) {
        res.status(200).json(url);
        return;
      } else {
        res.status(404).json({ error: "URL not found" });
      }
    } else {
      res.status(400).json({ error: "Id not Provided" });
    }
  };

  static urlFavorite = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { value } = req.body;

    if (id) {
      try {
        const url = await Url.findOneAndUpdate(
          { urlShortHash: id },
          { urlFavorite: value },
          { new: true }
        );
        res.status(200).json(url);
        return;
      } catch (error) {
        res.status(400).json({ error: "URL not found" });
        return;
      }
    }
    res.status(400).json({ message: "Id not provided" });
  };

  static delete = async (req: Request, res: Response): Promise<void> => {
    //@ts-ignore
    let id = res.userId != undefined ? res.userId.id : undefined;

    const urlId = req.params.id;

    if (id) {
      const url = await Url.findOneAndDelete({
        userId: id,
        urlShortHash: urlId,
      });

      if (url) {
        res.status(204).json(url);
        return;
      } else {
        res.status(400).json({ error: "URL not found" });
      }
    } else {
      res.status(400).json({ error: "Id not Provided" });
    }
  };
}
