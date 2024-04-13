export default class HttpResponse {
  #statusCode;
  constructor({ statusCode, data, error, message }) {
    this.#statusCode = statusCode ?? 200;
    this.data = data ?? null;
    this.error = error ?? null;
    this.message = message ?? "";
  }

  static fromException(exception) {
    return new HttpResponse({
      statusCode: exception.statusCode,
      error: exception.error,
      message: exception.message,
      data: null,
    });
  }

  get statusCode() {
    return this.#statusCode;
  }
}
