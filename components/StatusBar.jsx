import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const StatusBar = ({ time = "10:01" }) => {
  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>{time}</Text>
      <View style={styles.dotContainer}>
        <View style={styles.dotSmall} />
        <View style={styles.dotMedium} />
        <View style={styles.dotLargeLight} />
        <View style={styles.dotLargeDark} />
      </View>
      <Image
        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/b3v8zeu4_expires_30_days.png" }}
        resizeMode="stretch"
        style={styles.iconSmall}
      />
      <View style={styles.iconContainer}>
        <View style={styles.iconBorder}>
          <View style={styles.iconInner} />
        </View>
        <Image
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/ajbu2iga_expires_30_days.png" }}
          resizeMode="stretch"
          style={styles.iconTiny}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    marginVertical: height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02,
    paddingLeft: width * 0.08,
    paddingRight: width * 0.05,
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
    flex: 1,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: width * 0.02,
  },
  dotSmall: {
    width: width * 0.01,
    height: height * 0.004,
    backgroundColor: "#FFFFFF",
    marginRight: width * 0.005,
  },
  dotMedium: {
    width: width * 0.01,
    height: height * 0.006,
    backgroundColor: "#FFFFFF",
    marginRight: width * 0.005,
  },
  dotLargeLight: {
    width: width * 0.01,
    height: height * 0.01,
    backgroundColor: "#C1C1C5",
    marginRight: width * 0.005,
  },
  dotLargeDark: {
    width: width * 0.01,
    height: height * 0.014,
    backgroundColor: "#C1C1C5",
  },
  iconSmall: {
    borderRadius: 8,
    width: width * 0.045,
    height: height * 0.02,
    marginRight: width * 0.015,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBorder: {
    alignItems: "flex-start",
    borderColor: "#919194",
    borderRadius: 3,
    borderWidth: 1,
    padding: width * 0.01,
  },
  iconInner: {
    width: width * 0.03,
    height: height * 0.01,
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
  },
  iconTiny: {
    width: width * 0.005,
    height: height * 0.004,
  },
});

export default StatusBar;
