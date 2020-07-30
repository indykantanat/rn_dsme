import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	ScrollView,
	Alert,
	style,
	Dimensions,
	ImageBackground,
	StyleSheet,
	FlatList,
	SafeAreaView,
	SectionList,
	Linking,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const DATA = [
	{
		title: 'เบอร์ติดต่อเทศบาลเมืองสนั่นรักษ์',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191-2');
				}}
			>
				{' '}
				โทรศัพท์ : 0-2546-2191-2{' '}           
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2955-8060');
				}}
			>
				โทรสาร : 0-2955-8060{' '}          
			</Text>,
			'อีเมล์ : admin@sananrak.go.th',
		],
	},

	{
		title: 'หน้าห้องนายกเทศมนตรี',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2190');
				}}
			>
				{' '}
				0-2546-2190 ต่อ 100{' '}
			</Text>,
		],
	},
	{
		title: 'รองนายกเทศมนตรี',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				{' '}
				0-2546-2191 ต่อ 106{' '}
			</Text>,
		],
	},

	{
		title: 'ปลัดเทศบาล',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2190');
				}}
			>
				
				0-2546-2190 ต่อ 204
			</Text>,
		],
	},

	{
		title: 'สำนักปลัดเทศบาล',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				สำนักปลัดเทศบาล{'\n'} 0-2546-2191 ต่อ 200{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ฝ่ายบริหารงานทั่วไป{'\n'} 0-2546-2191 ต่อ 205{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				งานป้องกันและบรรเทาสาธารณภัย{'\n'} 0-2546-2191 ต่อ 206{' '}
			</Text>,
		],
	},

	{
		title: 'กองช่าง',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				กองช่าง{'\n'} 0-2546-2191 ต่อ 300{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ผู้อำนวยการกอง{'\n'} 0-2546-2191 ต่อ 301{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ฝ่ายผังเมือง{'\n'} 0-2546-2191 ต่อ 302{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ฝ่ายการโยธา{'\n'} 0-2546-2191 ต่อ 303{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				งานแผนที่ภาษี{'\n'} 0-2546-2191 ต่อ 304{' '}
			</Text>,
		],
	},

	{
		title: 'กองการศึกษา',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				กองการศึกษา{'\n'} 0-2546-2191 ต่อ 400{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ผู้อำนวยการกอง{'\n'} 0-2546-2191 ต่อ 401{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ศูนย์พัฒนาเด็กเล็ก{'\n'} 0-2546-2191 ต่อ 402{' '}
			</Text>,
		],
	},

	{
		title: 'กองสาธารณสุขและสิ่งแวดล้อม',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				กองสาธารณสุขและสิ่งแวดล้อม{'\n'} 0-2546-2191 ต่อ 500{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ผู้อำนวยการกอง{'\n'} 0-2546-2191 ต่อ 501{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ศูนย์บริการสาธารณสุข{'\n'} 0-2546-2191 ต่อ 502{' '}
			</Text>,
		],
	},

	{
		title: 'กองวิชาการและแผนงาน',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				กองวิชาการและแผนงาน{'\n'} 0-2546-2191 ต่อ 506{' '}
			</Text>,
		],
	},

	{
		title: 'กองสวัสดิการสังคม',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				กองสวัสดิการสังคม{'\n'} 0-2546-2191 ต่อ 600{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ผู้อำนวยการกอง{'\n'} 0-2546-2191 ต่อ 601{' '}
			</Text>,
		],
	},

	{
		title: 'กองคลัง',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				กองคลัง{'\n'} 0-2546-2191 ต่อ 700{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				งานพัสดุ{'\n'} 0-2546-2191 ต่อ 702{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				งานจัดเก็บรายได้{'\n'} 0-2546-2191 ต่อ 703{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				งานการเงิน{'\n'} 0-2546-2191 ต่อ 704{' '}
			</Text>,
		],
	},

	{
		title: 'งานทะเบียนและบัตร',
		data: [
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				งานทะเบียนและบัตร{'\n'} 0-2546-2191 ต่อ 800{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				หัวหน้างานทะเบียนและบัตร{'\n'} 0-2546-2191 ต่อ 801{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				งานบัตรประจำตัวประชาชน{'\n'} 0-2546-2191 ต่อ 802{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ปลัดอำเภอ{'\n'} 0-2546-2191 ต่อ 803{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				งานทะเบียนทั่วไป{'\n'} 0-2546-2191 ต่อ 804{' '}
			</Text>,
		],
	},

	{
		title: 'อื่น ๆ',
		data: [
			// 'ประชาสัมพันธ์เทศบาล \n0-2546-2191 ต่อ 111',
			// 'ห้องวิทยุสถานีดับเพลิง\n0-2546-2191 ต่อ 112',
			// 'ห้องประชาสัมพันธ์เสียงตามสาย\n0-2546-2191 ต่อ 222',
			// 'ชุดปฏิบัติภาคสนาม\n0-2546-2191 ต่อ 333',
			// 'ห้องประชุมสภา\n0-2546-2191 ต่อ 444',
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ประชาสัมพันธ์เทศบาล{'\n'} 0-2546-2191 ต่อ 111{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ห้องวิทยุสถานีดับเพลิง{'\n'} 0-2546-2191 ต่อ 112{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ห้องประชาสัมพันธ์เสียงตามสาย{'\n'} 0-2546-2191 ต่อ 222{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ชุดปฏิบัติภาคสนาม{'\n'} 0-2546-2191 ต่อ 333{' '}
			</Text>,
			<Text
				onPress={() => {
					Linking.openURL('tel:0-2546-2191');
				}}
			>
				ห้องประชุมสภา{'\n'} 0-2546-2191 ต่อ 444{' '}
			</Text>,
		],
	},
];

function Item({ title }) {
	return (
		<View style={styles.item}>
			<Text style={styles.title}> {title}</Text>
		</View>
	);
}

export class PhoneCall extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (
				<View style={{ marginLeft: 10 }}>
					<Text onPress={() => navigation.goBack()}>
						{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}
					</Text>
				</View>
			),
			headerTitle: (
				<View>
					<Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20 }}>
						{'หมายเลขโทรศัพท์/สายด่วน'}
					</Text>
				</View>
			),

			headerStyle: {
				backgroundColor: '#6633cc',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};

	render() {
		return (
			<ImageBackground
				//source={require('../image/violetbg2.png')}
				//resizeMode="stretch"
				style={{ backgroundColor:"white",width: '100%', height: '100%', alignItems: 'center', }}
			>
				<ScrollView style={{ flex: 1, width: '100%' }}>
					<SafeAreaView style={styles.container}>
						<SectionList
							sections={DATA}
							keyExtractor={(item, index) => item + index}
							renderItem={({ item }) => <Item title={item} />}
							renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
						/>
					</SafeAreaView>
				</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	marginTop: 30,
	// 	marginHorizontal: 16,
	// 	flexDirection:"row",
	// },
	container:{
		marginTop: 10,
		flex: 1,
		borderBottomColor:"#6633cc",
	},
	item: {
		
		padding: 20,
		marginVertical: 0,	
		
		borderBottomColor: '#A781FA',
		borderBottomWidth: 1,
		
		padding: 10,  
        fontSize: 18,  
        height: 70,  
	},
	header: {
		//fontSize: 20,
		fontFamily: 'Prompt-Regular',
		color:"#6633cc",
		paddingTop: 2,  
        paddingLeft: 10,  
        paddingRight: 10,  
        paddingBottom: 2,  
        fontSize: 22,  
        fontWeight: 'bold',  
        color: "#fff",  
        backgroundColor: '#6633cc',  
	},
	title: {
		fontSize: 16,
		fontFamily: 'Prompt-Light',
		color:"#6633cc"
	},
});

export default PhoneCall;
