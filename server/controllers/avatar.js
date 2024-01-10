const path = require('path')
const getAvatar = async (req, res) => {
    const filename = req.query?.filename;
    const filePath = filename && path.join(__dirname, '..', 'uploads', filename);

    if (!filename || !filePath) {
        return res.status(404).send('Message: file not found');
    }
    try {
        res.sendFile(filePath);
    } catch (error) {
        return res.status(404).send(`Message: ${error}`);
    }

};

module.exports = { getAvatar };

