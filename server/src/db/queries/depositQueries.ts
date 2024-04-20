import { db } from "../knex.ts";

const open = async (data: Deposit) => {
  try {
    const insertedDeposit = await db("deposits").insert(data).returning("*");
    return insertedDeposit[0];
  } catch (error) {
    throw error;
  }
};

const findAll = async (userId: number) => {
  try {
    const deposits = db("deposits")
      .select(
        "id",
        "hours",
        "amount",
        "closed",
        "user_id",
        "percent",
        "created_at"
      )
      .where("user_id", userId);

    return deposits;
  } catch (error) {
    throw error;
  }
};

const getActiveDeposit = async (depositId: number, userId: number) => {
  try {
    const deposit = db("deposits")
      .select("*")
      .where("id", depositId)
      .where("closed", false)
      .where("user_id", userId);

    return deposit;
  } catch (error) {
    throw error;
  }
};

const closeDeposit = async (deposit: Deposit) => {
  try {
    let closedDeposit = deposit;
    closedDeposit.closed = true;
    const updatedDeposit = await db("deposits")
      .where("id", deposit.id)
      .update(closedDeposit)
      .returning("*");
    return updatedDeposit[0];
  } catch (error) {
    throw error;
  }
};

export { open, findAll, getActiveDeposit, closeDeposit };
