import React, {useState} from 'react';
import AuthForm from '../AuthForm/AuthForm.jsx';
import Input from '../Input/Input.jsx';

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthForm
      formName="registration"
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
    >
      <Input
        title="Имя"
        name="name"
        type="text"
        className={"input input_type_auth"}
        addClassName={"input_display_block"}
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        title="E-mail"
        name="email"
        type="email"
        className={"input input_type_auth"}
        addClassName={"input_display_block"}
        required
        minLength="2"
        maxLength="40"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        title="Пароль"
        name="password"
        type="password"
        className={"input input_type_auth"}
        addClassName={"input_display_block"}
        required
        minLength="6"
        maxLength="20"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthForm>
  );
}

export default Registration;
