import { View, Image, StyleSheet } from 'react-native';
import Text from "./Text";
//import NumberFormat from 'react-number-format';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    padding: 20
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    flexWrap: "wrap"
  },
  languageContainer: {
    padding: 5,
    backgroundColor: "blue"
  },
  footer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
});

const CardHeader = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.tinyLogo} source={{
            uri: item.ownerAvatarUrl
          }} />
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        <Text style={styles.languageContainer} color="appBarTitle">{item.language}</Text>
      </View>
    </View>
  );
};

const format = (number) => {
  return number > 999 ? (number/1000).toFixed(1) + 'k' : number
}
const CardFooter = ({item}) => {
  return (
    <>
    <View style={styles.footer}>
      <Text>{format(item.stargazersCount)}{"\n"}Stars</Text>
      <Text>{format(item.forksCount)}{"\n"}Forks</Text>
      <Text>{format(item.reviewCount)}{"\n"}Reviews</Text>
      <Text>{format(item.ratingAverage)}{"\n"}Rating</Text>
    </View>
    </>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.flexContainer}>
      <CardHeader item={item}/>
      <CardFooter item={item}/>
    </View>
  );
};

export default RepositoryItem;