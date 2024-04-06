const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/note/getAbl");
const ListAbl = require("../abl/note/listAbl");
const CreateAbl = require("../abl/note/createAbl");
const UpdateAbl = require("../abl/note/updateAbl");
const DeleteAbl = require("../abl/note/deleteAbl");

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
