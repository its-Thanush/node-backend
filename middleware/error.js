function errorHandler(err, req, res, next) {
  console.error(`[${req.method}] ${req.path}`, err.message ?? err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: "Validation failed",
      issues: err.issues
    });
  }

  if (err.code === 'P2002') {
    return res.status(400).json({ error: 'Value already exists' });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found' });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'something went wrong'
  });
}

module.exports = errorHandler;