import React, { useState, useEffect } from "react";
import { useQuery, QueryClient } from "react-query";
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
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import Stacks from "../navigation/Stacks";
const API_KEY = "2ef76449c9a35a98244ddd15b1dc18e0";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const queryClient = new QueryClient();
const Container = styled.FlatList`
  background-color: black;
`;

const LittleTitle = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 13px;
  margin: 15px 0px;
  padding-left: 10px;
`;

const ComingSoonTitle = styled(LittleTitle)``;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies = () => {
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], moviesApi.trending);
  const refetching =
    isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;
  const renderVMedia = ({ item }) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
      fullData={item}
    />
  );

  const extractKey = (item) => item.id;
  const loading = trendingLoading || upcomingLoading || nowPlayingLoading;
  const onRefresh = async () => {
    await queryClient.refetchQueries(["movies"]);
  };

  return loading ? (
    <Loader />
  ) : (
    <Container
      refreshing={refetching}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper
            loop
            controlsEnabled={false}
            timeout={3.5}
            containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slider
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                overview={movie.overview}
                vote_average={movie.vote_average}
                fullData={movie}
              ></Slider>
            ))}
          </Swiper>
          <HList title="Trending Movies" data={trendingData.results} />
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      ItemSeparatorComponent={HSeparator}
      keyExtractor={extractKey}
      renderItem={renderHMedia}
    ></Container>
  );
};

export default Movies;
