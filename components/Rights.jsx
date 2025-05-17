import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import StatusBar from './StatusBar';
import BackButton from './BackButton';

const { width } = Dimensions.get("window");

const laws = [
  {
    label: "WORKPLACE HARASSMENT",
    color: "purple",
    title: "Sexual Harassment of Women at Workplace Act, 2013",
    apiEndpoint: "workplace-harassment",
    pdfUrl: "https://cpwd.gov.in/iccposhact/Handbook-on-Sexual-Harassment-of-Women-at-Workplace.pdf",
  },
  {
    label: "DOMESTIC VIOLENCE",
    color: "pink",
    title: "Protection of Women from Domestic Violence Act (PWDVA), 2005",
    apiEndpoint: "domestic-violence",
    pdfUrl: "https://www.clraindia.org/admin/gallery/documents/03032016125013-0CLRADVA2005hbfinal.pdf",
  },
  {
    label: "DOWRY HARASSMENT",
    color: "purple",
    title: "Dowry Prohibition Act, 1961 & Section 498A IPC",
    apiEndpoint: "dowry",
    pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/15364/1/the_dowry_prohibition_act%2C_1961.pdf",
  },
  {
    label: "CYBER HARASSMENT",
    color: "pink",
    title: " IT Act, 2000, IPC Sections 354D, 509, 499",
    apiEndpoint: "cyber-crimes",
    pdfUrl: "https://cybercrime.gov.in/pdf/Cyber%20Security%20Awareness%20Booklet%20for%20Citizens.pdf",
  },
  {
    label: "DIVORCE & CUSTODY",
    color: "purple",
    title: " Hindu Marriage Act, Muslim Personal Law, Parsi, Christian Marriage Acts",
    apiEndpoint: "divorce",
    pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/1560/1/A1955-25.pdf",
  },
  {
    label: "PROPERTY & INHERITANCE RIGHTS",
    color: "pink",
    title: "Hindu Succession Act (Amended 2005), Muslim Personal Law, Christian and Parsi Law",
    apiEndpoint: "property",
    pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/1713/1/AAA1956suc___30.pdf",
  },
  {
    label: "MARITAL RAPE",
    color: "purple",
    title: "Right (partially): Women can seek protection under: Section 498A IPC for cruelty, PWDVA 2005 for sexual abuse",
    apiEndpoint:   "marital-rights",
    pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/15436/1/protection_of_women_from_domestic_violence_act%2C_2005.pdf",
  },
  {
    label: "CHILD MARRIAGE",
    color: "pink",
    title: " Prohibition of Child Marriage Act, 2006",
    apiEndpoint: "child-marriage",
    pdfUrl: "https://www.childlineindia.org/pdf/Child-Marriage-handbook.pdf",
  },
  {
    label: "HONOUR-BASED VIOLENCE",
    color: "purple",
    title: " Section 302, 307 IPC (murder, attempt to murder)",
    apiEndpoint: "honour-crimes",
    pdfUrl: "https://ncwapps.nic.in/PDFFiles/Bill_against_honour_killing_crimes.pdf",
  },
  {
    label: "ACID ATTACKS",
    color: "pink",
    title: "Sections 326A & 326B IPC",
    apiEndpoint: "acid-attacks",
    pdfUrl: "https://www.mha.gov.in/en/commoncontent/compensation-acid-attack-victims",
  },
  {
    label: "ECONOMIC ABUSE",
    color: "purple",
    title: "Protection Against Economic Abuse:PWDVA, 2005",
    apiEndpoint: "economic-abuse",
    pdfUrl: "https://wcd.nic.in/sites/default/files/Protection%20of%20Women%20from%20Domestic%20Violence%20Act%202005_0.pdf",
  },
  {
    label: "STREET HARASSMENT / PUBLIC SAFETY",
    color: "pink",
    title: "Street Harassment Laws & Public Safety",
    apiEndpoint: "street-harassment",
    pdfUrl: "https://www.indiacode.nic.in/repealedfileopen?rfilename=A1860-45.pdf",
  },
];

const KnowYourRightsScreen = () => {
  const navigation = useNavigation();

  const renderButton = (item, index) => (
    <Animatable.View
      key={index}
      animation="fadeInUp"
      delay={index * 100}
      duration={800}
      useNativeDriver
    >
      <TouchableOpacity
        style={[
          styles.buttonBase,
          item.color === "pink" ? styles.buttonPink : styles.buttonPurple,
        ]}
        onPress={() =>
          navigation.navigate("LawScreen", {
            title: item.title,
            apiEndpoint: item.apiEndpoint,
            pdfUrl: item.pdfUrl,
          })
        }
      >
        <Text style={styles.buttonText}>{item.label}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar />
    <BackButton />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.header}>KNOW YOUR RIGHTS</Text>
        <Text style={styles.subheader}>
          Get information on your legal rights in case of harassment, domestic abuse, and more
        </Text>
        {laws.map(renderButton)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "#FF2D88",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  subheader: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 24,
    marginHorizontal: 20,
  },
  buttonBase: {
    width: width - 40,
    alignSelf: "center",
    borderRadius: 30,
    paddingVertical: 20,
    marginBottom: 20,
    elevation: 10,
  },
  buttonPurple: {
    backgroundColor: "#6B00B3",
  },
  buttonPink: {
    backgroundColor: "#FF2D88",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default KnowYourRightsScreen;
