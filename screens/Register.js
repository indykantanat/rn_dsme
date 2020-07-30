import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TextInput,
	StyleSheet,
	ScrollView,
	AsyncStorage,
	Alert,
	KeyboardAvoidingView,
	TouchableOpacity,
	NativeModules,
} from 'react-native';

import { Button, CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { thisExpression } from '@babel/types';
var ImagePicker = NativeModules.ImageCropPicker;

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			GetGeography: [],
			GetProvince: [],
			GetAumphures: [],
			GetDistrict: [],
			FirstName: '', //ชื่อจริง
			LastName: '', //นามสกุล
			PhoneNumber: '', //หมายเลขโทรศัพท์
			Email: '', //อีเมล
			IdentificationNumber: '', //เลขบัตรประชาชน
			Address: '', //ที่ยอู่
			Alley: '', //ซอย
			AppKey: 1,
			ProvinceId: '',
			AumphuresId: '',
			showzipcode: '',
			DistrictId: '',
			CurrentOS: 1,
			Password: '',
			Project_Id: 1,
			Road: '', //ถนน
			Swine: '', //หมู่
			Username: '',
			Zipcode: '',
			ImageURL: 1,
			GeographyId: '',
			checked: false,
		};
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
						{'ลงทะเบียนผู้ใช้'}
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

	PostRegister = () => {
		const {
			Username,
			Password,
			FirstName,
			LastName,
			PhoneNumber,
			IdentificationNumber,
			Address,
			Alley,
			Swine,
			Road,
			GeographyId,
			Email,
		} = this.state;
		console.log('Username:', Username);
		console.log('Password:', Password);
		console.log('FirstName:', FirstName);
		console.log('LastName:', LastName);
		console.log('PhoneNumber:', PhoneNumber);
		console.log('IdentificationNumber:', IdentificationNumber);
		console.log('Address:', Address);
		console.log('Alley:', Alley);
		console.log('Swine:', Swine);
		console.log('Road:', Road);
		console.log('GeographyId:', this.state.GeographyId);
		console.log('Email:', Email);
		/* -------------------------------------------------------------------------- */

		if (this.state.Username.length == '') {
			Alert.alert('กรุณากรอก username ของท่าน');
		} else if (this.state.Password.length == '') {
			Alert.alert('กรุณากรอกรหัสผ่านของท่าน');
		} else if (this.state.FirstName.length == '') {
			Alert.alert('กรุณากรอกชื่อจริงของท่าน');
		} else if (this.state.LastName.length == '') {
			Alert.alert('กรุณากรอกนามสกุลของท่าน');
		} else if (this.state.PhoneNumber.length < 10) {
			Alert.alert('กรุณากรอกเบอร์โทรศัพท์ของท่านให้ครบ 10 หลัก');
		} else if (this.state.IdentificationNumber.length < 13) {
			Alert.alert('กรุณากรอกเลขบัตรประจำตัวประชาชนของท่าน');
		} else if (this.state.Address.length == '') {
			Alert.alert('กรุณากรอกที่อยู่ของท่าน');
		} else if (this.state.GeographyId.length == '') {
			Alert.alert('กรุณาเลือกภูมิภาคของท่าน');
		} else if (this.state.ProvinceId.length == '') {
			Alert.alert('กรุณาเลือกจังหวัดของท่าน');
		} else if (this.state.AumphuresId.length == '') {
			Alert.alert('กรุณาเลือกอำเภอของท่าน');
		} else if (this.state.DistrictId.length == '') {
			Alert.alert('กรุณาเลือกตำบลของท่าน');
		} else if (this.state.checked == false) {
			Alert.alert('กรุุณาอ่านเงื่อนไขและบริการ');
		} else {
			const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
			axios
				.post(url + 'InsertUserMobile', {
					Username: this.state.Username,
					Password: this.state.Password,
					FirstName: this.state.FirstName,
					LastName: this.state.LastName,
					PhoneNumber: this.state.PhoneNumber,
					Email: this.state.Email,
					IdentificationNumber: this.state.IdentificationNumber,
					Address: this.state.Address, //ที่อยู่
					Alley: this.state.Alley, //ซอย
					Swine: this.state.Swine, //หมู่
					Road: this.state.Road, //ถนน
					GeographyId: this.state.GeographyId,
					ProvinceId: this.state.ProvinceId,
					AumphuresId: this.state.AumphuresId,
					DistrictId: this.state.DistrictId,
					Zipcode: this.state.showzipcode,
					/* -------------------------------------------------------------------------- */
					CurrentOS: 1,
					ImageURL: 1,
					Project_Id: 1,
				})
				.then(response => {
					console.log(response);
					if (response.data.Success == true) {
						Alert.alert(response.data.Message);
						// AsyncStorage.setItem("Value", response.data.Value)
						this.props.navigation.navigate('Login');
					} else {
						Alert.alert(response.data.Message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	};
	/* -------------------------------------------------------------------------- */

	// AsyRegister = async () => {
	//   try {

	//     const { FirstName, LastName, PhoneNumber, Email, IdentificationNumber,Address,Alley,Road,Swine,Zipcode } = this.state
	//     await AsyncStorage.setItem('FirstName', FirstName)
	//     await AsyncStorage.setItem('LastName', LastName)
	//     await AsyncStorage.setItem('PhoneNumber', PhoneNumber)
	//     await AsyncStorage.setItem('Email', Email)
	//     await AsyncStorage.setItem('IdentificationNumber', IdentificationNumber)
	//     await AsyncStorage.setItem('Address', Address)
	//     await AsyncStorage.setItem('Alley', Alley)
	//     await AsyncStorage.setItem('Road', Road)
	//     await AsyncStorage.setItem('Swine', Swine)
	//     await AsyncStorage.setItem('Zipcode', Zipcode)

	//     if (this.state.FirstName.length == '') {
	//       Alert.alert('กรุณากรอกชื่อจริงของท่าน')
	//     } else if (this.state.LastName.length == '') {
	//       Alert.alert('กรุณากรอกนามสกุลจริงของท่าน')
	//     } else if (this.state.PhoneNumber.length == '') {
	//       Alert.alert('กรุณากรอกเบอร์โทร')
	//     } else if (this.state.Email.length == '') {
	//       Alert.alert('กรุณากรอกอีเมล')
	//     } else if (this.state.IdentificationNumber.length == '') {
	//       Alert.alert('กรุณากรอกบัตรประชาชน')
	//     } else {
	//       Alert.alert('กรอกข้อมูลสำเร็จ')
	//       this.props.navigation.navigate("Complain")
	//     }

	//     // this.props.navigation.navigate("Complain")
	//     // var user = await AsyncStorage.getItem('Email');
	//     console.log(user)
	//   } catch (e) {
	//     // saving error
	//   }
	// }

	// Data = async () => {
	//   try {
	//     var FirstName = await AsyncStorage.getItem('FirstName');
	//     console.log("FirstName: " + FirstName);
	//     if (FirstName != null)
	//       return this.props.navigation.replace("Complain")
	//     // alert(FirstName);
	//   }
	//   catch (error) {
	//     alert(error)
	//   }
	// }

	componentDidMount() {
		this.getGeography();
	}

	/* ----------------------------- service ภูมิภาค ---------------------------- */
	getGeography() {
		let url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios.get(url + 'GetGeography').then(respond => {
			// alert(JSON.stringify(data.data.GetCommunityResult))
			this.setState({
				GetGeography: respond.data.GetGeographyResult.map((i, index) => {
					return { value: i.Id, label: i.Name };
				}),
			});
		});
	}

	/* ----------------------------- service จังหวัด ---------------------------- */
	getProvince(id) {
		this.setState({ GeographyId: id });
		console.log('GeographyId:' + this.state.GeographyId);

		let url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios.get(url + 'GetProvinceByGeographyId/' + id).then(respond => {
			// alert(JSON.stringify(data.data.GetCommunityResult))
			this.setState({
				GetProvince: respond.data.GetProvinceByGeographyIdResult.map((i, index) => {
					return { value: i.Id, label: i.Name };
				}),
			});
		});
	}

	/* ----------------------------- service อำเภอ ---------------------------- */
	getAumphures(id) {
		this.setState({ ProvinceId: id });
		console.log('ProvinceId:' + this.state.ProvinceId);

		let url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios.get(url + 'GetAumphuresByProvinceId/' + id).then(respond => {
			// alert(JSON.stringify(data.data.GetCommunityResult))
			this.setState({
				GetAumphures: respond.data.GetAumphuresByProvinceIdResult.map((i, index) => {
					return { value: i.Id, label: i.Name };
				}),
			});
		});
	}

	/* ----------------------------- service ตำบล ---------------------------- */
	getDistrict(id) {
		this.setState({ AumphuresId: id });
		console.log('AumphuresId:' + this.state.AumphuresId);

		let url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios
			.get(url + 'GetDistrictByAumphuresId/' + id)
			// axios.get(url + "GetDistrictByAumphuresId/"+Zipcode)
			.then(respond => {
				// alert(JSON.stringify(data.data.GetCommunityResult))
				this.setState({
					GetDistrict: respond.data.GetDistrictByAumphuresIdResult.map((i, index) => {
						return { value: i.Id, label: i.Name, zipcode: i.Zipcode };
					}),
				});
				this.getDistrict2();
			});
	}

	_district(value, index) {
		this.setState({ DistrictId: this.state.GetDistrict[index].value });
		console.log('DistrictId:' + this.state.DistrictId);

		this.setState({ showzipcode: this.state.GetDistrict[index].zipcode });

		this.state.GetDistrict[index].zipcode;
		console.log('ZipcodeID:' + this.state.GetDistrict[index].zipcode);
	}
	/* ----------------------------- service ตำบล ---------------------------- */
	// getDistrict2(id) {
	//   this.setState({ DistrictId: id })
	//   console.log("DistrictId:"+this.state.DistrictId);

	// }

	/* ------------------------------ เรียก camera ------------------------------ */

	openCamera() {
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true,
		}).then(image => {
			console.log(image);
		});
	}

	pickSingleWithCamera(cropping) {
		ImagePicker.openCamera({
			cropping: cropping,
			cropperCircleOverlay: false,
			width: 500,
			height: 500,
			includeExif: true,
		})
			.then(image => {
				console.log('received image', image);
				this.setState({
					image: { uri: image.path },
				});
			})
			.catch(e => alert(e));
	}
	pickSingle(cropit, circular = false) {
		ImagePicker.openPicker({
			width: 300,
			height: 300,
			cropping: cropit,
			cropperCircleOverlay: circular,
			compressImageMaxWidth: 640,
			compressImageMaxHeight: 400,
			compressVideoPreset: 'MediumQuality',
			includeExif: true,
		})
			.then(image => {
				console.log('received image', image);
				this.setState({
					image: { uri: image.path },
				});
			})
			.catch(e => {
				console.log(e);
				Alert.alert(e.message ? e.message : e);
			});
	}
	renderImage(image) {
		return (
			<Image style={{ width: 200, height: 200, resizeMode: 'cover', borderRadius: 100 }} source={image}></Image>
		);
	}

	/* ---------------------------------- END --------------------------------- */
	checkboxis() {
		this.setState({
			checked: !this.state.checked,
		});
		//alert('Now value is ' + !this.state.checked);
	}

	render() {
		return (
			<KeyboardAvoidingView style={{}} behavior="height" enabled>
				{/* <ScrollView style={{ flexGrow: 1, width: '100%', backgroundColor: '#ECEBF1' }}> */}
				<ScrollView style={{ flexGrow: 1, width: '100%', backgroundColor: '#ffff' }}>
					<View style={{ marginTop: 20 }}></View>

					<View style={{ flexDirection: 'row', marginLeft: 110 }}>
						{this.state.image ? this.renderImage(this.state.image) : null}
					</View>

					{/* <Image source={require("../image/logosananrak.png")} style={{ alignSelf:"center", width: 180, height: 180, marginTop:0 }}></Image> */}
					<View style={style.CardBackgroud}>
						<Text style={style.TileText}>
							ชื่อผู้ใช้งาน (Username)
							<Text style={style.ETCredalert}> *</Text>
						</Text>
						<TextInput
							placeholder="กรุณากรอกชื่อผู้ใช้ (ภาษาอังกฤษหรือตัวเลข)"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#C0C0C0"
							onChangeText={text => this.setState({ Username: text })}
						></TextInput>

						<Text style={style.TileText}>
							รหัสผ่าน (Password)
							<Text style={style.ETCredalert}> *</Text>
						</Text>
						<TextInput
							placeholder="กรุณากรอกรหัสผ่าน (ภาษาอังกฤษหรือตัวเลข)"
							style={style.textInput}
							keyboardType={'number-pad'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#C0C0C0"
							onChangeText={text => this.setState({ Password: text })}
						></TextInput>

						<Text style={style.TileText}>
							ชื่อจริง
							<Text style={style.ETCredalert}> *</Text>
						</Text>
						<TextInput
							placeholder="กรุณากรอกชื่อจริง"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#C0C0C0"
							keyboardType={'default'}
							onChangeText={text => this.setState({ FirstName: text })}
						></TextInput>
						<Text style={style.TileText}>
							นามสกุล
							<Text style={style.ETCredalert}> *</Text>
						</Text>
						<TextInput
							placeholder="กรุณากรอกนามสกุล"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#c0c0c0"
							keyboardType={'default'}
							onChangeText={text => this.setState({ LastName: text })}
						></TextInput>
						<Text style={style.TileText}>
							หมายเลขเบอร์โทรศัพท์
							<Text style={style.ETCredalert}> *</Text>
						</Text>
						<TextInput
							placeholder="กรุณากรอกหมายเลขโทรศัพท์"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#c0c0c0"
							maxLength={10}
							keyboardType={'phone-pad'}
							onChangeText={text => this.setState({ PhoneNumber: text })}
						></TextInput>
						<Text style={style.TileText}>
							อีเมลล์
							<Text style={style.ETCredalert}> (ถ้ามี)</Text>
						</Text>
						<TextInput
							placeholder="กรุณากรอกอีเมลล์"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#c0c0c0"
							keyboardType={'email-address'}
							onChangeText={text => this.setState({ Email: text })}
						></TextInput>
						<Text style={style.TileText}>
							หมายเลขเลขบัตรประชาชน
							<Text style={style.ETCredalert}> *</Text>
						</Text>
						<TextInput
							placeholder="กรุณากรอกหมายเลขบัตรประจำตัวประชาชน"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#c0c0c0"
							maxLength={13}
							keyboardType={'numeric'}
							onChangeText={text => this.setState({ IdentificationNumber: text })}
						></TextInput>
						<Text style={style.TileText}>อยู่บ้านเลขที่</Text>
						<TextInput
							placeholder="กรุณากรอกบ้านเลขที่"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#c0c0c0"
							keyboardType={'default'}
							onChangeText={text => this.setState({ Address: text })}
						></TextInput>
						<Text style={style.TileText}>ตรอกซอย</Text>
						<TextInput
							placeholder="กรุณากรอกซอย"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#c0c0c0"
							keyboardType={'default'}
							onChangeText={text => this.setState({ Alley: text })}
						></TextInput>
						<Text style={style.TileText}>หมู่</Text>
						<TextInput
							placeholder="กรุณากรอกหมู่ที่"
							style={style.textInput}
							keyboardType={'phone-pad'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#c0c0c0"
							onChangeText={text => this.setState({ Swine: text })}
						></TextInput>
						<Text style={style.TileText}>ถนน</Text>
						<TextInput
							placeholder="กรุณากรอกถนน"
							style={style.textInput}
							keyboardType={'default'}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor="#c0c0c0c0"
							keyboardType={'default'}
							onChangeText={text => this.setState({ Road: text })}
						></TextInput>
						<View style={{ flexDirection: 'column', alignItems: 'stretch', width: '100%' }}>
							<Dropdown
								itemTextStyle={style.TextinputDropdown}
								style={style.TextinputDropdown}
								onChangeText={value => {
									this.getProvince(value);
								}}
								data={this.state.GetGeography}
								label="ภาค"
							/>
							<Dropdown
								itemTextStyle={style.TextinputDropdown}
								style={style.TextinputDropdown}
								onChangeText={value => {
									this.getAumphures(value);
								}}
								data={this.state.GetProvince}
								label="จังหวัด"
							/>
							<Dropdown
								itemTextStyle={style.TextinputDropdown}
								style={style.TextinputDropdown}
								onChangeText={value => {
									this.getDistrict(value);
								}}
								data={this.state.GetAumphures}
								label="อำเภอ/เขต"
							/>
							<Dropdown
								itemTextStyle={style.TextinputDropdown}
								style={style.TextinputDropdown}
								onChangeText={(value, index) => {
									this._district(value, index);
								}}
								data={this.state.GetDistrict}
								label="ตำบล"
							/>
							<Text style={style.TileText}>รหัสไปรษณีย์ {this.state.showzipcode}</Text>
							<Text style={style.ETC}>
						หมายเหตุ : ชื่อผู้ใช้งาน (Username) และรหัสผ่าน (Password) ต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น และต้อง 8 ตัวอักษรขึ้นไป

					</Text>
						</View>

						{/* <TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('Termofservice');
							}}
						>
							<Text
								style={{
									fontSize: 15,
									fontFamily: 'Prompt-Regular',
									textAlign: 'left',
									textDecorationLine: 'underline',
								}}
							>
								อ่านข้อตกลงเเละเงื่อนไข ที่นี่
							</Text>
						</TouchableOpacity> */}
					</View>

					{/* Check box is here */}
					<CheckBox
						checked={this.state.checked}
						title="ฉันยอมรับข้อตกลงและเงื่อนไขการใช้บริการ"
						textStyle={{ fontFamily: 'Prompt-Light', fontSize: 15 }}
						onPress={() => this.checkboxis()}
					/>
					{/* END of checkbox -------------------------------------------------------- */}
					
					<View style={{ marginTop: 5, marginLeft: 50, marginRight: 50 }}>
						{/* <Button  title="บันทึก"  onPress={this.Register} ></Button> */}
						<TouchableOpacity style={style.Btn} onPress={this.PostRegister}>
							<Text style={style.BtnText}>สมัครสมาชิก</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const style = StyleSheet.create({
	textInput: {
		fontSize: 15,
		fontFamily: 'Prompt-Regular',
		color: '#000',
		//backgroundColor: 'red',
		height: 40,
		width: '100%',
		//paddingHorizontal: 10,
		borderBottomWidth: 0.4,
		paddingTop: 10, //text input ระยะกึ่งกลาง
		paddingBottom: 10,
		marginVertical: 0,
		//borderRadius: 9,
	},
	Btn: {
		alignSelf: 'stretch',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#50A7EA',
		marginTop: 10,
		marginVertical: 20,
		width: '100%',
		//borderRadius: 10,
	},
	BtnText: {
		color: '#fff',
		fontFamily: 'Prompt-Regular',
		fontSize: 22,
	},
	CardBackgroud: {
		backgroundColor: 'white',
		width: '90%',
		marginTop: 5,
		//borderRadius: 10,
		padding: 10,
		//flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		marginVertical: 10,
	},

	TextinputDropdown: {
		fontSize: 15,
		fontFamily: 'Prompt-Regular',
		width: '100%',
	},
	TileText: {
		fontFamily: 'Prompt-Light',
		fontSize: 15,
		color: '#6633cc',
		marginTop: 10,
	},
	ETCredalert: {
		fontSize: 15,
		fontFamily: 'Prompt-Light',
		color: 'red',
	},
	ETC:{
		fontSize: 15,
		fontFamily: 'Prompt-Light',
		color: 'red',
		marginTop:8,
	}
});

export default Register;
