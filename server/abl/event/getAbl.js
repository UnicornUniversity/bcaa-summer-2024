const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const eventDao = require("../../dao/event-dao.js");
const attendanceDao = require("../../dao/attendance-dao.js");
const messageDao = require("../../dao/message-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
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
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read event by given id
    const event = eventDao.get(reqParams.id);
    if (!event) {
      res.status(404).json({
        code: "eventNotFound",
        message: `Event ${reqParams.id} not found`,
      });
      return;
    }

    const attendanceMap = attendanceDao.eventMap();
    event.userMap = attendanceMap[reqParams.id] || {};

    event.messageList = messageDao.listByEventId(event.id);

    res.json(event);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
