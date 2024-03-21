const fs = require("fs");
const path = require("path");

async function UpdateAbl(req, res) {
  try {
    const userList = JSON.parse(
      await fs.promises.readFile(
        path.join(__dirname, "../../storage/userList.json")
      )
    );
    const body = req.body;
    const userIndex = userList.findIndex((user) => user.id === body.id);

    if (userIndex > -1) {
      userList[userIndex] = body;
    } else {
      res.status(404).json({ message: "User not found" });
    }

    await fs.promises.writeFile(
      path.join(__dirname, "../../storage/userList.json"),
      JSON.stringify(userList, null, 2)
    );
    res.json(userList[userIndex]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
