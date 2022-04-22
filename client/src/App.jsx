import { useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavPanel from "./components/structure/NavPanel";
import Navbar from "./components/structure/Navbar";
import Operations from "./components/pages/Operations";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/utils/ProtectedRoute";

import ScrollToTop from "./components/utils/ScrollToTop";

import "./static/css/structure.css";

function App() {
  const navPanelRef = useRef(0);
  return (
    <Router>
      <Toaster
        toastOptions={{
          className: "customToast",
        }}
      />
      <div className="main d-flex">
        <NavPanel navPanelRef={navPanelRef} />
        <div className="w-100">
          <Navbar navPanelRef={navPanelRef} />
          <ScrollToTop />
          <div className="content w-100">
            <Switch>
              {/* <Route path="/" exact>
                <Operations />
              </Route> */}
              <ProtectedRoute path="/operations" exact>
                <Operations />
              </ProtectedRoute>
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
