/**
 * Typed API error with status code and user-facing message.
 * Throw from controllers/helpers — the global error handler catches it.
 */
export class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }

  static badRequest(message = "Bad request", details) {
    return new ApiError(400, message, details);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static notFound(message = "Not found") {
    return new ApiError(404, message);
  }

  static internal(message = "Internal server error", details) {
    return new ApiError(500, message, details);
  }
}
