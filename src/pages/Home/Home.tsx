import {
  IonCol,
  IonGrid,
  IonItem,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSpinner,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";

import "./Home.css";
import Pagination from "../../components/Pagination/Pagination";
import galleryContext from "../../store/galleryContext";
import { fetchPhotos } from "../../fetchPhotos/fetchPhotos";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  //   const secretkey = "XQ7bvHH6rBXc7WaSAV7bWhAW80Rk64ifT3giQcov1Qk";
  const accesskey = "lU77s5_33qBsXTJAAUOa_TfnVPiSnkSz2LmXFpIRzkE";
  const [keyword, setKeyword] = useState<string>("random");

  const { photoData, setPhotoDataHandler } = useContext(galleryContext);
  const { total_pages: totalPages, results: photoList } = photoData;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const PHOTO_BY_KEYWORD_URL = `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${accesskey}`;
    (async () => {
      const { total, total_pages, results } = await fetchPhotos(
        PHOTO_BY_KEYWORD_URL
      );
      // console.log(results);
      setPhotoDataHandler({ total, total_pages, results });
      setLoading(false);
    })();
  }, [keyword, setPhotoDataHandler]);

  const searchPhotoHandler = (e: React.KeyboardEvent) => {
    // console.log(e);
    let tempkeyword = (e.target as HTMLIonSearchbarElement).value;
    if (!tempkeyword) {
      return;
    }
    setKeyword(tempkeyword);
  };

  return (
    <IonPage>
      <IonGrid fixed={true}>
        <IonRow className="search-bar ion-justify-content-center">
          <IonSearchbar
            show-clear-button="always"
            placeholder="search image"
            onKeyUp={searchPhotoHandler}
            className="search-bar"
          ></IonSearchbar>
        </IonRow>

        <IonRow className="img-container ion-justify-content-center">
          {loading && (
            <IonItem>
              <IonSpinner name="circular"></IonSpinner>
            </IonItem>
          )}

          {!loading && photoList.length === 0 && <h1>No image Found !!</h1>}

          {!loading &&
            photoList.map((photo, index) => (
              <IonCol size="12" size-md="12" size-lg="5.5" key={index}>
                <Link
                  to={{
                    pathname: `photoDetails/${photo.id}`,
                    state: {
                      photoUrl: photo.urls.regular,
                    },
                  }}
                >
                  <img src={photo.urls.regular} alt="" loading="lazy" />
                </Link>
              </IonCol>
            ))}
        </IonRow>

        {!loading && totalPages > 0 && <Pagination keyword={keyword} />}
      </IonGrid>
    </IonPage>
  );
};

export default Home;
