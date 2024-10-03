class EmailValidator {
  validate(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  getErrorMessage() {
    return '請輸入有效的電子郵件地址';
  }
}

export default EmailValidator;
