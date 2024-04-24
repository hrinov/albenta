import { Request, Response } from "express";
import { convertIPv6ToIPv4 } from "../utils/ipConverter";
const { updateUser } = require("../db/queries/userQueries");
const { handleUserActivity } = require("../utils/activityLog");
const { open, findAll } = require("../db/queries/depositQueries");

interface CustomRequest extends Request {
  useragent: { [key: string]: string };
  user: UserData;
}

const openDeposit = async (req: CustomRequest, res: Response) => {
  const { amount, hours, percent } = req.body;
  if (!amount || !hours || !percent) {
    // handle not all arguments
    return res
      .status(400)
      .json({ message: "amount, hours and percent are required" });
  }

  // handle low amount
  if (amount < 10) {
    return res
      .status(400)
      .json({ message: "please ensure the amount is greater than 10" });
  }

  // handle bad hours input
  if (hours > 100) {
    return res
      .status(400)
      .json({ message: "you can't use more than 100 hours" });
  }

  const allowedPercentRates = [5, 10, 15, 20, 25];

  // handle bad percent input
  if (!allowedPercentRates.includes(percent)) {
    return res.status(400).json({
      message: `invalid percent, valid percents are: ${allowedPercentRates.join(
        ", "
      )}`,
    });
  }

  // handle not amount
  if (amount > req.user.balance!) {
    return res.status(400).json({ message: "insufficient funds" });
  }

  const newUserData = {
    ...req.user,
    balance: +req.user.balance! - +amount,
  };

  const updatedUser = await updateUser(newUserData);

  const currentDate = new Date();

  const depositOptions = {
    amount: +amount,
    hours: +hours,
    percent: +percent,
    created_at: currentDate,
    user_id: req.user.id,
  };

  const newDeposit = await open(depositOptions);

  //handle activity

  try {
    await handleUserActivity(
      convertIPv6ToIPv4(req.ip!),
      req.useragent,
      req.user.id,
      `open ${percent}% deposit`
    );
  } catch (error) {
    console.log(error);
  }

  return res
    .status(200)
    .json({ success: true, data: { user: updatedUser, deposit: newDeposit } });
};

const getDeposits = async (req: CustomRequest, res: Response) => {
  let deposits = await findAll(req.user.id);
  //create deposits info
  deposits = deposits.map((deposit: Deposit) => ({
    ...deposit,
    profit: (
      (+deposit.amount! / 100) *
      +deposit.percent! *
      +deposit.hours!
    ).toFixed(2),
    total_sum: (
      (+deposit.amount! / 100) * +deposit.percent! * +deposit.hours! +
      +deposit.amount!
    ).toFixed(2),
    end_date: new Date(
      new Date(deposit.created_at!).getTime() + deposit.hours! * 60 * 60 * 1000
    ),
  }));

  //check deposit types
  const currentDate = new Date();

  const activeDeposits = deposits.filter((deposit: Deposit) => {
    const createdAt = new Date(deposit.created_at!);
    const endDate = new Date(
      createdAt.getTime() + deposit.hours! * 60 * 60 * 1000
    );
    return endDate.getTime() > currentDate.getTime();
  });

  const expiredDeposits = deposits.filter((deposit: Deposit) => {
    const createdAt = new Date(deposit.created_at!);
    const endDate = new Date(
      createdAt.getTime() + deposit.hours! * 60 * 60 * 1000
    );
    return endDate.getTime() < currentDate.getTime();
  });

  const readyDeposits = expiredDeposits.filter(
    (deposit: Deposit) => !deposit.closed
  );

  const closedDeposits = deposits.filter((deposit: Deposit) => deposit.closed);

  const limit = req.query.limit;

  return res.status(200).json({
    success: true,
    data: {
      active: activeDeposits.filter(
        (_: Deposit, i: number) => !limit || i + 1 <= +limit
      ),
      ready: readyDeposits.filter(
        (_: Deposit, i: number) =>
          !limit || i + 1 <= +limit - activeDeposits.length
      ),
      closed: closedDeposits.filter(
        (_: Deposit, i: number) =>
          !limit ||
          i + 1 <= +limit - activeDeposits.length - readyDeposits.length
      ),
    },
  });
};

export { openDeposit, getDeposits };
