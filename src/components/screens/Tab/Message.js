import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Message extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Message</Text>
            </View>
        );
    }
}
export default Message;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});