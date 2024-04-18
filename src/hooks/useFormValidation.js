import { useState, useCallback } from 'react';

export function useFormValidation() {
  const [formValues, setFormValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldsValidity, setFieldsValidity] = useState({});
  const [errors, setErrors] = useState({});

  function handleChangeValidation(e) {
    setIsFormValid(e.target.form.checkValidity());
    //записываем имя инпута и сообщение об ошибке в объект, чтобы потом передать сообщение в <span>
    setErrors({ ...errors, [e.target.name]: e.target.validationMessage });
    //записываем имя инпута и проверку валидности в объект, чтобы использовать подсветку невалидного инпута
    setFieldsValidity({ ...fieldsValidity, [e.target.name]: e.target.checkValidity() });
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function validateInputField(e, regExp, message) {
    regExp.test(e.target.value)
      ? e.target.setCustomValidity('')
      : e.target.setCustomValidity(e.target.validationMessage || message);
    handleChangeValidation(e);
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsValid);
    },
    [setFormValues, setErrors, setIsFormValid]
  );

  return {
    isFormValid,
    setIsFormValid,
    errors,
    setErrors,
    handleChangeValidation,
    fieldsValidity,
    setFieldsValidity,
    resetForm,
    formValues,
    setFormValues,
    validateInputField,
  };
}
