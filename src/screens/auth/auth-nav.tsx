import { Alert, Button, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignIn } from "./screens/sign-in/phone";
import { SignUp } from "./screens/sign-up";
import React from "react";
import { Separator } from "./screens/components/separator";
import { Platform } from "react-native";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export const AuthNav = ({ navigation }) => {
  const [tabState, setTabStateActive] = React.useState({
    signin: true,
    signup: false,
  });
  const router = useRoute();
  const tabTopPosition = React.useRef(58);

  console.log({router});

  React.useEffect(() => navigation.addListener('beforeRemove', (e: any) => {
    e.preventDefault();
  }),[navigation]);

  React.useEffect(() => {
    if (router?.params?.type === "signup") {
      setTabStateActive(() => ({
        signin: false,
        signup: true,
      }));
    }
  }, [router]);

  return (
    <>
      <View>
        {
          router?.params?.type === 'signin' || tabState.signin
          ? <SignIn navigation={navigation} />
          : <SignUp navigation={navigation} />
        }
      </View>
      <View style={[styles.tab({ tabTopPosition })]}>
        {/* <Pressable style={{
          zIndex: 1,
          top: 100,
        }}>
          <Text onPress={() => Alert.alert('Pressed')}>Press me</Text>
        </Pressable>
        <Pressable style={{
          zIndex: 1,
          top: 100,
        }}>
          <Text onPress={() => Alert.alert('Pressed it')}>Press it</Text>
        </Pressable> */}
        <Pressable style={[tabState.signin && styles.activeTab]}
          onPress={() => {
            setTabStateActive(() => ({
              signin: true,
              signup: false,
            }));
          }}>
          <Text style={[styles.tabButton, styles.btnLabel, tabState.signin && styles.btnActive]}>
              SIGN IN
          </Text>
        </Pressable>
        <Pressable style={[tabState.signup && styles.activeTab]}
          onPress={() => setTabStateActive(() => ({
            signup: true,
            signin: false,
          }))}
        >
          <Text style={[styles.tabButton, styles.btnLabel, tabState.signup && styles.btnActive]}>
              SIGN UP
          </Text>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  tab: ({ tabTopPosition }: { tabTopPosition: number }) => ({
    flexDirection: 'row',
    // alignItems: 'flex-start',
    padding: 0,
    position: 'absolute',
    width: 181,
    height: 32,
    left: 96,
    top: 58,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
  }),
  tabButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 4,
    width: 90,
    height: 32,
    borderRadius: 99,
    flexGrow: 0,
    left: 0,
    top: 0,
  },
  btnLabel: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.23999999463558197,
    textAlign: 'center',
  },
  btnActive: {
    color: '#FFFFFF',
  },
  activeTab: {
    width: 92,
    backgroundColor: '#00BCD4',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
