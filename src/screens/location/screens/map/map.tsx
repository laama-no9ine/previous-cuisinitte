import React from "react";
import { SafeAreaView } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Address } from "./components/address";
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoder';

export const MapScreen = ({ navigation }) => {
  const [networkRequest, setNetworkRequest] = React.useState(false);
  const [geo, setGeo] = React.useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.015,
    longitudeDelta: 0.121,
  });

  React.useEffect(() => navigation.addListener('beforeRemove', (e: any) => {
    e.preventDefault();
  }),[navigation]);

  React.useEffect(() => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      console.log(result);
    });
  }, []);

  React.useEffect(() => {
    setNetworkRequest(true);

    Geolocation.getCurrentPosition((position) => {
      console.log({ position });

      // Geocoder.geocodePosition({
      //   lat: position.coords.longitude,
      //   lng: position.coords.latitude,
      // }).then((res: any) => {
      //   // res is an Array of geocoding object (see below)
      //   console.log({ res });
      // }).catch((err: any) => console.error(err));

      // Geocoder.fallbackToGoogle("AIzaSyD5FdWyEl5taOqVxBhSS6FsnBsXykhG6Y0");
 
      // use the lib as usual
      // Geocoder.geocodePosition({
      //   lat: position.coords.longitude,
      //   lng: position.coords.latitude,
      // }).then(res => {
      //   console.log({ res });
      // });

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
  }, []);

  const coords = () => {
    console.log('CLICKED');
  }

  console.log({ geo });

  return (
    <SafeAreaView>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: '100%',
          height: '100%',
        }}
        region={geo}
        showsUserLocation={true}
        // onRegionChangeComplete={(region) => {
        //   setGeo(region);
        // }}
      >
        <Marker
          coordinate={{
            latitude: geo.latitude,
            longitude: geo.longitude,
          }}
          image={require("../../../../../assets/screens/map/marker.png")}
        />
      </MapView>
      <Address networkRequest={networkRequest} />
    </SafeAreaView>
  )
}
