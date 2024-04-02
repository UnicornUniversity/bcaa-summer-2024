const messageDao = require("../../dao/message-dao.js");

async function ListAbl(req, res) {
  try {
    const messageList = messageDao.list();
    res.json(messageList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
