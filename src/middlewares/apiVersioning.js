const apiVersioning = (req, res, next) => {
  res.setHeader('X-API-Version', '1.0.0');
  next();
};

module.exports = apiVersioning;
