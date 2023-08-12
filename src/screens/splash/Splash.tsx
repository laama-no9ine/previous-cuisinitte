import React from "react";
import Video from "react-native-video";

export const Splash = ({ navigation }) => {
  const props = {
    'source': require('../../../assets/screens/splash/splash.mp4'),
    'style': { width: '100%', height: '100%' },
    "resizeMode": "cover",
    "controls": false,
    "repeat": true,
  };

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Boarding');
    }, 8000);
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <Video {...props} />
    </>
  )
}
