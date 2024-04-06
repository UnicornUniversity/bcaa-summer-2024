const Ajv = require("ajv");
const ajv = new Ajv();
const noteDao = require("../../dao/note-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read note by given id
    const note = noteDao.get(reqParams.id);
    if (!note) {
      res.status(404).json({
        code: "noteNotFound",
        note: `Note ${reqParams.id} not found`,
      });
      return;
    }

    res.json(note);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = GetAbl;
