import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import { statusBarHeight } from '../../utils/Styles';

class NotFoundScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Not Found</Text>
            </View>
        );
    }
}
export default NotFoundScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: statusBarHeight, // false to get height of android too.
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
      },
});