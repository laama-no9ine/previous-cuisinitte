import { Dimensions, Text, View, TextInput, StyleSheet, Pressable, Platform, Alert } from "react-native";
import React from "react";
import EmirateFlag from '../../../../../../assets/screens/auth/AE.svg';
import DownArrow from '../../../../../../assets/screens/auth/down-arrow.svg';
import FlagAF from '../../../../../../assets/screens/auth/flags/Afghanistan-AF.svg';
import FlagIE from '../../../../../../assets/screens/auth/flags/IE.svg';
import { Separator } from "../../components/separator";
import { button } from "../../../../../components/button/buttonStyles";
import EmailIcon from '../../../../../../assets/screens/auth/email.svg';
import GoogleIcon from '../../../../../../assets/screens/auth/gmail.svg';
import FacebookIcon from '../../../../../../assets/screens/auth/facebook.svg';
import AppleIcon from '../../../../../../assets/screens/auth/apple.svg';
import PhoneIcon from '../../../../../../assets/screens/auth/phone.svg';
import { Formik } from "formik";
import * as Yup from "yup";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email'),
  // password: Yup.string().length(1, 'Password must be 8 characters long.').required('Please enter password'),
  password: Yup.string()
              .min(8, 'Password must be 8 characters long.')
              .required('Please enter password'),
});

export const SignIn = () => {
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [signInEmail, setSignInEmail] = React.useState(false);
  const [error, setError] = React.useState('');
  const [toggleCountryCode, setToggleCountryCode] = React.useState(false);
  const inputRef = React.useRef();
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handleSignIn = async (values) => {
    console.log({values});
    try {
      const response = await fetch('https://10.39.1.220:6666/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const res = await response.json();

      console.log(res);
    } catch (error) {
      console.log('sjahdkjsL: ', error);
    }
  };

  const snapPoints = React.useMemo(() => ['5%', '80%'], []);

  const toggleCountryCodes = () => {
    // setToggleCountryCode(!toggleCountryCode);
    bottomSheetModalRef.current?.present();
  };

  const handleSheetChanges = () => {
    // Alert.alert('asdasdsdsdsa');
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View
          style={{
            justifyContent: 'center',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
            {
              !signInEmail
              ?
              <View>
                <View
                  style={{
                    position: 'relative',
                    paddingLeft: 50,
                    width: Dimensions.get('window').width,
                  }}
                >
                  <Text
                    style={{
                      zIndex: 1,
                      position: 'absolute',
                      left: 20,
                      top: Platform.OS === 'android' ? 3 : 10,
                    }}
                    onPress={toggleCountryCodes}
                  >
                    <EmirateFlag />
                    <DownArrow />
                </Text>
                  {
                    !isInputFocus && <Text
                      style={{
                        left: 75,
                        top: Platform.OS === 'android' ? 14 : 10,
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
                    keyboardType="phone-pad"
                    keyboardAppearance="dark"
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
                  <Text style={styles.btnLabel}>Sign In</Text>
                </Pressable>
              </View>
              :
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={values => {
                    console.log('alsjdhjlashd');
                    handleSignIn(values);
                  }}
                  validationSchema={SignInSchema}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                      <>
                        <TextInput
                          placeholder="Email Address"
                          style={{
                            marginTop: 30,
                            marginLeft: 10,
                            marginBottom: 10,
                            borderRadius: 10,
                            borderColor: '#8D8D8D',
                            borderWidth: 1,
                            padding: 10,
                            paddingLeft: 13,
                            paddingRight: 13,
                            width: Dimensions.get('window').width - 20,
                          }}
                          ref={inputRef}
                          onFocus={() => {
                            setInputFocus(!isInputFocus);
                          }}
                          onLayout={() => {}}
                          onChangeText={handleChange('email')}
                          onBlur={() => {
                            setInputFocus(!isInputFocus);
                            handleBlur('email');
                          }}
                        ></TextInput>
                        {errors.email && touched.email && <Text
                          style={{
                            color: 'red',
                            fontSize: 12,
                            top: -10,
                            left: 13,
                          }}
                        >{errors.email}</Text>}
                      </>
                      <>
                        <TextInput
                          secureTextEntry={true}
                          placeholder="Password"
                          style={{
                            marginLeft: 10,
                            borderRadius: 10,
                            borderColor: '#8D8D8D',
                            borderWidth: 1,
                            padding: 10,
                            paddingLeft: 13,
                            paddingRight: 13,
                            width: Dimensions.get('window').width - 20,
                          }}
                          ref={inputRef}
                          onFocus={() => {
                            setInputFocus(!isInputFocus);
                          }}
                          onChangeText={handleChange('password')}
                          onBlur={() => {
                            setInputFocus(!isInputFocus);
                            handleBlur('password');
                          }}
                        ></TextInput>
                        {
                          (error.password && touched.password)
                            &&
                            <Text style={{
                              color: `red`,
                              fontSize: 11,
                              marginTop: 5,
                              marginLeft: 12,
                            }}>Atleast 8 characters</Text>
                            // <Text style={{
                            //   color: `rgba(60, 60, 67, 0.6)`,
                            //   fontSize: 11,
                            //   marginTop: 5,
                            //   marginLeft: 12,
                            // }}>Atleast 8 characters</Text>
                        }
                      </>
                      <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.btnLabel}>Sign In</Text>
                      </Pressable>
                    </View>
                  )}
                </Formik>
            }
          <Separator />
          <View>
            {
              !signInEmail
              ?
              <Pressable style={styles.socialLogin(30)} onPress={() => setSignInEmail(!signInEmail)}>
                <EmailIcon />
                <Text
                  style={[styles.label, { left: -20, }]}
                >
                  Continue with Email
                </Text>
              </Pressable>
              :
              <Pressable style={styles.socialLogin(30)} onPress={() => setSignInEmail(!signInEmail)}>
                <PhoneIcon />
                <Text
                  style={[styles.label, { left: -15, }]}
                >
                  Continue with Phone Number
                </Text>
              </Pressable>
            }
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
              <Text style={styles.label}>
                Continue with Apple
              </Text>
            </Pressable>
          </View>
          {
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              onChange={handleSheetChanges}>
                <ScrollView
                  style={{
                    flexDirection: 'column',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  <View
                    style={{
                      borderBottomColor: '#cccccc',
                      borderBottomWidth: 1,
                      paddingTop: 10,
                      paddingBottom: 10,
                      flexDirection: 'row',
                    }}
                  >
                    <FlagAF />
                    <Text style={{
                      marginLeft: 10,
                    }}>Afghanistan</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#cccccc',
                      borderBottomWidth: 1,
                      paddingTop: 10,
                      paddingBottom: 10,
                      flexDirection: 'row',
                    }}
                  >
                    <FlagIE />
                    <Text style={{
                      marginLeft: 10,
                    }}>Aland Island</Text>
                  </View>
                </ScrollView>
            </BottomSheetModal>
          }
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  button: {
    ...button,
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 40,
  },
  btnLabel: {
    ...button.label,
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
});
