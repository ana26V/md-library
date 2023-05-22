export interface Book {
    _id: string,
    title: string,
    author:string,
    description: string,
    owner: {
      _id: string;
      email: string;
      firstName:string,
      lastName:string
    },
    coverImage: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    coverImageURL: string;
    id: string;
  }