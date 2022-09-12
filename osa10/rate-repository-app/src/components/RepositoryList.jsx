import { FlatList, View, StyleSheet, Platform } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories.js';

const styles = StyleSheet.create({
  separator: {
    height: 10,
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

export const RepositoryListContainer = ({ repositories }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    console.log(repositoryNodes);
  return (
    <FlatList
      data={repositoryNodes}
      // Other props
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <RepositoryItem item={item}/>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
