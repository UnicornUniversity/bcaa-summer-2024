function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  return date instanceof Date && !isNaN(date);
}

module.exports = validateDateTime;
