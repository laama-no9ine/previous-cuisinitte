import React from 'react';
import {
  createContext,
  useEffect,
  useContext,
  useState
} from 'react';
import { Animated, Dimensions, Easing } from 'react-native';

const DATA = [
  {
    data: [{
      name: 'Clover Bay Tower',
      address: 'Marasi Drive - Business Bay - Dubai - United Arab Emirates ',
    }, {
      name: 'Clover Medical Center',
      address: 'Dubai - United Arab Emirates',
    }, {
      name: 'Clover Bay Tower 2',
      address: 'Dubai - United Arab Emirates',
    }, {
      name: 'Clover Bay Tower Parking',
      address: 'Marasi Drive -Dubai - United Arab Emirates',
    }, {
      name: 'Clover Bay Tower',
      address: 'Marasi Drive - Business Bay-Dubai',
    }],
  }
];

export const SearchContext = createContext({});

export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [data, setData] = useState(DATA);
  const [userQuery, setUserQuery] = useState<string>('');
  const [isSearchBoxFocused, setSearchResult] = useState<boolean>(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isSearchBoxFocused) return;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [isSearchBoxFocused, fadeAnim]);

  return (
    <SearchContext.Provider
      value={{
        data,
        setUserQuery,
        userQuery,
        isSearchBoxFocused,
        setSearchResult,
        Animated,
        fadeAnim,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
