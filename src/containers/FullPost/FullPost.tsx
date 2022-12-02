import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Post} from "../../types";
import axiosApi from "../../axiosApi";


const FullPost = () => {
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

  // const fetchOnePostForDelete = useCallback(async () => {
  //   try {
  //     const postResponse = await axiosApi.delete('/posts/' + id + '.json');
  //     setPost(postResponse.data);
  //   } finally {
  //     setLoading(false);
  //   }
  // },[id]);
  //
  // // useEffect(() => {
  // //   fetchOnePostForDelete().catch(console.error);
  // // },[fetchOnePostForDelete]);
  //
  // const remove = async () => {
  //   fetchOnePostForDelete().catch(console.error);
  // }

  // useEffect(() => {
  //   fetchOnePostForDelete().catch(console.error);
  // },[fetchOnePostForDelete]);

  const remove = async () => {
    try {
      setLoading(true);
      await axiosApi.delete('/posts/' + id + '.json');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{border: "1px solid black", padding: "10px", marginTop: "5px"}}>
      <p className="text-secondary">Created on: {post?.date}</p>
      <h2>{post?.title}</h2>
      <p>{post?.message}</p>
      <Link to={"/EditPost/" + id} className="btn btn-primary">Edit</Link>
      <button onClick={remove} className="btn btn-danger">Delete</button>
    </div>
  );
};

export default FullPost;