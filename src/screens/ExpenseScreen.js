import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import { Button, TextInput } from 'react-native-paper'
import dayjs from 'dayjs'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import * as yup from 'yup'
import firestore from '@react-native-firebase/firestore'

const ExpenseScreen = () => {



  const addExpenses = async ({ amount, date, category, comment }) => {
    await firestore().collection('Utilisateurs').doc('18c79361-d05f-437b-9909-685db8d4910a').collection('Expenses').add({
      amount: '€'+amount,
      date: date,
      category: category,
      comments: comment,
    }).then(() => {
      console.log('depense ajouté');
    }).catch(error => {
      console.log(error);
    })
  }

  const [dateTimeShow, setDateTimeShow] = useState(false)
  const allCategory = [
    'Alimentaires',
    'Factures',
    'Transport',
    'Logement',
    'Santé',
    'Divertissement',
    'Vacances',
    'Shopping',
    'Autres',
  ]
  const validationSchema = yup.object().shape({
    firstname: yup
      .string('Le prénom doit être une chaine de caractère valide')
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "Le prénom n'est pas une chaine de caractères valide",
      )
      .required('Le prénom est obligatoire'),
    lastname: yup
      .string('Le nom doit être une chaine de caractère valide')
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "Le nom n'est pas une chaine de caractères valide",
      )
      .required('Le nom est obligatoire'),
    amount: yup
      .number('Le montant doit être un nombre')
      .positive('Le montant doit être positif')
      .required('Le montant est obligatoire'),
    date: yup
      .date("La date n'est pas valide")
      .required('La date doit être renseignée'),
    category: yup
      .string("La catégorie n'est pas valide")
      .oneOf(allCategory, "La catégorie n'est pas valide"),
    comment: yup
      .string('Le nom doit être une chaine de caractère valide')
      .required('Le nom est obligatoire'),
  })
  return (
    <ScrollView>
      <Formik
        validationSchema={validationSchema}
        validateOnChange
        initialValues={{
          firstname: '',
          lastname: '',
          amount: '',
          date: new Date(),
          category: '',
          comment: '',
        }}
        onSubmit={(values) => {
          addExpenses(values)
        }}
      >
        {({ errors, values, handleChange, setFieldValue, handleSubmit }) => {
          return (
            <View>
              <TextInput
                label="Prénom"
                value={values.firstname}
                onChangeText={handleChange('firstname')}
              />
              {errors.firstname && <Text>{errors.firstname}</Text>}
              <TextInput
                label="Nom"
                value={values.lastname}
                onChangeText={handleChange('lastname')}
              />
              {errors.lastname && <Text>{errors.lastname}</Text>}
              <TextInput
                label="Montant"
                keyboardType="numeric"
                value={values.amount}
                onChangeText={handleChange('amount')}
              />
              {errors.amount && <Text>{errors.amount}</Text>}
              <TextInput
                label="Date de déclaration"
                value={dayjs(values.date).format('DD/MM/YYYY')}
                onFocus={() => {
                  setDateTimeShow(true)
                }}
              />
              {dateTimeShow && (
                <DateTimePicker
                  mode="date"
                  value={new Date()}
                  is24Hour={true}
                  onChange={(event, date) => {
                    setDateTimeShow(false)
                    setFieldValue('date', date)
                  }}
                />
              )}
              {errors.date && <Text>{errors.date}</Text>}
              <Picker
                onValueChange={(value, index) =>
                  setFieldValue('category', value)
                }
                selectedValue={values.category}
              >
                {allCategory.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />
                })}
              </Picker>
              {errors.category && <Text>{errors.category}</Text>}
              <TextInput
                label="Commentaire"
                value={values.comment}
                onChangeText={handleChange('comment')}
                multiline={true}
                numberOfLines={3}
              />
              {errors.comment && <Text>{errors.comment}</Text>}
              <Button onPress={handleSubmit}>Envoyer</Button>
            </View>
          )
        }}
      </Formik>
    </ScrollView>
  )
}

export default ExpenseScreen