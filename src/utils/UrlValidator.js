const yup = require('yup');

const isUrlValid = async (url) => {
  const urlFormatSchema = yup.string().url();

  const isValid = await urlFormatSchema
    .validate(url)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  return isValid;
};

module.exports = isUrlValid;
