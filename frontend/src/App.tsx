import UsersComponents from "../src/components/UsersComponent";
import "./App.css";
import CategoryComponent from "./components/CategoryComponent";
import HomePageComponent_v2 from "./components/HomePageComponent_v2";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent_v2 />}></Route>
          <Route path="/categories" element={<CategoryComponent />}></Route>
          <Route path="/users" element={<UsersComponents />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
