const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/event/getAbl");
const ListAbl = require("../abl/event/listAbl");
const CreateAbl = require("../abl/event/createAbl");
const UpdateAbl = require("../abl/event/updateAbl");
const DeleteAbl = require("../abl/event/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
