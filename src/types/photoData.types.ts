export type photoDataType = {
    total: number;
    total_pages: number;
    results: { urls: {regular:string}; id: string }[];
  };

  export type photoDetailType = {
    description:string, downloads:string, likes:string, user : {name:string}, urls:{regular:''},
  }