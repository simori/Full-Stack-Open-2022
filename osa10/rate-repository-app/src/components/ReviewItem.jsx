import Text from "./Text";
import { format } from "date-fns";
import { View, StyleSheet, Alert, Button } from 'react-native';
import * as Linking from 'expo-linking'; 
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { GET_ME } from '../graphql/queries';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    padding: 20,
    backgroundColor: '#eaeaea'
  },
  container: {
    flexDirection: 'row',
    flexGrow: 0,
  },
  gradeContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    paddingTop: 12,
    borderColor: 'blue',
    borderRadius: 25,
    borderWidth: 3,
    borderStyle: 'solid',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  infoContainer: {
    flexShrink: 1,
    paddingBottom: 10,
    paddingLeft: 10
  },
});

const deleteAlert = (id, deleter) =>
  Alert.alert(
    "Delete review",
    "Are you sure you want to delete this review?",
    [
      {
        text: "No",
        onPress: () => console.log("Review delete cancelled!"),
        style: "cancel"
      },
      { text: "Yes", onPress: async () => {
          try {
            const { loading, error, data, refetch } = await deleter(
              { 
                variables: { 
                  deleteReviewId: id
                }
              }
            );
            return refetch;
          }
          catch (e) {
            console.log('Dele EpäOnnistui: ', e);
          }
        } 
      }
    ],
    { cancelable: true }
  );

// review-kortin yläosa, jossa näytetään arvosana, jonka vieressä oikealla
// repositorion nimi ja arvostelun päiväys
const CardHeader = ({item, deleteReview}) => {
  console.log('CARDHEADER REVIEWITEM ID', item);
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.gradeContainer}>{item.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">{item.repository.fullName}</Text>
          <Text fontSize="subheading">{item.repository.url}</Text>
          <Text color="textSecondary">{format(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
          <Text>{"\n"}{item.text}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button onPress={() => Linking.openURL(item.repository.url)} title="View repository" />
        <Button 
          color='#dd0000' 
          onPress={
            () => {
              deleteAlert(item.id, deleteReview);
            }
          } title="Delete review" 
        />
      </View>
    </>
  );
};

const ReviewItem = ({ review }) => {
  const [ deleteReview ] = useMutation(DELETE_REVIEW,
    {
      refetchQueries: [
        { query: GET_ME,
          variables: {
            includeReviews: true
          } 
        }
      ]
    }
  );
  return (
    <View testID="reviewItem" style={styles.flexContainer}>
      <CardHeader item={review.node} deleteReview={deleteReview}/>
    </View>
  );
};

export default ReviewItem;