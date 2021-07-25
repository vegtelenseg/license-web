import { Redirect, Route, RouteProps } from "react-router-dom";

import auth from "../utils/auth";

console.log("Yo: ", auth.getToken());
const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => (
  <Route
    {...rest}
    render={(props) =>
      auth.getToken() !== null ? (
        // @ts-ignore
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "auth/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
