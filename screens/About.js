import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <WebView source={{ uri: 'http://services.totiti.net/DSME1953/about.aspx' }} />
        );
    }
}

export default About;
