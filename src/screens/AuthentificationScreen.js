import { StyleSheet, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

const AuthentificationScreen = () => {
    const navigation = useNavigation()

    const [email,setEmail] = useState()
    const [mdp,setMdp] = useState()
    const [utilisateur,setUtilisateur] = useState()

    const User = (email2,mdp2,utilisateur2) => {
        auth()
      .createUserWithEmailAndPassword(email2,mdp2)
      .then(() => {
        console.log('User account created & signed in!');
        AjoutUtilisateur(email2,mdp2,utilisateur2)
        navigation.navigate('DashBoard')
      })
      }

    const AjoutUtilisateur = (email3,mdp3,utilisateur3) => {
        firestore()
            .collection('Utilisateurs')
            .add({
                user: utilisateur3,
                email: email3,
                mdp:mdp3,
            })
            .then(() => {
                console.log('User added!');
            });
            
    }


  return (
    <View>
      <TextInput onChangeText={setUtilisateur}   value={utilisateur} placeholder="Rentre Ton Nom D'utilisateur"/>
      <TextInput onChangeText={setEmail}   value={email} placeholder="Rentre Ton Email"/>
      <TextInput onChangeText={setMdp}  value={mdp} placeholder="Rentre Ton Mot De Passe"/>
      <Button onPress={() => User(email,mdp,utilisateur)} title='User' />
    </View>
  )
}

export default AuthentificationScreen

const styles = StyleSheet.create({})