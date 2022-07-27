import { StyleSheet, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


const ConnexionScreen = () => {   
    const navigation = useNavigation()
  return (
    <View>
        <Button title='Inscription' onPress={() => navigation.navigate('Authentification')}/>
        <Button title='Connexion' onPress={() => navigation.navigate('Login')}/>
    </View>
  )
}

export default ConnexionScreen

const styles = StyleSheet.create({})