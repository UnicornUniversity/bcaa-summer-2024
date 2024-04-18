const express = require("express");
const router = express.Router();

const UpdateAbl = require("../abl/attendance/updateAbl");

router.post("/update", UpdateAbl);

module.exports = router;
