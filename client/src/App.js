import "./App.css";
import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// redux
import { Provider } from "react-redux";
import stores from "./store";
import Alert from "./components/layouts/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoutes from "./components/routing/PrivateRoutes";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    stores.dispatch(loadUser());
  }, []);

  return (
    <Provider store={stores}>
      <Fragment>
        <Navbar />
        <section className="container">
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoutes component={Dashboard} />} />
            {/* <Route path="/create-profile" element={<PrivateRoutes component={CreateProfile} />} /> */}
            <Route path="/create-profile" element={<CreateProfile />} />
            {/* <Route path="/edit-profile" element={<PrivateRoutes component={EditProfile} />} /> */}
            <Route path="/edit-profile" element={<EditProfile />} />
            {/* <Route path="/add-experience" element={<PrivateRoutes component={AddExperience} />} /> */}
            <Route path="/add-experience" element={<AddExperience />} />
            {/* <Route path="/add-education" element={<PrivateRoutes component={AddEducation} />} /> */}
            <Route path="/add-education" element={<AddEducation />} />
          </Routes>
        </section>
      </Fragment>
    </Provider>
  );
};

export default App;
