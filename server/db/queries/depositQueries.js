const db = require("../knex")

const open = async (data) => {
    try {
        const insertedDeposit = await db('deposits').insert(data).returning('*');
        return insertedDeposit[0];
    } catch (error) {
        throw error;
    }
};


module.exports = { open }

