import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import firebase from 'firebase';
import 'firebase/auth';

function LoginStack({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const submit = (vals) => {
    if (vals.email === '' || vals.password === '') {
      console.log('Empty Inputs')
    } else {
      setLoading(true)
      firebase.auth().signInWithEmailAndPassword(vals.email, vals.password)
        .then((creds) => {
          navigation.navigate('HomeStack', { credentials: creds })
        })
        .catch(err => {
          let errorMessage = JSON.stringify(err.message)
          console.error(`Error: ${err.code} ${err.message}`)
          setError(true)
          setMessage(errorMessage.replace(/\"/g, ""))
        })
    }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(vals) => submit(vals)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => {
        return (
          <View style={styles.container}>
            <TextInput
              placeholder='Enter Email'
              style={styles.formInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <TextInput
              placeholder='Enter Password'
              style={styles.formInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button onPress={handleSubmit} title='Login'/>
            <Text style={{ marginTop: 10 }}>No Account ?
              <TouchableOpacity onPress={() => navigation.navigate('SignupStack')} style={{ paddingLeft: 4 }}> 
                <Text style={{ color: 'blue' }}>Sign Up</Text>
              </TouchableOpacity>
            </Text>
            {loading ? <ActivityIndicator style={{ marginTop: 10 }} /> : false}
            {error ? <Text style={{ marginTop: 10, color: 'red' }}>{message}</Text> : false}
          </View>
        )
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  formInput: {
    marginBottom: 12,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderWidth: 1.4,
    borderRadius: 15
  }
});

export default LoginStack