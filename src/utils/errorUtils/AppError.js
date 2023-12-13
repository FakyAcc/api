export default class AppError extends Error {
  statusCode;
  status;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = (`${statusCode}`.startsWith("4") || `${statusCode}`.startsWith("5")) ? "fail" : "success";
  }
}
