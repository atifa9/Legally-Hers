import React from "react";
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import BackButton from './BackButton';
import StatusBar from './StatusBar';
import { useNavigation } from '@react-navigation/native'; 

const { width, height } = Dimensions.get('window');

export default () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar />
      <BackButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#121212" }}>
        <Text style={styles.text}>
          {"Currently you are on free plan.\nSwitch to premium to get access to all features"}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Premium')}>
          <Text style={styles.text2}>{"Upgrade Now"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#593173",
    borderColor: "#FFFFFF",
    borderRadius: 64,
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 28,
    alignSelf: 'center',
    marginTop: height * 0.1,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.1,
    marginBottom: 40,
    marginHorizontal: 33,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
