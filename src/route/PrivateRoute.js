//rafce + tab -> ES7 React/Redux/GraphQL/React-Native snippets 확장했을 경우 지원
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
  // app.js를 보면 PrivateRoute가 TodoPage를 감싸고 있기 때문에
  // react를 사용시 children에 자동으로 TodoPage가 담긴다.

  return user ? children : <Navigate to="/login" />;
};

// user 값이 있으면? Todopage : redirect to /login

export default PrivateRoute;
