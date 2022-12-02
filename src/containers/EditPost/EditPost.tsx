import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {Post, SendingPost} from "../../types";
import PostForm from "../../components/PostForm/PostForm";

const EditPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOnePost = useCallback(async () => {
    try {
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
      await axiosApi.put("/posts/" + id + '.json', post);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Edit post id={id}</h4>
      {post && (<PostForm existingPost={post} onSubmit={updatePost}/>)}

    </div>
  );
};

export default EditPost;