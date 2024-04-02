const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const messageDao = require("../../dao/message-dao.js");

const schema = {
  type: "object",
  properties: {
    date: { type: "string", format: "date-time" },
    name: { type: "string" },
    message: { type: "string" },
  },
  required: ["date", "name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let message = req.body;

    // validate input
    const valid = ajv.validate(schema, message);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    message = messageDao.create(message);
    res.json(message);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
