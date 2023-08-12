import { Dimensions, Text, View } from "react-native"

export const Separator = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
      }}
    >
      <View
        style={{
          width: '45%',
          marginRight: 5,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderLeftColor: 'transparent',
          borderBottomColor: '#CCC',
          borderBottomWidth: 1,
          borderWidth: 1,
        }}
      />
      <Text
        style={{
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 20,
          alignItems: 'center',
          textAlign: 'center',
          letterSpacing: -0.24,
          color: '#4D4D4D',
        }}>
          or
        </Text>
      <View
        style={{
          width: '42%',
          marginLeft: 5,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderLeftColor: 'transparent',
          borderBottomColor: '#CCCCCC',
          borderWidth: 1,
        }}
      />
    </View>
  )
}
