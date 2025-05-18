import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHtml from 'react-native-render-html';
import StatusBar from './StatusBar';
import BackButton from './BackButton';

const { width, height } = Dimensions.get('window');

export default function LawScreen({ route }) {
  const { title, apiEndpoint, pdfUrl } = route.params;
  const [rights, setRights] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const loadCachedData = async () => {
      const cached = await AsyncStorage.getItem(apiEndpoint);
      if (cached) {
        const parsed = JSON.parse(cached);
        setRights(parsed.rights);
        setActions(parsed.actions);
      }
    };

    const fetchData = async () => {
      try {
        const res = await fetch(`http://YOUR WIFI IP:5000/api/laws/${apiEndpoint}`);
        const data = await res.json();

        const formattedRights = (data.rights || []).map(item =>
          item.replace(/\n/g, '<br/>')
        );
        const formattedActions = (data.actions || []).map(item =>
          item.replace(/\n/g, '<br/>')
        );

        setRights(formattedRights);
        setActions(formattedActions);

        await AsyncStorage.setItem(
          apiEndpoint,
          JSON.stringify({ rights: formattedRights, actions: formattedActions })
        );
      } catch (err) {
        console.error('Silent fetch error:', err);
      }
    };

    loadCachedData();
    fetchData();
  }, [apiEndpoint]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar />
      <ScrollView style={styles.scrollView}>
        <BackButton />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title?.toUpperCase()}</Text>
        </View>

        <View style={styles.pdfContainer}>
          <Text
            style={[styles.pdfLink, styles.link]}
            onPress={() => Linking.openURL(pdfUrl)}
          >
            Tap here to view official PDF
          </Text>
        </View>

        <View style={styles.lawInfoContainer}>
          <Text style={styles.sectionTitle}>➼ Rights of the Act</Text>
          {rights.length > 0 ? (
            rights.map((item, index) => (
              <RenderHtml
                key={index}
                contentWidth={width}
                source={{ html: `<div>${item}</div>` }}
                baseStyle={styles.lawDetails}
              />
            ))
          ) : (
            <Text style={styles.loadingText}>Loading rights...</Text>
          )}

          <Text style={styles.sectionTitle}>➼ What You Can Do</Text>
          {actions.length > 0 ? (
            actions.map((item, index) => (
              <RenderHtml
                key={index}
                contentWidth={width}
                source={{ html: `<div>${item}</div>` }}
                baseStyle={styles.lawDetails}
              />
            ))
          ) : (
            <Text style={styles.loadingText}>Loading actions...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#E24E8E',
  },
  titleContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.08,
    marginLeft: width * 0.03,
    marginRight: width *0.03,
    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: width *0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  pdfContainer: {
    alignItems: 'center',
     marginTop: height * -0.05,
    marginBottom: height * 0.1,
  },
  pdfLink: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    width: width * 0.9,
  },
  link: {
    color: '#0000EE',
    textDecorationLine: 'underline',
  },
  lawInfoContainer: {
    marginTop: height * -0.04,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  lawDetails: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    marginBottom: height * 0.03,
  },
  loadingText: {
    color: '#ffffffaa',
    fontStyle: 'italic',
    marginBottom: height * 0.02,
  },
});
