import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, Linking, Dimensions } from "react-native";
import StatusBar from './StatusBar';
import BackButton from './BackButton';

const { width, height } = Dimensions.get('window');

export default (props) => {

  const makePhoneCall = (phoneNumber) => {
    let phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar/>
      <BackButton/>

      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#121212" }}>

        <Text style={styles.text}>
          {"GET LEGAL AID"}
        </Text>

        <Text style={styles.text2}>
          {"Find NGO’s, legal\naid services, and women’s helpline that can offer assistance. Contact details are listed below"}
        </Text>

        {/* First Card */}
        <View style={styles.row3}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/eo4y3v65_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
          <View style={styles.innerRow}>
            <Text style={styles.text5}>
              {"Legal aid \nauthority\n040-23446723"}
            </Text>
            <TouchableOpacity style={styles.button3} onPress={() => makePhoneCall('04023446723')}>
              <Text style={styles.text3}>
                {"Call"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Second Card */}
        <View style={styles.row2}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/req6qz41_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.image2}
          />
          <View style={styles.innerRow}>
            <Text style={styles.text5}>
              {"Women’s\nHelpline\n1091"}
            </Text>
            <TouchableOpacity style={styles.button3} onPress={() => makePhoneCall('1091')}>
              <Text style={styles.text3}>
                {"Call"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Third Card */}
        <View style={styles.row3}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/igq7ltgi_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.image3}
          />
          <View style={styles.innerRow}>
            <Text style={styles.text5}>
              {"Domestic\nAbuse\n181"}
            </Text>
            <TouchableOpacity style={styles.button3} onPress={() => makePhoneCall('181')}>
              <Text style={styles.text3}>
                {"Call"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  button3: {
    width: width * 0.23,
    height: height * 0.06,
    backgroundColor: "#FF2D88",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Positioning it absolutely within the card
    right: width * 0.04,   // Keeping it on the right side of the purple rectangle
  
  },

  image: {
    width: width * 0.18,
    height: width * 0.18,
    marginRight: width * 0.04,
  },
  image2: {
    width: width * 0.18,
    height: width * 0.18,
    marginTop: 12,
    marginRight: width * 0.04,
  },
  image3: {
    width: width * 0.20,
    height: width * 0.20,
    marginRight: width * 0.035,
  },

  row2: {
    width: width * 0.88,
    height: height * 0.15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6B00B3",
    borderRadius: 30,
    paddingVertical: 19,
    paddingHorizontal: 8,
    marginBottom: height * 0.06,
    marginHorizontal: width * 0.07,
  },
  row3: {
    width: width * 0.88,
    height: height * 0.15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6B00B3",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 8,
    marginBottom: height * 0.06,
    marginHorizontal: width * 0.07,
  },

  innerRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -5,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#121212",
  },
  text: {
    color: "#FF2D88",
    fontSize: width * 0.1,
    fontWeight: "bold",
    marginBottom: 12,
    marginHorizontal: width * 0.07,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: width * 0.06,
    marginBottom: 30,
    marginHorizontal: width * 0.07,
  },
  text3: {
    color: "#FFFFFF",
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  text5: {
    color: "#FFFFFF",
    fontSize: width * 0.055,
    fontWeight: "bold",
    width: width * 0.52,
  
  },
});
