import { Request, Response } from "express";
import { getAllUserActivity } from "../db/queries/activityQueries";

interface CustomRequest extends Request {
  user: UserData;
}

const getActivity = async (req: CustomRequest, res: Response) => {
  const page = req.query.page;
  if (!page) {
    // handle not all arguments
    return res.status(400).json({ message: "page is required" });
  }

  const startIndex = (+page - 1) * 10;

  const activity = await getAllUserActivity(+req.user.id!, startIndex);

  return res
    .status(200)
    .json({ success: true, data: activity.data, total: activity.total });
};

export { getActivity };
