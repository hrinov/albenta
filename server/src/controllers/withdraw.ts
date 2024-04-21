import { Request, Response } from "express";
import { updateUser } from "../db/queries/userQueries";
import { handleUserActivity } from "../utils/activityLog";
import { getActiveDeposit, closeDeposit } from "../db/queries/depositQueries";

interface CustomRequest extends Request {
  useragent: { [key: string]: string };
  file: { filename: string };
  user: UserData;
}

const withdrawDeposit = async (req: CustomRequest, res: Response) => {
  const { depositId } = req.body;
  // handle not all arguments
  if (!depositId) {
    return res.status(400).json({ message: "depositId is required" });
  }

  let deposit = await getActiveDeposit(depositId, req.user.id!);
  deposit = deposit[0];

  //handle wrong depositId
  if (!deposit) {
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
    ...req.user,
    balance: +req.user.balance! + +totalDepositSum,
  };

  const updatedUser = await updateUser(newUserData);

  //handle activity
  handleUserActivity(
    +req.ip!,
    req.useragent,
    req.user.id!,
    `withdraw ${totalDepositSum}$`
  );

  return res.status(200).json({ success: true, user: updatedUser });
};

module.exports = { withdrawDeposit };
