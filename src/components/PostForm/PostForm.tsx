import React, {useState} from 'react';
import {Post, SendingPost} from "../../types";

interface PostMutation {
  title: string;
  message: string;
}

interface Props {
  onSubmit: (post: SendingPost) => void;
  existingPost?: Post | null;
}

const PostForm: React.FC<Props> = ({onSubmit, existingPost}) => {
  const initialState = existingPost ? {...existingPost} : {title: '', message: '',};
  const [post, setPost] = useState<PostMutation>(initialState);

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

  return (
    <form onSubmit={onFormSubmit}>
      <input
        className="d-block mt-2"
        type="text"
        name="title"
        placeholder="Введите заголовок"
        value={post.title}
        onChange={onTextFieldChange}
      />
      <textarea
        className="d-block mt-2"
        name="message"
        placeholder="Введите сообщение"
        value={post.message}
        onChange={onTextFieldChange}
      />
      <button type="submit" className="d-block btn btn-primary mt-2">Save</button>
    </form>
  );
};

export default PostForm;