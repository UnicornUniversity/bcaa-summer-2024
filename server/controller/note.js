const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/note/getAbl");
const ListAbl = require("../abl/note/listAbl");
const CreateAbl = require("../abl/note/createAbl");
const UpdateAbl = require("../abl/note/updateAbl");
const DeleteAbl = require("../abl/note/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
