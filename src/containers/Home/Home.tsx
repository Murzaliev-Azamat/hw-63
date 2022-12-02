import React, {useCallback, useEffect, useState} from 'react';
import ShortPost from "../../components/ShortPost/ShortPost";
import {Post, PostList} from "../../types";
import axiosApi from "../../axiosApi";


const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const postsResponse = await axiosApi.get<PostList>('/posts.json');
      const posts = Object.keys(postsResponse.data).map(key => {
        const post = postsResponse.data[key];
        post.id = key;
        return post;
      })
      setPosts(posts);
    } finally {
      setLoading(false);
    }
  },[])

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      {posts.map((post) => (
          <ShortPost key={post.id} title={post.title} date={post.date} id={post.id}/>
      ))}
    </div>
  );
};

export default Home;