import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm.jsx';
import Input from '../Input/Input.jsx';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import { EMAIL_VALIDATION_REGEX, messageKeys } from '../../utils/constants';

// Компонент Login реализует форму входа в систему.
function Login({ handleSubmitLogin, isLoading, isLoggedIn }) {
  const {
    isFormValid,
    errors,
    handleChangeValidation,
    setFieldsValidity,
    formValues,
    validateInputField,
    fieldsValidity,
  } = useFormValidation();
  const { email, password } = formValues;

  useEffect(() => {
    // Установка начальной валидности полей при монтировании компонента.
    setFieldsValidity({ name: true, email: true, password: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn) {
    window.location.href = '/movies';
    return null;
  }

  return (
    <AuthForm
      formName="login"
      title="Рады видеть!"
      btnText="Войти"
      onSubmit={(e) => handleSubmitLogin(e, email, password)}
      isFormValid={isFormValid}
      isLoading={isLoading}
    >
      <Input
        title="E-mail"
        className={'input input_type_auth'}
        addClassName={'input_display_block'}
        value={email || ''}
        type="email"
        name="email"
        id="email"
        placeholder="Введите e-mail"
        fieldsValidity={fieldsValidity.email}
        message={errors.email || ''}
        handleChangeValidation={(e) =>
          validateInputField(
            e,
            EMAIL_VALIDATION_REGEX,
            messageKeys.EMAIL_FORMAT_ERROR,
          )
        }
        required
      />
      <Input
        type="password"
        id="password"
        name="password"
        value={password || ''}
        title="Пароль"
        minLength="6"
        placeholder="Введите пароль"
        fieldsValidity={fieldsValidity.password}
        message={errors.password || ''}
        handleChangeValidation={handleChangeValidation}
        className={'input input_type_auth'}
        addClassName={'input_display_block'}
        required
      />
    </AuthForm>
  );
}

export default Login;
