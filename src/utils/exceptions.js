export class Exception {
  #error;
  #statusCode;

  constructor({ error, statusCode }) {
    this.#error = error;
    this.#statusCode = statusCode;
  }

  get error() {
    return this.#error;
  }

  get statusCode() {
    return this.#statusCode;
  }
}

export class InternalServerException extends Exception {
  constructor() {
    super({ error: "Internal server error", statusCode: 500 });
  }
}

export class UnauthorizedException extends Exception {
  constructor(error) {
    super({ error: error, statusCode: 401 });
  }
}

export class NotFoundException extends Exception {
  constructor(error) {
    super({ error: error, statusCode: 404 });
  }
}

export class BadRequestException extends Exception {
  constructor(error) {
    super({ error: error, statusCode: 400 });
  }
}
