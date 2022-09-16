// Exercise 10.19: the single repository view
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_BY_ID, GET_REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
//import ReviewItem from './ReviewItem';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking'; 
import Text from './Text';
import { format } from 'date-fns';

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
  flexContainer: {
    display: 'flex',
    padding: 20
  },
  container: {
    flexDirection: 'row',
    flexGrow: 0,
    padding: 20,
    backgroundColor: '#eaeaea'
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
    color: 'blue',
    fontSize: 20
  },
  infoContainer: {
    flexShrink: 1,
    paddingBottom: 10,
    paddingLeft: 10
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  return (
    <>
      <RepositoryItem item={repository}/>
      <Button 
        onPress={() => Linking.openURL(repository.url)} 
        title="Open in GitHub!" />
    </>
  )
};

const useReviews = (variables) => {
  console.log('variables:', variables);
  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    //fetchPolicy: 'cache-and-network',
    // Other options
    variables,
    onError: (err) => {
      console.log('EpäOnnistui!', err);
    }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      console.log('cannot fetch anymore!');
      return;
    }
    console.log('fetching more!', variables);
    fetchMore({
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    reviews: data?.repository.reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

const ReviewItem = ({ item }) => {
  // Single review item
  console.log('REVIEW ITEM:', item);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.gradeContainer}>{item.node.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{item.node.user.username}</Text>
        <Text color="textSecondary">{format(new Date(item.node.createdAt), 'dd.MM.yyyy')}</Text>
        <Text>{"\n"}{item.node.text}</Text>
      </View>
    </View>
  );
};

const RepositoryView = () => {
  const { id } = useParams();
  const repoById = useQuery(GET_BY_ID, {
    //fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
    onError: (err) => {
      console.log('EpäOnnistui!', err);
    }
  });

  /* const { data, loading, fetchMore, ...result} = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { 
      repositoryId: id,
      first: 4 
    },
    onError: (err) => {
      console.log('EpäOnnistui!', err);
    }
  }); */

  const {reviews, loading, fetchMore } = useReviews({
    repositoryId: id,
    first: 4,
  });

  const onEndReach = () => {
    /* const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      console.log('cannot fetch any more!');
      return;
    }
    console.log('reached end, fetching more!');
    fetchMore(
      {
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
          first: result.first
        }
      }
    ); */
    fetchMore();
  }

  //console.log(id, repoById);
  //console.log('REVIEWsr: ', reviews.edges);

  if (!loading)  {
    const repo = repoById.data.repository;
    //const reviews = reviews.edges;
    //console.log('REPOSITORIO ON', repo, '\n\nJA REVIEWS ON', reviews);
    return (
      <FlatList
        data={reviews.edges}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={<RepositoryInfo repository={repo} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        // ...
      />
    );
  }
  else return <Text>Loading!</Text>
};

export default RepositoryView;