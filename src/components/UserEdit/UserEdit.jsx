import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import Profile from '../Profile/Profile.jsx';
import Input from '../Input/Input.jsx';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import {
  EMAIL_VALIDATION_REGEX,
  NAME_VALIDATION_REGEX,
  messageKeys,
} from '../../utils/constants';

// Компонент для редактирования данных пользователя
function UserEdit({ handleUpdateUser, handleLogout, isLoading }) {
  const {
    isFormValid,
    errors,
    fieldsValidity,
    setFieldsValidity,
    formValues,
    resetForm,
    setFormValues,
    validateInputField,
  } = useFormValidation();
  const { name, email } = formValues;

  const currentUser = useContext(CurrentUserContext);

  // Обновление значений формы при изменении данных пользователя или состояния загрузки
  useEffect(() => {
    resetForm();
    setFieldsValidity({ name: true, email: true });
    setFormValues({
      name: currentUser.name || '',
      email: currentUser.email || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); // Зависимость от currentUser

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formValues);
    handleUpdateUser(formValues);
  }

  return (
    <Profile
      isLoading={isLoading}
      isFormValid={isFormValid}
      formName="useredit"
      SubmitBtnText="Редактировать"
      ExitBtnText="Выйти из аккаунта"
      name={name}
      handleSubmit={handleSubmit}
      handleLogout={handleLogout}
    >
      {/* Поле ввода имени пользователя */}
      <Input
        fieldsValidity={fieldsValidity}
        title="Имя"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        value={name || ''}
        handleChangeValidation={(e) =>
          validateInputField(
            e,
            NAME_VALIDATION_REGEX,
            messageKeys.NAME_FORMAT_ERROR,
          )
        }
        errors={errors}
        className="input input_type_useredit"
        addClassName="input_display_block"
      />
      {/* Поле ввода электронной почты пользователя */}
      <Input
        fieldsValidity={fieldsValidity}
        title="E-mail"
        name="email"
        type="email"
        minLength="6"
        maxLength="40"
        value={email || ''}
        handleChangeValidation={(e) =>
          validateInputField(
            e,
            EMAIL_VALIDATION_REGEX,
            messageKeys.EMAIL_FORMAT_ERROR,
          )
        }
        errors={errors}
        className="input input_type_useredit"
        addClassName="input_display_block"
        required
      />
    </Profile>
  );
}

export default UserEdit;
