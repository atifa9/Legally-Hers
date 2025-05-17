import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, ScrollView, Text, Animated, TouchableOpacity, Dimensions } from "react-native";
import StatusBar from './StatusBar';
import { useAuth } from './AuthContext';

const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
  const { setIsLoggedIn, setIsGuest } = useAuth();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#FF2D88" }}>
        <StatusBar />

        
        <Animated.Image
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/lh1me9a3_expires_30_days.png" }}
          resizeMode="stretch"
          style={{
            height: height * 0.45,
            marginBottom: height * 0.04,
            marginHorizontal: width * 0.07,
            opacity: opacity,
            transform: [{ translateY: translateY }],
          }}
        />

        {/* Bottom Sheet */}
        <View style={{
          backgroundColor: "#121212",
          borderTopLeftRadius: width * 0.1,
          borderTopRightRadius: width * 0.1,
          paddingTop: height * 0.08,
          paddingBottom: height * 0.3,
        }}>
          {/* Guest Button */}
          <TouchableOpacity 
            style={{
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: width * 0.16,
              borderWidth: 1,
              paddingVertical: height * 0.03,
              marginBottom: height * 0.04,
              marginHorizontal: width * 0.06,
            }}
            onPress={() => {
              setIsGuest(true);
              navigation.navigate('Home');
            }}
          >
            <Text style={{
              color: "#000000",
              fontSize: width * 0.045,
              fontWeight: "bold",
            }}>
              {"Continue as guest"}
            </Text>
          </TouchableOpacity>

          {/* Login/Sign Up Button */}
          <TouchableOpacity 
            style={{
              alignItems: "center",
              backgroundColor: "#6B00B3",
              borderRadius: width * 0.16,
              borderWidth: 1,
              paddingVertical: height * 0.03,
              marginHorizontal: width * 0.06,
            }}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={{
              color: "#FFFFFF",
              fontSize: width * 0.045,
              fontWeight: "bold",
            }}>
              {"Login/Sign Up"}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
