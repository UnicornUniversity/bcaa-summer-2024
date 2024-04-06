const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const eventDao = require("../../dao/event-dao.js");

const schema = {
  type: "object",
  properties: {
    date: { type: "string", format: "date-time" },
    name: { type: "string" },
    desc: { type: "string" },
  },
  required: ["date", "name"],
  additionalProperties: false,
};

const changeRequestCreateSchema = {
  type: "object",
  properties: {
    description: { type: "string" },
    author: { type: "string" },
    changes: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            start: {
              type: "number",
            },
          },
        },
      ],
    },
  },
  required: ["description", "author", "changes"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let event = req.body;

    const validA = ajv.validate(changeRequestCreateSchema, {});

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

    event = eventDao.create(event);
    res.json(event);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
