export interface ICategory {
  id: string;
  name: string;
  slug: string;
  published: boolean;
  posts?: IPost[];
}

export interface IAuthor {
  id: string;
  name: string;
  email: string;
}

export interface IThumbnail {
  id: string;
  url: string;
}

export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  categories: ICategory[];
  author?: IAuthor;
  thumbnail: IThumbnail;
}
