const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/event/getAbl");
const ListAbl = require("../abl/event/listAbl");
const CreateAbl = require("../abl/event/createAbl");
const UpdateAbl = require("../abl/event/updateAbl");
const DeleteAbl = require("../abl/event/deleteAbl");

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
