import React, {useState} from 'react';
import PostForm from "../../components/PostForm/PostForm";
import {SendingPost} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const AddPost = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const addPost = async (post: SendingPost) => {
    try {
      setLoading(true);
      await axiosApi.post("/posts.json", post);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  let info = (
    <div>
      <h4 className="mt-2 mb-2">Add new post</h4>
      <PostForm onSubmit={addPost}/>
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

export default AddPost;