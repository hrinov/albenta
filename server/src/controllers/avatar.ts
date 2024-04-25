const path = require("path");
const fs = require("fs").promises;
import { Request, Response } from "express";
import { handleUserActivity } from "../utils/activityLog";
import { updateUser as updateUserQuery } from "../db/queries/userQueries";

interface CustomRequest extends Request {
  useragent: { [key: string]: string };
  user: UserData;
}

const getAvatar = async (req: Request, res: Response) => {
  const filename = req.query?.filename;
  const filePath =
    filename && path.join(__dirname, "..", "..", "uploads", filename);

  if (!filename || !filePath) {
    return res.status(404).send({ message: "file not found" });
  }

  try {
    res.sendFile(filePath);
  } catch (error) {
    return res.status(404).send({ message: `${error}` });
  }
};

const deleteAvatar = async (req: CustomRequest, res: Response) => {
  const filename = req.user?.avatar;
  const filePath =
    filename && path.join(__dirname, "..", "..", "uploads", filename);

  if (!filename || !filePath) {
    return res.status(404).send({ message: "file not found" });
  }

  try {
    await fs.unlink(filePath);

    const data = {
      ...req.user,
      avatar: "",
    };

    const result = await updateUserQuery(data);

    if (result && req?.ip && req?.useragent) {
      // handle activity
      try {
        await handleUserActivity(req.useragent, req.user.id!, "update profile");
      } catch (error) {
        console.log(error);
      }

      return res.status(200).json({ success: true });
    } else {
      throw Error;
    }
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export { getAvatar, deleteAvatar };
