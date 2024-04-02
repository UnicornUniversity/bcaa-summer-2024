const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const messageFolderPath = path.join(__dirname, "storage", "messageList");

// Method to read an message from a file
function get(messageId) {
  try {
    const filePath = path.join(messageFolderPath, `${messageId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadMessage", message: error.message };
  }
}

// Method to write an message to a file
function create(message) {
  try {
    message.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(messageFolderPath, `${message.id}.json`);
    const fileData = JSON.stringify(message);
    fs.writeFileSync(filePath, fileData, "utf8");
    return message;
  } catch (error) {
    throw { code: "failedToCreateMessage", message: error.message };
  }
}

// Method to update message in a file
function update(message) {
  try {
    const currentMessage = get(message.id);
    if (!currentMessage) return null;
    const newMessage = { ...currentMessage, ...message };
    const filePath = path.join(messageFolderPath, `${message.id}.json`);
    const fileData = JSON.stringify(newMessage);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newMessage;
  } catch (error) {
    throw { code: "failedToUpdateMessage", message: error.message };
  }
}

// Method to remove an message from a file
function remove(messageId) {
  try {
    const filePath = path.join(messageFolderPath, `${messageId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveMessage", message: error.message };
  }
}

// Method to list messages in a folder
function list() {
  try {
    const files = fs.readdirSync(messageFolderPath);
    const messageList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(messageFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return messageList;
  } catch (error) {
    throw { code: "failedToListMessages", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
