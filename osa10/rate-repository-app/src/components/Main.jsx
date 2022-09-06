import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;