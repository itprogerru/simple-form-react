export function createControl(
  config = {
    label: 'Поле',
    type: 'text',
    errorMessage: 'Введите корректные данные',
    value: ''
  },
  validation
) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false
  };
}

export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (validation.maxLength) {
    isValid = value.length > validation.maxLength && isValid;
  }

  if (validation.minLength) {
    isValid = value.length < validation.maxLength && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}

export function addValueControl(formControls, formControlsValue) {
  return Object.keys(formControls).map(controlName => {
    const control = formControls[controlName];
    const value = formControlsValue.hasOwnProperty(controlName) ? formControlsValue[controlName].value : control.value;
    return {
      ...control,
      valid: validate(control.validation, value),
      value
    };
  });
}
