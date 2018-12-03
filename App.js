import React, { PureComponent } from 'react';
import { StyleSheet, Text, View,Alert } from 'react-native';
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from './src/components/input'


export default class App extends PureComponent {
  _handleSubmit= values => {
    Alert.alert(JSON.stringify(values))
  }
  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues= {{ email: '', password: '', confirmPassword: '' }}
          onSubmit={this._handleSubmit}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required('Email is required'),
            password: Yup.string()
              .min(6)
              .required('Password is required'),
            confirmPassword: 
              Yup.string().oneOf([Yup.ref('password', null)], 
              'Confirm Password must matched Password',
              ).required('Confirm Password is required')
          })}
          render={({ 
            values, 
            handleSubmit, 
            setFieldValue, 
            errors, 
            touched, 
            setFieldTouched,
            isValid
          }) => (
            <React.Fragment>
              <Input 
                label= 'Email' 
                autoCapitalize='none' 
                value={values.email}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='email' 
                error={touched.email && errors.email}
                />
              <Input 
                label= 'Password' 
                autoCapitalize='none' 
                secureTextEntry 
                value={values.password}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='password'
                error={touched.password && errors.password}
                />
              <Input 
                label= 'Confirm Password' 
                autoCapitalize='none' 
                secureTextEntry 
                value={values.confirmPassword} 
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='confirmPassword'
                error={touched.confirmPassword && errors.confirmPassword}
                />
              <Button 
              backgroundColor='blue' 
              style={styles.button} 
              title='Submit' 
              onPress={handleSubmit}
              disabled={!isValid}

              />
            </React.Fragment>
          )}
        />
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginTop: 20,
    width: '100%',
    
  }
});
