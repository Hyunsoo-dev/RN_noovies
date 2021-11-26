import React from "react";
import styled from "styled-components/native";

const Rate = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 10px;
`;
const Vote = ({ vote_average }) => {
  return <Rate>🌟{vote_average} / 10</Rate>;
};
export default Vote;
