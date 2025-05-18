import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import BackButton from './BackButton';
import StatusBar from './StatusBar';

const { width, height } = Dimensions.get('window');

const lawyers = [
  {
    name: 'Sarah Jones',
    city: 'Delhi',
    type: 'Family',
    language: 'English',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQEBsrCAVNWyTw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1700319328589?e=2147483647&v=beta&t=T7LlsnpLJZxtfrjIaEOz1XdujmTeu6LMUwQAt5S9koE',
    whatsapp: '+911234567890',
  },
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    type: 'Cyber Crime',
    language: 'Hindi',
    image: 'https://images.unsplash.com/photo-1662104935883-e9dd0619eaba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwbGF3eWVyfGVufDB8fDB8fHww',
    whatsapp: '+911234567891',
  },
  {
    name: 'Anita Patel',
    city: 'Bangalore',
    type: 'Labour & Employment',
    language: 'English',
    image: 'https://media.istockphoto.com/id/1326920136/photo/shot-of-a-business-women-using-laptop-working-at-home-stock-photo.jpg?s=612x612&w=0&k=20&c=tDhOPNMfBUlZLy5titrUrOXfHVbhVosEoQveTwuuL1Y=',
    whatsapp: '+911234567892',
  },
  {
    name: 'Sonal Verma',
    city: 'Hyderabad',
    type: 'Family',
    language: 'Telugu',
    image: 'https://static.vecteezy.com/system/resources/previews/059/990/729/non_2x/an-indian-woman-in-business-attire-standing-in-front-of-a-window-free-photo.jpg',
    whatsapp: '+911234567893',
  },
];

// Unique filter values
const types = ['All', ...new Set(lawyers.map((l) => l.type))];
const cities = ['All', ...new Set(lawyers.map((l) => l.city))];
const languages = ['All', ...new Set(lawyers.map((l) => l.language))];

const Lawyers = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const openWhatsApp = (number) => {
    const url = `https://wa.me/${number.replace('+', '')}`;
    Linking.openURL(url).catch(() => alert('Make sure WhatsApp is installed'));
  };

  const makeCall = (number) => {
    const url = `tel:${number.replace('+', '')}`;
    Linking.openURL(url).catch(() => alert('Unable to make a call'));
  };

  // Filter lawyers based on selected filters
  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer) => {
      const typeMatch = selectedType === 'All' || lawyer.type === selectedType;
      const cityMatch = selectedCity === 'All' || lawyer.city === selectedCity;
      const languageMatch =
        selectedLanguage === 'All' || lawyer.language === selectedLanguage;
      return typeMatch && cityMatch && languageMatch;
    });
  }, [selectedType, selectedCity, selectedLanguage]);

  // Helper to cycle filter options on tap
  const cycleOption = (options, current, setFn) => {
    const currentIndex = options.indexOf(current);
    const nextIndex = (currentIndex + 1) % options.length;
    setFn(options[nextIndex]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar />
      <BackButton />
      <Text style={styles.text}>OUR LAWYERS</Text>
      <View style={styles.container}>
        <View style={styles.filters}>
          <TouchableOpacity
            onPress={() => cycleOption(types, selectedType, setSelectedType)}
          >
            <Text style={styles.filter}>Type: {selectedType} ▼</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => cycleOption(cities, selectedCity, setSelectedCity)}
          >
            <Text style={styles.filter}>City: {selectedCity} ▼</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              cycleOption(languages, selectedLanguage, setSelectedLanguage)
            }
          >
            <Text style={styles.filter}>Language: {selectedLanguage} ▼</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.list}>
          {filteredLawyers.length === 0 ? (
            <Text style={styles.noLawyersText}>
              No lawyers found matching filters.
            </Text>
          ) : (
            filteredLawyers.map((lawyer, index) => (
              <View key={index} style={styles.card}>
                <Image source={{ uri: lawyer.image }} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.type}>{lawyer.type}</Text>
                  <Text style={styles.name}>{lawyer.name}</Text>
                  <Text style={styles.city}>{lawyer.city}</Text>
                  <Text style={styles.language}>Language: {lawyer.language}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.requestBtn}
                    onPress={() => openWhatsApp(lawyer.whatsapp)}
                  >
                    <Text style={styles.requestText}>Request</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.callBtn}
                    onPress={() => makeCall(lawyer.whatsapp)}
                  >
                    <Text style={styles.callText}>Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Lawyers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: width * 0.025,
  },
  text: {
    color: '#FF2D88',
    fontSize: width * 0.1,
    fontWeight: 'bold',
    marginBottom: 12,
    marginHorizontal: width * 0.12,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },
  filter: {
    backgroundColor: '#4b0082',
    color: 'white',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.03,
    fontWeight: '600',
    fontSize: width * 0.04,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: width * 0.04,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    marginRight: width * 0.03,
  },
  info: {
    flex: 1,
  },
  type: {
    color: '#ff4da6',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  name: {
    color: 'white',
    fontSize: width * 0.04,
    marginTop: height * 0.005,
  },
  city: {
    color: '#aaa',
    fontSize: width * 0.035,
    marginTop: height * 0.003,
  },
  language: {
    color: '#aaa',
    fontSize: width * 0.032,
    marginTop: height * 0.005,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  requestBtn: {
    backgroundColor: '#9400d3',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.012,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
  },
  requestText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.038,
  },
  callBtn: {
    backgroundColor: '#FF2D88', // blue color
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.012,
    borderRadius: width * 0.05,
  },
  callText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.038,
  },
  noLawyersText: {
    color: 'white',
    textAlign: 'center',
    marginTop: height * 0.03,
    fontSize: width * 0.04,
  },
});
