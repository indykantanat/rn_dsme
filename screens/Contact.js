import React, { Component } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.WEBVIEW_REF = React.createRef();
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.WEBVIEW_REF.current.goBack();
        return true;
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack
        });
    }
    render() {
        return (
            <WebView
                source={{ uri: "http://services.totiti.net/DSMESanunrak/Contact.aspx" }}
                ref={this.WEBVIEW_REF}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            />
        );
    }
}

export default Contact;