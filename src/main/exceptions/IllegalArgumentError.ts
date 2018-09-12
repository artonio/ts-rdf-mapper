/**
 * Thrown when some combination of [[IRdfProperty]] keys are not allowed
 */
export class IllegalArgumentError extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = 'IllegalArgumentError';
        Object.setPrototypeOf(this, IllegalArgumentError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
