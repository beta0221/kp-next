
class RequiredValidator {
  validate(value) {
    return value !== undefined && value !== null && value !== '';
  }

  getErrorMessage() {
    return '此欄位為必填';
  }
}

export default RequiredValidator;
