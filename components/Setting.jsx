import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, StyleSheet, ScrollView, Switch, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from './BackButton';
import StatusBar from './StatusBar';

const { width, height } = Dimensions.get('window');

export default () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Load saved notification preference
    const loadPreference = async () => {
      try {
        const value = await AsyncStorage.getItem('notifications');
        if (value !== null) {
          setIsEnabled(value === 'true');
        }
      } catch (e) {
        console.log("Failed to load notification setting:", e);
      }
    };

    loadPreference();
  }, []);

  const toggleSwitch = async () => {
    try {
      const newValue = !isEnabled;
      setIsEnabled(newValue);
      await AsyncStorage.setItem('notifications', newValue.toString());
    } catch (e) {
      console.log("Failed to save notification setting:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar />
      <BackButton />
      <ScrollView style={{ flexGrow: 1, backgroundColor: "#121212" }}>
        <View style={styles.view}>
          <Text style={styles.text}>{"Settings"}</Text>
        </View>
        <View style={styles.column2}>
          <View style={styles.row}>
            <View style={styles.row2}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/6nylv2av_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.image}
              />
              <Text style={styles.text2}>{"Application language"}</Text>
            </View>
            <Text style={styles.text3}>{"English"}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.row2}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/szsqgg0g_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.image}
              />
              <Text style={styles.text2}>{"Push notifications"}</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#11497C" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  column2: {
    paddingBottom: height * 0.2,
    marginHorizontal: 21,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F780",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: width * 0.3,
  },
  text2: {
    color: "#1D2838",
    fontSize: 14,
    flex: 1,
  },
  text3: {
    color: "#667084",
    fontSize: 12,
  },
  view: {
    flexDirection: "row",
    marginBottom: 74,
    marginLeft: 12,
  },
});
