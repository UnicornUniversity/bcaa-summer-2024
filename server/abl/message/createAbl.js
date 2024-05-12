const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const messageDao = require("../../dao/message-dao.js");
const userDao = require("../../dao/user-dao.js");
const eventDao = require("../../dao/event-dao.js");

const schema = {
  type: "object",
  properties: {
    text: { type: "string" },
    eventId: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["text", "userId", "eventId"],
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

    // check if user exists
    const user = userDao.get(message.userId);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${message.userId} not found`,
      });
      return;
    }

    // check if event exists
    const event = eventDao.get(message.eventId);
    if (!event) {
      res.status(404).json({
        code: "eventNotFound",
        message: `Event ${message.eventId} not found`,
      });
      return;
    }

    message.date = new Date().toISOString();

    message = messageDao.create(message);
    res.json(message);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
