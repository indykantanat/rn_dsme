import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, SectionList, ImageBackground, TouchableOpacity } from 'react-native';
// import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

class OtherMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<ImageBackground
				source={require('../image/violetbg2.png')}
				resizeMode="stretch"
				style={{ width: '100%', flex: 1 }}
			>
				<ScrollView style={{ flex: 1, width: '100%' }}>
					<ScrollView style={{ flex: 1, width: '100%' }}>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('First');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
								<Icon name="md-home" style={styles.iconOther} />
								<Text style={styles.textOther}>หน้าหลัก</Text>
							</View>
						</TouchableOpacity>

						<View style={styles.TitleBar}>
							<Text style={styles.TitleText}>สายด่วนฉุกเฉิน</Text>
						</View>

						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('PhoneCall');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10 }}>
								<Icon name="md-call" style={styles.iconOther} />
								<Text style={styles.textOther}>หมายเลขโทรศัพท์ (สายด่วน)</Text>
							</View>
						</TouchableOpacity>

						<View style={styles.TitleBar}>
							<Text style={styles.TitleText}>ข้อมูลเกี่ยวกับเทศบาล</Text>
						</View>

						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('GeneralData');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10 }}>
								<Icon name="md-chatboxes" style={styles.iconOther} />
								<Text style={styles.textOther}>ข้อมูลทั่วไปเทศบาล</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('Vision');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10 }}>
								<Icon name="md-chatboxes" style={styles.iconOther} />
								<Text style={styles.textOther}>วิสัยทัศน์</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('NewsCategory');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10 }}>
								<Icon name="ios-checkbox" style={styles.iconOther} />
								<Text style={styles.textOther}>ข่าวสำคัญ/ข่าวฝาก</Text>
							</View>
						</TouchableOpacity>

						{/* <TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('First');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10 }}>
								<Icon name="ios-happy" style={styles.iconOther} />
								<Text style={styles.textOther}>ประเมินความพึงพอใจ</Text>
							</View>
						</TouchableOpacity> */}

						<View style={styles.TitleBar}>
							<Text style={styles.TitleText}>ข้อมูลท่องเที่ยว</Text>
						</View>

						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('TravelCategory');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10 }}>
								<Icon name="md-restaurant" style={styles.iconOther} />
								<Text style={styles.textOther}>สถานที่ท่องเที่ยวประจำเทศบาล</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('ProductCategory');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10 }}>
								<Icon name="md-trophy" style={styles.iconOther} />
								<Text style={styles.textOther}>ผลิตภัณท์เด่นประจำเทศบาล</Text>
							</View>
						</TouchableOpacity>

						{/* <View style={styles.TitleBar}>
							<Text style={styles.TitleText}>ติดต่อผู้พัฒนา</Text>
						</View> */}

						{/* <TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('First');
							}}
						>
							<View style={{ flexDirection: 'row', marginBottom: 10 }}>
								<Icon name="md-hammer" style={styles.iconOther} />
								<Text style={styles.textOther}>แจ้งปัญหา/ติดต่อผู้พัฒนา</Text>
							</View>
						</TouchableOpacity> */}
					</ScrollView>
				</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	cardStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 20,
		marginLeft: 0,
		marginRight: 15,
		marginBottom: 20,
		marginTop: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.35,
		shadowRadius: 6.27,

		elevation: 10,
		flexDirection: 'column',
	},
	avatarStyle: {
		width: 45,
		height: 45,
		borderRadius: 45 / 2,
	},
	titleSubtitleSytle: {
		flexDirection: 'column',
		marginLeft: 10,
	},
	imageItem: {
		width: 50,
		height: 50,
		resizeMode: 'stretch',
		marginLeft: 5,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	textClick: {
		fontFamily: 'Prompt-Bold',
		fontSize: 13,
		color: '#1D9D9E',
		marginTop: 10,
		textAlign: 'center',
	},
	textHeader: {
		color: 'black',
		fontSize: 20,
		paddingLeft: 20,
		marginBottom: 10,
		fontFamily: 'Prompt-Bold',
	},
	Picnew: {
		width: '100%',
		height: 180,
		resizeMode: 'stretch',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	/* ------------------------------ image slider ------------------------------ */
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	container2: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	storyCounters: {
		width: 25,
	},

	/* ------------------------------ icon and text ----------------------------- */
	iconOther: {
		fontSize: 22,
		color: '#6633cc',
		// textAlign: 'right',
		marginRight: 10,
		marginLeft: 25,
		marginBottom: 0,
	},

	textOther: {
		fontSize: 16,
		// fontFamily: "Prompt-Light",
	},
	/* ------------------------------ TitleBar ----------------------------- */
	TitleBar: {
		backgroundColor: '#6633cc',
		borderColor: '#6633cc',
		borderWidth: 5,
		borderLeftColor: '#6633cc',
		borderBottomColor: 'violet',
		marginBottom: 10,
	},
	TitleText: {
		paddingHorizontal: 10,
		fontFamily: 'Prompt-Regular',
		color: '#fff',
		fontSize: 20,
		paddingBottom: 5,
	},
});

export default OtherMenu;
