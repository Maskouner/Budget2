import { StyleSheet, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'


const LoginScreen = () => {
  const navigation = useNavigation()
  const [mdp,setMdp] = useState()
  const [utilisateur,setUtilisateur] = useState()

      

    async function getdata() {
        const user2 = await  firestore().collection('Utilisateurs').doc('YYCKQQCltFRzkFBevqL2').get();
        if (mdp === user2.data().mdp && utilisateur === user2.data().user){
          navigation.navigate('DashBoard')
        }
        else {
          console.error('Mauvais Mot de passe ou Nom Utilisateur')
        }
      }
  return (
    <View>
      <TextInput onChangeText={setUtilisateur}   value={utilisateur} placeholder="Rentre Ton Nom D'utilisateur"/> 
      <TextInput onChangeText={setMdp}  value={mdp} placeholder="Rentre Ton Mot De Passe"/>
       <Button onPress={() => getdata()} title='Get' />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})