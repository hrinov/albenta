const { v4: uuidv4 } = require('uuid');

const get = (req, res) => {

    return res.status(200).json({ "message": "success" })
}

const create = (req, res) => {

    return res.status(200).json({ "message": "success" })
}

const update = (req, res) => {

    return res.status(200).json({ "message": "success" })
}

const remove = (req, res) => {

    return res.status(200).json({ "message": "success" })
}

module.exports = {
    get,
    create,
    update,
    remove
}