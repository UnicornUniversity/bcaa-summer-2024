const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDao = require("../../dao/user-dao.js");
const eventDao = require("../../dao/event-dao.js");
const attendanceDao = require("../../dao/attendance-dao.js");

const schema = {
  type: "object",
  properties: {
    eventId: { type: "string" },
    userId: { type: "string" },
    attendance: { enum: ["yes", "no", null] },
    guests: { enum: [0, 1, 2, 3, 4, 5, 6] },
  },
  required: ["eventId", "userId"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let attendance = req.body;

    // validate input
    const valid = ajv.validate(schema, attendance);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // check if user exists
    const user = userDao.get(attendance.userId);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${attendance.userId} not found`,
      });
      return;
    }

    // check if event exists
    const event = eventDao.get(attendance.eventId);
    if (!event) {
      res.status(404).json({
        code: "eventNotFound",
        message: `Event ${attendance.eventId} not found`,
      });
      return;
    }
    attendance.attendance = attendance.attendance || "null";
    attendance.guests = attendance.guests || 0;

    if (attendance.attendance === "null" && attendance.guests === 0) {
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
