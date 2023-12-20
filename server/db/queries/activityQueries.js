const db = require("../knex")

const addActivity = async (data) => {
    try {
        await db('activity')
            .insert(data)

    } catch (error) {
        throw error;
    }
};


module.exports = { addActivity }