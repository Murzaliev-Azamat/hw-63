import React, {useState} from 'react';
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import {Post, SendingPost} from "../../types";
import Spinner from "../Spinner/Spinner";

interface PostMutation {
  title: string;
  message: string;
}

interface Props {
  onSubmit: (post: SendingPost) => void;
  existingPost?: Post | null;
}

const PostForm: React.FC<Props> = ({onSubmit, existingPost}) => {
  // const navigate = useNavigate();
  const initialState = existingPost ? {...existingPost} : {title: '', message: '',};
  const [post, setPost] = useState<PostMutation>(initialState);

  // const [loading, setLoading] = useState(false);

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setPost(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({date: new Date().toString(), ...post})
  }


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

  // if (loading) {
  //   form = <Spinner/>
  // }

  return (
    <>
    {form}
    </>
  );
};

export default PostForm;