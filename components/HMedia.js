import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

const UpComingMovie = styled.View`
  padding-left: 10px;
  flex-direction: row;
`;
const Column = styled.View`
  padding-top: 10px;
  padding-left: 20px;
  width: 70%;
`;
const Title = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 11px;
  margin: 5px 0px;
`;
const Release = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 10px;
  margin-bottom: 10px;
`;
const OverView = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 10px;
`;

const HMedia = ({ poster_path, original_title, release_date, overview }) => {
  return (
    <UpComingMovie>
      <Poster poster_path={poster_path}></Poster>
      <Column>
        <Title>{original_title}</Title>
        <Release>{release_date}</Release>
        <OverView>
          {overview === "" || overview.length > 200
            ? `${overview.slice(0, 200)}...`
            : overview}
        </OverView>
      </Column>
    </UpComingMovie>
  );
};
export default HMedia;
