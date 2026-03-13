/**
 * Request/response logger middleware.
 * Logs method, path, status, and duration for every request.
 */
const logger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  // Log when the response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const tag = status >= 500 ? "ERR" : status >= 400 ? "WARN" : "OK";
    const color =
      status >= 500 ? "\x1b[31m" : status >= 400 ? "\x1b[33m" : "\x1b[32m";
    const reset = "\x1b[0m";

    console.log(
      `${color}[${tag}]${reset} ${method} ${originalUrl} ${status} ${duration}ms`,
    );
  });

  next();
};

export default logger;
