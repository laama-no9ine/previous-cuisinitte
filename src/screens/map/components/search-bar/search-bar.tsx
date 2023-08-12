import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SearchResult } from "../search-results/search-results";
import { useSearch } from "../../context";
import React from "react";

export const SearchBar = () => {
  const {
    setUserQuery,
    setSearchResult,
    isSearchBoxFocused,
    inputErrorState
  } = useSearch();
  
  const inputRef = React.useRef();

  return (
    <>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={styles.input(isSearchBoxFocused)}
          placeholder="Search your address"
          onChangeText={(userKey) => setUserQuery(userKey)}
          onFocus={() => {
            setSearchResult(!isSearchBoxFocused);
          }}></TextInput>
          {
            isSearchBoxFocused && 
              <Button
                title="Cancel"
                onPress={() => {
                  setSearchResult(!isSearchBoxFocused, inputErrorState);
                  inputRef?.current.blur();
                  inputRef?.current.clear();
                  setUserQuery('');
                }}>
                <Text>Cancel</Text>
              </Button>
          }
      </View>
      {
        isSearchBoxFocused
        ?
          <SearchResult />
        :
          null
      }
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    left: 10,
    flexDirection: 'row',
  },
  input: (isSearchBoxFocused) => {
    if (isSearchBoxFocused) {
      return {
        marginLeft: -20,
        borderRadius: 10,
        borderColor: '#00BCD4',
        borderWidth: 1,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        width: isSearchBoxFocused ? '70%' : '96%',
      }
    }
    return {
      marginLeft: -20,
      borderRadius: 10,
      borderColor: '#8D8D8D',
      borderWidth: 1,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      width: isSearchBoxFocused ? '70%' : '96%',
    }
  },
  searchContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  item: {},
  title: {},
});
