import { Dimensions, Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import EmirateFlag from '../../../../../../assets/screens/auth/AE.svg';
import React from "react";
import { Separator } from "../components/separator";
import { button } from "../../../../components/button/buttonStyles";
import EmailIcon from '../../../../../../assets/screens/auth/email.svg';
import GoogleIcon from '../../../../../../assets/screens/auth/gmail.svg';
import FacebookIcon from '../../../../../../assets/screens/auth/facebook.svg';
import AppleIcon from '../../../../../../assets/screens/auth/apple.svg';

export const SignIn = () => {
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const inputRef = React.useRef();

  React.useEffect(() => {
    const signIn = async () => {
      console.log('lashdjash');
    };

    signIn();
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <View
        style={{
          position: 'relative',
          paddingLeft: 50,
          width: Dimensions.get('window').width,
        }}
      >
        <EmirateFlag
          style={{
            zIndex: 1,
            width: 100,
            height: 100,
            position: 'absolute',
            left: 20,
            top: 10,
          }}
        />
        {
          !isInputFocus && <Text
            style={{
              left: 50,
              top: 10,
              color: '#cccccc',
              position: 'absolute',
          }}>Phone number</Text>
        }
        <TextInput
          style={{
            marginLeft: -40,
            borderRadius: 10,
            borderColor: '#8D8D8D',
            borderWidth: 1,
            padding: 10,
            paddingLeft: 42,
            paddingRight: 13,
            width: Dimensions.get('window').width - 20,
          }}
          onChangeText={(event) => console.log(event)}
          // keyboardType="phone-pad"
          // keyboardAppearance="dark"
          ref={inputRef}
          onFocus={() => {
            setInputFocus(!isInputFocus);
          }}
          onLayout={() => {}}
          onBlur={() => {
            setInputFocus(!isInputFocus);
          }}
        ></TextInput>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.button.label}>Sign In</Text>
      </Pressable>
      <Separator />
      <View>
        <Pressable style={styles.socialLogin(30)} onPress={() => ({})}>
          <EmailIcon />
          <Text
            style={styles.label}
          >
            Continue with Phone
          </Text>
        </Pressable>
        <Pressable style={styles.socialLogin(5)} onPress={() => ({})}>
          <GoogleIcon />
          <Text
            style={styles.label}
          >
            Continue with Google
          </Text>
        </Pressable>
        <Pressable style={styles.socialLogin(5)} onPress={() => ({})}>
          <FacebookIcon />
          <Text
            style={styles.label}
          >
            Continue with Facebook
          </Text>
        </Pressable>
        <Pressable style={styles.socialLogin(5)} onPress={() => ({})}>
          <AppleIcon />
          <Text
            style={styles.label}
          >
            Continue with Apple
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    ...button,
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 40,
    label: {
      ...button.label,
    },
  },
  socialLogin: (margin) => ({
    ...button,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginTop: margin,
    marginBottom: 5,
    backgroundColor: '#EFEFF4',
    borderColor: '#3C3C432E',
    borderWidth: 1,
  }),
  label: {
    color: '#4D5461',
    textAlign: 'center',
    width: '100%',
    left: -20,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: -0.23999999463558197,
  },
})
