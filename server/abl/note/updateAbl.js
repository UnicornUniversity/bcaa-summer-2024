const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const noteDao = require("../../dao/note-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    date: { type: "string", format: "date-time" },
    name: { type: "string" },
    note: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedNote = noteDao.update(note);

    if (!updatedNote) {
      res.status(404).json({
        code: "noteNotFound",
        note: `Note ${note.id} not found`,
      });
      return;
    }

    res.json(updatedNote);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = UpdateAbl;
