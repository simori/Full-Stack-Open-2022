import { FlatList, View, StyleSheet, Platform, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories.js';
import { useNavigate } from "react-router-native";
import { Button, Menu, Divider, Provider, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { useDebounce } from "use-debounce";
import React from 'react';

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

// 10.23 repositorioiden lajitteluvalikko
const SortMenu = ({ setSort }) => {
  const [visible, setVisible] = useState(false);
  
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          paddingBottom: 200,
          flexDirection: 'row',
          justifyContent: 'left'
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Filter repositories</Button>}>
          <Menu.Item onPress={() => setSort(["CREATED_AT", "DESC"])} title="Latest" />
          <Menu.Item onPress={() => setSort(["RATING_AVERAGE", "DESC"])} title="Highest rated" />
          <Divider />
          <Menu.Item onPress={() => setSort(["RATING_AVERAGE", "ASC"])} title="Lowest rated" />
        </Menu>
      </View>
    </Provider>
  );
}

// korjataan RepositoryListContainer luokkakomponentiksi niin 
// saadaan hakupalkki toimimaan kunnolla ...kai?z
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    return (
      <>
        <Searchbar
          placeholder="Filtteri!"
          onChangeText={props.onChange}
          value={props.searchQuery}
        />
        <SortMenu setSort={props.setSort}/>
      </>
    );
  };

  render() {
    const props = this.props;

    // Get the nodes from the edges array
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

      console.log('REPONODES:', repositoryNodes);
    return (
      <FlatList
        // ...
        data={repositoryNodes}
        // Other props
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <Pressable onPress={() => {
            console.log(item.id);
              props.navigate(`/repository/${item.id}`);
            }}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    );
  }
}

const RepositoryList = () => {

  const navigate = useNavigate();
  const [sort, setSort] = useState(["CREATED_AT", "DESC"])
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 666);
  const onChangeSearch = query => setSearchQuery(query);
  const { repositories, fetchMore } = useRepositories({
    first: 5,
    orderBy: sort[0], 
    orderDirection: sort[1], 
    searchKeyword: debouncedQuery,
  });

  const onEndReach = () => {
    console.log('reached end, fetching more!');
    fetchMore();
  }

  return (
    <>
      <RepositoryListContainer repositories={repositories} setSort={setSort}
        searchQuery={searchQuery} debouncedQuery={debouncedQuery} setSearch={setSearchQuery} 
        onChange={onChangeSearch} navigate={navigate} onEndReach={onEndReach} />
      {/* <RepositoryListContainere repositories={repositories} setSort={setSort} /> */}
    </>
  );
};


export default RepositoryList;
