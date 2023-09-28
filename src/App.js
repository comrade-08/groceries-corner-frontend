import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Router from "./components/router";
import NavBar from "./components/navBar";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import session from "./helpers/session";
// import Footer from "./components/Footer";

function App() {
  const [isLoginUser, setIsLogin] = useState(false)

  useEffect(() => {
    setIsLogin(session.isLoginUser())
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        {isLoginUser ? (<NavBar />) : (<Header />)}
        <Router />
        <ToastContainer />
      </div>
      {/* {!isLoginUser && (<Footer />)} */}
    </BrowserRouter>
  );
}

export default App;
