const noteDao = require("../../dao/note-dao.js");

async function ListAbl(req, res) {
  try {
    const noteList = noteDao.list();
    res.json(noteList);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = ListAbl;
