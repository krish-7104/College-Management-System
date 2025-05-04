class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static conflict(message = "Conflict") {
    return new ApiResponse(409, null, message);
  }

  static success(data, message = "Success") {
    return new ApiResponse(200, data, message);
  }

  static created(data, message = "Created successfully") {
    return new ApiResponse(201, data, message);
  }

  static noContent(message = "No content") {
    return new ApiResponse(204, null, message);
  }

  static badRequest(message = "Bad request") {
    return new ApiResponse(400, null, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiResponse(401, null, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiResponse(403, null, message);
  }

  static notFound(message = "Not found") {
    return new ApiResponse(404, null, message);
  }

  static internalServerError(message = "Internal server error") {
    return new ApiResponse(500, null, message);
  }

  static error(message = "Error", statusCode = 500) {
    return new ApiResponse(statusCode, null, message);
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = ApiResponse;
