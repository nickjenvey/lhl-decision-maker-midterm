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

    parseForm: function(body) {
      const form = {};
      form.admin_url = this.generateId();
      form.user_url = this.generateId();
      form.question = body.question;
      form.numOptions = body["num-options"];
      form.email = body.email;
      form.options = {};
      for (let i = 0; i < form.numOptions; i++) {
        form.options[body[`option${i+1}`]] = 0;
      }
      return form;
    },
  };
};
