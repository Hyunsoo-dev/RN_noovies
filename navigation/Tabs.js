import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "black",
        paddingTop: 3,
        borderTopColor: "gray",
      },
      unmountOnBlur: true,
      tabBarActiveTintColor: "#D279A0",
      tabBarInactiveTintColor: "white",
      headerStyle: { backgroundColor: "black", shadowColor: "none" },
      tabBarLabelStyle: {},
      headerTitleStyle: {
        color: "#D279A0",
      },
      headerTitleAlign: "center",
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{
        tabBarIcon: ({ focused, color, size }) =>
          focused ? (
            <FontAwesome name="film" size={20} color={color} />
          ) : (
            <FontAwesome name="film" size={20} color="white" />
          ),
      }}
    />

    <Tab.Screen
      name="TV"
      component={Tv}
      options={{
        tabBarIcon: ({ focused, color, size }) =>
          focused ? (
            <FontAwesome name="tv" size={20} color={color} />
          ) : (
            <FontAwesome name="tv" size={20} color="white" />
          ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused, color, size }) =>
          focused ? (
            <AntDesign name="search1" size={20} color={color} />
          ) : (
            <AntDesign name="search1" size={20} color="white" />
          ),
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
