import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Share,
  TouchableOpacity,
  Platform,
} from "react-native";
import Poster from "../components/Poster";
import { Dimensions } from "react-native";
import { makeImgUrl } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import * as WebBrowser from "expo-web-browser";
import { AntDesign, Entypo } from "@expo/vector-icons";

const HEIGHT = Dimensions.get("window").height;

const Header = styled.View`
  height: ${HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
  width: 80%;
  padding: 0 20px;
`;
const Title = styled.Text`
  color: white;
  align-self: flex-end;
  font-size: 22px;
  margin-left: 15px;
`;

const Data = styled.ScrollView`
  padding: 20px;
`;
const OverView = styled.Text`
  color: white;
  margin-bottom: 20px;
  padding: 0 10px;
  font-size: 15px;
  font-weight: 500;
  margin-top: 15px;
  align-self: center;
`;
const VideoBtn = styled.TouchableOpacity`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  line-height: 15px;
`;
const BtnText = styled.Text`
  color: white;
  margin-left: 10px;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const { isLoading, data } = useQuery(
    ["original_title" in params ? "movies" : "tv", params.id],
    "original_title" in params ? moviesApi.detail : tvApi.detail,
    {
      enabled: "original_title" in params,
    }
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    if (isAndroid) {
      await Share.share({
        message: `${data.overview}\nCheck it out ${data.homepage}`,
        title:
          "original_title" in params ? data.original_title : data.original_name,
      });
    } else {
      await Share.share({
        message: `${data.overview}\nCheck it out ${data.homepage}`,
        url: data.homepage,
      });
    }
  };
  const shareButton = () => {
    return (
      <TouchableOpacity onPress={shareMedia}>
        <Entypo name="share-alternative" size={20} color="white" />
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "movies" : "tv",
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({ headerRight: shareButton });
    }
  }, [data]);
  const openYoutube = async (url) => {
    const baseUrl = `https://www.youtube.com/watch?v=${url}`;
    await WebBrowser.openBrowserAsync(baseUrl);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingBottom: 20 }}>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgUrl(params.poster_path) }}
        />
        <LinearGradient
          colors={["transparent", "black"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster poster_path={params.poster_path} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <OverView>{params.overview}</OverView>
        {data.videos.results.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYoutube(video.key)}>
            <AntDesign name="youtube" size={18} color="red" />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </View>
  );
};
export default Detail;
