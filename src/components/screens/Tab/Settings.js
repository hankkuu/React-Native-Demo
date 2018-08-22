import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import Button from '../../shared/Button';
import { colors } from '../../../utils/Styles';

class Settings extends Component {
    static navigationOptions = {
        title: "Settings"
    }
    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.onLogout}
                    style={styles.btnUpdate}
                    textStyle={styles.txtUpdate}
                >LOGOUT</Button>
            </View>
        );
    }

    onLogout = () => {
        this.props.navigation.navigate('Loading');
      }
}
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    btnUpdate: {
        backgroundColor: colors.dodgerBlue,
        borderColor: colors.dodgerBlue,
        borderRadius: 4,
        borderWidth: 1,
        width: 136,
        height: 60,
        shadowColor: colors.dodgerBlue,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowRadius: 4,
        shadowOpacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    txtUpdate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});