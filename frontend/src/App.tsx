import UsersComponents from "./components/UsersComponent";
import "./App.css";
import CategoryComponent from "./components/CategoryComponent";
import HomePageComponent_v2 from "./components/HomePageComponent_v2";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeAuth } from "./services/AuthService";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Initialize auth token on app load
    initializeAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent_v2 />}></Route>
          <Route path="/categories" element={<CategoryComponent />}></Route>
          <Route path="/users" element={<UsersComponents />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
