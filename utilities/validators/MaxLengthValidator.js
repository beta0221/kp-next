class MaxLengthValidator {
  constructor(length) {
    this.length = length;
  }

  validate(value) {
    return value.length <= this.length;
  }

  getErrorMessage() {
    return `長度不能超過 ${this.length} 個字`;
  }
}

export default MaxLengthValidator;
