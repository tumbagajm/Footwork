import "./App.css";
import AppNavBar from './components/AppNavBar';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserProvider } from "./UserContext";

function App() {
  const [user, setUser] = useState({
    id: null,
    email: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {

        setUser({
          id: data._id,
          email: data.email,
          isAdmin: data.isAdmin,
          firstName: data.firstName,
          lastName: data.lastName
        });
      });
    }
  }, [])

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<ErrorPage />} path="*" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<LogoutPage />} path="/logout" />
          <Route element={<RegisterPage />} path="/register" />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
