const MD5 = require("md5");

module.exports = {
  md5: function(text, salt) {
    return MD5(salt + text + salt);
  },
  /**
   * Get a rounded number by n digits after the point
   *
   * @param {Number} number - the input number
   * @param {Number} digit - digit number
   */
  round: function(number, digit) {
    return Math.round(number * Math.pow(10, digit)) / Math.pow(10, digit);
  }
};
