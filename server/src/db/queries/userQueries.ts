import { db } from "../knex";
const getUserByEmail = async (email: string) => {
  try {
    const user = db("users").select("*").where("email", email).first();
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (data: User) => {
  try {
    const insertedUser = await db("users").insert(data).returning("*");
    return insertedUser[0];
  } catch (error) {
    throw error;
  }
};

const updateUser = async (newData: User) => {
  try {
    const updatedUser = await db("users")
      .where("id", newData.id)
      .update(newData)
      .returning("*");
    return updatedUser[0];
  } catch (error) {
    throw error;
  }
};

export { getUserByEmail, createUser, updateUser };
