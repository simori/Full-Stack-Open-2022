import { View, StyleSheet, Pressable, Alert, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    padding: 20
  // ...
}});

const AppBar = () => {
  return <View style={styles.container}>{
    <Pressable
      onPress={() => Alert.alert('You pressed AppBar!')}
    >
      <Text fontWeight="bold" fontSize="subheading" color="appBarTitle">Repositories</Text>
      
    </Pressable>
  }</View>;
};

export default AppBar;