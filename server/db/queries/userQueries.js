const db = require("../knex")

const getUserByEmail = async (email) => {
    try {
        const user = db('users')
            .select('id', 'name', 'email', 'access_token', 'refresh_token')
            .where('email', email)
            .first();
        return user
    } catch (error) {
        throw error;
    }
}

const createUser = async (data) => {
    try {
        const insertedUser = await db('users').insert(data).returning('*');
        return insertedUser[0];
    } catch (error) {
        throw error;
    }
};

const updateUser = async (newData) => {
    try {
        const updatedUser = await db('users')
            .where('id', newData.id)
            .update(newData)
            .returning('*');
        return updatedUser[0];
    } catch (error) {
        throw error;
    }
};

module.exports = { getUserByEmail, createUser, updateUser }

