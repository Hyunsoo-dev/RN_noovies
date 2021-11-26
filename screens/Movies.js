import React, { useState, useEffect } from "react";
import {
  FlatList,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  View,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Slider from "../components/Slider";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const API_KEY = "2ef76449c9a35a98244ddd15b1dc18e0";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.FlatList`
  background-color: black;
`;

const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
const TrendingMoviesContainer = styled.View`
  margin-bottom: 10px;
`;
const TrendingMoviesScroll = styled.FlatList``;

const LittleTitle = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 13px;
  margin: 15px 0px;
  padding-left: 10px;
`;

const ComingSoonTitle = styled(LittleTitle)``;

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);
  const getTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const { results } = await response.json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    setUpComing(results);
  };

  const getNowPlayingMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    setNowPlaying(results);
  };
  const getData = async () => {
    await Promise.all([getNowPlayingMovie(), getUpcoming(), getTrending()]);
    setLoading(false);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator color="white" size="large" />
    </Loader>
  ) : (
    <Container
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper
            loop
            controlsEnabled={false}
            timeout={3.5}
            containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
          >
            {nowPlaying.map((movie) => (
              <Slider
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                overview={movie.overview}
                vote_average={movie.vote_average}
              ></Slider>
            ))}
          </Swiper>
          <TrendingMoviesContainer>
            <LittleTitle>Trending Movies</LittleTitle>
            <TrendingMoviesScroll
              data={trending}
              horizontal
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 20 }}></View>}
              renderItem={({ item }) => (
                <VMedia
                  poster_path={item.poster_path}
                  original_title={item.original_title}
                  vote_average={item.vote_average}
                />
              )}
            ></TrendingMoviesScroll>
          </TrendingMoviesContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upComing}
      ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HMedia
          poster_path={item.poster_path}
          original_title={item.original_title}
          release_date={item.release_date}
          overview={item.overview}
        />
      )}
    ></Container>
  );
};

export default Movies;
