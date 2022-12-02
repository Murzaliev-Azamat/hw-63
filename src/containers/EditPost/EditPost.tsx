import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {Post, SendingPost} from "../../types";
import PostForm from "../../components/PostForm/PostForm";
import Spinner from "../../components/Spinner/Spinner";

const EditPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOnePost = useCallback(async () => {
    try {
      setLoading(true);
      const postResponse = await axiosApi.get<Post>('/posts/' + id + '.json');
      setPost(postResponse.data);
    } finally {
      setLoading(false);
    }
  },[id])

  useEffect(() => {
    fetchOnePost().catch(console.error);
  },[fetchOnePost]);

  const updatePost = async (post: SendingPost) => {
    setLoading(true);

    try {
      setLoading(true);
      await axiosApi.put("/posts/" + id + '.json', post);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  let info = (
    <div>
      {post && (<PostForm existingPost={post} onSubmit={updatePost}/>)}
    </div>
  );

  if (loading) {
    info = <Spinner/>
  }

  return (
    <>
      {info}
    </>
  );
};

export default EditPost;