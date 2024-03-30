import React from 'react';

import Profile from '../Profile/Profile.jsx';
import Input from '../Input/Input.jsx';


function UserEdit() {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Profile
      formName="useredit"
      title="Виталий"
      SubmitBtnText="Редактировать"
      ExitBtnText="Выйти из аккаунта"
      onSubmit={handleSubmit}
    >
      <Input
        title="Имя"
        name="name"
        id="name"
        minLength="2"
        maxLength="40"
        required
        type="text"
        value="Виталий"
        className={"input input_type_useredit input_type_useredit-border"}
        addClassName={"input_type_useredit-conteiner"}

      />
      <Input
        title="E-mail"
        name="email"
        id="email"
        minLength="6"
        maxLength="40"
        type="email"
        value="pochta@yandex.ru"
        className={"input input_type_useredit"}
        addClassName={"input_type_useredit-conteiner"}
        required
      />
    </Profile>
  );
}

export default UserEdit;
