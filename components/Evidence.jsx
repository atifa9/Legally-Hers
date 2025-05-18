import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "./AuthContext";
import BackButton from "./BackButton";
import StatusBar from "./StatusBar";

const Evidence = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [evidenceList, setEvidenceList] = useState([]);

  // Pick image/video from device library
  const pickMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: false,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      uploadEvidence(pickerResult);
    }
  };

  // Upload the selected media to backend
  const uploadEvidence = async (pickerResult) => {
    setLoading(true);
    const localUri = pickerResult.uri;
    const filename = localUri.split("/").pop();

    // Extract extension
    const match = /\.(\w+)$/.exec(filename);
    const ext = match ? match[1].toLowerCase() : "jpg";

   
    let mimeType = "";
    if (pickerResult.type === "video") {
      mimeType = `video/${ext === "mov" ? "quicktime" : ext}`;
    } else {
      mimeType = `image/${ext}`;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("file", {
      uri: localUri,
      name: filename,
      type: mimeType,
    });

    try {
      const response = await fetch("http://YOUR WIFI IP:5000/api/evidence/upload", {
        method: "POST",
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Evidence uploaded successfully!");
        fetchEvidenceList(); 
      } else {
        Alert.alert("Upload Failed", data.message || "Failed to upload evidence.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to upload evidence.");
    } finally {
      setLoading(false);
    }
  };


  const fetchEvidenceList = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://YOUR WIFI IP:5000/api/evidence", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setEvidenceList(data.evidences || []);
      } else {
        Alert.alert("Error", data.message || "Failed to load evidence.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch evidence.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvidenceList();
    }
  }, [token]);

  const renderItem = ({ item }) => (
    <View style={styles.evidenceItem}>
      {item.type.startsWith("image") ? (
        <Image source={{ uri: item.url }} style={styles.media} />
      ) : (
        <Text style={styles.videoPlaceholder}>[Video] {item.filename}</Text>
      )}
      <Text style={styles.dateText}>{new Date(item.uploadedAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <BackButton />
      <Text style={styles.title}>Your Evidence</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickMedia} disabled={loading}>
        <Text style={styles.uploadButtonText}>Upload Evidence (Photo/Video)</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#6B00B3" style={{ marginTop: 20 }} />}

      <FlatList
        data={evidenceList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: "#fff" }}>No evidence uploaded yet.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  uploadButton: {
    backgroundColor: "#6B00B3",
    borderRadius: 64,
    paddingVertical: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  uploadButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  evidenceItem: {
    backgroundColor: "#222",
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
  },
  media: { width: "100%", height: 200, borderRadius: 12 },
  videoPlaceholder: { color: "#eee", fontSize: 16, fontStyle: "italic" },
  dateText: { color: "#bbb", fontSize: 12, marginTop: 5, textAlign: "right" },
});

export default Evidence;
