import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import VMedia from "./VMedia";
const Container = styled.View`
  flex: 1;
  margin-bottom: 10px;
`;
const Title = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 13px;
  margin: 15px 0px;
  padding-left: 10px;
`;
const VSeparator = styled.View`
  width: 20px;
`;

const HList = ({ title, data }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={VSeparator}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={item.original_name || item.original_title}
            vote_average={item.vote_average}
            fullData={item}
          />
        )}
      ></FlatList>
    </Container>
  );
};
export default HList;
