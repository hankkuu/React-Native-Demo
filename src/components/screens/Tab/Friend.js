import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Friend extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Friend</Text>
            </View>
        );
    }
}
export default Friend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});