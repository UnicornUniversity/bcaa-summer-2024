const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const messageDao = require("../../dao/message-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    text: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedMessage = messageDao.update(message);

    if (!updatedMessage) {
      res.status(404).json({
        code: "messageNotFound",
        message: `Message ${message.id} not found`,
      });
      return;
    }

    res.json(updatedMessage);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
