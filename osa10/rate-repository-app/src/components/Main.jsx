import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import CreateReview from './CreateReview';
import SignupForm from './SignupForm';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import SignIn from './SignIn';

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
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} exact/>
        <Route path="/repository/:id" element={<RepositoryView />} exact/>
        <Route path="/review" element={<CreateReview />} exact/>
        <Route path="/signup" element={<SignupForm />} exact/>
      </Routes>
      {/* <RepositoryList /> */}
    </View>
  );
};

export default Main;