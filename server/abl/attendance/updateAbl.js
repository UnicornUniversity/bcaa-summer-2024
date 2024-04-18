const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");
const eventDao = require("../../dao/event-dao.js");
const attendanceDao = require("../../dao/attendance-dao.js");

const schema = {
  type: "object",
  properties: {
    eventId: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
    attendance: { enum: ["yes", "no", null] },
    guests: { enum: [0, 1, 2, 3, 4, 5, 6] },
  },
  required: ["eventId", "userId"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let dtoIn = req.body;

    // validate input
    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // check if user exists
    const user = userDao.get(dtoIn.userId);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${dtoIn.userId} not found`,
      });
      return;
    }

    // check if event exists
    const event = eventDao.get(dtoIn.eventId);
    if (!event) {
      res.status(404).json({
        code: "eventNotFound",
        message: `Event ${dtoIn.eventId} not found`,
      });
      return;
    }

    let attendance = attendanceDao.get(dtoIn.userId, dtoIn.eventId);
    attendance = { ...(attendance || {}), ...dtoIn };

    if (!attendance.attendance && !attendance.guests) {
      attendanceDao.remove(attendance.userId, attendance.eventId);
    } else {
      attendance = attendanceDao.update(attendance);
    }
    res.json(attendance);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
