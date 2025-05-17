import React from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity, Text, Image, StyleSheet, Dimensions, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import StatusBar from './StatusBar';
import BackButton from './BackButton';
import { useAuth } from './AuthContext'; // Import the AuthContext

const { width, height } = Dimensions.get('window');

export default () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth(); // Get the login status from context

  const handleAccountDrawerPress = () => {
   
    if (isLoggedIn) {
      navigation.openDrawer(); // Open the drawer if logged in
    } else {
     
      setTimeout(() => {
        Alert.alert(
          "Login Required",
          "You are currently a guest user. Please login to access your profile.",
          [{ text: "OK" }]
        );
      }, 0);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar />
     

      <View style={styles.topRow}>
  {!isLoggedIn ? <BackButton /> : null}
  <View style={{ flex: 1 }} />
  <TouchableOpacity style={styles.goPremiumButton} onPress={() => navigation.navigate('Premium')}>
    <Text style={styles.goPremiumText}>{"Go Premium"}</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={handleAccountDrawerPress}>
    <Image
      source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/c30y0vmg_expires_30_days.png" }}
      resizeMode={"stretch"}
      style={styles.smallIcon}
    />
  </TouchableOpacity>
</View>


      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#121212" }}>
        <Text style={styles.helloText}>{"Hello,"}</Text>
        <View style={styles.column}>
          <TouchableOpacity style={styles.aiChatBox} onPress={() => navigation.navigate('ChatBot')}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/45ofj1b2_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.image2}
            />
            <Text style={styles.text3}>{"Chat with an AI legal advisor"}</Text>
            <Text style={styles.text4}>{"Get advice on your legal rights."}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rectangleButton} onPress={() => navigation.navigate('LegalAid')}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/p9gkscz3_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.imageSmall}
            />
            <Text style={styles.text5}>{"Get legal aid"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rectangleButton} onPress={() => navigation.navigate('Rights')}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/zoti5l3h_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.imageSmall}
            />
            <Text style={styles.text5}>{"Know your \nrights"}</Text>
          </TouchableOpacity>

          <View style={styles.premiumRow}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/t74qge3l_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.iconSmall}
            />
            <Text style={styles.premiumText}>{"PREMIUM FEATURES"}</Text>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/08nlkk95_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.iconSmall}
            />
          </View>

          {/* Rectangle Purple 1 */}
          <TouchableOpacity style={styles.rectangleButtonPurple} onPress={() => alert('Unlock this feature after upgrading 🔒')}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/a6tty6e4_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.imageSmall}
            />
            <Text style={styles.text5}>{"Consult a lawyer"}</Text>
          </TouchableOpacity>

          {/* Rectangle Purple 2 */}
          <TouchableOpacity style={styles.rectangleButtonPurple} onPress={() => alert('Unlock this feature after upgrading 🔒')}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/e52hcmod_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.imageSmall}
            />
            <Text style={styles.text5}>{"Case Tracker"}</Text>
          </TouchableOpacity>

          {/* Rectangle Purple 3 */}
          <TouchableOpacity style={styles.rectangleButtonPurple} onPress={() => alert('Unlock this feature after upgrading 🔒')}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/8kc1qo0z_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.imageSmall}
            />
            <Text style={styles.text5}>{"Chat with \nadvocates"}</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.03,
  },
  goPremiumButton: {
    backgroundColor: "#8161F5",
    borderRadius: 70,
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.04,
    marginRight: width * 0.02,
  },
  goPremiumText: {
    color: "#FFFFFF",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  smallIcon: {
    width: width * 0.08,
    height: width * 0.08,
  },
  helloText: {
    color: "#FF2D88",
    fontSize: width * 0.15,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    marginLeft: width * 0.07,
    fontFamily: 'cursive',
  },
  column: {
    alignItems: "center",
  },
  aiChatBox: {
    backgroundColor: "#FF2D88",
    borderRadius: 30,
    paddingTop: height * 0.02,
    marginBottom: height * 0.04,
    marginHorizontal: width * 0.05,
  },
  image2: {
    width: width * 0.45,
    height: height * 0.2,
    alignSelf: "center",
  },
  text3: {
    color: "#FFFFFF",
    fontSize: width * 0.07,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.015,
  },
  text4: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  rectangleButton: {
    backgroundColor: "#FF2D88",
    width: width * 0.9,
    height: height * 0.13,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  rectangleButtonPurple: {
    backgroundColor: "#6B00B3",
    width: width * 0.9,
    height: height * 0.13,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  imageSmall: {
    width: width * 0.18,
    height: width * 0.18,
    marginRight: width * 0.05,
  },
  text5: {
    color: "#FFFFFF",
    fontSize: width * 0.075,
    fontWeight: "bold",
  },
  premiumRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.9,
    marginVertical: height * 0.01,
  },
  iconSmall: {
    width: width * 0.1,
    height: width * 0.1,
  },
  premiumText: {
    color: "#FF2D88",
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.01,
  },
});
