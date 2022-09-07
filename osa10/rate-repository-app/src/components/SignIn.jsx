import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Button } from 'react-native';

import * as yup from 'yup'; // 10.9 validaatio

const onSubmit = (values) => {
  console.log(values);
};

const valider = yup.object().shape({
  username: yup
    .string().required('Username is required!'),
  password: yup
    .string().required('Password is required!'),
});

const SignIn = () => {
  return (
    <Formik 
      initialValues={{username: "", password: ""}} 
      onSubmit={onSubmit}
      validationSchema={valider}
      >
      {({ handleSubmit }) => <>
        <FormikTextInput name="username" placeholder="User"></FormikTextInput>
        <FormikTextInput name="password" placeholder="Pass" secureTextEntry={true}></FormikTextInput>
        <Button onPress={handleSubmit} title="Submit" />
      </>}
    </Formik>
  );
};

export default SignIn;