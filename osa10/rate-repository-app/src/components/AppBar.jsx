import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link, Navigate } from "react-router-native";
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    padding: 20,
    flexDirection: 'row'
  // ...
}});

const AppBar = () => {
  return <View style={styles.container}>{
    <>
      {/* <Pressable
        onPress={() => <Navigate to="/" replace />}
      > */}
        
      {/* </Pressable>
      <Pressable
        onPress={() => <Navigate to="/signin" replace />}
      > */}
        
      {/* </Pressable> */}
      <ScrollView horizontal>{
        <>
          <Link to="/"><Text fontWeight="bold" fontSize="subheading" color="appBarTitle" padding="extraPad">Repositories</Text></Link>
          <Link to="/signin"><Text fontWeight="bold" fontSize="subheading" color="appBarTitle" padding="extraPad">Sign In</Text></Link>
        </>
      }</ScrollView>
    </>
  }</View>;
};

export default AppBar;