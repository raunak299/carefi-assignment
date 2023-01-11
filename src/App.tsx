import { IonApp, setupIonicReact } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home/Home";
import PhotoDetails from "./pages/PhotoDetails/PhotoDetails";
import Login from "./pages/Login/Login";

import { useContext } from "react";
import AuthContext from "./store/authContext";
import "./App.css";

setupIonicReact();

const App: React.FC = () => {
  const { login } = useContext(AuthContext);
  const isAuth = login === "true" ? true : false;
  // console.log(login);

  return (
    <IonApp className="ion-no-padding">
      <IonReactRouter>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route
          exact
          path="/photoDetails/:photoId"
          render={() => {
            return isAuth ? <PhotoDetails /> : <Login />;
          }}
        />

        <Route exact path="/login">
          <Login />
        </Route>

        <Route path="" exact>
          <Redirect to="/home" />
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
