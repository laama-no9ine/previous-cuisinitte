import { Formik } from "formik";
import * as Yup from "yup";
import auth from '@react-native-firebase/auth';
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import FlagAE from "../../../../../../assets/screens/auth/AE.svg";
import DownArrow from "../../../../../../assets/screens/auth/down-arrow.svg";
import { button } from "../../../../../components/button/buttonStyles";
import FlagAF from "../../../../../../assets/screens/auth/Afghanistan-AF.svg";
import FlagIE from "../../../../../../assets/screens/auth/IE.svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeviceInfo from 'react-native-device-info';

const SignUpSchema = Yup.object().shape({
  phone: Yup.string().required('Please enter your phone number'),
});

const TextInputStates = {
  default: '#8D8D8D',
  focus: '#00BCD4',
  error: '#DA1E28',
};

export const PhoneSignUp = ({ navigation }) => {
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [error, setError] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('');
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const route = useRoute();
  const {
    values,
    action,
} = route.params;

  const snapPoints = React.useMemo(() => ['5%', '80%'], []);

  // console.log({ os: Platform.OS, uuid: DeviceInfo.getUniqueId()._j, name: DeviceInfo.getDeviceName()?._j });

  const handlePhoneSignUp = async (phoneNumber: any) => {
    console.log({ values });

    try {
      const confirmation = await auth().signInWithPhoneNumber(`+${phoneNumber}`);
      console.log({ action });
      if (confirmation) {
        navigation.navigate('OTPPhoneVerification', {
          phoneNumber: `+${phoneNumber}`,
          values,
          confirmation,
          action: action || 'new',
        });
      }

      setError('');

      // Verify the code entered by the user
      // const credential = auth.PhoneAuthProvider.credential(confirmation.verificationId, code);
  
      // Sign in the user with the verified credential
      // await auth().signInWithCredential(credential);
  
      // User is now signed in
      console.log('Phone authentication successful');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  const toggleCountryCodes = () => {
    // setToggleCountryCode(!toggleCountryCode);
    bottomSheetModalRef.current?.present();
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={{
          // justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '95%',
          marginLeft: 9,
          position: 'relative',
          top: 10,
        }}>
          <Formik
            initialValues={{ phone: '', }}
            onSubmit={values => {
              console.log(values);
              // handleSignIn(values);
              handlePhoneSignUp(values.phone);
            }}
            validationSchema={SignUpSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <Text style={{
                  marginTop: 20,
                  marginBottom: 20,
                  width: '100%',
                  fontSize: 17,
                  fontWeight: 600,
                  lineHeight: 22,
                  letterSpacing: -0.4099999964237213,
                  textAlign: 'left',
                }}>Enter phone number</Text>
                <TextInput
                  placeholder={!countryCode ? `Phone number` : ``}
                  style={{
                    borderWidth: 1,
                    borderColor: TextInputStates[
                      (errors.phone || error) && 'error' ||
                      (errors.phone && isInputFocus) && 'error' ||
                      isInputFocus && 'focus' ||
                      !isInputFocus && 'default'
                    ],
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    width: '100%',
                    padding: 10,
                    paddingLeft: countryCode ? 105 : 68,
                    marginBottom: 10,
                  }}
                  keyboardType="phone-pad"
                  onFocus={() => {
                    setInputFocus(!isInputFocus);
                  }}
                  onBlur={() => {
                    setInputFocus(!isInputFocus);
                  }}
                  onChangeText={handleChange('phone')}
                ></TextInput>
                {
                  countryCode && <Text
                    style={{
                      position: 'absolute',
                      left: 70,
                      top: 14,
                    }}
                  >
                    {countryCode}
                  </Text>
                }
                {errors.phone && touched.phone && <Text
                  style={{
                    position: 'absolute',
                    color: 'red',
                    fontSize: 12,
                    top: 115,
                    left: 13,
                  }}
                >{errors.phone}</Text>}
                {error && <Text
                  style={{
                    position: 'relative',
                    color: 'red',
                    fontSize: 12,
                    // top: 115,
                    left: 13,
                  }}
                >{error}</Text>}
                <Text
                  style={{
                    position: 'absolute',
                    top: Platform.OS === 'android' ? 77 : 13,
                    left: 10,
                  }}
                  onPress={toggleCountryCodes}
                >
                  {
                    countryCode === '+000' ? <FlagAF /> : countryCode === '+001' ? <FlagIE /> : <FlagAE />
                  }
                </Text>
                <DownArrow
                  style={{
                    position: 'absolute',
                    top: Platform.OS === 'android' ? 69 : 3,
                    left: 35,
                  }}
                />
                <Pressable style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.btnLabel}>Sign Up</Text>
                </Pressable>
            </>
            )}
          </Formik>
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
}

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
