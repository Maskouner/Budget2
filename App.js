import { Button, StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'






const App = () => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email,setEmail] = useState()
  const [mdp,setMdp] = useState()

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
      console.log('Aucun utilsateur connecter')
  }
  
 

  const Anonyme = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  }

  const User = (email2,mdp2) => {
    auth()
  .createUserWithEmailAndPassword(email2,mdp2)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }

  const Deconnexion = () => {
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  }

  return (
    <View>
      <Button onPress={() => Anonyme()} title='Anonyme' />
      <TextInput onChangeText={setEmail}   value={email} placeholder="Rentre Ton Email"/>
      <TextInput onChangeText={setMdp}  value={mdp} placeholder="Rentre Ton Mot De Passe"/>
      <Button onPress={() => User(email,mdp)} title='User' />
      <Button onPress={() => Deconnexion()} title='Deco' />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})


