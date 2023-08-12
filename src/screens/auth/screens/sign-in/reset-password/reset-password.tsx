import React from "react";
import { Dimensions, Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { button } from "../../../../../components/button/buttonStyles";

export const ResetPassword = ({ navigation }) => {
  const [values, setValues] = React.useState({
    password: '',
    confirm: '',
  });
  const [error, setError] = React.useState({
    password: '',
    confirm: '',
    match: '',
    length: {
      password: false,
      confirm: false,
    },
  })

  const handleResetPassword = () => {
    if (!values.password && !values.confirm) {
      setError(prev => ({
        password: 'Please enter password',
        confirm: 'Please enter password confirmation',
        match: '',
        length: {
          password: false,
          confirm: false,
        },
      }));
      return;
    }

    if (!values.password) {
      setError(prev => ({
        password: 'Please enter password',
        confirm: '',
        match: '',
        length: {
          password: false,
          confirm: false,
        },
      }));
      return;
    }

    if (values.password.length < 8) {
      setError(prev => ({
        password: '',
        confirm: '',
        match: '',
        length: {
          password: true,
          confirm: false,
        },
      }));
      return;
    }

    if (!values.confirm) {
      setError(prev => ({
        password: '',
        confirm: 'Please enter password confirmation',
        match: '',
        length: {
          password: false,
          confirm: false,
        },
      }));
      return;
    }

    if (values.confirm.length < 8) {
      setError(prev => ({
        password: '',
        confirm: '',
        match: '',
        length: {
          password: false,
          confirm: true,
        },
      }));
      return;
    }

    if (values.password !== values.confirm) {
      setError(prev => ({
        password: '',
        confirm: '',
        match: 'Passwords do not match',
        length: {
          password: false,
          confirm: false,
        },
      }));
      return;
    }

    setError(prev => ({
      password: '',
      confirm: '',
      match: '',
      length: {
        password: false,
        confirm: false,
      },
    }));

    navigation.navigate('PasswordResetted');
  };

  return (
    <View style={{
      width: '100%',
      alignItems: 'center',
    }}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: 400,
          lineHeight: 22,
          letterSpacing: -0.4099999964237213,
          textAlign: 'left',
          color: '#262626',
          marginTop: 30,
        }}
      >Create a new password that will secure your account. (At least 8 characters)</Text>
      <View>
        {
          error.match && <Text
            style={{
              color: `red`,
              fontSize: 11,
              marginTop: 15,
              // marginLeft: 10,
              alignItems: 'flex-start',
            }}
          >{error.match}</Text>
        }
        <TextInput
          placeholder="New Password"
          secureTextEntry={true}
          style={{
            marginTop: 20,
            borderRadius: 10,
            borderColor: '#8D8D8D',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            padding: 10,
            paddingLeft: 13,
            paddingRight: 13,
            width: Dimensions.get('window').width - 20,
          }}
          onChangeText={(value) => {
            if (value.length < 8) {
              setError(prev => ({
                password: '',
                confirm: '',
                match: '',
                length: {
                  password: true,
                  confirm: prev.length.confirm,
                },
              }));
              return;
            }

            setError(prev => ({
              password: '',
              confirm: '',
              match: '',
              length: {
                password: false,
                confirm: prev.length.confirm,
              },
            }));

            setValues((prev) => ({ password: value, confirm: prev.confirm }))
          }}
        ></TextInput>
        {
          error.password && <Text
            style={{
              color: `red`,
              fontSize: 11,
              marginTop: 5,
              marginLeft: 10,
              alignItems: 'flex-start',
            }}
          >{error.password}</Text>
        }
      </View>
      <View>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={{
            marginTop: 20,
            borderRadius: 10,
            borderColor: '#8D8D8D',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            padding: 10,
            paddingLeft: 13,
            paddingRight: 13,
            width: Dimensions.get('window').width - 20,
          }}
          onChangeText={(value) => {
            if (value.length < 8) {
              setError(prev => ({
                password: '',
                confirm: '',
                match: '',
                length: {
                  password: prev.length.password,
                  confirm: true,
                },
              }));
              return;
            }

            setError(prev => ({
              password: '',
              confirm: '',
              match: '',
              length: {
                password: prev.length.password,
                confirm: false,
              },
            }));

            setValues((prev) => ({ confirm: value, password: prev.password, }));
          }}
        ></TextInput>
        {
          error.confirm && <Text
            style={{
              color: `red`,
              fontSize: 11,
              marginTop: 5,
              marginLeft: 10,
              alignItems: 'flex-start',
            }}
          >{error.confirm}</Text>
        }
      </View>
      <Pressable style={styles.button({mleft: 10, width: '95%'})} onPress={handleResetPassword}>
        <Text style={styles.btnLabel}>Change the password</Text>
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
