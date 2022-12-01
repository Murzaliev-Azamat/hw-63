import React, {useState} from 'react';
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import {Post} from "../../types";
import Spinner from "../Spinner/Spinner";

interface PostMutation {
  title: string;
  message: string;
}

const PostForm = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState<PostMutation>({
    title: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setPost(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const sendingPost: Post = {
      date: new Date().toString(),
      title: post.title,
      message: post.message,
    }

    try {
      await axiosApi.post("/posts.json", sendingPost);
      navigate('/');
    } finally {
      setLoading(false);
    }

  };

  let form = (
    <form onSubmit={onFormSubmit}>
      <input
        className="d-block"
        type="text"
        name="title"
        placeholder="Введите заголовок"
        value={post.title}
        onChange={onTextFieldChange}
      />
      <textarea
        className="d-block"
        name="message"
        placeholder="Введите сообщение"
        value={post.message}
        onChange={onTextFieldChange}
      />
      <button type="submit" className="d-block btn btn-primary">Save</button>
    </form>
  );

  if (loading) {
    form = <Spinner/>
  }

  return (
    <>
    {form}
    </>
  );
};

export default PostForm;