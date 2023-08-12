import React from "react";
import { Alert, Platform, Pressable, StyleSheet } from "react-native";
import { TextInput, Text, View } from "react-native";
import { button } from "../../../../../components/button/buttonStyles";
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

const DEFAULT_TIMER_VALUE = 59;

export const OTPPhoneVerification = ({ navigation }) => {
    const numberOneInputRef = React.useRef();
    const numberTwoInputRef = React.useRef();
    const numberThreeInputRef = React.useRef();
    const numberFourInputRef = React.useRef();
    const numberFiveInputRef = React.useRef();
    const numberSixInputRef = React.useRef();
    let textInputCount = React.useRef(1);
    let isTwice = React.useRef(0);

    let [timer, setTimer] = React.useState(DEFAULT_TIMER_VALUE);
    const [resendVal, setResend] = React.useState(false);
    const [error, setError] = React.useState('');
    const [smsCode, setSMSCode] = React.useState('');
    const [inputFocus, setInputFocus] = React.useState<boolean[]>([false, false, false, false, false, false]);
    const [hidePhone, setHidePhone] = React.useState('');
    const route = useRoute();
    const {
        phoneNumber,
        values,
        confirmation,
        action,
    } = route.params;

    React.useEffect(() => {
        console.log({
            phoneNumber,
            values,
            confirmation,
        });

        numberOneInputRef?.current?.focus();
        
        if (timer <= 0) {
            setResend(!resendVal);
        }

        let timerId = setInterval(() => {
            if (timer > 0) {
                setTimer(() => {
                    return --timer;
                });
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, [resendVal]);

    React.useEffect(() => {
        // const split = phoneNumber.split(Math.floor(phoneNumber.length / 2), Math.floor(phoneNumber.length / 2));
        // const hidden = split[1].replaceAll(split[1], '******');
        // const fullPhone = `${split[0]}${hidden}`;

        setHidePhone(phoneNumber);
    }, []);

    const handleOnFocus = (index) => {
        const newInputFocus = [...inputFocus];
        newInputFocus[index] = true;
        setInputFocus(newInputFocus);
    }

    const handleOnBlur = (index) => {
        const newInputFocus = [...inputFocus];
        newInputFocus[index] = false;
        setInputFocus(newInputFocus);
    }

    const handleTextChange = (value, inputRef) => {
        setSMSCode(prev => {
            return `${prev}${value}`;
        });

        // if (textInputCount.current === 6 && value.length === 1) {
            // verifyCode();
        // }

        if (value.length === 1) {
            inputRef?.current?.focus();
            textInputCount.current = textInputCount.current + 1;
        }
    }

    const verifyCode = async () => {
        console.log({smsCode});
        let url = '';

        if (!smsCode) {
            setError('Enter OTP');
            return;
        }

        if (action === 'new') {
            url = `http://10.39.1.220:8080/auth/singup`;
        }

        if (action === 'existing' || action === 'existing-email') {
            url = `http://10.39.1.220:8080/auth/login`
        }

        try {
            // Verify the code entered by the user
            const credential = await auth.PhoneAuthProvider.credential(confirmation.verificationId, smsCode);

            // Sign in the user with the verified credential
            const verified = await auth().signInWithCredential(credential);

            const idToken = await verified.user.getIdToken();
            // const refreshToken = verified.user?.refreshToken;

            console.log({ idToken });

            
            

            const authStatus = await messaging().requestPermission();
            const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);

                const FCMToken = await messaging().getToken();

                console.log('FCM token:', FCMToken);

                if (action === 'reset-password') {
                    navigation.navigate('ResetPassword', {
                        phoneNumber: `+${phoneNumber}`,
                        confirmation,
                        action,
                    });

                    return;
                }

                try {
                    const serverOTP = await fetch(`http://10.39.1.220:8080/auth/twofactor`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: {
                                fcmToken: FCMToken
                            }
                        }),
                    });

                    const serverOTPJson = await serverOTP.json();
                    console.log({ serverOTPJson });




                    if (serverOTPJson) {
                        messaging().onMessage(async remoteMessage => {
                            console.log({
                                remoteMessage,
                            });
                            let options = {};
                            const headers = {
                                'Content-Type': 'application/json',
                                'serverotp': `${remoteMessage?.data?.otp}`,
                                'fcmtoken': FCMToken,
                                ...(action === 'new' && { 'authorization': idToken, }),
                            }

                            if (action === 'existing-email') {
                                options = {
                                    method: 'POST',
                                    headers: headers,
                                    body: JSON.stringify({
                                        "data": {
                                            "email": values.email,
                                            "password": values.password,
                                            "phoneNumber": phoneNumber,
                                            "device": {
                                                "os": Platform.OS,
                                                "uuid": "123123721983",
                                                "name": "device name",
                                            }
                                        },
                                        "option": {
                                            "with": 'email',
                                        }
                                    })
                                }
                            }

                            if (action === 'new') {
                                options = {
                                    method: 'POST',
                                    headers: headers,
                                    body: JSON.stringify({
                                        "data": {
                                            "email": values.email,
                                            "fullName": values.name,
                                            "password": values.password,
                                            "phoneNumber": phoneNumber,
                                            "device": {
                                                "os": Platform.OS,
                                                "uuid": "123123721983",
                                                "name": "device name",
                                            }
                                        },
                                        "option": {
                                            "with": 'email',
                                        }
                                    }),
                                };
                            }

                            if (action === 'existing') {
                                options = {
                                    method: 'POST',
                                    headers: headers,
                                    body: JSON.stringify({
                                        "data" : {
                                            "value" : phoneNumber,
                                            "password" : "123456",
                                            "device" : {
                                                    "uuid" : "123456789",
                                                    "name" : "name",
                                                    "os"   : ""
                                                }
                                        },
                                        "option" :{
                                            "with" : "phoneNumber"
                                        }
                                    })
                                }
                            }

                            console.log({ headers, url, });
                            
                            try {
                                const response = await fetch(url, options);
                                const json = await response.json();
                    
                                console.log({ json });

                                if (json.hasOwnProperty('error')) {
                                    setError(json.error);
                                    return;
                                }

                                // (globalThis as any).localStorage

                                console.log({ json });
                            } catch (error) {
                                setError(error.message);
                            }
                            
                        });

                        return;
                    }


                    setError('Server OTP error');

                } catch (error) {
                    setError(error.message);
                }
            }

            // navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    const resend = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(`${phoneNumber}`); // +971554368550
            
            setTimer(DEFAULT_TIMER_VALUE);

            if (confirmation) {
                const credential = await auth.PhoneAuthProvider.credential(confirmation.verificationId, smsCode);
                const verified = await auth().signInWithCredential(credential);
                const idToken = await confirmation?.user.getIdToken();

                console.log('resend: ', idToken);
                setTimer(DEFAULT_TIMER_VALUE);
                setResend(!resendVal);
                // navigation.navigate('Home');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    // console.log({smsCode});

    return (
        <View
            style={{
                width: `100%`,
                height: `100%`,
                paddingTop: 50,
                alignItems: 'center',
            }}
        >
            <Text style={{ marginBottom: 40, }}>
                Enter the 6-digit code sent to you at ({hidePhone})
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <TextInput
                    ref={numberOneInputRef}
                    keyboardType="numeric"
                    onFocus={() => {
                        handleOnFocus(0);
                    }}
                    onBlur={() => handleOnBlur(0)}
                    onChangeText={(value) => handleTextChange(value, numberTwoInputRef)}
                    onKeyPress={(event) => {
                        if (event.nativeEvent.key === "Backspace") {
                            // isTwice.current++;
                            // if (isTwice.current % 2 !== 0) {
                            //     return;
                            // }

                            numberOneInputRef.current.value = '';
                            textInputCount.current = textInputCount.current - 1;
                            setSMSCode(smsCode.slice(0, 0));
                        }
                    }}
                    style={{
                        borderWidth: 0.846901,
                        textAlign: 'center',
                        width: 50,
                        height: 51.19,
                        borderColor: inputFocus[0] ? `#00BCD4` : `#8D8D8D`, // `rgba(60, 60, 67, 0.18)`,
                        borderRadius: 4.7619,
                    }}
                />
                <TextInput
                    ref={numberTwoInputRef}
                    keyboardType="numeric"
                    onChangeText={(value) => handleTextChange(value, numberThreeInputRef)}
                    onFocus={() => handleOnFocus(1)}
                    onBlur={() => handleOnBlur(1)}
                    onKeyPress={(event) => {
                        if (event.nativeEvent.key === "Backspace") {
                            // isTwice.current++;
                            // if (isTwice.current % 2 !== 0) {
                            //     return;
                            // }

                            numberTwoInputRef.current.value = '';
                            numberOneInputRef?.current?.focus();
                            textInputCount.current = textInputCount.current - 1;
                            setSMSCode(smsCode.slice(0, 1));
                        }
                    }}
                    style={{
                        borderWidth: 0.846901,
                        textAlign: 'center',
                        width: 50,
                        height: 51.19,
                        borderColor: inputFocus[1] ? `#00BCD4` : `#8D8D8D`,
                        borderRadius: 4.7619,
                    }}
                />
                <TextInput
                    ref={numberThreeInputRef}
                    keyboardType="numeric"
                    onFocus={() => handleOnFocus(2)}
                    onBlur={() => handleOnBlur(2)}
                    onChangeText={(value) => handleTextChange(value, numberFourInputRef)}
                    onKeyPress={(event) => {
                        if (event.nativeEvent.key === "Backspace") {
                            // isTwice.current++;
                            // if (isTwice.current % 2 !== 0) {
                            //     return;
                            // }

                            numberThreeInputRef.current.value = '';
                            numberTwoInputRef?.current?.focus();
                            textInputCount.current = textInputCount.current - 1;
                            setSMSCode(smsCode.slice(0, 2));
                        }
                    }}
                    style={{
                        borderWidth: 0.846901,
                        textAlign: 'center',
                        width: 50,
                        height: 51.19,
                        borderColor: inputFocus[2] ? `#00BCD4` : `#8D8D8D`,
                        borderRadius: 4.7619,
                    }}
                />
                <TextInput
                    ref={numberFourInputRef}
                    keyboardType="numeric"
                    onFocus={() => handleOnFocus(3)}
                    onBlur={() => handleOnBlur(3)}
                    onChangeText={(value) => handleTextChange(value, numberFiveInputRef)}
                    onKeyPress={(event) => {
                        if (event.nativeEvent.key === "Backspace") {
                            // isTwice.current++;
                            // if (isTwice.current % 2 !== 0) {
                            //     return;
                            // }

                            numberFourInputRef.current.value = '';
                            numberThreeInputRef?.current?.focus();
                            textInputCount.current = textInputCount.current - 1;
                            if (smsCode.length === 4) {
                                setSMSCode(smsCode.split(4, 2).join());
                            }
                            setSMSCode(smsCode.slice(0, 3));
                        }
                    }}
                    style={{
                        borderWidth: 0.846901,
                        textAlign: 'center',
                        width: 50,
                        height: 51.19,
                        borderColor: inputFocus[3] ? `#00BCD4` : `#8D8D8D`,
                        borderRadius: 4.7619,
                    }}
                />
                <TextInput
                    ref={numberFiveInputRef}
                    keyboardType="numeric"
                    onFocus={() => handleOnFocus(4)}
                    onBlur={() => handleOnBlur(4)}
                    onChangeText={(value) => handleTextChange(value, numberSixInputRef)}
                    onKeyPress={(event) => {
                        if (event.nativeEvent.key === "Backspace") {
                            // isTwice.current++;
                            // if (isTwice.current % 2 !== 0) {
                            //     return;
                            // }

                            numberFiveInputRef.current.value = '';
                            numberFourInputRef?.current?.focus();
                            textInputCount.current = textInputCount.current - 1;

                            setSMSCode(smsCode.slice(0, 4));

                            if (isTwice.current === 2) {
                                isTwice.current = 0;
                                return;
                            }
                            // setSMSCode(smsCode.split(5, 2).join(''));
                        }
                        
                    }}
                    style={{
                        borderWidth: 0.846901,
                        textAlign: 'center',
                        width: 50,
                        height: 51.19,
                        borderColor: inputFocus[4] ? `#00BCD4` : `#8D8D8D`,
                        borderRadius: 4.7619,
                    }}
                />
                <TextInput
                    ref={numberSixInputRef}
                    keyboardType="numeric"
                    onFocus={() => handleOnFocus(5)}
                    onBlur={() => handleOnBlur(5)}
                    onChangeText={(value) => handleTextChange(value, numberSixInputRef)}
                    onKeyPress={(event) => {
                        if (event.nativeEvent.key === "Backspace") {
                            // isTwice.current++;
                            // if (isTwice.current % 2 !== 0) {
                            //     return;
                            // }

                            numberSixInputRef.current.value = '';
                            numberFiveInputRef?.current?.focus();
                            textInputCount.current = textInputCount.current - 1;
                            // setSMSCode()
                            setSMSCode(smsCode.slice(0, 5));
                        }
                    }}
                    style={{
                        borderWidth: 0.846901,
                        textAlign: 'center',
                        width: 50,
                        height: 51.19,
                        borderColor: inputFocus[5] ? `#00BCD4` : `#8D8D8D`,
                        borderRadius: 4.7619,
                    }}
                />
            </View>
            {
                error && <Text
                    style={{
                        // position: 'absolute',
                        color: '#DA1E28',
                        fontSize: 12,
                        width: '100%',
                        textAlign: 'center',
                        top: Platform.OS === 'android' ? 10 : 10,
                        // left: 20,
                        // width: '95%',
                        lineHeight: 21,
                    }}
                >{error}</Text>
            }
            <View
                style={{
                    flexDirection: 'row',
                    gap: 20,
                    marginTop: 50,
                    justifyContent: 'flex-end',
                    width: '100%',
                    paddingRight: 20,
                }}>
                <Text style={{
                    padding: 10,
                    width: 70,
                    fontWeight: 'bold',
                }}>{timer}s</Text>
                <Pressable style={timer > 0 ? style.resendDisabledBtn : style.resendActiveBtn} onPress={timer <= 0 ? resend : null}>
                    <Text
                        style={timer > 0 ? style.resendDisabledBtnLabel : style.resendActiveBtnLabel}
                    >Resend Code</Text>
                </Pressable>
            </View>
            <Pressable 
                // style={[style.button, { marginTop: 100, }]}
                style={[smsCode.length < 6 ? style.verfiyBtnEnable : style.button, {marginTop: 100}]} onPress={smsCode.length >= 6 ? verifyCode : null}
                // onPress={verifyCode}
            >
                <Text style={style.btnLabel}>Verify Code</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    button: {
        ...button,
    },
    btnLabel: {
        ...button.label,
    },
    verfiyBtnEnable: {
        ...button,
        backgroundColor: '#6F6F6F',
        width: `95%`,
    },
    resendActiveBtn: {
        borderWidth: 2.5,
        padding: 10,
        borderRadius: 14,
        borderColor: '#00BCD4',
    },
    resendActiveBtnLabel: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 22,
        color: '#00BCD4',
    },
    resendDisabledBtn: {
        borderWidth: 2.5,
        padding: 10,
        borderColor: '#6F6F6F',
        backgroundColor: '#6F6F6F',
        borderRadius: 14,
    },
    resendDisabledBtnLabel: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 22,
        color: '#FFFFFF',
    }
});
