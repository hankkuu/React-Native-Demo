import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class EmptyListItem extends Component {
    render() {
        return (
            <View style={styles.emptyView} >
                <Text style={styles.emptyTxt} >
                    {this.props.children}
                </Text>
            </View>
        );
    }
}
export default EmptyListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyView: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    emptyTxt: {
        fontSize: 14,
        color: 'rgb(155,155,155)',
        alignSelf: 'center',
    }
});