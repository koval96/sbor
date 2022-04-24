import { useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavPanel from "./components/structure/NavPanel";
import Navbar from "./components/structure/Navbar";
import Operations from "./components/pages/Operations";
import Login from "./components/pages/Login";
import Contacts from "./components/pages/Contacts";
import Courses from "./components/pages/Courses";
import Profile from "./components/pages/Profile";
import AboutOperations from "./components/pages/AboutOperation";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import ScrollToTop from "./components/utils/ScrollToTop";
import NewsCard from "./components/operations/NewsCard"
import "./static/css/structure.css";
import News from "./components/operations/News";

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
              <Route path="/" exact>
                <Contacts />
              </Route>
              <ProtectedRoute path="/operations/:id">
                <AboutOperations />
              </ProtectedRoute>
              {/* <Route path="/" exact>
                <Operations />
              </Route> */}
              <ProtectedRoute path="/operations" exact>
                <Operations />
              </ProtectedRoute>
              <ProtectedRoute path="/operations/:id">
                <AboutOperations />
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
