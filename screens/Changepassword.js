import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import PinView from 'react-native-pin-view';
import Icon from "react-native-vector-icons/Ionicons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
class Changepassword extends Component {
    constructor(props) {
        super(props)
        this.onComplete = this.onComplete.bind(this);
        this.onReComplete = this.onReComplete.bind(this);
        this.state = {
            pin: "",
            textcode: "รหัสผ่านเดิม",
            pinoncomplete: this.onComplete,
        };

    }
    componentDidMount() {
        this.getPincode();
        console.log("pin:" + this.state.pin)
    }
    getPincode = async () => {
        try {
            var pincode = await AsyncStorage.getItem('pincode');
            this.setState({ pin: pincode })
            console.log("pincode: " + pincode);
        }
        catch (error) {
            alert(error)
        }
    }
    Changepincode = async () => {
        try {
            const { pin } = this.state
            await AsyncStorage.setItem('pincode', pin)
        } catch (error) {
            alert(error)
        }
    }
    onComplete(inputtedPin, clear) {
        if (inputtedPin !== this.state.pin) {
            alert("รหัสไม่ถูกต้อง")
            clear();
        } else {
            alert("รหัสถูกต้อง")
            clear();
            this.setState({ textcode: "รหัสผ่านใหม่" })
            this.setState({ pinoncomplete: this.onReComplete })
        }
    }
    onReComplete(inputtedPin, clear) {
        if (inputtedPin !== this.state.pin) {
            alert("เปลี่ยนแปลงรหัสผ่านแล้ว")
            this.setState({ pin: inputtedPin })
            this.setState({ pinoncomplete: this.onComplete })
            this.Changepincode();
            this.props.navigation.navigate('Setting')
            clear();
        } else {
            alert("รหัสผ่านซ้ำกับรหัสผ่านเก่า")
            clear();
        }
    }
    onPress(inputtedPin, clear, pressed) {
        console.log("Pressed: " + pressed);
        console.log("inputtedPin: " + inputtedPin)
        // clear()
    }
    render() {
        console.log("555", this.state.pin)
        return (
            <View style={{ backgroundColor: 'white', flexDirection: "column", alignItems: "center" }}>
                <Text style={{ color: "#008DFF", fontSize: 20, fontFamily: "Prompt-Bold" }}>Enter the Code</Text>
                <Text style={{ color: "#008DFF", fontSize: 18, fontFamily: "Prompt-Regular", }}>{this.state.textcode}</Text>
                <PinView
                    onPress={this.onPress}
                    onComplete={this.state.pinoncomplete}
                    pinLength={this.state.pin.length}
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
    }
}

export default Changepassword;
