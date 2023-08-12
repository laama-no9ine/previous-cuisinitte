import { Dimensions, Text, View, TextInput, StyleSheet, Pressable, Platform, Alert, PermissionsAndroid } from "react-native";
import React from "react";
import EmirateFlag from '../../../../../../assets/screens/auth/AE.svg';
import DownArrow from '../../../../../../assets/screens/auth/down-arrow.svg';
import FlagAF from '../../../../../../assets/screens/auth/Afghanistan-AF.svg';
import FlagIE from '../../../../../../assets/screens/auth/IE.svg';
import { Separator } from "../../components/separator";
import { button } from "../../../../../components/button/buttonStyles";
import EmailIcon from '../../../../../../assets/screens/auth/email.svg';
import GoogleIcon from '../../../../../../assets/screens/auth/gmail.svg';
import FacebookIcon from '../../../../../../assets/screens/auth/facebook.svg';
import AppleIcon from '../../../../../../assets/screens/auth/apple.svg';
import PhoneIcon from '../../../../../../assets/screens/auth/phone.svg';
import NetInfo from '@react-native-community/netinfo';
import { Formik } from "formik";
import * as Yup from "yup";
import { countries } from "./countries";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import auth from '@react-native-firebase/auth';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email'),
  password: Yup.string().min(8, 'Password must be 8 characters long.').required('Please enter password'),
});

const SignInPhoneSchema = Yup.object().shape({
  phone: Yup.string().required('Please enter your phone'),
});

const TextInputStates = {
  default: '#8D8D8D',
  focus: '#00BCD4',
  error: '#DA1E28',
};

export const SignIn = ({ navigation }) => {
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [signInEmail, setSignInEmail] = React.useState(false);
  const [error, setError] = React.useState('');
  const [toggleCountryCode, setToggleCountryCode] = React.useState(false);
  const inputRef = React.useRef();
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const [isTextInput, setTextInput] = React.useState({ email: false, password: false, });
  const [countryCode, setCountryCode] = React.useState({
    code: '+971',
    flag: "🇦🇪",
  });
  const [countriesList, setCountriesList] = React.useState();

  React.useEffect(() => {
    setCountriesList(countries);
  }, []);

  const handleSignIn = async (values: any) => {
    console.log(values);
    const url = ``;

    try {
      // const login = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({}),
      // });

      // const json = await login.json();

      // console.log({ json });

      
      
      
      
      // Alert.alert(
      //   'Incorrect password or email',
      //   "Sorry, we couldn’t log you in, your email or password may be incorrect or expired. Please try again , or rest your password.",
      //   [
      //     { 
      //       text: 'Reset password',
      //       onPress: () =>  
      //         navigation.navigate('PhoneSignUp', {
      //           action: 'reset-password'
      //         })
      //     },
      //     { text: 'Try again', onPress: () => console.log('Try again'), style: 'cancel' },
      //   ],
      // );




      Alert.alert(
        'Login Failed',
        'There is no account registered with that email. Please enter a registered email or continue to create an account.',
        [
          { 
            text: 'Retry Login',
            style: 'cancel',
          },
          {
            text: 'Create Account',
            onPress: () => navigation.navigate('AuthNav', {
              type: 'signup'
            }),
          },
        ],
      );






      // navigation.navigate('PhoneSignUp', {
      //   values,
      //   action: 'existing-email',
      // });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    
    // try {
    //   const state = await NetInfo.fetch();
    //   console.log(state);
    //   if (state.isConnected) {
    //     console.log('Is connected?', state.isConnected);
    //     console.log('Connection type:', state.type);

    //     // try {
    //       const response = await axios.post('https://10.39.1.220:6666/auth/login', {
    //         values,
    //       })

    //       console.log({ response });

          // const response = await fetch('https://10.39.1.220:6666/auth/login', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify([values]),
          // });

          // const res = await response.json();

          // console.log(res);
        // } catch (error) {
        //   console.log('API Error: ', error);
        // }
    //   }
    // } catch (error) {
    //   console.error('Error checking internet connectivity:', error);
    // }
  };

  const snapPoints = React.useMemo(() => ['5%', '80%'], []);

  const toggleCountryCodes = () => {
    // setToggleCountryCode(!toggleCountryCode);
    bottomSheetModalRef.current?.present();
  };

  const handleSheetChanges = () => {
    // Alert.alert('asdasdsdsdsa');
  };

  const handlePhoneSignIn = async (phoneNumber: any) => {
    // console.log(`+971${phoneNumber}`);
    // return;
    try {
      const confirmation = await auth().signInWithPhoneNumber(`${countryCode.code}${phoneNumber}`); // +971554368550 = a, +971525860502 = j
      
      console.log({ confirmation });

      if (confirmation) {
        // Verify the code entered by the user
        // const credential = auth.PhoneAuthProvider.credential(confirmation.verificationId, code);
  
        // Sign in the user with the verified credential
        // await auth().signInWithCredential(credential);

        navigation.navigate('OTPPhoneVerification', {
          phoneNumber: `${countryCode.code}${phoneNumber}`,
          confirmation,
          action: 'existing'
        });

        return;
      }

      // Verify the code entered by the user
      // const credential = auth.PhoneAuthProvider.credential(confirmation.verificationId, code);
  
      // Sign in the user with the verified credential
      // await auth().signInWithCredential(credential);
  
      // User is now signed in
      // console.log('Phone authentication successful');
    } catch (error) {
      console.log('Phone authentication error:', error.message);
      setError(error.message);
    }
  }

  const debounce = (func, timeout = 300) => {
    let timer;

    return (...args) => {
      if (!timer) {
        func.apply(this, args);
      }

      clearTimeout(timer);

      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  }

  const handleChangeCountry = debounce((value) => {
    // if (value.length > 1) {
      console.log(value);
      setCountriesList(() => countriesList?.filter(country => {
        // console.log(country.name.includes(value));
        if (country.name.toLowerCase().includes(value.toLowerCase())) {
          // console.log(country);
          // setCountriesList(prev => ([country]));
          return country;
        }
      }));

      // const filteredCountries = countriesList?.filter(country => {
      //   // console.log(country.name.includes(value));
      //   if (country.name.toLowerCase().includes(value.toLowerCase())) {
      //     // console.log(country);
      //     setCountriesList(prev => ([country]));
      //     // return country;
      //   }
      // });

      // return;
  
      // console.log(value.length);
      // console.log(filteredCountries.length > 0);
      // console.log('')

      // if (filteredCountries.length > 0) {
      //   setCountriesList(filteredCountries);
      //   return;
      // }
      
      // setCountriesList(countries);
    // }

    // setCountriesList(countries);
  });

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
                  <Formik
                    initialValues={{ phone: '', }}
                    onSubmit={values => {
                      setError('');
                      console.log(values);
                      handlePhoneSignIn(values.phone);
                    }}
                    validationSchema={SignInPhoneSchema}
                  >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                      <>
                        <TextInput
                          style={{
                            marginLeft: -40,
                            borderRadius: 10,
                            borderColor: TextInputStates[
                              errors.phone && 'error' ||
                              (errors.phone && isInputFocus) && 'error' ||
                              isInputFocus && 'focus' ||
                              !isInputFocus && 'default'
                            ], //isInputFocus ? '#00BCD4' : '#8D8D8D',
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            padding: 10,
                            paddingLeft: countryCode.code.length === 3 ? 92 : countryCode.code.length === 4 ? 100 : countryCode.code.length === 5 ? 108 : 68,
                            paddingRight: 13,
                            marginBottom: 10,
                            width: Dimensions.get('window').width - 20,
                          }}
                          placeholder={!countryCode ? 'Phone number' : ''}
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
                          onChangeText={handleChange('phone')}
                        ></TextInput>
                        {countryCode.code && <Text
                          style={{
                            position: 'absolute',
                            top: Platform.OS === 'android' ? 15 : 11,
                            left: 74,
                            color: 'black',
                          }}
                        >{countryCode.code}</Text>}
                        {
                          error && <Text
                            style={{
                              position: 'absolute',
                              color: '#DA1E28',
                              fontSize: 12,
                              top: Platform.OS === 'android' ? 55 : 42,
                              left: 20,
                            }}
                          >{error}</Text>
                        }
                        {errors.phone && touched.phone && <Text
                          style={{
                            position: 'absolute',
                            color: '#DA1E28',
                            fontSize: 12,
                            top: Platform.OS === 'android' ? 55 : 42,
                            left: 20,
                          }}
                        >{errors.phone}</Text>}
                        <Text
                          style={{
                            zIndex: 1,
                            position: 'absolute',
                            left: 20,
                            top: Platform.OS === 'android' ? 10 : 13,
                          }}
                          onPress={toggleCountryCodes}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'black',
                            }}
                            onPress={toggleCountryCodes}
                          >{countryCode.flag}</Text>
                        </Text>
                        <DownArrow
                          style={{
                            position: 'absolute',
                            top: Platform.OS === 'android' ? 10 : 3,
                            left: 45,
                          }}
                          onPress={toggleCountryCodes}
                        />
                        <Pressable style={styles.button({ mleft: -40, width: '108.8%' })} onPress={handleSubmit}>
                          <Text style={styles.btnLabel}>Sign In</Text>
                        </Pressable>
                      </>
                    )}
                  </Formik>
                </View>
              </View>
              :
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={values => {
                    // console.log(values);
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
                            marginBottom: 30,
                            borderRadius: 10,
                            borderColor: TextInputStates[
                              errors.email && 'error' ||
                              (errors.email && isInputFocus) && 'error' ||
                              isInputFocus && 'focus' ||
                              !isInputFocus && 'default'
                            ], //isTextInput.email ? '#00BCD4' : '#8D8D8D',
                            borderWidth: 1,
                            padding: 10,
                            paddingLeft: 13,
                            paddingRight: 13,
                            backgroundColor: '#FFFFFF',
                            width: Dimensions.get('window').width - 20,
                          }}
                          ref={inputRef}
                          onFocus={() => {
                            setTextInput(() => ({ email: true, password: false }));
                          }}
                          onLayout={() => {}}
                          onChangeText={handleChange('email')}
                          onBlur={() => {
                            setInputFocus(!isInputFocus);
                            // handleBlur('email');
                          }}
                        ></TextInput>
                        {errors.email && touched.email && <Text
                          style={{
                            position: 'absolute',
                            color: '#DA1E28',
                            fontSize: 12,
                            top: 80,
                            left: 21,
                            marginBottom: 5,
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
                            borderColor: TextInputStates[
                              errors.password && 'error' ||
                              (errors.password && isInputFocus) && 'error' ||
                              isInputFocus && 'focus' ||
                              !isInputFocus && 'default'
                            ],
                            borderWidth: 1,
                            padding: 10,
                            paddingLeft: 13,
                            paddingRight: 13,
                            backgroundColor: '#FFFFFF',
                            width: Dimensions.get('window').width - 20,
                          }}
                          ref={inputRef}
                          onFocus={() => {
                            setTextInput(() => ({ email: false, password: true }));
                          }}
                          onChangeText={handleChange('password')}
                          onBlur={() => {
                            // setInputFocus(!isInputFocus);
                            // handleBlur('password');
                          }}
                        ></TextInput>
                        {
                          errors.password
                            ?
                            <Text
                              style={{
                                color: `#DA1E28`,
                                fontSize: 11,
                                marginTop: 5,
                                marginLeft: 21,
                            }}>Atleast 8 characters</Text>
                            :
                            <Text
                              style={{
                                color: `rgba(60, 60, 67, 0.6)`,
                                fontSize: 11,
                                marginTop: 5,
                                marginLeft: 21,
                            }}>Atleast 8 characters</Text>
                        }
                      </>
                      <Pressable style={styles.button({mleft: 10, width: '95%'})} onPress={handleSubmit}>
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
                <EmailIcon 
                  style={{
                    position: 'absolute',
                    left: 16,
                  }}
                />
                <Text
                  style={[styles.label, {
                    // left: -20,
                  }]}
                >
                  Continue with Email
                </Text>
              </Pressable>
              :
              <Pressable style={[styles.socialLogin(30)]} onPress={() => setSignInEmail(!signInEmail)}>
                <PhoneIcon
                  style={{
                    position: 'absolute',
                    left: 16,
                  }}
                />
                <Text
                  style={[styles.label, {
                    // left: -15,
                  }]}
                >
                  Continue with Phone Number
                </Text>
              </Pressable>
            }
            <Pressable style={[styles.socialLogin(5)]} onPress={() => ({})}>
              <GoogleIcon
                style={{
                  position: 'absolute',
                  left: 16,
                }}
              />
              <Text
                style={styles.label}
              >
                Continue with Google
              </Text>
            </Pressable>
            <Pressable style={[styles.socialLogin(5)]} onPress={() => ({})}>
              <FacebookIcon
                style={{
                  position: 'absolute',
                  left: 16,
                }}
              />
              <Text
                style={styles.label}
              >
                Continue with Facebook
              </Text>
            </Pressable>
            <Pressable style={[styles.socialLogin(5)]} onPress={() => ({})}>
              <AppleIcon
                style={{
                  position: 'absolute',
                  left: 16,
                }}
              />
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
                  <TextInput
                    style={{
                      borderRadius: 10,
                      backgroundColor: '#FFFFFF',
                      borderColor: '#F2F2F7',
                      borderWidth: 1,
                      textAlign: 'center',
                      marginBottom: 10,
                      width: '100%',
                    }}
                    placeholder='Search by country or code'
                    keyboardAppearance="dark"
                    // ref={inputRef}
                    onFocus={() => {
                      // setInputFocus(!isInputFocus);
                    }}
                    onBlur={() => {
                      // setInputFocus(!isInputFocus);
                    }}
                    onChangeText={handleChangeCountry}
                  ></TextInput>
                    {
                      countriesList?.map(country => (
                        <View
                          style={{
                            borderBottomColor: '#cccccc',
                            borderBottomWidth: 1,
                            paddingTop: 10,
                            paddingBottom: 10,
                            flexDirection: 'row',
                          }}
                          key={country.name}
                        >
                          {/* <FlagAF /> */}
                          <Text style={{
                            opacity: 1,
                            color: 'black',
                          }}
                          onPress={() => {
                            setCountryCode(() => ({
                              code: country.dial_code,
                              flag: country.flag,
                            }));
                            bottomSheetModalRef.current?.close();
                          }}
                          >{country.flag}</Text>
                          <Text
                            style={{
                              marginLeft: 10,
                              width: '100%',
                            }}
                            onPress={() => {
                              setCountryCode(() => ({
                                code: country.dial_code,
                                flag: country.flag,
                              }));
                              bottomSheetModalRef.current?.close();
                            }}>
                            {country.name}
                          </Text>
                          <Text
                            style={{
                              position: 'absolute',
                              top: 12,
                              right: 5,
                            }}
                            onPress={() => {
                              setCountryCode(() => ({
                                code: country.dial_code,
                                flag: country.flag,
                              }));
                              bottomSheetModalRef.current?.close();
                            }}
                            >
                              ({country.dial_code})
                          </Text>
                        </View>
                      ))
                    }
                </ScrollView>
            </BottomSheetModal>
          }
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
    // left: -20,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: -0.23999999463558197,
  },
});
