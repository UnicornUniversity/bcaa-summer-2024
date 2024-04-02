const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/message/getAbl");
const ListAbl = require("../abl/message/listAbl");
const CreateAbl = require("../abl/message/createAbl");
const UpdateAbl = require("../abl/message/updateAbl");
const DeleteAbl = require("../abl/message/deleteAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

module.exports = router;
