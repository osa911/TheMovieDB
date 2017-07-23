module.exports = function (bool, statusCode, message, addedField) {
  var responce = {
    success: bool,
    message: message,
    statusCode: statusCode
  };
  if (addedField && typeof addedField === 'object') {
    responce = Object.assign(responce, addedField);
  }
  return responce;
};