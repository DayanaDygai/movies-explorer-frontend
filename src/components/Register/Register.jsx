import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm.jsx';
import Input from '../Input/Input.jsx';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import {
  EMAIL_VALIDATION_REGEX,
  NAME_VALIDATION_REGEX,
  messageKeys,
} from '../../utils/constants';

// Компонент регистрации
function Registration({ handleSubmitRegistration, isLoading }) {
  // Деструктуризация свойств из хука валидации формы
  const {
    isFormValid,
    errors,
    handleChangeValidation,
    fieldsValidity,
    setFieldsValidity,
    formValues,
    validateInputField,
  } = useFormValidation();
  const { name, email, password } = formValues; // Деструктуризация значений из состояния формы

  // Эффект для установки начальной валидности полей формы при монтировании компонента
  useEffect(() => {
    setFieldsValidity({ name: true, email: true, password: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthForm
      formName="registration"
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      onSubmit={(e) => handleSubmitRegistration(e, name, email, password)}
      isFormValid={isFormValid}
      isLoading={isLoading}
    >
      {/* Поле ввода имени */}
      <Input
        title="Имя"
        name="name"
        type="text"
        className="input input_type_auth"
        addClassName="input_display_block"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        message={errors.name || ''}
        fieldsValidity={fieldsValidity.name}
        handleChangeValidation={(e) =>
          validateInputField(
            e,
            NAME_VALIDATION_REGEX,
            messageKeys.NAME_FORMAT_ERROR,
          )
        }
      />

      {/* Поле ввода электронной почты */}
      <Input
        title="E-mail"
        name="email"
        type="email"
        className="input input_type_auth"
        addClassName="input_display_block"
        required
        minLength="2"
        maxLength="40"
        value={email || ''}
        fieldsValidity={fieldsValidity.email}
        message={errors.email || ''}
        handleChangeValidation={(e) =>
          validateInputField(
            e,
            EMAIL_VALIDATION_REGEX,
            messageKeys.EMAIL_FORMAT_ERROR,
          )
        }
      />

      {/* Поле ввода пароля */}
      <Input
        title="Пароль"
        name="password"
        type="password"
        className="input input_type_auth"
        addClassName="input_display_block"
        required
        minLength="6"
        maxLength="20"
        value={password || ''}
        fieldsValidity={fieldsValidity.password}
        message={errors.password || ''}
        handleChangeValidation={handleChangeValidation}
      />
    </AuthForm>
  );
}

export default Registration;
