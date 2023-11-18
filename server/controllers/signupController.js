const { v4: uuidv4 } = require('uuid');

const addUser = (req, res) => {

    return res.status(200).json({ "message": "success" })
}


module.exports = { addUser }