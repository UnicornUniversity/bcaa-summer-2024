const Ajv = require("ajv");
const ajv = new Ajv();

const noteDao = require("../../dao/note-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    note: { type: "string" },
    userId: { type: "string" },
  },
  required: ["name", "userId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let note = req.body;

    // validate input
    const valid = ajv.validate(schema, note);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    note.date = new Date().toISOString();

    note = noteDao.create(note);
    res.json(note);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = CreateAbl;
