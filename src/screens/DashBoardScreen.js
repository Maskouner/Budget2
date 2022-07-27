import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const DashBoardScreen = (props) => {
  const { navigation } = props
  return (
    <View>
      <Button mode="contained" onPress={() => navigation.navigate('Income')}>
        Ajout revenu
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Expense')}>
        Ajout dépense
      </Button>
    </View>
  )
}

export default DashBoardScreen