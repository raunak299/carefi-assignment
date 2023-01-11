import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";

import { useContext, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../../store/authContext";

const Login = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  type stateType = {
    from: string;
  };
  const location = useLocation<stateType>();
  //   console.log(location);
  console.log(location);
  const history = useHistory();
  //   console.log()

  const { login, email, setLoginHandler, setLogoutHandler } =
    useContext(AuthContext);
  const loginHandler = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    if (emailRef.current?.value === "" || passwordRef.current?.value === "") {
      setShowAlert(true);
    }
    const email = emailRef.current?.value + "" ?? "";
    console.log(location.pathname);
    setLoginHandler(email, location.pathname);
  };

  const logoutHandler = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    setLogoutHandler();
    history.push("/home");
  };

  const isAuthed = login === "true" ? true : false;

  const [showAlert, setShowAlert] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Link to="/home">
            <IonButton>Home</IonButton>
          </Link>
        </IonToolbar>
      </IonHeader>
      <IonGrid fixed={true} className="ion-margin-top">
        {showAlert && (
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Alert"}
            message={"No field can be empty"}
            buttons={["OK"]}
          />
        )}

        {isAuthed && (
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8" size-lg="5.5">
              <IonCard>
                <IonRow className="ion-justify-content-center ion-padding">
                  <IonCardTitle>
                    Welcome<IonCardHeader>{email}</IonCardHeader>
                  </IonCardTitle>
                </IonRow>
                <IonRow className="ion-justify-content-center ion-padding">
                  <IonButton onClick={logoutHandler}>Logout</IonButton>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
        )}

        {!isAuthed && (
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8" size-lg="5.5">
              <IonCard>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    placeholder="Johndoe@gmail.com"
                    ref={emailRef}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    placeholder="Enter password"
                    ref={passwordRef}
                  ></IonInput>
                </IonItem>

                <IonRow className="ion-justify-content-center ion-padding">
                  <IonButton onClick={loginHandler}>Login</IonButton>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
    </IonPage>
  );
};

export default Login;
