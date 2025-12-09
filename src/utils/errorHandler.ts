export class AppError extends Error {
    constructor(public statusCode: number, public message: string, public isOptional = true) {
        super(message)
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor)
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource Not Found') {
        super(404, message)
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Validation Failed') {
        super(400, message)
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Resource Already Exists') {
        super(409, message)
    }
}
export class ForbiddenError extends AppError {
    constructor(message = 'Resource Already Exists') {
        super(403, message)
    }
}