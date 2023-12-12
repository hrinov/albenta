const db = require("../knex")

const open = async (data) => {
    try {
        const insertedDeposit = await db('deposits')
            .insert(data)
            .returning('*');
        return insertedDeposit[0];
    } catch (error) {
        throw error;
    }
};

const findAll = async (userId) => {
    try {
        const deposits = db('deposits')
            .select('id', 'user_id', 'amount', 'percent', 'hours', 'created_at', 'closed')
            .where('user_id', userId)

        return deposits
    } catch (error) {
        throw error;
    }
};


module.exports = { open, findAll }

