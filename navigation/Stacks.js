import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../screens/Detail";
const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: "black", shadowColor: "none" },
        unmountOnBlur: true,
        headerTitleStyle: {
          color: "white",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
export default Stacks;
