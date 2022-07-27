import { Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import data from '../data/data.json'
import {  DataTable } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

const AccountScreen = (props) => {
  let incomes = ""
  let expenses = ""

  const getExpenses = async function ()  {
    const expenses2 = await firestore().collection('Utilisateurs').doc('18c79361-d05f-437b-9909-685db8d4910a').collection('Expenses').get()
    expenses = expenses2._docs
    console.log(expenses)
  }
  

  const getIncomes = async function ()  {
    const incomes2 = await firestore().collection('Utilisateurs').doc('18c79361-d05f-437b-9909-685db8d4910a').collection('Incomes').get()
    incomes = incomes2._docs
    console.log(incomes)
  }

  useEffect(() => {
    getExpenses()
    getIncomes()
  }

  )
  
  
  
  
  
  

  const [total, setTotal] = useState(0)
  useEffect(() => {
    let tmp = 0
    data[0].incomes.map((item) => {
      let number = item.amount.replace('€', '').replace(',', '')
      tmp += parseFloat(number)
    })
    data[0].expenses.map((item) => {
      let number = item.amount.replace('€', '').replace(',', '')
      tmp -= parseFloat(number)
    })
    setTotal(Math.floor(tmp))
  }, [])

  return (
    <>
      <Text>Solde actuel : {total} €</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Montant</DataTable.Title>
          <DataTable.Title>Libellé</DataTable.Title>
          <DataTable.Title>Catégorie</DataTable.Title>
          <DataTable.Title>Type</DataTable.Title>
        </DataTable.Header>
        {data[0].incomes.map((item, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.amount}</DataTable.Cell>
              <DataTable.Cell>{item.comments}</DataTable.Cell>
              <DataTable.Cell>{item.category}</DataTable.Cell>
              <DataTable.Cell>Revenu</DataTable.Cell>
            </DataTable.Row>
          )
        })}
        {data[0].expenses.map((item, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.amount}</DataTable.Cell>
              <DataTable.Cell>{item.comments}</DataTable.Cell>
              <DataTable.Cell>{item.category}</DataTable.Cell>
              <DataTable.Cell>Dépense</DataTable.Cell>
            </DataTable.Row>
          )
        })}
      </DataTable>
    </>
  )
}

export default AccountScreen