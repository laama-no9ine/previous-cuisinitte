import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from "react";
import { Animated, Pressable, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { mapStyles } from "./mapStyles";
import { UserAddress } from "./components/user-address";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

export const Map = ({ navigation }) => {
  const [networkRequest, setNetworkRequest] = React.useState(false);
  const [geo, setGeo] = React.useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.016,
    longitudeDelta: 0.121,
  });
  const slideUpValue = React.useRef(new Animated.Value(10)).current;
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // latitude: -122.406417,
  //   longitude: 37.785834,
  //   latitudeDelta: 0.016,
  //   longitudeDelta: 0.121,

  React.useEffect(() => navigation.addListener('beforeRemove', (e: any) => {
    e.preventDefault();
  }),[navigation]);

  React.useEffect(() => {
    
  }, []);

  React.useEffect(() => {
    setNetworkRequest(true);

    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      Geolocation.getCurrentPosition((position) => {
        console.log({ position });
        setGeo(({ latitudeDelta, longitudeDelta }) => {
          return {
            latitude: position.coords.longitude,
            longitude: position.coords.latitude,
            latitudeDelta,
            longitudeDelta,
          }
        });
        
        setNetworkRequest(false);
      }, (error) => {
        console.error(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      });
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const getLocation = React.useCallback(() => {
    setNetworkRequest(true);

    Geolocation.getCurrentPosition((position) => {
      console.log({ position });
      setGeo(({ latitudeDelta, longitudeDelta }) => {
        return {
          latitude: position.coords.longitude,
          longitude: position.coords.latitude,
          latitudeDelta: 0.043,
          longitudeDelta: 0.034,
        }
      });
      
      setNetworkRequest(false);
    }, (error) => {
      console.error(error.message);
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 1000,
    });
  }, [geo]);

  React.useEffect(() => {
    // Animated.timing(slideUpValue, {
    //   toValue: -100,
    //   duration: 1000,
    //   useNativeDriver: true,
    // });
    handlePresentModalPress();
  }, []);

  const snapPoints = React.useMemo(() => ['5%', '35%'], []);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const navigateScreen = () => {
    navigation.navigate('AuthNav');
  };

  console.log({ geo });

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              width: '100%',
              height: '100%',
            }}
            region={geo}
            customMapStyle={mapStyles}
            // initialRegion={geo}
            showsUserLocation={true}
            // onRegionChangeComplete={(region) => {
            //   setGeo(region);
            // }}
            onPress={getLocation}
          >
            <Marker
              coordinate={{
                latitude: geo?.latitude,
                longitude: geo?.longitude,
              }}
              image={require("../../../assets/screens/map/marker.png")}
            />
          </MapView>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={handleSheetChanges}>
            <UserAddress
              coordinate={{
                latitude: geo?.latitude,
                longitude: geo?.longitude,
              }}
              navigateScreen={navigateScreen}
            />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
};
