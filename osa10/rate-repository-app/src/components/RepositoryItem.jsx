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
    flexGrow: 1
  },
  avatarContainer: {
    paddingRight: 15
  },
  infoContainer: {
    flexShrink: 1,
    paddingBottom: 20
  },
  languageContainer: {
    padding: 5,
    paddingBottom: 10,
    backgroundColor: "blue",
    borderRadius: 4
  },
  footer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around'
  },
});

// repositorio-kortin yläosa, jossa näytetään omistajan avatar, jonka vieressä oikealla
// repositorion nimi, kuvaus ja kieli
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

// lukujen formatointi apufunktio.
const format = (number) => {
  return number > 999 ? (number/1000).toFixed(1) + 'k' : number
}

// repo-kortin alaosa, jossa näytetään kaikki pyydetyt luvut
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