import { useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavPanel from "./components/structure/NavPanel";
import Navbar from "./components/structure/Navbar";
import Operations from "./components/pages/Operations";
import Login from "./components/pages/Login";
import Courses from "./components/pages/Courses";
import Profile from "./components/pages/Profile";
import AboutOperations from "./components/pages/AboutOperation";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Register from "./components/pages/Register";
import ScrollToTop from "./components/utils/ScrollToTop";
import NewsCard from "./components/operations/NewsCard"
import CreateOperation from "./components/pages/CreateOperation";
import NewsList from "./components/pages/NewsList";
import Contacts from "./components/pages/Contacts";

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
              <ProtectedRoute path="/operations" exact>
                <Operations />
              </ProtectedRoute>
            
              <ProtectedRoute path="/operations/:id">
                <AboutOperations />
                </ProtectedRoute>

              <ProtectedRoute path="/" exact>
                {/* <Operations /> */}
                <Profile />

              </ProtectedRoute>
              <ProtectedRoute path="/events">
                <Courses />
              </ProtectedRoute>
              
              <ProtectedRoute path="/operations/create">
                <CreateOperation />
              </ProtectedRoute>
              <ProtectedRoute path="/operations/:id">
                <AboutOperations />
              </ProtectedRoute>
              <Route path="/news">
                <NewsList />
              </Route>
              <Route path="/contacts">
                <Contacts />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
