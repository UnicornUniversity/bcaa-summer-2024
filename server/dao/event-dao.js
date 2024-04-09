const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const eventFolderPath = path.join(__dirname, "storage", "eventList");

// Method to read an event from a file
function get(eventId) {
  try {
    const filePath = path.join(eventFolderPath, `${eventId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadEvent", message: error.message };
  }
}

// Method to write an event to a file
function create(event) {
  try {
    event.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(eventFolderPath, `${event.id}.json`);
    const fileData = JSON.stringify(event);
    fs.writeFileSync(filePath, fileData, "utf8");
    return event;
  } catch (error) {
    throw { code: "failedToCreateEvent", message: error.message };
  }
}

// Method to update event in a file
function update(event) {
  try {
    const currentEvent = get(event.id);
    if (!currentEvent) return null;
    const newEvent = { ...currentEvent, ...event };
    const filePath = path.join(eventFolderPath, `${event.id}.json`);
    const fileData = JSON.stringify(newEvent);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newEvent;
  } catch (error) {
    throw { code: "failedToUpdateEvent", message: error.message };
  }
}

// Method to remove an event from a file
function remove(eventId) {
  try {
    const filePath = path.join(eventFolderPath, `${eventId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveEvent", message: error.message };
  }
}

// Method to list events in a folder
function list() {
  try {
    const files = fs.readdirSync(eventFolderPath);
    const eventList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(eventFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    eventList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return eventList;
  } catch (error) {
    throw { code: "failedToListEvents", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
