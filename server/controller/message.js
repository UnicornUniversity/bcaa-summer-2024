const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/message/getAbl");
const ListAbl = require("../abl/message/listAbl");
const CreateAbl = require("../abl/message/createAbl");
const UpdateAbl = require("../abl/message/updateAbl");
const DeleteAbl = require("../abl/message/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
