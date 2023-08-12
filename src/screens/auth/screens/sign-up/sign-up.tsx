import { Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import FlagAE from "../../../../../assets/screens/auth/AE.svg";
import DownArrow from "../../../../../assets/screens/auth/down-arrow.svg";
import { button } from "../../../../components/button/buttonStyles";
import React from "react";
import { Separator } from "../components/separator";
import EmailIcon from "../../../../../assets/screens/auth/email.svg";
import GoogleIcon from "../../../../../assets/screens/auth/gmail.svg";
import PhoneIcon from "../../../../../assets/screens/auth/phone.svg";
import FacebookIcon from "../../../../../assets/screens/auth/facebook.svg";
import AppleIcon from "../../../../../assets/screens/auth/apple.svg";
import FlagAF from "../../../../../assets/screens/auth/Afghanistan-AF.svg";
import FlagIE from "../../../../../assets/screens/auth/IE.svg";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from '@react-native-firebase/auth';

const SignUpSchema = Yup.object().shape({
  phone: Yup.string().required('Please enter your phone number'),
});

const SignUpEmailSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string().email('Invalid email').required('Please enter your email'),
  password: Yup.string().min(8, 'Password must be 8 characters long.').required('Please enter password'),
});

const TextInputStates = {
  default: '#8D8D8D',
  focus: '#00BCD4',
  error: '#DA1E28',
};

export const SignUp = ({ navigation }) => {
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [signInEmail, setSignInEmail] = React.useState(false);
  const inputRef = React.useRef();
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const [isTextInput, setTextInput] = React.useState({ name: false, email: false, password: false });
  const [countryCode, setCountryCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [countries, setCountries] = React.useState([]);
  const [userValues, setUserValues] = React.useState();

  React.useEffect(() => {
    const fetchCountries = async () => {
      const url = 'https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '5eed466f5dmsh70d2a386f8f98d8p1231a6jsn2c572f1e8a3d',
          'X-RapidAPI-Host': 'ajayakv-rest-countries-v1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    // fetchCountries();
  }, []);

  // console.log(countries);

  const snapPoints = React.useMemo(() => ['5%', '80%'], []);

  const toggleCountryCodes = () => {
    // setToggleCountryCode(!toggleCountryCode);
    bottomSheetModalRef.current?.present();
  };

  const handlePhoneSignUp = async (phoneNumber: number) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+971${phoneNumber}`); // +971554368550
      
      if (confirmation) {
        navigation.navigate('OTPPhoneVerification', {
          phoneNumber: `+971${phoneNumber}`,
          confirmation,
        });
      }

      // Verify the code entered by the user
      // const credential = auth.PhoneAuthProvider.credential(confirmation.verificationId, code);
  
      // Sign in the user with the verified credential
      // await auth().signInWithCredential(credential);
  
      // User is now signed in
      console.log('Phone authentication successful');
    } catch (error) {
      console.log('Phone authentication error:', error.message);
      setError(error.message);
    }
  }
  
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
          <View style={{
            position: 'relative',
            width: '100%',
          }}>
            {
              error &&
              <Text
              style={{
                position: 'absolute',
                color: '#DA1E28',
                fontSize: 12,
                top: Platform.OS === 'android' ? 55 : 42,
                left: 20,
              }}
              >{error}</Text>
            }
            {
              // !signInEmail
              // ?
              //   <Formik
              //     initialValues={{ phone: '', }}
              //     onSubmit={values => {
              //       // console.log(values);
              //       // handleSignIn(values);
              //       handlePhoneSignUp(values.phone);
              //     }}
              //     validationSchema={SignUpSchema}
              //   >
              //     {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              //       <>
              //         <TextInput
              //           placeholder={!countryCode ? `Phone number` : ``}
              //           style={{
              //             borderWidth: 1,
              //             borderColor: TextInputStates[
              //               (errors.phone || error) && 'error' ||
              //               (errors.phone && isInputFocus) && 'error' ||
              //               isInputFocus && 'focus' ||
              //               !isInputFocus && 'default'
              //             ],
              //             backgroundColor: '#FFFFFF',
              //             borderRadius: 10,
              //             width: '100%',
              //             padding: 10,
              //             paddingLeft: countryCode ? 105 : 68,
              //             marginBottom: 10,
              //           }}
              //           keyboardType="phone-pad"
              //           onFocus={() => {
              //             setInputFocus(!isInputFocus);
              //           }}
              //           onBlur={() => {
              //             setInputFocus(!isInputFocus);
              //           }}
              //           onChangeText={handleChange('phone')}
              //         ></TextInput>
              //         {
              //           countryCode && <Text
              //             style={{
              //               position: 'absolute',
              //               left: 70,
              //               top: 14,
              //             }}
              //           >
              //             {countryCode}
              //           </Text>
              //         }
              //         {errors.phone && touched.phone && <Text
              //           style={{
              //             position: 'absolute',
              //             color: 'red',
              //             fontSize: 12,
              //             top: 55,
              //             left: 13,
              //           }}
              //         >{errors.phone}</Text>}
              //         <Text
              //           style={{
              //             position: 'absolute',
              //             top: Platform.OS === 'android' ? 17 : 13,
              //             left: 10,
              //           }}
              //           onPress={toggleCountryCodes}
              //         >
              //           {
              //             countryCode === '+000' ? <FlagAF /> : countryCode === '+001' ? <FlagIE /> : <FlagAE />
              //           }
              //         </Text>
              //         <DownArrow
              //           style={{
              //             position: 'absolute',
              //             top: Platform.OS === 'android' ? 10 : 3,
              //             left: 35,
              //           }}
              //         />
              //         <Pressable style={styles.button} onPress={handleSubmit}>
              //           <Text style={styles.btnLabel}>Sign Up</Text>
              //         </Pressable>
              //     </>
              //   )}
              // </Formik>
              // :
              <Formik
                initialValues={{ name: '', email: '', password: '', }}
                onSubmit={values => {
                  console.log(values);
                  // handleSignIn(values);
                  navigation.navigate('PhoneSignUp', {
                    values,
                    // confirmation,
                  });
                }}
                validationSchema={SignUpEmailSchema}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <TextInput
                      placeholder="Full name"
                      style={{
                        marginTop: 60,
                        borderRadius: 10,
                        borderColor: TextInputStates[
                          (errors.name || error) && 'error' ||
                          (errors.name && isTextInput.name) && 'error' ||
                          isTextInput.name && 'focus' ||
                          !isTextInput.name && 'default'
                        ] || '#8D8D8D',
                        borderWidth: 1,
                        backgroundColor: '#FFFFFF',
                        padding: 10,
                        paddingLeft: 13,
                        paddingRight: 13,
                        width: Dimensions.get('window').width - 20,
                      }}
                      ref={inputRef}
                      onFocus={() => {
                        // setInputFocus(!isInputFocus);
                        // setTextInput((prev) => ({ name: isTextInput }));
                        setTextInput((prev) => ({
                          name: true,
                          email: false,
                          password: false,
                        }));
                      }}
                      onBlur={() => {
                        // setInputFocus(!isInputFocus);
                        handleBlur('name');
                      }}
                      onChangeText={handleChange('name')}
                    ></TextInput>
                    {errors.name && <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        top: 5,
                        left: 13,
                      }}
                    >{errors.name}</Text>}
                    <TextInput
                      placeholder="Email"
                      style={{
                        marginTop: 20,
                        borderRadius: 10,
                        borderColor: TextInputStates[
                          errors.email && 'error' ||
                          (errors.email && isTextInput.email) && 'error' ||
                          isTextInput.email && 'focus' ||
                          (!isTextInput.email && !errors.email) && 'default'
                        ],// isTextInput.email ? '#00BCD4' : '#8D8D8D',
                        borderWidth: 1,
                        backgroundColor: '#FFFFFF',
                        padding: 10,
                        paddingLeft: 13,
                        paddingRight: 13,
                        width: Dimensions.get('window').width - 20,
                      }}
                      ref={inputRef}
                      onChangeText={handleChange('email')}
                      onFocus={() => {
                        setTextInput((prev) => ({ name: false, email: true, password: false }));
                      }}
                      onBlur={() => {
                        // setInputFocus(!isInputFocus);
                        handleBlur('email');
                      }}
                    ></TextInput>
                    {errors.email && <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        top: 5,
                        left: 13,
                      }}
                    >{errors.email}</Text>}
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={true}
                      style={{
                        marginTop: 20,
                        borderRadius: 10,
                        borderColor: TextInputStates[
                          errors.password && 'error' ||
                          (errors.password && isTextInput.password) && 'error' ||
                          isTextInput.password && 'focus' ||
                          (!isTextInput.password && !errors.password) && 'default'
                        ], // isTextInput.password ? '#00BCD4' : '#8D8D8D',
                        backgroundColor: '#FFFFFF',
                        borderWidth: 1,
                        padding: 10,
                        paddingLeft: 13,
                        paddingRight: 13,
                        width: Dimensions.get('window').width - 20,
                      }}
                      onChangeText={handleChange('password')}
                      ref={inputRef}
                      onFocus={() => {
                        setTextInput((prev) => ({ name: false, email: false, password: true }));
                      }}
                      onBlur={() => {
                        // setInputFocus(!isInputFocus);
                        handleBlur('password');
                      }}
                    ></TextInput>
                    {
                      errors.password
                      ?
                        <Text
                          style={{
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: 11,
                            lineHeight: 12,
                            alignItems: 'center',
                            letterSpacing: 0.066,
                            color: `red`,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                        >At least 8 characters</Text>
                    :
                      <Text
                        style={{
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: 11,
                          lineHeight: 12,
                          alignItems: 'center',
                          letterSpacing: 0.066,
                          color: `rgba(60, 60, 67, 0.33)`,
                          marginTop: 5,
                          marginLeft: 10,
                        }}
                      >At least 8 characters</Text>
                    }
                    <Pressable style={styles.button} onPress={handleSubmit}>
                      <Text style={styles.btnLabel}>Sign Up</Text>
                    </Pressable>
                  </>
                )}
              </Formik>
            }
          </View>
          <Separator />
          <View>
            {
              // !signInEmail
              // ?
              // <Pressable
              //   style={[styles.socialLogin(30), { width: '100%' }]}
              //   onPress={() => setSignInEmail(!signInEmail)}>
              //   <EmailIcon
              //     style={{
              //       position: 'absolute',
              //       left: 16,
              //     }}
              //   />
              //   <Text
              //     style={[styles.label, {
              //       // left: -20,
              //     }]}
              //   >
              //     Continue with Email
              //   </Text>
              // </Pressable>
              // :
              // <Pressable
              //   style={[styles.socialLogin(30), { width: '100%' }]}
              //   onPress={() => setSignInEmail(!signInEmail)}>
              //   <PhoneIcon
              //     style={{
              //       position: 'absolute',
              //       left: 16,
              //     }}
              //   />
              //   <Text
              //     style={[styles.label, {
              //       // left: -15,
              //     }]}
              //   >
              //     Continue with Phone Number
              //   </Text>
              // </Pressable>
            }
            <Pressable
              style={[styles.socialLogin(30), { width: '100%' }]}
              onPress={() => ({})}>
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
            <Pressable
              style={[styles.socialLogin(5), { width: '100%' }]}
              onPress={() => ({})}>
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
            <Pressable
              style={[styles.socialLogin(5), { width: '100%' }]}
              onPress={() => ({})}>
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
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            // onChange={handleSheetChanges}
            >
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
                  }}
                  onPress={() => {
                    setCountryCode('+000');
                    bottomSheetModalRef.current?.close();
                  }}
                  >Afghanistan</Text>
                  <Text style={{
                    position: 'absolute',
                    right: 5,
                    top: 12,
                  }}
                  onPress={() => {
                    setCountryCode('+000');
                    bottomSheetModalRef.current?.close();
                  }}
                  >(+000)</Text>
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
                  }}
                  onPress={() => {
                    setCountryCode('+001');
                    bottomSheetModalRef.current?.close();
                  }}
                  >Aland Island</Text>
                  <Text style={{
                    position: 'absolute',
                    right: 5,
                    top: 12,
                  }}
                  onPress={() => {
                    setCountryCode('+001');
                    bottomSheetModalRef.current?.close();
                  }}
                  >(+001)</Text>
                </View>
              </ScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
};

const styles = StyleSheet.create({
  button: {
    ...button,
    marginTop: 30,
    marginBottom: 40,
    width: '100%',
  },
  btnLabel: {
    ...button.label,
  },
  socialLogin: (margin) => ({
    ...button,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
