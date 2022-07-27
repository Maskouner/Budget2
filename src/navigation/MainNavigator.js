import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AccountScreen from '../screens/AccountScreen'
import HomeScreen from '../screens/HomeScreen'
import StatsScreen from '../screens/StatsScreen'

const Tab = createBottomTabNavigator()

const MainNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  )
}

export default MainNavigator