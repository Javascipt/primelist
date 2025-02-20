export class PrimeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PrimeError';
  }
}