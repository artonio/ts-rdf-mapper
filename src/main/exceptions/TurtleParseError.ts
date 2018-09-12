/**
 * Thrown when invalid turtle string is passed to deserialize function
 */
export class TurtleParseError extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = 'TurtleParseError';
        Object.setPrototypeOf(this, TurtleParseError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
