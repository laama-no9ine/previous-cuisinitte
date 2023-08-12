import { ListItem, Avatar } from "@rneui/base";
import { View, SectionList, Text, StyleSheet, Dimensions, Pressable, Button, Platform, Alert, TouchableHighlight } from "react-native";
import { useSearch } from "../../context";
import LocationSVG from "../../../../../assets/screens/search-bar/location.svg";
import { useHeaderHeight, getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import React from "react";
import DeviceInfo from 'react-native-device-info';
import SVGSearchIcon from '../../../../../assets/screens/search-bar/search.svg';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

export const SearchResult = () => {
  const {
    data,
    userQuery,
    Animated,
    fadeAnim,
  } = useSearch();
  // let headerHeight = useHeaderHeight();
  const [heightOfHeader, setHeight] = React.useState(useHeaderHeight());
  // let type = DeviceInfo.getDeviceType();
  // const frame = useSafeAreaFrame();
  // const insets = useSafeAreaInsets();

  // const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  // console.log({ headerHeight });

  React.useEffect(() => {
    if (Platform.OS === 'ios' && heightOfHeader === 64) {
      // headerHeight = headerHeight - (64 - 53.67);
      setHeight(heightOfHeader - 23);
    }
  }, []);

  const ItemPressed = () => {
    console.log('ASDASDSA');
  }

  if (!userQuery) {
    return (
      <View style={[styles.searchContainer(heightOfHeader), styles.center]}>
        <SVGSearchIcon />
        <Text style={ styles.gap }>Search your address</Text>
      </View>
    )
  }
  
  return (
    <Animated.View style={{ ...styles.searchContainer(heightOfHeader), opacity: fadeAnim, }}>
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item, index}) => {
          return (
            <CustomerAddress key={index} userKey={userQuery} data={item} />
          );
        }}
      />
    </Animated.View>
  )
};

const CustomerAddress = ({ userKey, data }: { userKey: string; data: string; }) => {
  if (data.name.toLowerCase().includes(userKey.toLowerCase())) {
    return (
      <>
        {
          userKey && (
            <View style={styles.item}>
              <LocationSVG style={styles.icon} />
              {
                <View>
                  <Text style={styles.name} onPress={() => Alert.alert('Alert')}>
                    {
                      data.name.split(new RegExp(`(${userKey})`, 'gi'))
                        .map((part, index) => 
                          part.toLowerCase() === userKey.toLowerCase()
                          ? <Text key={index} style={styles.highlight}>{part}</Text>
                          : part
                        )
                    }
                  </Text>
                  <Text style={styles.address}>{data.address}</Text>
                </View>
              }
            </View>
          )
        }
      </>
    )
  }

  return null;
};

const styles = StyleSheet.create({
  searchContainer: (heightOfHeader) => ({
    position: 'absolute',
    left: -50,
    top: heightOfHeader,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#ffffff',
  }),
  gap: {
    marginTop: 30,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  name: {
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
    letterSpacing: -0.4099999964237213,
    textAlign: 'left',
  },
  address: {
    fontFamily: 'Arial',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 16,
    letterSpacing: -0.07999999821186066,
    textAlign: 'left',
    color: '#8D8D8D',
  },
  icon: {
    marginRight: 10,
  },
  highlight: {
    color: '#00BCD4',
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});



{/* <ListItem
              bottomDivider
              Component={TouchableHighlight}
              containerStyle={{...styles.item}}
              disabledStyle={{ opacity: 0.5 }}
              onLongPress={() => Alert.alert("onLongPress()")}
              onPress={() => Alert.alert("onPress()")}
              pad={20}
            >
              <LocationSVG style={styles.icon} />
              <ListItem.Content>
                <ListItem.Title style={styles.name}>
                  {
                    data.name
                  }
                </ListItem.Title>
                <ListItem.Subtitle>
                  <Text style={styles.address}>{data.address}</Text>
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem> */}