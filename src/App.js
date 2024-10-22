import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    // 토큰을 통해 유저정보를 가져온다.
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        // api.defaults.headers["authorization"] = "Bearer " + storedToken;
        // api.js에 작성
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <TodoPage user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

// 원래 코드
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import TodoPage from "./pages/TodoPage";
// import RegisterPage from "./pages/RegisterPage";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<TodoPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       <Route path="/login" element={<LoginPage />} />
//     </Routes>
//   );
// }

// export default App;
