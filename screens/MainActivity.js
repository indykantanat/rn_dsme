import React from 'react';
import {
	View,
	Text,
	AsyncStorage,
	Button,
	ImageBackground,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	Alert,
	ScrollView,
	PermissionsAndroid,
	Platform,
	Dimensions,
} from 'react-native';
import axios from 'axios';
import { SliderBox } from 'react-native-image-slider-box';
import Slideshow from 'react-native-image-slider-show';
import Carousel from 'react-native-banner-carousel';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

// Tester banner slider------------------------------------------------------------------------------------------------------------------------
// const images = [
// 	'http://www.sananrak.go.th/system_files/268/872cdfb8b4182a3abe6cde102e26dc72.jpg',
// 	'http://www.sananrak.go.th/system_files/268/e66dd1fcbd6158a663bee4ccc1bedee9.jpg',
// 	'http://www.sananrak.go.th/system_files/268/079302634c0a0100ab6c9e088931a68c.jpg',
// 	'http://www.sananrak.go.th/system_files/268/ac4af465a22d153d57ac0c2d18fa662b.jpg',
// 	'http://www.sananrak.go.th/system_files/268/743b59d4fe402cb59ef95e74712ae9c8.jpg',
// ];

//--------------------------------------------------------------------------------------------------------------------------------------------

class MainActivity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Complaint: [],
			news: [],
			NewsCategory: [],
			TravelTop5: [],
			ProductTop5: [],
			IMGslider: [],
			Value: '',
			userLogin: '',
			show: false,
		};
	}
	//   static navigationOptions = ({ navigation }) => {

	//     return {

	//         headerLeft: <View style={{ marginLeft: 10 }}><Text onPress={() => navigation.goBack()}>{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}</Text></View>,
	//         headerTitle: <View>
	//             <Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20 }}>
	//                 {'รายละเอียดเรื่องร้องทุกข์'}
	//             </Text>
	//         </View>,
	//         //   title: navigation.getParam('otherParam', 'A Nested Details Screen'),
	//         headerStyle: {
	//             backgroundColor: '#6633cc',
	//         },
	//         headerTintColor: '#fff',
	//         headerTitleStyle: {
	//             fontWeight: 'bold',
	//         },
	//     };

	// };
	/* -------------------------------------------------------------------------------------------------------------------------------------- */

	componentDidMount() {
		try {
			PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
		} catch (err) {
			console.warn(err);
		}
		AsyncStorage.getItem('Value').then(result => {
			//alert(result)
			this.setState({ userLogin: result });
		});
		this.get();
		this._getnew();
		this.getTravel();
		this.getProductTop5();
		this.imgslider();
	}
	/* ------------------------------------------------------------------------------------------------------------------------------------------- */

	handleOpen = () => {
		this.setState({ show: true });
	};

	handleClose = () => {
		this.setState({ show: false });
	};
	/* -------------------------- service  ผลิตภัณ TOP 5 ------------------------------------------------------------------------------------------- */

	getProductTop5() {
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios
			.get(url + 'GetProductTop5ByProjectId/1')
			.then(response => {
				this.setState({ ProductTop5: response.data.GetProductTop5ByProjectIdResult });
			})
			.catch(err => {
				alert(JSON.stringify(error));
			});
	}

	renderItem(item4) {
		const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('First', {
						Name: item4.Name,
						ImageURLProfile: item4.ImageURLProfile,
						Detail: item4.Detail,
						Latitude: item4.Latitude,
						Longitude: item4.Longitude,
					});
				}}
			>
				<View style={cardStyle}>
					<Image
						source={{ uri: 'http://' + item4.ImageURLProfile }}
						style={imageItem}
						PlaceholderContent={<ActivityIndicator />}
					></Image>
					<View style={{ flexDirection: 'column', margin: 0 }}>
						<View style={titleSubtitleSytle}>
							<Text style={{ color: '#000000EE', fontFamily: 'Prompt-Regular' }}>{item4.Name}</Text>
							{/* <Text style={{ color: "#000000AA", marginBottom: 10, fontFamily: "Prompt-Regular" }}>{item.CreatedDateString}</Text> */}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
	/* ----------------------  service ท่องเที่ยวท้อป5  ---------------------------------------------------------------------------------------------- */

	getTravel() {
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios
			.get(url + 'GetTravelTop5ByProjectId/1')
			.then(response => {
				this.setState({ TravelTop5: response.data.GetTravelTop5ByProjectIdResult });
				//Alert.alert(JSON.stringify(response.data.GetTravelTop5ByProjectIdResult))
				console.log(response.data);
			})
			.catch(err => {
				alert(JSON.stringify(error));
			});
	}

	renderItem(item3) {
		const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('First', {
						Name: item3.Name,
						ImageURLProfile: item3.ImageURLProfile,
						Detail: item3.Detail,
						Latitude: item3.Latitude,
						Longitude: item3.Longitude,
					});
				}}
			>
				<View style={cardStyle}>
					<Image
						source={{ uri: 'http://' + item3.ImageURLProfile }}
						style={imageItem}
						PlaceholderContent={<ActivityIndicator />}
					></Image>
					<View style={{ flexDirection: 'column', margin: 0 }}>
						<View style={titleSubtitleSytle}>
							<Text style={{ color: '#000000EE', fontFamily: 'Prompt-Regular' }}>{item.Name}</Text>
							{/* <Text style={{ color: "#000000AA", marginBottom: 10, fontFamily: "Prompt-Regular" }}>{item.CreatedDateString}</Text> */}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	/* ----------------------  service ข่าวเด่น ---------------------------------------------------------------------------------------------- */

	_getnew() {
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios
			.get(url + 'GetNewsTop5ByProjectId/1')
			.then(response => {
				this.setState({ news: response.data.GetNewsTop5ByProjectIdResult });
				// Alert.alert(JSON.stringify(response.data.GetTicketOrderByCompliantCateResult))
				console.log(response.data);
			})
			.catch(err => {
				alert(JSON.stringify(error));
			});
	}

	renderItem(item2) {
		const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('NewsDetail', {
						Name: item2.Name,
						ImageURLProfile: item2.ImageURLProfile,
						Detail: item2.Detail,
					});
				}}
			>
				<View style={cardStyle}>
					<Image
						source={{ uri: 'http://' + item2.ImageURLProfile }}
						style={imageItem}
						PlaceholderContent={<ActivityIndicator />}
					></Image>
					<View style={{ flexDirection: 'column', margin: 0 }}>
						<View style={titleSubtitleSytle}>
							<Text style={{ color: '#000000EE', fontFamily: 'Prompt-Regular' }}>{item.Name}</Text>

							{/* <Text style={{ color: "#000000AA", marginBottom: 10, fontFamily: "Prompt-Regular" }}>{item.CreatedDateString}</Text> */}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	/* --------------------------  service compain ------------------------- */

	get() {
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios
			.get(url + 'GetComplaintCategoryByProjectId/1')
			.then(response => {
				// this._getnew()
				this.setState({ Complaint: response.data.GetComplaintCategoryByProjectIdResult });
				//Alert.alert(JSON.stringify(response.data.GetComplaintCategoryByProjectIdResult))
				// console.log("Complaint: " + response.data.GetComplaintCategoryResult);
			})
			.catch(err => {
				alert(JSON.stringify(error));
			});
	}
	renderItem(item) {
		const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = styles;
		return (
			<TouchableHighlight
				onPress={() => {
					this.props.navigation.navigate('Listcomplain', {
						Id: item.Id,
					});
					console.log('Id: ' + item.Id);
				}}
			>
				<View style={cardStyle}>
					<Image style={{ width: 100, height: 30 }}></Image>
					<View style={{ flexDirection: 'column', width: '80%', margin: 5 }}>
						<View style={titleSubtitleSytle}>
							<Text style={{ color: '#000000EE', fontrrFamily: 'Prompt-Regular', fontSize: 18 }}></Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	//  img from server ห้ามลบ
	renderPage(image, index) {
	  return (
	    <View key={index}>
	      <Image style={{ width: BannerWidth, height: BannerHeight, resizeMode: "stretch" }} source={{ uri: "http://" + image.ImageURL }} />
	    </View>
	  );
	}
	/* -------------------------------------------------------------------------------------------------------------------------------------- */

	//------------------------------- banner from git//--------------------------------------------------------------------------------
	// renderPage(image, index) {
	// 	return (
	// 		<View key={index}>
	// 			<Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
	// 		</View>
	// 	);
	// }
	//--------------------------------------------------------------------------------

	// ----------------Banner Slider-------------ห้ามลบ----------------------------------------------------------------------------------------

	imgslider() {
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/GetSlidShowByProjectId/1';

		axios
			.get(url)
			.then(response => {
				this.setState({ IMGslider: response.data.GetSlidShowByProjectIdResult });
			})
			.catch(err => {
				alert(JSON.stringify(error));
			});
	}

	//-----------------------------------------------------------------------------------------------------------------------------------------------

	render() {
		return (
			<ImageBackground
				source={require('../image/violetbg2.png')}
				resizeMode="stretch"
				style={{ width: '100%', flex: 1 }}
			>
				<ScrollView style={{ flex: 1, width: '100%' }}>
					{/* image slider */}
					<View style={styles.container2}>
						{/* img from server */}
						
						<Carousel
              autoplay
              autoplayTimeout={5000}
              loop
              index={0}
			  pageSize={BannerWidth}
			  //onPageChanged 
            >
              {this.state.IMGslider.map((image, index) => this.renderPage(image, index))}
            </Carousel>
		

						{/* img fix link */}
						{/* <Carousel autoplay autoplayTimeout={5000} loop index={0} pageSize={BannerWidth}>
							{images.map((image, index) => this.renderPage(image, index))}
						</Carousel> */}
					</View>

					<View style={styles.TitleBar}>
						<Text style={styles.TitleText}>แจ้งเรื่องร้องทุกข์</Text>
					</View>
					<ScrollView horizontal={true}>
						{this.state.Complaint.map((item, index) => {
							return (
								<TouchableHighlight
									underlayColor={false}
									onPress={() => {
										if (this.state.userLogin == null) {
											Alert.alert('กรุณาเข้าสู่ระบบ');
											this.props.navigation.navigate('Login');
										} else {
											this.props.navigation.navigate('Listcomplain', {
												Id: item.Id,
											});
										}
										// this.CheckLogin();
										// Alert.alert(JSON.stringify(this.state.userLogin))
										console.log('ID FORM CLICK INDEX is :' + item.Id);
										//console.log("Value FORM CLICK INDEX is :" + item.Value);
									}}
									style={{
										height: '100%',
										margin: 5,
									}}
								>
									<View
										style={{
											height: 110,
											width: 110,
											backgroundColor: 'white',
											borderRadius: 10,
											justifyContent: 'center',
											shadowColor: '#000',
											shadowColor: '#000',
											shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowOpacity: 0.25,
											shadowRadius: 3.84,

											elevation: 5,
										}}
									>
										<Image
											source={{ uri: 'http://' + item.ImageURL }}
											style={[styles.imageItem, { alignSelf: 'center' }]}
										></Image>
										<Text
											style={{
												color: '#000000EE',
												fontFamily: 'Prompt-Regular',
												fontSize: 15,
												alignSelf: 'center',
											}}
										>
											{item.Name}
										</Text>
									</View>
								</TouchableHighlight>
							);
						})}
					</ScrollView>

					<View style={styles.TitleBar}>
						<Text style={styles.TitleText}>ข่าวเด่นประจำสัปดาห์</Text>
					</View>
					<ScrollView horizontal={true}>
						{this.state.news.map((item2, index) => {
							return (
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('NewsDetail', { Id: item2.Id });
										console.log('OwnerNamesend: ' + item2.Name);
									}}
								>
									<View style={styles.cardStyle}>
										<Image
											source={{ uri: 'http://' + item2.ImageURLProfile }}
											style={styles.Picnew}
										></Image>
										<View style={{ flexDirection: 'column', margin: 5 }}>
											<View style={styles.titleSubtitleSytle}>
												<Text style={styles.TextDetail}>{item2.Name}</Text>
												<View style={styles.LineStyle} />
												<Text
													style={{
														textAlign: 'center',
														fontFamily: 'Prompt-Regular',
														color: 'grey',
													}}
												>
													ดูรายละเอียด
												</Text>
											</View>
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
					</ScrollView>

					{/* EXAMPLE */}
					{/* <ScrollView horizontal={true}>
            {
              this.state.news.map((item, index) => {
                return <TouchableHighlight
                  underlayColor={false}
                  onPress={() => {
                    this.props.navigation.navigate('Detailnew'
                      );
                  }}
                  style={{
                    height: "100%",
                    margin: 5,
                  }}
                >
                  <View style={{
                    height: 120, width: 120, backgroundColor: "white", borderRadius: 30, justifyContent: 'center', shadowColor: '#000', shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}>
                    <Image source={{ uri: 'http://'+item.ImageURL }} style={[styles.imageItem, { alignSelf: 'center' }]}></Image>
                    <Text style={{ color: "#000000EE", fontFamily: "Prompt-Regular", fontSize: 17, alignSelf: 'center' }}>{item.Name}</Text>
                  </View>
                </TouchableHighlight>
              })
            }
          </ScrollView> */}

					<View style={styles.TitleBar}>
						<Text style={styles.TitleText}>ที่เที่ยวสุขสันต์</Text>
					</View>
					<ScrollView horizontal={true}>
						{this.state.TravelTop5.map((item3, index) => {
							return (
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('Traveldetail', { Id: item3.Id });
										console.log('OwnerNamesend: ' + item3.Name);
									}}
								>
									<View style={styles.cardStyle}>
										<Image
											source={{ uri: 'http://' + item3.ImageURLProfile }}
											style={styles.Picnew}
										></Image>
										<View style={{ flexDirection: 'column', margin: 5 }}>
											<View style={styles.titleSubtitleSytle}>
												<Text style={{ color: '#000000EE', fontFamily: 'Prompt-Regular' }}>
													{item3.Name}
												</Text>
											</View>
											<View style={styles.LineStyle} />
											<Text
												style={{
													textAlign: 'center',
													fontFamily: 'Prompt-Regular',
													color: 'grey',
												}}
											>
												ดูรายละเอียด
											</Text>
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
					</ScrollView>

					<View style={styles.TitleBar}>
						<Text style={styles.TitleText}>ผลิตภัณท์เด่นประจำเทศบาล</Text>
					</View>
					<ScrollView horizontal={true}>
						{this.state.ProductTop5.map((item4, index) => {
							return (
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('ProductDetail', { Id: item4.Id });
										console.log('OwnerNamesend: ' + item4.Name);
									}}
								>
									<View style={styles.cardStyle}>
										<Image
											source={{ uri: 'http://' + item4.ImageURLProfile }}
											style={styles.Picnew}
										></Image>
										<View style={{ flexDirection: 'column', margin: 5 }}>
											<View style={styles.titleSubtitleSytle}>
												<Text style={{ color: '#000000EE', fontFamily: 'Prompt-Regular' }}>
													{item4.Name}
												</Text>
												<View style={styles.LineStyle} />
												<Text
													style={{
														textAlign: 'center',
														fontFamily: 'Prompt-Regular',
														color: 'grey',
													}}
												>
													ดูรายละเอียด
												</Text>
											</View>
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
					<View style={{ flex: 1 }}>
						<Image source={require('../image/footer3.png')} />
					</View>
				</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	cardStyle: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		marginBottom: 20,
		borderRadius: 10,
		marginLeft: 5,
		// marginRight: 10,
		// marginTop: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
		marginEnd: 10,
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
		width: 55,
		height: 55,
		resizeMode: 'center',
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
		width: 250,
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
		elevation: 50,
	},
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
	TextDetail: {
		maxHeight: 50,
		maxWidth: 225,
		color: '#000000',
		fontFamily: 'Prompt-Regular',
		//marginTop:10,
	},
	LineStyle: {
		borderBottomColor: 'grey',
		borderBottomWidth: 0.5,
		marginTop: 7,
	},

	/* ---------------------------- Titlebar and Text ----//--------------------------------------------------------------------------- */

	TitleBar: {
		backgroundColor: '#6633cc',
		borderBottomRightRadius: 100,
		borderColor: 'violet',
		borderRadius: 0,
		borderWidth: 3,
		borderLeftColor: '#6633cc',
		borderBottomColor: 'violet',
		borderTopColor: '#6633cc',
		marginTop: 0,
		marginBottom: 0,
	},
	TitleText: {
		paddingHorizontal: 10,
		fontFamily: 'Prompt-Regular',
		color: 'white',
		fontSize: 25,
		textAlign: 'left',
	},
});

export default MainActivity;
