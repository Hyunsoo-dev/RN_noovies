import React from "react";
import styled from "styled-components/native";
import { View, ActivityIndicator } from "react-native";

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Loader = () => {
  return (
    <Wrapper>
      <ActivityIndicator color="white" size="large" />
    </Wrapper>
  );
};
export default Loader;
