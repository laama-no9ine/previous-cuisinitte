import { Image } from "react-native";
import { View, Text } from "react-native";
import { LocationImage, LImage } from "./location.styled";
// import { SvgUri } from 'react-native-svg';
import Location from "../../../../../assets/screens/location/location.svg";
import { SVGLocation, SubTitle, Title } from "./location.styled.ios";
import { BButton } from "@components/Button";

export function LocationScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SVGLocation width="200" />
      <Title>Cuisinette needs your location to show best food options in your area.</Title>
      <SubTitle>Your deliver location will personalize your experience with us.</SubTitle>
      <BButton title="Continue" background="pc" onPress={() => navigation.navigate('Map')} />
    </View>
  );
}
