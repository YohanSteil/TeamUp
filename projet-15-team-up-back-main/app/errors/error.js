/**
 * @typedef {object} ApiError
 * @property {number} status - Le code d'état HTTP associé à l'erreur
 * @property {string} message - Le message d'erreur décrivant l'erreur survenue
 */

export default class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
