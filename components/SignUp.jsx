import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";
import BackButton from "./BackButton";
import StatusBar from "./StatusBar";
import { useAuth } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SignUpScreen = ({ navigation }) => {
  const { setIsLoggedIn, setToken } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    username.trim() &&
    isValidEmail(email) &&
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword;

    const handleSignUp = async () => {
      if (isFormValid) {
        try {
          const response = await fetch("http://YOUR WIFI IP:5000/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
           
            await AsyncStorage.setItem("userToken", data.token); 
            setToken(data.token); // 🔐 Save JWT
            navigation.navigate("Home");
          } else {
            alert(data.message || "Something went wrong. Please try again.");
          }
        } catch (error) {
          alert("Error connecting to server.");
        }
      }
    };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar />
      <BackButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/ak58ywur_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.image}
          />
        </View>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#4C4C4C"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#4C4C4C"
          keyboardType="email-address"
        />
        {!isValidEmail(email) && email.length > 0 && (
          <Text style={styles.errorText}>Please enter a valid email address.</Text>
        )}

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#4C4C4C"
        />
        {password.length > 0 && password.length < 6 && (
          <Text style={styles.errorText}>Password must be at least 6 characters.</Text>
        )}

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#4C4C4C"
        />
        {confirmPassword.length > 0 && confirmPassword !== password && (
          <Text style={styles.errorText}>Passwords do not match.</Text>
        )}

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: { alignItems: "center", marginVertical: 30 },
  image: { width: 220, height: 220 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 64,
    marginHorizontal: 30,
    paddingVertical: 13,
    paddingHorizontal: 30,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 35,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6B00B3",
    borderRadius: 64,
    paddingVertical: 18,
    marginHorizontal: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUpScreen; 