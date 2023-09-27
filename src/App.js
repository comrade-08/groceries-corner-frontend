import { ToastContainer } from "react-toastify";
import Header from "./components/header";
import Router from "./components/router";
// import NavBar from "./components/navBar";

function App() {

  return (
    <div className="app">
      <Header />
      <Router />
      {/* <NavBar /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
