import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {
  getAuth,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from '../lib/fire'

const passwordResetFormSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('A email is required')
    .required()
    .min(6, 'Password needs to be at least 6 characters long'),
})

const PasswordResetForm = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const auth = getAuth()

  const handlePasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      //   await confirmPasswordReset(auth, email);

      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email to reset your password.',
      )
    } catch (error) {
      console.error('Password reset failed:', error.message)
      Alert.alert(
        'Password Reset Failed',
        'An error occurred. Please try again.',
      )
    }
    setEmail('')
    navigation.goBack()
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Enter your email to reset your password:</Text>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => handlePasswordReset(values.email)}
        validationSchema={passwordResetFormSchema}
        validateOnMount={true}
      >
        {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  )
}

export default PasswordResetForm

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    marginHorizontal: 10,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  text: {
    color: 'white',
    marginBottom: 15,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? '#0096f6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    marginTop: 10,
  }),
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 20,
  },
})
