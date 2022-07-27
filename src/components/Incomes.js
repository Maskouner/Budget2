import { View, Text } from 'react-native'
import React from 'react'

const Incomes = (props) => {
  const { data } = props
  return (
    <View>
      {data.map((item, index) => {
        return (
          <View>
            <Text>{item.amount}</Text>
            <Text>{item.category}</Text>
            <Text>{item.comments}</Text>
            <Text>{item.date}</Text>
          </View>
        )
      })}
    </View>
  )
}

export default Incomes