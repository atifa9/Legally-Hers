import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from './AuthContext'; 

const { width, height } = Dimensions.get("window");

const AccountDrawer = (props) => {
  const navigation = useNavigation();  
  const { setIsLoggedIn, setIsGuest } = useAuth();  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
               source={require('../assets/profile.png')}  
               resizeMode="stretch"
               style={styles.image}
          />
        </View>

        <Text style={styles.nameText}></Text>
        <Text style={styles.emailText}></Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => navigation.navigate('Accinfo')} 
        >
          <Image
             source={require('../assets/edit.png')}
             resizeMode="stretch"
             style={styles.icon}
          />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        {/* Loop to map other labels to their respective screens */}
        {[{
          icon: "elcu89ik_expires_30_days.png",
          label: "Saved conversation",
          screen: 'SavedConvo', 
        }, {
          icon: "ztqqzchr_expires_30_days.png",
          label: "Plan status (Free / Premium)",
          screen: 'Accplan', 
        }, {
          icon: "tfjz0dlc_expires_30_days.png",
          label: "Setting",
          screen: 'Setting', 
        }, {
          icon: "80u68h4o_expires_30_days.png",
          label: "Account Information",
          screen: 'Accinfo', 
        }, {
          icon: "f37nd5pd_expires_30_days.png",
          label: "Log Out",
          onPress:  async () => {
            try {
              await AsyncStorage.removeItem('userToken'); // Remove JWT
              setIsLoggedIn(false);
              setIsGuest(false);
              
             
            } catch (error) {
              console.error("Error clearing token:", error);
            }
          } 
        
          
        }].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.buttonRow}
            onPress={item.onPress ? item.onPress : () => navigation.navigate(item.screen)} // Navigate to corresponding screen
          >
            <Image
              source={{
                uri: `https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/${item.icon}`,
              }}
              resizeMode="stretch"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    backgroundColor: "#121212",
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImageWrapper: {
    marginBottom: 20,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
  },
  nameText: {
    color: "#FF2D88",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  emailText: {
    color: "#0078EC",
    fontSize: 10,
    marginBottom: 20,
  },
  // Small width for the edit button and position it under the email
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F3FF",
    borderRadius: 34,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20, // Space between email and button
    width: width * 0.6, // Smaller width
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 14,
  },
  buttonText: {
    color: "#1E1E1E",
    fontSize: 14,
    fontWeight: "bold",
    flexShrink: 1,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F3FF",
    borderRadius: 34,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: width * 0.8,
  },
});

export default AccountDrawer;