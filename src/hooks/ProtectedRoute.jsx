import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
   // Проверяем, залогинен ли пользователь. Если да, то рендерим переданный компонент Component с его пропсами.
  // Если пользователь не залогинен, выполняем переадресацию на страницу входа в систему.
  
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate
      to='/signin'
      replace
    />
  );
};

export default ProtectedRoute;
