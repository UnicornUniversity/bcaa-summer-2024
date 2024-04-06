const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const noteFolderPath = path.join(__dirname, "storage", "noteList");

// Method to read an note from a file
function get(noteId) {
  try {
    const filePath = path.join(noteFolderPath, `${noteId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadNote", note: error.note };
  }
}

// Method to write an note to a file
function create(note) {
  try {
    note.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(noteFolderPath, `${note.id}.json`);
    const fileData = JSON.stringify(note);
    fs.writeFileSync(filePath, fileData, "utf8");
    return note;
  } catch (error) {
    throw { code: "failedToCreateNote", note: error.note };
  }
}

// Method to update note in a file
function update(note) {
  try {
    const currentNote = get(note.id);
    if (!currentNote) return null;
    const newNote = { ...currentNote, ...note };
    const filePath = path.join(noteFolderPath, `${note.id}.json`);
    const fileData = JSON.stringify(newNote);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newNote;
  } catch (error) {
    throw { code: "failedToUpdateNote", note: error.note };
  }
}

// Method to remove an note from a file
function remove(noteId) {
  try {
    const filePath = path.join(noteFolderPath, `${noteId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveNote", note: error.note };
  }
}

// Method to list notes in a folder
function list() {
  try {
    const files = fs.readdirSync(noteFolderPath);
    const noteList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(noteFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return noteList;
  } catch (error) {
    throw { code: "failedToListNotes", note: error.note };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
