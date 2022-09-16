import { View, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    padding: 20,
    flexDirection: 'row'
  // ...
}});

// sovelluksen yläpalkki
const AppBar = () => {
  const loggedIn = useQuery(GET_ME);

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  // 10.16
  const logout = async () => {
    Alert.alert("Logging out!");
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return <View style={styles.container}>{
    <>
      {loggedIn.data && loggedIn.data.me !== null
        ? <Text color="appBarTitle">logged in as {loggedIn.data.me.username}</Text>
        : <></>
      }
      
      <ScrollView horizontal>{
        <>
          <Link to="/">
            <Text fontWeight="bold" fontSize="subheading" color="appBarTitle" 
                  padding="extraPad">Repositories
            </Text>
          </Link>
          {loggedIn.data && loggedIn.data.me !== null
            ? <>
                <Link to="/review">
                  <Text fontWeight="bold" fontSize="subheading" 
                        color="appBarTitle" padding="extraPad">Create Review
                  </Text>
                </Link>
                <Link to="/myreviews">
                  <Text fontWeight="bold" fontSize="subheading" 
                        color="appBarTitle" padding="extraPad">My Reviews
                  </Text>
                </Link>
                </>
            : <></>
          }
          {loggedIn.data && loggedIn.data.me !== null
            ? <Pressable onPress={logout}>
                <Text fontWeight="bold" fontSize="subheading" 
                      color="appBarTitle" padding="extraPad">Sign Out
                </Text>
              </Pressable>
            : <Link to="/signin">
                <Text fontWeight="bold" fontSize="subheading" 
                      color="appBarTitle" padding="extraPad">Sign In
                </Text>
              </Link>
          }
          {loggedIn.data && loggedIn.data.me === null
            ? <Link to="/signup">
                <Text fontWeight="bold" fontSize="subheading" 
                      color="appBarTitle" padding="extraPad">Sign Up
                </Text>
              </Link>
            : <></>
          }

        </>
      }
      </ScrollView>
    </>
  }</View>;
};

export default AppBar;