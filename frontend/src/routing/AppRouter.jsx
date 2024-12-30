import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuthState } from "../providers/AuthProvider";
import LoadingFallback from "../components/mentalyc/DefaultLayout/LoadingFallback";
import { isProd } from "@/utils/envHelpers";


const load = (importFn) => {
  return React.lazy(async () =>
    importFn().catch((err) => {
      if (isProd()) {
        window.location.reload();
        return { default: () => null };
      } else {
        throw err;
      }
    })
  );
};
const Login = load(() => import("../containers/Login"));

const Page404 = load(() => import("../containers/Page404"));


const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthState();
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

const AppRouter = () => {

  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <Switch>
        <UnauthenticatedRoute exact path="/" name="Signin" component={Login} />
        <UnauthenticatedRoute exact path="/login" name="Signin" component={Login} />
        <Route exact path="/lost" name="404" component={Page404} />
        </Switch>
    </React.Suspense>
  );
};

export default AppRouter;
