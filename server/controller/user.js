const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/user/listAbl");
const UpdateAbl = require("../abl/user/updateAbl");

router.get("/get", (req, res) => {
  console.log(req.query);
  res.send("getting users!");
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

module.exports = router;
