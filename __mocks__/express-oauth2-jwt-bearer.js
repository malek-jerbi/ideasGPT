const mockExpressOauth2JwtBearer = {
  auth: () => (req, res, next) => {
    next()
  },
}

export default mockExpressOauth2JwtBearer
