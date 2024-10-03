class MinLengthValidator {
  constructor(length) {
    this.length = length;
  }

  validate(value) {
    return value.length >= this.length;
  }

  getErrorMessage() {
    return `長度不能少於 ${this.length} 個字`;
  }
}

export default MinLengthValidator;
