import { Pressable, StyleSheet, Text, View } from "react-native";
import SuccessSVG from "../../../../../../../../assets/screens/password-resett/success.svg";
import { button } from "../../../../../../../components/button/buttonStyles";

export const PasswordResetted = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('AuthNav');
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <SuccessSVG />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 600,
          lineHeight: 22,
          letterSpacing: 0.5,
          textAlign: 'center',
        }}
      >Password Changed Successfully</Text>
      <Text
        style={{
          fontSize: 17,
          fontWeight: 400,
          lineHeight: 22,
          letterSpacing: -0.4099999964237213,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Your password was changed. Login to the app and enjoy your meal.
      </Text>
      <Pressable style={styles.button({mleft: 10, width: '95%'})} onPress={handleLogin}>
        <Text style={styles.btnLabel}>Login</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: ({mleft, width}) => ({
    ...button,
    marginLeft: mleft,
    marginTop: 30,
    marginBottom: 40,
    width: width,
  }),
  btnLabel: {
    ...button.label,
  },
});
