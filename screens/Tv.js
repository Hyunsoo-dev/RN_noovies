import React from "react";
import styled from "styled-components/native";
import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { tvApi, moviesApi } from "../api";
import { useQuery, QueryClient } from "react-query";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList from "../components/HList";

const queryClient = new QueryClient();

const Container = styled.ScrollView`
  background-color: black;
`;
const Tv = () => {
  const {
    isLoading: airTodayLoading,
    data: airTodayData,
    isRefetching: airTodayRefetching,
  } = useQuery(["tv", "airToday"], tvApi.airToday);

  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: topRatedRefetching,
  } = useQuery(["tv", "topRated"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);

  const loading = airTodayLoading || topRatedLoading || trendingLoading;
  const refreshing =
    airTodayRefetching || topRatedRefetching || trendingRefetching;

  const onRefresh = async () => {
    await queryClient.refetchQueries(["tv"]);
  };
  return loading ? (
    <Loader />
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Today Airing TV" data={airTodayData.results} />
      <HList title="Top Rated TV" data={topRatedData.results} />
      <HList title="Trending TV" data={trendingData.results} />
    </Container>
  );
};

export default Tv;
