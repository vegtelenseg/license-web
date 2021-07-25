import "./App.css";
import "antd-mobile/dist/antd-mobile.css";
import "antd/dist/antd.css";
import { Profile } from "./containers/Profile/Profile";
import PrivateRoute from "./containers/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./containers/Login";
import { LookUp } from "./containers/Lookup/Lookup";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/auth/login"]} component={Login} />
        <PrivateRoute path='/profile' component={Profile} exact />
        <PrivateRoute path='/lookup' component={LookUp} exact />
      </Switch>
    </Router>
  );
}

export default App;
