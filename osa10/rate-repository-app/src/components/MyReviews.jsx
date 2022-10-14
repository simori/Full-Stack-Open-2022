// tehtävä 10.26
import React from 'react';
import Text from './Text';
import ReviewItem from './ReviewItem';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { FlatList, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 30,
  },
  text: {
    color: Platform.select({
      android: 'green',
      ios: 'blue',
      default: 'black',
    }),
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      includeReviews: true
    }
  });
  
  if (!loading)  {
    return (
      <FlatList
        data={data.me.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        //ListHeaderComponent={<RepositoryInfo repository={repo} />}
        ItemSeparatorComponent={ItemSeparator}
        // ...
      />
    );
  }
  else return <Text>Loading!</Text>
}

export default MyReviews;