import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from './Icon';
import {SIZE} from '../common/utils/size';
import {IMAGES} from '../common/images';
import {COLORS} from '../common/utils/colors';
const SearchBar = ({onChangeText}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInputArea}
        placeholder="SEARCH"
        onChangeText={onChangeText}
      />
      <Icon
        source={IMAGES.ic_search}
        style={styles.searchIcon}
        size={SIZE.x30}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: SIZE.x1,
    borderRadius: SIZE.x26,
    margin: SIZE.x24,
    paddingRight: SIZE.x10,
  },
  searchInputArea: {
    height: SIZE.x50,
    width: SIZE.x240,
    marginHorizontal: SIZE.x10,
    paddingLeft: SIZE.x14,
    color: COLORS.WHITE,
    fontSize: SIZE.x18,
    fontWeight: '600',
  },
  searchIcon: {
    position: 'relative',
    marginRight: SIZE.x10,
  },
});

export default SearchBar;
