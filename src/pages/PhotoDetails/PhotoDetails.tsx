import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonPage,
  IonRow,
  IonSpinner,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { fetchPhotoDetails } from "../../fetchPhotos/fetchPhotos";
import { photoDetailType } from "../../types/photoData.types";
import "./PhotoDetails.css";

const PhotoDetails: React.FC<{ photoUrl: string }> = (props) => {
  const { photoId } = useParams<{ photoId: string }>();
  type stateType = {
    photoUrl: string;
  };
  const location = useLocation<stateType>();

  let photoUrl = "https://ionicframework.com/docs/img/demos/card-media.png";
  if (location.state?.photoUrl) {
    photoUrl = location.state.photoUrl;
  }

  const [photoInfo, setPhotoInfo] = useState<photoDetailType>({
    description: "",
    downloads: "",
    likes: "",
    user: { name: "" },
  });
  const accesskey = "lU77s5_33qBsXTJAAUOa_TfnVPiSnkSz2LmXFpIRzkE";
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const PHOTO_DETAIL_URL = `https://api.unsplash.com/photos/${photoId}?client_id=${accesskey}`;
    (async () => {
      const { description, downloads, likes, user } = await fetchPhotoDetails(
        PHOTO_DETAIL_URL
      );
      //   console.log(id);
      setPhotoInfo({ description, downloads, likes, user });
      setLoading(false);
    })();
  }, [photoId]);

  return (
    <IonPage>
      <IonGrid fixed={true}>
        {loading && (
          <IonRow className="ion-justify-content-center ">
            {loading && (
              <IonItem>
                <IonSpinner name="circular"></IonSpinner>
              </IonItem>
            )}
          </IonRow>
        )}
        {!loading && (
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="7.5">
              <IonCard>
                <img
                  alt="Silhouette of mountains"
                  src={photoUrl}
                  className="photo"
                />
                <IonCardHeader>
                  <IonCardTitle className="ion-text-uppercase title">
                    {photoInfo.description}
                  </IonCardTitle>
                  <IonCardTitle>
                    Downloads
                    <IonCardSubtitle>{photoInfo.downloads}</IonCardSubtitle>
                  </IonCardTitle>
                  <IonCardTitle>
                    Likes<IonCardSubtitle>{photoInfo.likes}</IonCardSubtitle>
                  </IonCardTitle>
                  <IonCardTitle>
                    User<IonCardSubtitle>{photoInfo.user.name}</IonCardSubtitle>
                  </IonCardTitle>
                </IonCardHeader>
                {/* 
          <IonCardContent>
            Here's a small text description for the card content. Nothing more,
            nothing less.
          </IonCardContent> */}
              </IonCard>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
    </IonPage>
  );
};

export default PhotoDetails;
