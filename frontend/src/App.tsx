import UsersComponents from "../src/components/UsersComponent";
import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div>
      <HeaderComponent />
      <UsersComponents />
      <FooterComponent />
    </div>
  );
}

export default App;
