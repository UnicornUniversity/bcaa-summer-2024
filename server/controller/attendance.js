const express = require("express");
const router = express.Router();

const UpdateAbl = require("../abl/attendance/updateAbl");

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

module.exports = router;
