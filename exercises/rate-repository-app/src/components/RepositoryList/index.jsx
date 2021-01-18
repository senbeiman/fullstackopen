import { useDebounce } from 'use-debounce';
import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItemContainer';
import theme from '../../theme';
import { useHistory } from 'react-router-native';
import SortMenu from './SortMenu';
import SearchBar from './SearchBar';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
  header: {
    backgroundColor: theme.colors.backgroundPrimary
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortPrinciple, onMenuSelect, keyword, onKeywordChange } = this.props;
    return (
      <View style={styles.header}>
        <SearchBar  value={keyword} onChange={onKeywordChange} />
        <SortMenu current={sortPrinciple} onPress={onMenuSelect} />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {this.props.onItemPress(item.id);}}>
            <RepositoryItem item={item} />
          </TouchableOpacity>
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortPrinciple, setSortPrinciple] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const history = useHistory();
  const createVariables = (sortPrinciple) => {
    switch (sortPrinciple) {
      case 'latest':
        return { orderBy: 'CREATED_AT' };
      case 'highest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowest':
      default:
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    }
  };
  const { repositories, fetchMore } = useRepositories({...createVariables(sortPrinciple), searchKeyword: debouncedKeyword });
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : []; 
  const onMenuSelect = (value) => {
    setSortPrinciple(value);
  };
  const onItemPress = (value) => {
    history.push(`/${value}`);
  };
  const onKeywordChange = (value) => {
    setSearchKeyword(value);
  };
  const onEndReach = () => {
    fetchMore();
  };
  return <RepositoryListContainer 
            repositories={repositoryNodes} 
            sortPrinciple={sortPrinciple} 
            onMenuSelect={onMenuSelect} 
            onItemPress={onItemPress}
            onKeywordChange={onKeywordChange}
            onEndReach={onEndReach}
            keyword={searchKeyword}
          />;
};

export default RepositoryList;