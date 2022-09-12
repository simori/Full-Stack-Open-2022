import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Button, View } from 'react-native';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";

import * as yup from 'yup'; // 10.9 validaatio

const valider = yup.object().shape({
  username: yup
    .string().required('Username is required!'),
  password: yup
    .string().required('Password is required!'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
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
          <FormikTextInput style={{paddingBottom: 15}} name="username" placeholder="User"></FormikTextInput>
          <FormikTextInput style={{paddingBottom: 15}} name="password" placeholder="Pass" secureTextEntry={true}></FormikTextInput>
          <Button onPress={handleSubmit} title="Submit" />
        </>}
      </Formik>
    </View>
  );
};

export default SignIn;