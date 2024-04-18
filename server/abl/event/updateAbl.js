const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const eventDao = require("../../dao/event-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    date: { type: "string", format: "date-time" },
    name: { type: "string", minLength: 3 },
    desc: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let event = req.body;

    // validate input
    const valid = ajv.validate(schema, event);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedEvent = eventDao.update(event);
    if (!updatedEvent) {
      res.status(404).json({
        code: "eventNotFound",
        message: `Event ${event.id} not found`,
      });
      return;
    }

    res.json(updatedEvent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
