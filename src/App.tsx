import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
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

setupIonicReact();

const App: React.FC = () => {
  // const accesskey = "lU77s5_33qBsXTJAAUOa_TfnVPiSnkSz2LmXFpIRzkE";
  // const secretkey = "XQ7bvHH6rBXc7WaSAV7bWhAW80Rk64ifT3giQcov1Qk";

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route exact path="/home" component={Home} />
          <Route exact path="/photoDetails/:photoId" component={PhotoDetails} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
