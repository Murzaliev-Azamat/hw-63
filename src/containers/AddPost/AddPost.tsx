import React, {useState} from 'react';
import PostForm from "../../components/PostForm/PostForm";
import {SendingPost} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const addPost = async (post: SendingPost) => {
    setLoading(true);

    try {
      await axiosApi.post("/posts.json", post);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add new post</h2>
      <PostForm onSubmit={addPost}/>
    </div>
  );
};

export default AddPost;