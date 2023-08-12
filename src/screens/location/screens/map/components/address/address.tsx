import { BButton } from "@components/Button"
import { Text, View, Platform, Alert } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import { Confirm, UserAddress, AddressText, AddressIcon, FlexContainer } from "./address.styled.ios";
import Mappin from "../../../../../../../assets/screens/location/mappin.svg";
// import Load from "../../../../../../../assets/screens/location/load.svg";
import React from "react";

export const Address = ({ networkRequest }) => {
  // const [networkRequest, setNetworkRequest] = React.useState(false);

  // React.useEffect(() => {
  //   setNetworkRequest(true);

  //   Geolocation.getCurrentPosition((position) => {
  //     const currentLongitude = JSON.stringify(position.coords.longitude);
  //     const currentLatitude = JSON.stringify(position.coords.latitude);
      
  //     console.log(currentLongitude);
  //     console.log(currentLatitude);
      
  //     setNetworkRequest(false);
  //   }, (error) => {
  //     console.error(error.message);
  //   },
  //   {
  //     enableHighAccuracy: false,
  //     timeout: 30000,
  //     maximumAge: 1000,
  //   });
  // }, []);

  const pressed = () => {
    console.log('PRESSED');
  };

  return (
    <UserAddress>
      <Confirm>Confirm delivery address</Confirm>
      <FlexContainer>
        <AddressIcon />
        <AddressText>
          Clover bay Tower - Marasi Drive - Business Bay
        </AddressText>
        <BButton
          title={networkRequest ? `Finding your location` : `Confirm location`}
          background="pc"
          position="80px"
          onPress={pressed}
          load={true}
        />
      </FlexContainer>
    </UserAddress>
  )
}
