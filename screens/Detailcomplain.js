import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	Alert,
	ImageBackground,
	Image,
	StyleSheet,
	Easing,
	TextInput,
	ScrollView,
	FlatList,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

class Detailcomplain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Topic: this.props.navigation.getParam('Topic'),
			Id: this.props.navigation.getParam('Id'),
			ImageURLProfile: this.props.navigation.getParam('ImageURLProfile'),
			Segment: this.props.navigation.getParam('Segment'),
			Value: this.props.navigation.getParam('Value'),
			Fristname: this.props.navigation.getParam('Fristname'),
			CommunityName: this.props.navigation.getParam('CommunityName'),
			Detail: this.props.navigation.getParam('Detail'),
			CreatedDateString: this.props.navigation.getParam('CreatedDateString'),
			Latitude: this.props.navigation.getParam('Latitude'),
			Longitude: this.props.navigation.getParam('Longitude'),
			Status: this.props.navigation.getParam('Status'),
			Comment: '',
			getComment: [],
			UMCreate: this.props.navigation.getParam('UMCreate'),
		};
		console.log('ID : ' + this.props.navigation.getParam('Id'));
		console.log('ImageURLProfile :' + this.props.navigation.getParam('ImageURLProfile'));
		console.log('UMCreate :' + this.props.navigation.getParam('UMCreate'));
		console.log('Firstname :' + this.props.navigation.getParam('Fristname'));
		//console.log("Firstname :" + this.props.navigation.getParam('Fristname'));
	}
	static navigationOptions = ({ navigation }) => {
		// const  {params} = navigation.state

		// alert(JSON.stringify(navigation))
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
						{'รายละเอียดเรื่องร้องทุกข์'}
					</Text>
				</View>
			),
			//   title: navigation.getParam('otherParam', 'A Nested Details Screen'),
			headerStyle: {
				backgroundColor: '#6633cc',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};
	/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

	addComment = () => {
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios
			.post(url + 'InsertComplaintComment', {
				ComplaintId: this.state.Id,
				CommentDetail: this.state.Comment,
				CommentBy: this.state.Fristname,
				ImageURl: '',
			})
			.then(result => {
				Alert.alert('เสร็จสิ้น');
				this.getComment();
			});
	};
	/* ----------------------------------------------------------------------------------------------------------------------------------- */

	componentDidMount() {
		this.getComment();
		// alert(this.state.Status)
	}
	/* ------------------------------------------------------------------------------------------------------------------------------------ */

	getComment() {
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		// console.log("url: " + url+"GetTicketOrderByCompliantCate/"+this.state.Id);
		axios
			.get(url + 'GetComplaintCommentByComplaintId/' + this.state.Id)
			.then(response => {
				this.setState({ getComment: response.data.GetComplaintCommentByComplaintIdResult });
				console.log('getComment: ' + response.data.GetComplaintCommentByComplaintIdResult);
			})
			.catch(err => {
				alert(JSON.stringify(error));
			});
	}
	renderItem(item) {
		return (
			<View style={{ flexDirection: 'column', width: '100%' }}>
				<View style={{ flexDirection: 'column' }}>
					<Text style={{ color: '#000000EE', fontFamily: 'Prompt-Regular', fontSize: 18 }}>
						{item.CommentDetail}
					</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<Text style={{ color: '#7F8C8D', fontFamily: 'Prompt-Regular', fontSize: 16 }}>
							{item.CommentBy}
						</Text>
					</View>
				</View>
			</View>
		);
	}
	/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

	render() {
		return (
			<View>
				<ImageBackground
					source={require('../image/violetbg2.png')}
					resizeMode="stretch"
					style={{ width: '100%', height: '100%' }}
				>
					<ScrollView>
						<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
							<Image
								source={{ uri: 'http://' + this.state.ImageURLProfile }}
								resizeMode="stretch"
								height={wp(90)}
								width={wp(100)}
								style={{ width: wp(100), height: wp(90) }}
							></Image>
							{/* <ZoomImage source={{ uri: this.state.ImageURL }} style={{ width: "90%", height: 180, margin: 20 }}
                  duration={200}
                  enableScaling={false}
                  easingFunc={Easing.ease}>
                </ZoomImage> */}

							<View style={{ backgroundColor: 'white', width: '100%' }}>
								<Text style={{ color: '#000000', fontSize: 16, marginLeft: 10 }}>
									เรื่อง : {this.state.Topic}
								</Text>
								<Text style={{ color: '#000000', fontSize: 16, marginTop: 10, marginLeft: 10 }}>
									รายละเอียด : {this.state.Detail}
								</Text>
								<Text style={{ color: '#000000', fontSize: 16, marginTop: 10, marginLeft: 10 }}>
									ชุมชน : {this.state.CommunityName}
									{'\n'}
								</Text>

								{/* <Text style={{ color: "#000000", fontSize: 16, marginTop: 10,marginLeft:10 }}>สถานะ : </Text> */}
								<Text
									style={{
										color: '#000000',
										fontrrFamily: 'Prompt-Regular',
										fontSize: 16,
										marginLeft: 10,
									}}
								>
									ชื่อผู้ร้องเรียน : {this.state.UMCreate}
								</Text>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ color: '#000000', fontSize: 16, marginTop: 10, marginLeft: 10 }}>
										สถานะ :
									</Text>
									{this.state.Status == 1 ? (
										<Text style={{ color: '#000000', fontSize: 16, marginTop: 10, marginLeft: 10 }}>
											รอรับงาน
										</Text>
									) : this.state.Status == 2 ? (
										<Text style={{ color: '#000000', fontSize: 16, marginTop: 10, marginLeft: 10 }}>
											กำลังดำเนินการ{' '}
										</Text>
									) : (
										<Text style={{ color: '#000000', fontSize: 16, marginTop: 10, marginLeft: 10 }}>
											เสร็จสิ้น
										</Text>
									)}
								</View>
								<View style={{ backgroundColor: '#6633cc', width: '100%', marginTop: 10 }}>
									<Text style={{ color: 'white', fontFamily: 'Prompt-Regular', fontSize: 16 }}>
										แสดงความคิดเห็น
									</Text>
								</View>
								<TextInput
									style={style.textInput}
									placeholder="แสดงความคิดเห็นของคุณ"
									placeholderTextColor="gray"
									keyboardType={'default'}
									onChangeText={text => this.setState({ Comment: text })}
								></TextInput>
								<Button title="เขียนความคิดเห็น" onPress={this.addComment}></Button>
								<View style={{ backgroundColor: '#6633cc', width: '100%' }}>
									<Text style={{ color: 'white', fontFamily: 'Prompt-Regular', fontSize: 16 }}>
										ติดตามงาน
									</Text>
								</View>
								<FlatList
									data={this.state.getComment}
									renderItem={({ item }) => this.renderItem(item)}
								></FlatList>
							</View>
						</View>
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

const style = StyleSheet.create({
	cardStyle: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		marginBottom: 20,
		borderRadius: 10,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},
	avatarStyle: {
		width: 45,
		height: 45,
		borderRadius: 45 / 2,
	},
	titleSubtitleSytle: {
		flexDirection: 'column',
	},
	imageItem: {
		width: '100%',
		height: 150,
		resizeMode: 'stretch',
		margin: 20,
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
	textInput: {
		color: 'black',
		backgroundColor: 'white',
		borderColor: 'black',
		borderRadius: 0,
		height: 40,
		width: 320,
		margin: 5,
	},
});
export default Detailcomplain;
