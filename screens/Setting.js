import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import Modal from "react-native-modal";
import PinView from 'react-native-pin-view';
import Icon from "react-native-vector-icons/Ionicons";
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchOn1: true,
      switchOn2: true,
      switchOn3: false,
      switchOn4: false,
      textpassword: "แก้ไข",
      visibleModalId: null,
      pincode: null
    };
  }
  componentDidMount() {
    this.Data3();
    this.Data4();
  }
  getRightText() {
    return this.state.switchOn1 ? '' : 'Eng';
  }
  getLeftText() {
    return this.state.switchOn1 ? 'ไทย' : '';
  }
  getRightText2() {
    return this.state.switchOn2 ? '' : 'ปิด';
  }
  getLeftText2() {
    return this.state.switchOn2 ? 'เปิด' : '';
  }
  getRightText3() {
    return this.state.switchOn3 ? '' : 'ปิด';
  }
  getLeftText3() {
    return this.state.switchOn3 ? 'เปิด' : '';
  }
  getRightText4() {
    return this.state.switchOn4 ? '' : 'ปิด';
  }
  getLeftText4() {
    return this.state.switchOn4 ? 'เปิด' : '';
  }
  onPress1 = () => {
    this.setState({ switchOn1: !this.state.switchOn1 });
  }
  onPress2 = () => {
    this.setState({ switchOn2: !this.state.switchOn2 });
  }
  onPress3 = () => {
    this.setState({ switchOn3: !this.state.switchOn3 });
    this.Register3();
    console.log("switchOn3", this.state.switchOn3)
    if (this.state.switchOn3 !== true) {
      if (this.state.pincode === null) {
        this.setState({ visibleModal: 'bottom' });
        <Modal
          isVisible={this.state.visibleModal === 'bottom'}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.bottomModal}
        >
          {this.renderModalContent()}
        </Modal>
      }
    }
  }
  onPress4 = () => {
    this.setState({ switchOn4: !this.state.switchOn4 });
    this.Register4();
  }
  Registerpincode = async () => {
    try {
      // let switchOn4 = false
      const { pincode } = this.state
      await AsyncStorage.setItem('pincode', pincode)
      // console.log(user)
    } catch (e) {

    }
  }
  Register3 = async () => {
    try {
      // let switchOn4 = false
      const { switchOn3, pincode } = this.state
      await AsyncStorage.setItem('switchOn3', JSON.stringify(!switchOn3))
      console.log("log3", !switchOn3)
      // console.log(user)
    } catch (e) {

    }
  }
  Register4 = async () => {
    try {
      // let switchOn4 = false
      const { switchOn4 } = this.state
      await AsyncStorage.setItem('switchOn4', JSON.stringify(!switchOn4))
      // console.log(user)
    } catch (e) {

    }
  }

  Data3 = () => {
    try {
      AsyncStorage.getItem('switchOn3')
        .then((value3) => {
          if (value3 !== null) {
            this.setState({ switchOn3: JSON.parse(value3) });
          } else {
            this.setState({ switchOn3: false })
          }
          AsyncStorage.getItem('pincode')
            .then((valuepincode) => {
              this.setState({ pincode: valuepincode })
              // alert(this.state.pincode)
            });
          alert(this.state.switchOn3)
        });
    }
    catch (error) {
      alert(error)
    }
  }
  Data4 = () => {
    try {
      AsyncStorage.getItem('switchOn4')
        .then((value4) => {
          if (value4 !== null) {
            this.setState({ switchOn4: JSON.parse(value4) });
          } else {
            this.setState({ switchOn4: false })
          }
          // alert(this.state.switchOn4)
        });
    }
    catch (error) {
      alert(error)
    }
  }
  onComplete = (inputtedPin, clear) => {
    this.setState({ pincode: inputtedPin })
    this.Registerpincode();
    alert("บันทึกเรียบร้อย")
    this.setState({ visibleModal: null })
    clear();
  }
  onPress(inputtedPin, clear, pressed) {
    console.log("Pressed: " + pressed);
    console.log("inputtedPin: " + inputtedPin)
  }
  renderModalContent = () => (
    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: "column", alignItems: "center" }}>
      <Text style={{ color: "#008DFF", fontSize: 20, fontFamily: "Prompt-Light" }}>Enter the Code</Text>
      <Text style={{ color: "#008DFF", fontSize: 18, fontFamily: "Prompt-Regular", }}>กรุณาใส่รหัสผ่าน</Text>
      <Button
        onPress={() => this.setState({ visibleModal: null })}
        title="Close"
      />
      <PinView
        onPress={this.onPress}
        onComplete={this.onComplete}
        pinLength={6}
        buttonTextColor="#008DFF"
        buttonBgColor="white"
        inputActiveBgColor="#008DFF"
        keyboardViewStyle={{ borderWidth: 1, borderColor: '#008DFF', }}
        inputViewStyle={{ width: 20, height: 20, }}
        keyboardViewTextStyle={{ fontSize: 30 }}
        buttonDeletePosition="right"
        deleteText={<Icon name="ios-backspace" size={32} color="black" />}
        buttonDeleteStyle={{ borderWidth: 0 }}
      />
    </View>
  );
  render() {
    const { rowStyle, imageItem } = styles
    console.log("ดูดีๆนะ", this.state.switchOn3)
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ margin: 20 }}>
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>Language</Text>
          <View style={rowStyle}>
            <Image source={require("../image/language.png")} style={imageItem}></Image>
            <Text style={{ color: "black", fontSize: 18, fontFamily: "Prompt-Regular", marginLeft: 10 }}>ภาษา</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 5 }}>
              <SwitchToggle
                backTextRight={this.getRightText()}
                backTextLeft={this.getLeftText()}

                type={1}
                buttonStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute'
                }}

                rightContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                leftContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}

                textRightStyle={{ color: "white", fontFamily: "Prompt-Regular" }}
                textLeftStyle={{ color: "white", fontFamily: "Prompt-Regular" }}

                containerStyle={{
                  width: 90,
                  height: 40,
                  borderRadius: 25,
                  padding: 3,
                }}
                backgroundColorOn='#008DFF'
                backgroundColorOff='#008DFF'
                circleStyle={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: 'blue', // rgb(102,134,205)
                }}
                switchOn={this.state.switchOn1}
                onPress={this.onPress1}
                circleColorOff='white'
                circleColorOn='white'
              />
            </View>
          </View>
        </View>
        <View>
        </View>
        <View style={{ margintop: 10, marginLeft: 20, marginRight: 20 }}>
          <Text style={{ color: "black", fontSize: 20, fontFamily: "Prompt-Light" }}>การแจ้งเตือน</Text>
          <View style={rowStyle}>
            <Image source={require("../image/noti.png")} style={imageItem}></Image>
            <Text style={{ color: "black", fontSize: 18, fontFamily: "Prompt-Regular", marginLeft: 10 }}>แจ้งเตือนชำระค่าบริการ</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 5 }}>
              <SwitchToggle
                backTextRight={this.getRightText2()}
                backTextLeft={this.getLeftText2()}

                type={1}
                buttonStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute'
                }}

                rightContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                leftContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}

                textRightStyle={{ color: "white", fontFamily: "Prompt-Regular" }}
                textLeftStyle={{ color: "white", fontFamily: "Prompt-Regular" }}

                containerStyle={{
                  width: 90,
                  height: 40,
                  borderRadius: 25,
                  padding: 3,
                }}
                backgroundColorOn='#008DFF'
                backgroundColorOff='gray'
                circleStyle={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: 'blue', // rgb(102,134,205)
                }}
                switchOn={this.state.switchOn2}
                onPress={this.onPress2}
                circleColorOff='white'
                circleColorOn='white'
              />
            </View>
          </View>
          <View style={rowStyle}>
            <Image source={require("../image/lock.png")} style={imageItem}></Image>
            <Text style={{ color: "black", fontSize: 18, fontFamily: "Prompt-Regular", marginLeft: 10 }}>การล็อกรหัสผ่าน</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 5 }}>
              <SwitchToggle
                backTextRight={this.getRightText3()}
                backTextLeft={this.getLeftText3()}

                type={1}
                buttonStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute'
                }}

                rightContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                leftContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}

                textRightStyle={{ color: "white", fontFamily: "Prompt-Regular" }}
                textLeftStyle={{ color: "white", fontFamily: "Prompt-Regular" }}

                containerStyle={{
                  width: 90,
                  height: 40,
                  borderRadius: 25,
                  padding: 3,
                }}
                backgroundColorOn='#008DFF'
                backgroundColorOff='gray'
                circleStyle={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: 'blue', // rgb(102,134,205)
                }}
                switchOn={this.state.switchOn3}
                onPress={this.onPress3}
                circleColorOff='white'
                circleColorOn='white'
              />
            </View>
          </View>
          <View style={rowStyle}>
            <Image source={require("../image/unlock.png")} style={imageItem}></Image>
            <Text style={{ color: "black", fontSize: 18, fontFamily: "Prompt-Regular", marginLeft: 10 }}>เปลี่ยนรหัสผ่าน</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 5, marginRight: 25, }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Changepassword')}>
                <Text style={{ color: "#008DFF", fontSize: 18, fontFamily: "Prompt-Regular", }}>{this.state.textpassword}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={rowStyle}>
            <Image source={require("../image/touch.png")} style={imageItem}></Image>
            <Text style={{ color: "black", fontSize: 18, fontFamily: "Prompt-Regular", marginLeft: 10 }}>Toch ID</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 5 }}>
              <SwitchToggle
                backTextRight={this.getRightText4()}
                backTextLeft={this.getLeftText4()}

                type={1}
                buttonStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute'
                }}

                rightContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                leftContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}

                textRightStyle={{ color: "white", fontFamily: "Prompt-Regular" }}
                textLeftStyle={{ color: "white", fontFamily: "Prompt-Regular" }}

                containerStyle={{
                  width: 90,
                  height: 40,
                  borderRadius: 25,
                  padding: 3,
                }}
                backgroundColorOn='#008DFF'
                backgroundColorOff='gray'
                circleStyle={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: 'blue', // rgb(102,134,205)
                }}
                switchOn={this.state.switchOn4}
                onPress={this.onPress4}
                circleColorOff='white'
                circleColorOn='white'
              />
            </View>
          </View>
        </View>
        <View>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center", marginTop: 15 }}>
          <Image source={require("../image/totel.png")} style={{ width: 100, height: 50, marginTop: 50 }}></Image>
          <Text style={{ color: "black", fontSize: 14, fontFamily: "Prompt-Regular", marginTop: 10 }}>แอพพลิเคชั่นที่ช่วยให้ชีวิตคุณง่ายขึ้น</Text>
          <Text style={{ color: "black", fontSize: 10, fontFamily: "Prompt-Regular", marginTop: 25 }}>TOT PUBLIC COMPANY LIMITED</Text>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rowStyle: {
    height: 60,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  imageItem: {
    width: 25,
    height: 25,
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
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default Setting;
