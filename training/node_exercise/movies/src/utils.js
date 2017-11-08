exports.initHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}

exports.handleUndefinedRoutes = (req, res, next) => {
  const err = new Error('Resource not found');
  err.status = 404;
  next(err);
}

exports.handleError = (err, req, res, next) => {
  const message = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err,
  });
}
