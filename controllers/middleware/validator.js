function middleware () {
  return function (request, response, next) {
    let bool = false
    if (bool) {
      request.message = 'hello world'
      next()
    } else {
      next('error')
    }
  }
}

module.exports = middleware
