import React from 'react';
import {Link} from "react-router-dom";

interface Props {
  title: string;
  date: string;
  id: string,
}

const ShortPost: React.FC<Props> = ({title,date, id}) => {

  return (
    <div style={{border: "1px solid black", padding: "10px", marginTop: "5px"}}>
      <p className="text-secondary">Created on: {date}</p>
      <h2>{title}</h2>
      <Link to={"/posts/" + id} className="btn btn-primary">Read More</Link>
    </div>
  );
};

export default ShortPost;