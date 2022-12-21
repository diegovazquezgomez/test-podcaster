import React from "react";
import { useParams } from "react-router-dom";

function Podcast() {
  const { id } = useParams();

  return <div>{id}</div>;
}

export default Podcast;
