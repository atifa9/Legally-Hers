import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView, View, ScrollView, Text, Image,
  StyleSheet, Dimensions, TouchableOpacity
} from "react-native";
import BackButton from './BackButton';
import StatusBar from './StatusBar';
import { AuthContext } from "./AuthContext";

const { width, height } = Dimensions.get("window");

export default function ConversationHistoryScreen() {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [expandedCards, setExpandedCards] = useState({}); 

  useEffect(() => {
    if (token) {
      fetch("http://YOUR WIFI IP:5000/api/chat/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setHistory(data.chats || []))
        .catch(err => console.error("History error:", err));
    }
  }, [token]);

  const toggleExpand = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar />
      <BackButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.text}>Conversations History</Text>

        {history.length === 0 ? (
          <View style={styles.row}>
            <View style={styles.view}>
              <Text style={styles.text2}>Nothing here......</Text>
            </View>
            <Image source={{ uri: "..." }} style={styles.image} />
          </View>
        ) : (
          history.map((chat, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity onPress={() => toggleExpand(index)}>
                <Text style={styles.date}>
                  {new Date(chat.date).toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {expandedCards[index] && (
                <View style={{ marginTop: 10 }}>
                  {chat.messages.map((msg, i) => (
                    <Text key={i} style={{ color: "#fff", marginBottom: 4 }}>
                      {msg.sender === "user" ? "You: " : "Bot: "}
                      {msg.text}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * -0.01,
    marginBottom: 37,
    marginHorizontal: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F780",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 14,
    marginBottom: height * 0.6,
  },
  view: {
    width: width * 0.6,
    paddingVertical: 1,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  image: {
    borderRadius: 8,
    width: 24,
    height: 24,
  },
  card: {
    backgroundColor: "#1E1E1E",
    margin: 12,
    padding: 12,
    borderRadius: 10,
  },
  date: {
    color: "#FF2D88",
    fontSize: 16,
    fontWeight: "bold"
  }
});
