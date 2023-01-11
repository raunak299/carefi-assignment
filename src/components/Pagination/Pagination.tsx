import { IonButton, IonCol, IonRow } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { fetchPhotos } from "../../fetchPhotos/fetchPhotos";
import galleryContext from "../../store/galleryContext";

const Pagination: React.FC<{ keyword: string }> = (props) => {
  const { keyword } = props;
  const { photoData, setPhotoDataHandler } = useContext(galleryContext);
  const { total_pages: totalPages } = photoData;
  const pageListSize = 5;
  const [currPage, setCurrentPage] = useState(1);

  const rangeOfPages = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  let [pageList, setPageList] = useState(
    rangeOfPages(1, Math.min(pageListSize, totalPages))
  );

  const nextHandler = () => {
    let firstPage = pageList[0] + pageListSize;
    let lastPage = firstPage + pageListSize - 1;
    if (lastPage > totalPages) {
      lastPage = totalPages;
    }
    setPageList(rangeOfPages(firstPage, lastPage));
  };

  const accesskey = "PTe-wSqxpMzU7WkS5PaFsyAzEyp9JZMWB4XMBxhd7iw";
  useEffect(() => {
    const PHOTO_BY_PAGE_URL = `https://api.unsplash.com/search/photos?page=${currPage}&query=${keyword}&client_id=${accesskey}`;
    (async () => {
      const { total, total_pages, results } = await fetchPhotos(
        PHOTO_BY_PAGE_URL
      );
      setPhotoDataHandler({ total, total_pages, results });
      // setLoading(false);
    })();
  }, [currPage, keyword, setPhotoDataHandler]);

  const prevHandler = () => {
    let lastPage = pageList[0] - 1;
    let firstPage = lastPage - pageListSize + 1;
    setPageList(rangeOfPages(firstPage, lastPage));
  };

  const changeCurrentPageHandler = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <IonRow className="ion-justify-content-center ion-padding ion-wrap">
      {pageList[0] !== 1 && (
        <IonCol size="auto" class="ion-wrap">
          <IonButton onClick={prevHandler} color="dark">
            prev
          </IonButton>
        </IonCol>
      )}
      {pageList.map((page, index) => (
        <IonCol size="auto" key={index} class="ion-wrap">
          <IonButton
            onClick={() => changeCurrentPageHandler(page)}
            defaultValue={page}
            color={currPage === page ? "success" : "primary"}
          >
            {page}
          </IonButton>
        </IonCol>
      ))}
      {pageList[pageList.length - 1] !== totalPages && (
        <IonCol size="auto" class="ion-wrap">
          <IonButton onClick={nextHandler} color="dark">
            next
          </IonButton>
        </IonCol>
      )}
    </IonRow>
  );
};

export default React.memo(Pagination);
