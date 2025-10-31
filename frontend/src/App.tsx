import UsersComponents from "../src/components/UsersComponent";
import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import HomePageComponent from "./components/HomePageComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent />}></Route>
          <Route path="/users" element={<UsersComponents />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
