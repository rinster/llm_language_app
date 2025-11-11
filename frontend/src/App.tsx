import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryComponent from "./components/CategoryComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import HomePageComponent_v2 from "./components/HomePageComponent_v2";
import SignInComponent from "./components/auth/SignInComponent";
import SignUpComponent from "./components/auth/SignUpComponent";
import UsersComponents from "./components/UsersComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent_v2 />}></Route>
          <Route path="/categories" element={<CategoryComponent />}></Route>
          <Route path="/users" element={<UsersComponents />}></Route>
          <Route path="/signin" element={<SignInComponent />}></Route>
          <Route path="/signup" element={<SignUpComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
