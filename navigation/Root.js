import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stacks from "./Stacks";
import Tabs from "./Tabs";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stacks" component={Stacks} />
    </Nav.Navigator>
  );
};
export default Root;