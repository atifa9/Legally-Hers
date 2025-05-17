import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  View
} from "react-native";
import BackButton from "./BackButton";
import StatusBar from "./StatusBar";
import { useAuth } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = ({ navigation }) => {
  const { setIsLoggedIn, setToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (isFormValid) {
      try {
        const response = await fetch("http://you wifi ip:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("✅ Token received:", data.token);
          await AsyncStorage.setItem("userToken", data.token); 
          setIsLoggedIn(true);
          setToken(data.token);
          navigation.navigate("Home");
        } else {
          alert(data.message || "Invalid username or password.");
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
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/3m449t9q_expires_30_days.png" }}
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
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#4C4C4C"
        />

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}>Don’t have an account? Sign Up</Text>
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
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#6B00B3",
    borderRadius: 64,
    paddingVertical: 18,
    marginHorizontal: 30,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#FF3A8F",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
});

export default LoginScreen;