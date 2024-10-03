
import EmailValidator from "./EmailValidator";
import MaxLengthValidator from "./MaxLengthValidator";
import MinLengthValidator from "./MinLengthValidator";
import RequiredValidator from "./RequiredValidator";

class ValidatorFactory {
  static createValidator(type, options = {}) {
    switch (type) {
      case 'required':
        return new RequiredValidator();
      case 'email':
        return new EmailValidator();
      case 'minLength':
        return new MinLengthValidator(options.length);
      case 'maxLength':
        return new MaxLengthValidator(options.length);
      // 可以根據需要擴展更多的驗證器
      default:
        throw new Error(`未知的驗證類型: ${type}`);
    }
  }
}



export default ValidatorFactory;