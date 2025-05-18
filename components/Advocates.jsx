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

const advocates = [
  {
    name: 'Priya Singh',
    city: 'Delhi',
    type: 'Family',
    language: 'English',
    experience: '10 years',
    email: 'sarah.jones@example.com',
    linkedin: 'https://www.linkedin.com/in/sarah-jones',
    image:
      'https://www.visualsstock.com/details_watermark.php?filename=48825',
    whatsapp: '+911234567890',
  },
  {
    name: 'Anjali Mehta',
    city: 'Mumbai',
    type: 'Cyber Crime',
    language: 'Hindi',
    experience: '7 years',
    email: 'priya.sharma@example.com',
    linkedin: 'https://www.linkedin.com/in/priya-sharma',
    image:
      'https://c8.alamy.com/comp/KX39WX/indian-lawyer-woman-law-book-thumbs-up-success-KX39WX.jpg',
    whatsapp: '+911234567891',
  },
  {
    name: 'Neha Gupta',
    city: 'Bangalore',
    type: 'Labour & Employment',
    language: 'English',
    experience: '12 years',
    email: 'anita.patel@example.com',
    linkedin: 'https://www.linkedin.com/in/anita-patel',
    image:
      'https://media.istockphoto.com/id/1326920136/photo/shot-of-a-business-women-using-laptop-working-at-home-stock-photo.jpg?s=612x612&w=0&k=20&c=tDhOPNMfBUlZLy5titrUrOXfHVbhVosEoQveTwuuL1Y=',
    whatsapp: '+911234567892',
  },
  {
    name: 'Nidhi Dixit',
    city: 'Hyderabad',
    type: 'Family',
    language: 'Telugu',
    experience: '5 years',
    email: 'sonal.verma@example.com',
    linkedin: 'https://www.linkedin.com/in/sonal-verma',
    image:
      'https://static.vecteezy.com/system/resources/previews/059/990/729/non_2x/an-indian-woman-in-business-attire-standing-in-front-of-a-window-free-photo.jpg',
    whatsapp: '+911234567893',
  },
];

// Unique filter values
const types = ['All', ...new Set(advocates.map((a) => a.type))];
const cities = ['All', ...new Set(advocates.map((a) => a.city))];
const languages = ['All', ...new Set(advocates.map((a) => a.language))];

const Advocates = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const openEmail = (email) => {
    Linking.openURL(`mailto:${email}`).catch(() =>
      alert('Unable to open email client')
    );
  };

  const openLinkedIn = (url) => {
    Linking.openURL(url).catch(() =>
      alert('Unable to open LinkedIn profile')
    );
  };

  const filteredAdvocates = useMemo(() => {
    return advocates.filter((advocate) => {
      const typeMatch = selectedType === 'All' || advocate.type === selectedType;
      const cityMatch = selectedCity === 'All' || advocate.city === selectedCity;
      const languageMatch =
        selectedLanguage === 'All' || advocate.language === selectedLanguage;
      return typeMatch && cityMatch && languageMatch;
    });
  }, [selectedType, selectedCity, selectedLanguage]);

  const cycleOption = (options, current, setFn) => {
    const currentIndex = options.indexOf(current);
    const nextIndex = (currentIndex + 1) % options.length;
    setFn(options[nextIndex]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar />
      <BackButton />
      <Text style={styles.headerText}>OUR ADVOCATES</Text>
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

        {filteredAdvocates.length === 0 ? (
          <Text style={styles.noAdvocatesText}>No advocates found matching filters.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.grid}>
            {filteredAdvocates.map((advocate, index) => (
              <View key={index} style={styles.card}>
                <Image source={{ uri: advocate.image }} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.name}>{advocate.name}</Text>
                  <Text style={styles.typeCity}>
                    {advocate.type} | {advocate.city}
                  </Text>
                  <Text style={styles.language}>Language: {advocate.language}</Text>
                  <Text style={styles.experience}>Experience: {advocate.experience}</Text>
                  <Text
                    style={styles.link}
                    onPress={() => openEmail(advocate.email)}
                  >
                    Email: {advocate.email}
                  </Text>
                  <Text
                    style={styles.link}
                    onPress={() => openLinkedIn(advocate.linkedin)}
                  >
                    LinkedIn Profile
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Advocates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: width * 0.03,
  },
  headerText: {
    color: '#FF2D88',
    fontSize: width * 0.1,
    fontWeight: 'bold',
    marginBottom: 12,
    marginHorizontal: width * 0.11,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1c1c1c',
    width: (width * 0.44), 
    borderRadius: width * 0.04,
    padding: width * 0.04,
    marginBottom: height * 0.02,
  },
  avatar: {
    width: '100%',
    height: width * 0.3,
    borderRadius: width * 0.03,
    marginBottom: height * 0.01,
  },
  info: {
    marginBottom: height * 0.015,
  },
  name: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: height * 0.005,
  },
  typeCity: {
    color: '#ff4da6',
    fontSize: width * 0.035,
    marginBottom: height * 0.003,
  },
  language: {
    color: '#aaa',
    fontSize: width * 0.03,
    marginBottom: height * 0.005,
  },
  experience: {
    color: '#aaa',
    fontSize: width * 0.03,
    marginBottom: height * 0.005,
  },
  link: {
    color: '#00acee',
    fontSize: width * 0.03,
    textDecorationLine: 'underline',
    marginBottom: height * 0.005,
  },
  noAdvocatesText: {
    color: 'white',
    textAlign: 'center',
    marginTop: height * 0.05,
    fontSize: width * 0.045,
  },
});
