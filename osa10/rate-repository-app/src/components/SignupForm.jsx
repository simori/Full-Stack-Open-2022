import Text from "./Text";
/* 
Exercise 10.22: the sign up form
Implement a sign up form for registering a user using Formik. 
The form should have three fields: username, password, and password confirmation.
Validate the form using Yup schema so that it contains the following validations:

Username is a required string with a length between 1 and 30
Password is a required string with a length between 5 and 50
Password confirmation matches the password
*/
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Button, View } from 'react-native';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

import * as yup from 'yup'; // validaatio

const valider = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least 1 character long!')
    .max(30, 'Maximum username length is 30 characters!')
    .required('Username is required!'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long!')
    .max(50, 'Maximum password length is 50 characters!')
    .required('Password is required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords dont match!')
    .required('Password confirmation is required!'),
});

// 10.18  
export const SignUpContainer = () => {
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const [ createUser ] = useMutation(CREATE_USER);
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const newUser = await createUser(
        {
          variables: {
            user: {
              username,
              password
            },
            onError: (e) => {
              console.log('Käyttäjän Luonti VituixMän: ', e);
            }
            }
        }
      )
      console.log('uusi käyttäjä', newUser);
      await signIn({ username, password });
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{padding: 15}}>
      <Formik 
        initialValues={{username: "", password: ""}} 
        onSubmit={onSubmit}
        validationSchema={valider}
        >
        {({ handleSubmit }) => <>
          <FormikTextInput style={{paddingBottom: 15}} name="username" placeholder="Username"></FormikTextInput>
          <FormikTextInput style={{paddingBottom: 15}} name="password" placeholder="Password" secureTextEntry={true}></FormikTextInput>
          <FormikTextInput style={{paddingBottom: 15}} name="confirmPassword" placeholder="Confirm Password" secureTextEntry={true}></FormikTextInput>
          <Button onPress={handleSubmit} title="Sign up" />
        </>}
      </Formik>
    </View>
  );
}

const SignupForm = () => {
  return <SignUpContainer />;
};

export default SignupForm;