import { Text, View, StyleSheet, Pressable } from "react-native";
// import { LocationSVG, PageTitle } from "./location.styled.ios";
import SVGLocation from "../../../assets/screens/location/location.svg";
import SVG from "../../../assets/screens/location/location.svg";

export const Location = ({ navigation }) => {

  const handleNavigation = () => {
    navigation.navigate('Map');
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SVG width="230" />
      <Text style={styles.title}>Cuisinette needs your location to show best food options in your area.</Text>
      <Text style={styles.subTitle}>Your deliver location will personalize your experience with us.</Text>
      <Pressable style={styles.button} onPress={handleNavigation}>
        <Text style={styles.button.label}>Continue</Text>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
    letterSpacing: 0.3799999952316284,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  subTitle: {
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.4099999964237213,
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    width: '95%',
    paddingTop: 14,
    paddingRight: 20,
    paddingBottom: 14,
    paddingLeft: 20,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#00BCD4',
    label: {
      fontFamily: 'Arial',
      fontSize: 17,
      fontWeight: 600,
      lineHeight: 22,
      letterSpacing: -0.4099999964237213,
      textAlign: 'left',
      color: '#ffffff',
    }
  },
});
