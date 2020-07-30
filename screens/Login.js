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
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import RNRestart from 'react-native-restart';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Password: '',
			Username: '',
		};
	}
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<View>
					<Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20 }}>
						{'เข้าสู่ระบบหรือลงทะเบียน'}
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
	/* -------------------------------------------------------------------------- */

	onLoginPressed = () => {
		AsyncStorage;
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios
			.post(url + 'UserMobileLogin', {
				Username: this.state.Username,
				Password: this.state.Password,
				CurrentOS: 1,
				Project_Id: 1,
			})
			.then(response => {
				console.log(response);
				if (response.data.Success == true) {
					Alert.alert(response.data.Message);
					AsyncStorage.setItem('Value', response.data.Value);
					RNRestart.Restart();
				} else {
					Alert.alert(response.data.Message);
					//Alert.alert(response.data.Value)
					//Alert.alert('ยินดีต้อนรับคุณ')
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	};
	/* -------------------------------------------------------------------------- */

	onRegisterPressed() {
		// Alert.alert("Register")
		this.props.navigation.navigate('Register');
	}
	/* -------------------------------------------------------------------------- */

	render() {
		return (
			<ImageBackground
				source={require('../image/Login-bg.png')}
				resizeMode="stretch"
				style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
			>
				<ScrollView style={{ width: '100%', flexGrow: 1 }}>
					<KeyboardAvoidingView style={{}} behavior="padding" enabled>
						<View style={{ alignItems: 'center' }}>
							<Image
								source={require('../image/logosananrak.png')}
								style={{ width: 200, height: 200, marginTop: 20 }}
							></Image>
						</View>
						<Text style={style.TextLogin}> LOGIN</Text>
						<View style={style.CardView}>
							{/* <TextInput onChangeText={(text)=>this.setState({Username: text})} autoCorrect={false} autoCapitalize={'none'} style={style.textInput} placeholder="username" placeholderTextColor="gray" keyboardType={"default"} ></TextInput>  */}
							{/* <TextInput onChangeText={(text)=>this.setState({Password: text})} secureTextEntry={true} autoCorrect={false} autoCapitalize={'none'} style={style.textInput} placeholder="password" placeholderTextColor="gray" keyboardType={"default"} ></TextInput>  */}

							<Input
								onChangeText={text => this.setState({ Username: text })}
								keyboardType={'default'}
								autoCorrect={false}
								autoCapitalize={'none'}
								inputStyle={style.textInput}
								label="ชื่อผู้ใช้งาน"
								labelStyle={{ fontFamily: 'Prompt-Light' }}
								// placeholder='ชื่อผู้ใช้งาน'
								leftIcon={<Icon name="md-mail" size={23} color="gray" />}
							/>

							<Input
								inputStyle={style.textInput}
								onChangeText={text => this.setState({ Password: text })}
								label="รหัสผ่าน"
								labelStyle={{ fontFamily: 'Prompt-Light' }}
								secureTextEntry={true}
								autoCorrect={false}
								autoCapitalize={'none'}
								leftIcon={<Icon name="md-lock" size={24} color="gray" />}
							/>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity onPress={() => this.onLoginPressed()}>
								<LinearGradient colors={['#6633cc', '#8C53F0']} style={style.linearGradient}>
									<Text style={style.BtnText}>เข้าสู่ระบบ</Text>
								</LinearGradient>
							</TouchableOpacity>

							<TouchableOpacity onPress={this.onRegisterPressed.bind(this)} style={style.Btn} >
								<Text style={style.BtnText}>
									ลงทะเบียน
								</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</ImageBackground>
		);
	}
}

const style = StyleSheet.create({
	textInput: {
		fontFamily: 'Prompt-Regular',
		color: 'black',
		backgroundColor: 'white',
		// borderColor: '#000',
		// borderRadius: 20,
		height: 40,
		width: 350,
		// marginTop: 5,
		// marginBottom: 4,
		paddingHorizontal: 10,
		// borderColor: 'red',
		// borderBottomWidth: 0.3,

		paddingTop: 10, //text input ระยะกึ่งกลาง
		paddingBottom: 10,
		paddingLeft: 10,
		// shadowColor: "#000",
		//   shadowOffset: {
		//     width: 0,
		//     height: 3,
		//   },
		//   shadowOpacity: 0.29,
		//   shadowRadius: 4.65,
		//   elevation: 20,
		//   borderTopRightRadius: 5,
		//   borderTopLeftRadius: 5 ,
		//   borderBottomLeftRadius: 5,
		//   borderBottomRightRadius: 5,
	},
	Btn: {
		alignSelf: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#F97111',
		marginTop: 20,
		borderRadius: 20,
		width: 170,
		paddingLeft: 20,
	},
	BtnText: {
		color: '#fff',
		fontFamily: 'Prompt-Regular',
		fontSize: 17,
	},
	RegisterBtn: {
		padding: 10,
		marginTop: 5,
		alignSelf: 'stretch',
		alignItems: 'center',
	},
	RegisterText: {
		color: 'black',
		fontFamily: 'Prompt-Regular',
		fontSize: 16,
	},
	CardView: {
		borderRadius: 10,
		backgroundColor: 'white',
		marginTop: 10,
		width: 350,
		height: 175,
		alignItems: 'center',
		alignSelf: 'center',
	},
	linearGradient: {
		alignItems: 'center',
		padding: 10,
		marginTop: 20,
		borderRadius: 20,
		width: 170,
		alignSelf: 'center',
	},
	TextLogin: {
		fontFamily: 'Prompt-Bold',
		color: 'white',
		fontSize: 28,
		marginTop: 10,
	},
});

export default Login;
