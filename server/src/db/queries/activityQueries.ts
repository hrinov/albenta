import { db } from "../knex";

const addActivity = async (data: any) => {
  try {
    await db("activity").insert(data);
  } catch (error) {
    throw error;
  }
};

const getAllUserActivity = async (
  userId: any,
  startIndex: any,
  startDate?: any,
  endDate?: any
) => {
  try {
    let data;
    let count;
    if (!startDate && !endDate) {
      data = await db("activity")
        .select("*")
        .where("user_id", userId)
        .orderBy("date", "desc")
        .offset(startIndex)
        .limit(10);
      count = await db("activity")
        .count("* as total")
        .where("user_id", userId)
        .first();
    } else {
      data = await db("activity")
        .select("*")
        .where("user_id", userId)
        .andWhere("date", ">", startDate)
        .andWhere("date", "<", endDate)
        .andWhere("type", "like", "%withdraw%");
      count = await db("activity")
        .count("* as total")
        .where("user_id", userId)
        .andWhere("date", ">", startDate)
        .andWhere("date", "<", endDate)
        .andWhere("type", "like", "%withdraw%")
        .first();
    }
    return { data, total: count.total };
  } catch (error) {
    throw error;
  }
};

export { addActivity, getAllUserActivity };
