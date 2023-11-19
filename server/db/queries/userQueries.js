const db = require("../knex")

const getUserByEmail = async (email) => {
    try {
        const user = db('users')
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

module.exports = { getUserByEmail, createUser }

