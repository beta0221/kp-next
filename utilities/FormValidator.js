
import ValidatorFactory from "./validators/ValidatorFactory";

class FormValidator {
  constructor(validations) {
    this.validations = validations;
  }

  validateForm(formData) {

    const errors = {};

    for (const field in this.validations) {
      const fieldValidations = this.validations[field];
      const value = formData[field];

      for (const validation of fieldValidations) {
        const validator = ValidatorFactory.createValidator(validation.type, validation.options);
        const isValid = validator.validate(value);

        if (!isValid) {
          let msg = validator.getErrorMessage()
          if (errors[field] === undefined) {
            errors[field] = [msg]
          } else {
            errors[field].push(msg)
          }
        }
      }
    }

    return errors;
  }
}

export default FormValidator;
