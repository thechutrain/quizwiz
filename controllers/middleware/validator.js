/**
 * @param {array} validKeys - an array of all the valid keys
 * @param {boolean} strictBool - default true, there must be a key
 */
function validator (validKeys, strictBool) {
  return function (req, res, next) {
    let strict = strictBool || true
    let reqKeys = Object.keys(req.body)
    // strict mode
    if (strict) {
      // console.log(validKeys.length)
      // console.log(reqKeys)
      if (validKeys.length !== reqKeys.length) {
        next(new Error('request body is not valid in STRICT MODE'))
      } else {
        Object.keys(req.body).forEach((postKey) => {
          if (validKeys.indexOf(postKey) === -1) {
            next(new Error(`Req post body has invalid key "${postKey}" in STRICT MODE`))
          }
        })
        next()
      }
    }
  }
}
module.exports = validator
