import React, { useState, useContext, useRef } from "react";
import {
  SafeAreaView, View, ScrollView, Text, Image,
  TouchableOpacity, TextInput, StyleSheet, Dimensions,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from "react-native";
import BackButton from './BackButton';
import StatusBar from './StatusBar';
import { AuthContext } from "./AuthContext";
const { width, height } = Dimensions.get("window");

export default function ChatScreen() {
  const { token } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m your legal companion 👩‍⚖️ , here to support and guide you through any legal questions or concerns. Whether it’s about your rights, safety, or justice—you're not alone. How can I assist you today?" }
  ]);
  const scrollViewRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    Keyboard.dismiss();

    try {
      const res = await fetch("http://YOUR WIFI IP:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botReply = { sender: "bot", text: data.response };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error("Error in chatbot response:", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
    <StatusBar />
    <BackButton />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 30 :-50}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>AI LEGAL ADVISOR</Text>
            <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/locsvyyk_expires_30_days.png" }} style={styles.bgImage} />
            <ScrollView
              ref={scrollViewRef}
              style={styles.chatScroll}
              contentContainerStyle={{ paddingBottom: 100 }}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {messages.map((msg, index) => (
                <View key={index} style={[
                  styles.messageBubble,
                  { backgroundColor: msg.sender === "bot" ? "#6B00B3" : "#767676" }
                ]}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputRow}>
              <TextInput
                placeholder="Type a message..."
                value={input}
                onChangeText={setInput}
                style={styles.input}
                placeholderTextColor="#CCCCCC"
              />
              <TouchableOpacity onPress={handleSend}>
                <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/erxl1zas_expires_30_days.png" }} style={styles.sendButton} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  title: {
    color: "#FF2D88",
    fontSize: width * 0.09,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    marginLeft: width * 0.08,
    
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: height * 0.01,
    zIndex: 2,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
  },
  bgImage: {
    position: "absolute",
    top: height * 0.2,
    width: width,
    height: height * 0.6,
    opacity: 0.4,
    zIndex: 0,
  },
  chatScroll: {
    flex: 1,
    zIndex: 3,
  },
  messageBubble: {
    borderRadius: 30,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: width * 0.07,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262424",
    borderRadius: 30,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.07,
    marginHorizontal: width * 0.05,
    zIndex: 3,
  },
  input: {
    color: "#000000",
    fontSize: width * 0.035,
    marginRight: width * 0.03,
    width: width * 0.62,
    backgroundColor: "#767676",
    borderColor: "#767676",
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  sendButton: {
    width: width * 0.12,
    height: width * 0.12,
    marginLeft: width * 0.06,
  },
});
