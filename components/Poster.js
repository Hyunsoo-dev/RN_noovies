import React from "react";
import Styled from "styled-components/native";
import { makeImgUrl } from "../utils";

const Image = Styled.Image`
  width: 100px;
  height: 160px;
  flex: 1;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
`;

const Poster = ({ poster_path }) => {
  return <Image source={{ uri: makeImgUrl(poster_path) }}></Image>;
};
export default Poster;
