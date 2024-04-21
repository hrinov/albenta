import { Request, Response } from "express";

interface CustomRequest extends Request {
  user: UserData;
}

const getUser = async (req: CustomRequest, res: Response) =>
  res.status(200).json({ success: true, data: req.user });

export { getUser };
