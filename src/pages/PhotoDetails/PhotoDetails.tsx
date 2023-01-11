import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonSpinner,
  IonToolbar,
} from "@ionic/react";
import { person } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchPhotoDetails } from "../../fetchPhotos/fetchPhotos";
import { photoDetailType } from "../../types/photoData.types";
import "./PhotoDetails.css";

const PhotoDetails: React.FC = () => {
  const { photoId } = useParams<{ photoId: string }>();

  const [photoInfo, setPhotoInfo] = useState<photoDetailType>({
    description: "",
    downloads: "",
    likes: "",
    user: { name: "" },
    urls: { regular: "" },
  });

  const accesskey = "PTe-wSqxpMzU7WkS5PaFsyAzEyp9JZMWB4XMBxhd7iw";
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const PHOTO_DETAIL_URL = `https://api.unsplash.com/photos/${photoId}?client_id=${accesskey}`;
    (async () => {
      const { description, downloads, likes, user, urls } =
        await fetchPhotoDetails(PHOTO_DETAIL_URL);
      //   console.log(id);
      setPhotoInfo({ description, downloads, likes, user, urls });
      setLoading(false);
    })();
  }, [photoId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Link to="/login">
            <IonButton>
              <IonIcon icon={person} slot="icon-only"></IonIcon>
            </IonButton>
          </Link>
          <Link to="/home">
            <IonButton>Home</IonButton>
          </Link>
        </IonToolbar>
      </IonHeader>

      <IonGrid fixed={true} className="iop-margin-top">
        {loading && (
          <IonRow className="ion-justify-content-center ion-margin-top ">
            {loading && (
              <IonItem>
                <IonSpinner name="circular"></IonSpinner>
              </IonItem>
            )}
          </IonRow>
        )}
        {!loading && photoInfo.user && (
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol size-lg="7.5">
              <IonCard>
                <img
                  alt="Silhouette of mountains"
                  src={photoInfo.urls.regular}
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
