import React from "react";
import { photoDataType } from "../types/photoData.types";

const galleryContext = React.createContext<{
  photoData: photoDataType;
  setPhotoDataHandler: (photoData: photoDataType) => void;
}>({
  photoData: {
    total: 0,
    total_pages: 0,
    results: [],
  },
  setPhotoDataHandler: () => {},
});

export default galleryContext;
