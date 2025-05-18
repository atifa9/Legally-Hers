import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from './BackButton';
import StatusBar from './StatusBar';
import { useAuth } from './AuthContext';

const { width, height } = Dimensions.get("window");

export default () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { token } = useAuth(); 

  // Fetch user info from AsyncStorage when the component loads
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.warn("⚠️ No token found in AsyncStorage");
        return;
      }

      const res = await fetch("http://YOUR WIFI IP:5000/api/auth/account-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ Error fetching profile:", errorData.message);
        return;
      }

      const data = await res.json();
      const user = data.user;
      
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      setGender(user.gender || '');
      
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
    }
  };

  fetchProfile();
}, []);

  

  const handleProfileUpdate = async () => {
    try {
      console.log("Sending token:", token); 
      const response = await fetch("http://YOUR WIFI IP:5000/api/auth/update-profile", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${token}`,

        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          gender,
        }),
      });
     
    if (!response.ok) {
      const errorText = await response.text(); // Read the error text if the response is not OK
      throw new Error(errorText);
    }

      const data = await response.json();

      if (data.success) {
        alert('Profile updated successfully!');
        // Update the user data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify({ firstName, lastName, username, email, gender }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await fetch("http://YOUR WIFI IP:5000/api/auth/change-password", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${token}`,

        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

   
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Non-200 response body:", errorText); 
        throw new Error("Profile update failed");
      }
  
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
  
        if (data.success) {
          alert("Profile updated successfully!");
          await AsyncStorage.setItem("userData", JSON.stringify({ firstName, lastName, username, email, gender }));
        } else {
          alert(data.message || "Something went wrong.");
        }
      } else {
        const text = await response.text();
        console.error("Unexpected response (not JSON):", text);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar />
      <BackButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#121212" }}>
        <View style={styles.column}>
          <Text style={styles.text}>{"Edit Profile"}</Text>
          <Text style={styles.text2}>{"First Name"}</Text>
          <TextInput placeholder={"Enter First Name"} value={firstName} onChangeText={setFirstName} style={styles.input} />
          <Text style={styles.text2}>{"Last Name"}</Text>
          <TextInput placeholder={"Enter Last Name"} value={lastName} onChangeText={setLastName} style={styles.input} />
          <Text style={styles.text2}>{"Username"}</Text>
          <TextInput placeholder={"Enter Username"} value={username} onChangeText={setUsername} style={styles.input} />
          <Text style={styles.text2}>{"Email"}</Text>
          <TextInput placeholder={"Enter Email"} value={email} onChangeText={setEmail} style={styles.input} />
          <Text style={styles.text2}>{"Gender"}</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Prefer not to say" value="prefer_not" />
            </Picker>
          </View>

          {/* Update Profile Button */}
          <TouchableOpacity style={styles.buttonRow} onPress={handleProfileUpdate}>
            <Text style={styles.text3}>{"Update Profile"}</Text>
          </TouchableOpacity>

          {/* Change Password Section */}
          <Text style={styles.text2}>{"Old Password"}</Text>
          <TextInput placeholder={"Enter Old Password"} value={oldPassword} onChangeText={setOldPassword} style={styles.input} secureTextEntry />
          <Text style={styles.text2}>{"New Password"}</Text>
          <TextInput placeholder={"Enter New Password"} value={newPassword} onChangeText={setNewPassword} style={styles.input} secureTextEntry />

          <TouchableOpacity style={styles.buttonRow} onPress={handlePasswordChange}>
            <Text style={styles.text3}>{"Change Password"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  column: {
    marginLeft: width * 0.15,
    marginBottom: height * 0.2,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: "#000",
    marginBottom: 14,
    width: width * 0.7,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 23,
    width: width * 0.7,
  },
  picker: {
    color: "#000",
    width: "100%",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 47,
    marginLeft: 60,
  },
  text2: {
    color: "#FF2D88",
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    width: 20,
    height: 20,
    marginBottom: 40,
    marginLeft: width * 0.55,
  },
  buttonRow: {
    flexDirection: "row",
    backgroundColor: "#11497C",
    borderColor: "#000",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 58,
    marginRight: 50,
  },
  text3: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 18,
  },
});