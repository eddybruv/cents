import { ApiError } from "../lib/ApiError.js";

/**
 * Global error handler. Must be registered AFTER all routes.
 *
 * Produces a consistent JSON envelope:
 *   { error: "User-facing message", code: "ERROR_CODE", details?: ... }
 *
 * - ApiError instances → use their status + message
 * - Plaid errors       → extract status & message from response
 * - Everything else    → 500 with generic message (no internal leak)
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  // Already sent headers — let Express close the connection
  if (res.headersSent) return;

  let status = 500;
  let message = "Internal server error";
  let code = "INTERNAL_ERROR";
  let details = null;

  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    code = codeFromStatus(status);
    details = err.details ?? null;
  } else if (err?.response?.data) {
    // Plaid / Axios upstream error
    status = err.response.status || 500;
    message = err.response.data?.error_message || err.response.data?.error || message;
    code = err.response.data?.error_code || codeFromStatus(status);
  }

  // Always log the full error server-side
  console.error(
    `\x1b[31m[ERR]\x1b[0m ${req.method} ${req.originalUrl} ${status} — ${message}`,
  );
  if (process.env.NODE_ENV !== "production" && !(err instanceof ApiError)) {
    console.error(err);
  }

  const body = { error: message, code };
  if (details) body.details = details;

  res.status(status).json(body);
};

function codeFromStatus(status) {
  switch (status) {
    case 400:
      return "BAD_REQUEST";
    case 401:
      return "UNAUTHORIZED";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "NOT_FOUND";
    case 409:
      return "CONFLICT";
    case 422:
      return "VALIDATION_ERROR";
    default:
      return "INTERNAL_ERROR";
  }
}

export default errorHandler;
