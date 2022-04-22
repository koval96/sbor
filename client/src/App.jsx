import { useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavPanel from "./components/structure/NavPanel";
import Navbar from "./components/structure/Navbar";
import Operations from "./components/pages/Operations";
import Login from "./components/pages/Login";
import AboutOperations from "./components/pages/AboutOperation";

import "./static/css/structure.css";


function App() {
  const navPanelRef = useRef(0);
  return (
    <Router>
      <div className="main d-flex">
        <NavPanel navPanelRef={navPanelRef} />
        <div className="w-100">
          <Navbar navPanelRef={navPanelRef} />
          <div className="content w-100">
            <Switch>
              <Route path="/" exact>
                {/* <Operations /> */}
                <AboutOperations />
              </Route>
              <Route path="operations">
                <AboutOperations />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
