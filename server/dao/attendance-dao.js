const fs = require("fs");
const path = require("path");

const attendanceFolderPath = path.join(__dirname, "storage", "attendanceList");

// Method to read an attendance from a file
function get(userId, eventId) {
  try {
    const attendanceList = list();
    const attendance = attendanceList.find(
      (a) => a.userId === userId && a.eventId === eventId
    );
    return attendance;
  } catch (error) {
    throw { code: "failedToReadAttendance", message: error.message };
  }
}

// Method to update attendance in a file
function update(attendance) {
  try {
    const currentAttendance = get(attendance.userId, attendance.eventId) || {};
    if (currentAttendance.file) {
      const filePath = path.join(attendanceFolderPath, currentAttendance.file);
      fs.unlinkSync(filePath);
    }
    const newAttendance = { ...currentAttendance, ...attendance };

    const filePath = path.join(
      attendanceFolderPath,
      `${newAttendance.userId}_${newAttendance.eventId}_${newAttendance.attendance}_${newAttendance.guests}.txt`
    );
    fs.writeFileSync(filePath, "", "utf8");
    return newAttendance;
  } catch (error) {
    throw { code: "failedToUpdateAttendance", message: error.message };
  }
}

// Method to remove an attendance from a file
function remove(userId, eventId) {
  try {
    const attendance = get(userId, eventId);
    if (attendance) {
      const filePath = path.join(attendanceFolderPath, attendance.file);
      fs.unlinkSync(filePath);
    }
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveAttendance", message: error.message };
  }
}

// Method to list attendances in a folder
function list() {
  try {
    const files = fs.readdirSync(attendanceFolderPath);
    const attendanceList = files.map((file) => {
      const attendanceData = file.replace(".txt", "").split("_");
      return {
        userId: attendanceData[0],
        eventId: attendanceData[1],
        attendance: attendanceData[2],
        guests: Number(attendanceData[3]),
        file,
      };
    });
    return attendanceList;
  } catch (error) {
    throw { code: "failedToListAttendances", message: error.message };
  }
}

function eventMap() {
  const attendanceList = list();
  const attendanceMap = {};
  attendanceList.forEach((attendance) => {
    if (!attendanceMap[attendance.eventId])
      attendanceMap[attendance.eventId] = {};
    if (!attendanceMap[attendance.eventId][attendance.userId])
      attendanceMap[attendance.eventId][attendance.userId] = {};
    attendanceMap[attendance.eventId][attendance.userId] = {
      attendance: attendance.attendance,
      guests: attendance.guests,
    };
  });
  return attendanceMap;
}

function userMap() {
  const attendanceList = list();
  const attendanceMap = {};
  attendanceList.forEach((attendance) => {
    if (!attendanceMap[attendance.userId])
      attendanceMap[attendance.userId] = {};
    if (!attendanceMap[attendance.userId][attendance.eventId])
      attendanceMap[attendance.userId][attendance.eventId] = {};
    attendanceMap[attendance.userId][attendance.eventId] = {
      attendance: attendance.attendance,
      guests: attendance.guests,
    };
  });
  return attendanceMap;
}

module.exports = {
  get,
  update,
  remove,
  list,
  eventMap,
  userMap,
};
