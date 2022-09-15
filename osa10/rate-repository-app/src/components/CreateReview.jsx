// Exercise 10.21: the review form
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Button, View } from 'react-native';
import { useNavigate, useParams } from "react-router-native";
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

import * as yup from 'yup'; // 10.9 validaatio

const valider = yup.object().shape({
  username: yup
    .string().required('Username is required!'),
  reponame: yup
    .string().required('Repository name is required!'),
  rating: yup.number()
    .min(0, "Too low rating! Rating must be between 0 and 100!")
    .max(100, "Too high rating! Rating must be between 0 and 100!")
    .required("Rating is required!")

});

export const CreateReviewContainer = () => {
  const navigate = useNavigate();
  const [ createReview ] = useMutation(CREATE_REVIEW);
  const onSubmit = async (values) => {
    const { username, reponame, rating, reviewtext } = values;

    try {
      const review = await createReview(
        { 
          variables: { 
            review: {
              ownerName: values.username, 
              repositoryName: values.reponame, 
              rating: Number(values.rating), 
              text: values.reviewtext
            },
            onError: (e) => {
              console.log('VituixMän: ', e);
            }
          }
        }
      )
      console.log('luotu arvostelu on', review, 'ja id', review.data.createReview.repositoryId);
      navigate(`/repository/${review.data.createReview.repositoryId}`, { replace: true });
    } catch (e) {
      console.log('EpäOnnistui: ', e);
    }
  };

  return (
    <View style={{padding: 15}}>
      <Formik 
        initialValues={{username: "", reponame: "", rating: "", reviewtext: ""}} 
        onSubmit={onSubmit}
        validationSchema={valider}
        >
        {({ handleSubmit }) => <>
          <FormikTextInput style={{paddingBottom: 15}} name="username" placeholder="Repository owner's GitHub username"></FormikTextInput>
          <FormikTextInput style={{paddingBottom: 15}} name="reponame" placeholder="Repository's name"></FormikTextInput>
          <FormikTextInput style={{paddingBottom: 15}} name="rating" placeholder="Rating 0-100"></FormikTextInput>
          <FormikTextInput multiline={true} style={{paddingBottom: 15}} name="reviewtext" placeholder="Write your review here..."></FormikTextInput>
          <Button onPress={handleSubmit} title="Create a review" />
        </>}
      </Formik>
    </View>
  );
}
const CreateReview = () => {

  let navigate = useNavigate();
  const { id } = useParams();
  console.log('createreview id', id);
  /* const [ createReview ] = useMutation(CREATE_REVIEW); */
  /* let navigate = useNavigate();

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
  ); */
  return <CreateReviewContainer />;
};

export default CreateReview;