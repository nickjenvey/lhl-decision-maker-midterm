const data = require('./example-data');

module.exports = function dataHelper() {
  return {
    getData: () => {
      console.log(data);
    },
    //generate a string of 6 random alphanumeric characters
    generateId: () => {
      const result = [];
      for (let i = 0; i < 6; i++) {
        let r = Math.floor(Math.random() * 62);
        if (r < 26) {
          result.push(String.fromCharCode(65 + r));
        } else if (r < 52) {
          result.push(String.fromCharCode(r + 71));
        } else result.push(String.fromCharCode(r - 4));
      }
      return result.join("");
    },
  };
};
