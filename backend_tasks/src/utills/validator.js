const moment = require("moment");

const isValidDate = (value, format = "MM/DD/YYYY") => {
  if (moment(value, format, true).isValid()) return true;
  return false;
};

module.exports = {
  isValidDate
};
