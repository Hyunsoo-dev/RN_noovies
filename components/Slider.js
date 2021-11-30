import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { makeImgUrl } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "../components/Poster";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const View = styled.View`
  flex: 1;
`;
const BgImg = styled.Image``;

const Title = styled.Text`
  color: white;
  font-weight: 700;
  margin-left: 10px;
  font-size: 13px;
  margin-bottom: 8px;
`;
const OverView = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  margin-left: 10px;
  font-size: 10px;
`;
const Rate = styled(OverView)`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 8px;
  font-size: 11px;
`;
const Wrapper = styled.View`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  flex: 1;
`;

const Slider = ({
  backdrop_path,
  poster_path,
  original_title,
  overview,
  vote_average,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = (fullData) => {
    navigation.navigate("Stacks", {
      screen: "Detail",
      params: fullData,
    });
  };
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => goToDetail(fullData)}>
      <View>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgUrl(backdrop_path) }}
        ></BgImg>
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill}>
          <Wrapper>
            <Poster poster_path={poster_path} />
            <Column>
              <Title>{original_title}</Title>
              <OverView>{overview.slice(0, 80) + "..."}</OverView>
              {vote_average > 0 ? <Rate>🌟{vote_average}/10</Rate> : null}
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
};
export default Slider;
