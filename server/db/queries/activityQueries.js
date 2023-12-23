const db = require("../knex")

const addActivity = async (data) => {
    try {
        await db('activity')
            .insert(data)

    } catch (error) {
        throw error;
    }
};

const getAllUserAactivity = async (userId, startIndex) => {
    try {
        const data = await db('activity')
            .select('*')
            .where('user_id', userId)
            .orderBy('date', 'desc')
            .offset(startIndex)
            .limit(10);
        const count = await db('activity')
            .count('* as total')
            .where('user_id', userId)
            .first()

        return { data, total: count.total };

    } catch (error) {
        throw error;
    }
};


module.exports = { addActivity, getAllUserAactivity }