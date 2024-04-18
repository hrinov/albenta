import { getUserByEmail, updateUser } from "../db/queries/userQueries";
import { getActiveDeposit, closeDeposit } from "../db/queries/depositQueries";
import { handleUserActivity } from "../utils/activityLog";
import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

interface CustomRequest extends Request {
  useragent: { [key: string]: string };
  file: { filename: string };
}

const withdrawDeposit = async (req: CustomRequest, res: Response) => {
  const { depositId } = req.body;
  if (!depositId) {
    // handle not all arguments
    return res.status(400).json({ message: "depositId is required" });
  }

  const access_token = req?.headers?.authorization?.substring(7);
  let decodedToken;

  try {
    decodedToken = jwt.verify(access_token, process.env.TOKEN_SECRET);
  } catch (error) {
    // handle wrong or expired token error
    if ((error as Error).message == "jwt expired") {
      return res.status(400).json({ message: "token has expired" });
    }
    return res.status(400).json({ message: "wrong token" });
  }

  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedToken.exp < currentTime) {
    // handle expired token error
    return res.status(400).json({ message: "token has expired" });
  }

  const userEmail = decodedToken.email;
  const user = await getUserByEmail(userEmail);

  if (!user) {
    // handle user not found error
    return res.status(400).json({ message: "user not found" });
  }

  if (user.access_token !== access_token) {
    // handle wrong token error
    return res.status(400).json({ message: "wrong token" });
  }

  let deposit = await getActiveDeposit(depositId, user.id);
  deposit = deposit[0];

  if (!deposit) {
    //handle wrong depositId
    return res.status(400).json({ message: "deposit not found" });
  }

  //close deposit
  await closeDeposit(deposit);

  const totalDepositSum = (
    (+deposit.amount / 100) * +deposit.percent * +deposit.hours +
    +deposit.amount
  ).toFixed(2);

  //update user balance
  const newUserData = {
    ...user,
    balance: +user.balance + +totalDepositSum,
  };

  const updatedUser = await updateUser(newUserData);

  //handle activity
  handleUserActivity(
    req.ip,
    req.useragent,
    user.id,
    `withdraw ${totalDepositSum}$`
  );

  return res.status(200).json({ success: true, user: updatedUser });
};

module.exports = { withdrawDeposit };
