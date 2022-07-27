import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IncomeScreen from '../screens/IncomeScreen'
import ExpenseScreen from '../screens/ExpenseScreen'
import DashBoardScreen from '../screens/DashBoardScreen'
import AuthentificationScreen from '../screens/AuthentificationScreen'
import ConnexionScreen from '../screens/ConnexionScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Connexion'>
      <Stack.Screen name="Connexion" component={ConnexionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Authentification" component={AuthentificationScreen} />
      <Stack.Screen name="DashBoard" component={DashBoardScreen} />
      <Stack.Screen name="Income" component={IncomeScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigator