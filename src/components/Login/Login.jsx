import React, { useState } from 'react';

import AuthForm from '../AuthForm/AuthForm.jsx';
import Input from '../Input/Input.jsx';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <AuthForm
      formName="login"
      title="Рады видеть!"
      btnText="Войти"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        title="E-mail"
        name="email"
        type="email"
        className={"input input_type_auth"}
        addClassName={"input_display_block"}
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

export default Login;
