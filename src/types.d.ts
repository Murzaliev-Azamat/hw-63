export interface Post {
  id: string;
  date: string;
  title: string;
  message: string;
}

export interface SendingPost {
  date: string;
  title: string;
  message: string;
}

export interface PostList {
  [id: string]: Post;
}