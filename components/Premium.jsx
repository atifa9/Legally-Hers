import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import BackButton from './BackButton';
import StatusBar from './StatusBar';
export default (props) => {
    const navigation = useNavigation();
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
             <StatusBar/>
             <BackButton/>
			 <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#121212" }}>
				<Text style={styles.text}>
					{"Get More with Premium"}
				</Text>
				<Text style={styles.text2}>
					{"Your legal safety with now more personalization and power"}
				</Text>
				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={styles.text3}>
							{"FREE PLAN"}
						</Text>
						<Text style={styles.text4}>
							{"•Access legal right info.\n•AI legal chatbot\n•Helpline directory "}
						</Text>
						<View style={styles.view}>
							<Text style={styles.text5}>
								{"Already Active"}
							</Text>
						</View>
					</View>
					<View style={styles.column2}>
						<Text style={styles.text6}>
							{"PREMIUM PLAN👑- 200/month"}
						</Text>
						<Text style={styles.text7}>
							{"•Access legal right info.\n•AI legal chatbot\n•Helpline directory\n•Case tracking\n•Voice consultation with lawyers \n•Support from advocates \n•Ad free experience "}
						</Text>
						
						<TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('paymentgateway')}>
							<Text style={styles.text8}>
								{"Upgrade Now"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
                </ScrollView >
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({

	button: {
		backgroundColor: "#593173",
		borderColor: "#FFFFFF",
		borderRadius: 64,
		borderWidth: 1,
		paddingVertical: 8,
		marginHorizontal: 10,
	},
	column: {
		flex: 1,
		backgroundColor: "#211B38",
		borderRadius: 30,
		paddingTop: 35,
		paddingBottom: 15,
		marginRight: 18,
	},
	column2: {
		flex: 1,
		backgroundColor: "#FF2D88",
		borderRadius: 30,
		paddingVertical: 12,
	},
	image: {
		width: 59,
		height: 59,
	},
	row: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 129,
		marginHorizontal: 10,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#121212",
	},
	text: {
		color: "#FF2D88",
		fontSize: 40,
		marginBottom: 14,
		marginLeft: 44,
		width: 350,
	},
	text2: {
		color: "#8161F5",
		fontSize: 20,
		marginBottom: 23,
		marginLeft: 47,
		width: 262,
	},
	text3: {
		color: "#FF2D88",
		fontSize: 24,
		textAlign: "center",
		marginBottom: 53,
		marginHorizontal: 15,
	},
	text4: {
		color: "#AB95FE",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 175,
		marginHorizontal: 8,
	},
	text5: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "bold",
		marginHorizontal: 28,
        textAlign: "center",
	},
	text6: {
		color: "#FFFFFF",
		fontSize: 24,
		textAlign: "center",
		marginBottom: 15,
		marginHorizontal: 15,
	},
	text7: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 18,
		marginHorizontal: 14,
	},
	text8: {
		color: "#FFFFFF",
		fontSize: 16,
		marginHorizontal: 30,
        textAlign: "center",
	},
	view: {
		backgroundColor: "#593173",
		borderColor: "#FFFFFF",
		borderRadius: 64,
		borderWidth: 1,
		paddingVertical: 8,
		marginHorizontal: 17,
	},
	
});