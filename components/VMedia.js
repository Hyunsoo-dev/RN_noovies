import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Vote from "./Vote";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
const TrendingMovies = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 11px;
  margin: 5px 0px;
`;
const Rate = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 10px;
`;

const VMedia = ({ poster_path, original_title, vote_average, fullData }) => {
  const navigation = useNavigation();
  const goToDetailScreen = (fullData) => {
    navigation.navigate("Stacks", {
      screen: "Detail",
      params: fullData,
    });
  };
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => goToDetailScreen(fullData)}
    >
      <TrendingMovies>
        <Poster poster_path={poster_path}></Poster>
        <Title>
          {original_title.slice(0, 13)}
          {original_title.length > 15 ? "..." : null}
        </Title>
        <Vote vote_average={vote_average}></Vote>
      </TrendingMovies>
    </TouchableOpacity>
  );
};
export default VMedia;
