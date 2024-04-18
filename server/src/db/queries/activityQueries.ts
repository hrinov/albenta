import { db } from "../knex";

const addActivity = async (data: Activity) => {
  try {
    await db("activity").insert(data);
  } catch (error) {
    throw error;
  }
};

const getAllUserActivity = async (
  userId: number,
  startIndex: number,
  startDate?: Date,
  endDate?: Date
) => {
  try {
    let data;
    let count;
    if (!startDate && !endDate) {
      data = (await db("activity")
        .select("*")
        .where("user_id", userId)
        .orderBy("date", "desc")
        .offset(startIndex)
        .limit(10)) as Activity[];
      count = (await db("activity")
        .count("* as total")
        .where("user_id", userId)
        .first()) as { total: number };
    } else {
      data = (await db("activity")
        .select("*")
        .where("user_id", userId)
        .andWhere("date", ">", startDate)
        .andWhere("date", "<", endDate)
        .andWhere("type", "like", "%withdraw%")) as Activity[];
      count = (await db("activity")
        .count("* as total")
        .where("user_id", userId)
        .andWhere("date", ">", startDate)
        .andWhere("date", "<", endDate)
        .andWhere("type", "like", "%withdraw%")
        .first()) as { total: number };
    }
    return { data, total: count.total };
  } catch (error) {
    throw error;
  }
};

export { addActivity, getAllUserActivity };
