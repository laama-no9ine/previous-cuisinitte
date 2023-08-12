import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import UserAddressIcon from "../../../../../assets/screens/location/mappin.svg";
import { button } from "../../../../components/button/buttonStyles";

export const UserAddress = ({ ...rest }) => {
  const {
    coordinate,
    navigateScreen,
  } = rest;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Confirm delivery address
      </Text>
      <View style={styles.addressContainer}>
        <UserAddressIcon style={styles.icon} /> 
        <Text style={styles.userAddress}>
          Clover Bay Tower - Marasi Drive - Business Bay
        </Text>
      </View>
      <Pressable style={styles.button}>
        {
          coordinate
          ?
          /** @ts-ignore */
          <Text style={styles.button.label} onPress={navigateScreen}>Confirm Location</Text>
          :
          /** @ts-ignore */
          <Text style={styles.button.label}>Finding your Location</Text>
        }
        
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
    letterSpacing: 0.3799999952316284,
    textAlign: 'left',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  userAddress: {
    height: '100%',
    paddingTop: 3,
  },
  icon: {
    marginRight: 5,
  },
  // @ts-ignore
  button: {
    ...button,
  }
});
