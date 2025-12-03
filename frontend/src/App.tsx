import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryComponent from "./components/CategoryComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlashcardComponent from "./components/FlashcardComponent.tsx";
import LLMChatComponent from "./components/LLMChatComponent.tsx";
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
          <Route path="/flashcards/:id" element={<FlashcardComponent />}></Route>
            <Route path="/llmChat" element={<LLMChatComponent />}></Route>
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
