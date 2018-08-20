import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import SwitchNavigator from './components/navigation/SwitchNavigator';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SwitchNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center', // 여기를 주석을 풀면 다음 화면이 나타나지 않는다.. 겨우 찾았다 이유는 모르겠다
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',
    }
});