import React, { useCallback, useState } from "react";
import { photoDataType } from "../types/photoData.types";
import galleryContext from "./galleryContext";

const GalleryContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [photoData, setPhotoData] = useState<photoDataType>({
    total: 0,
    total_pages: 0,
    results: [],
  });

  const setPhotoDataHandler = useCallback((data: photoDataType) => {
    setPhotoData(data);
  }, []);

  const currValue = {
    photoData,
    setPhotoDataHandler,
  };

  return (
    <galleryContext.Provider value={currValue}>
      {props.children}
    </galleryContext.Provider>
  );
};

export default GalleryContextProvider;
