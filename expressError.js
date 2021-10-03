class ExpressError extends Error {
  constructor(message = 'Something Went Wrong', status = 500) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}

module.exports = ExpressError;
