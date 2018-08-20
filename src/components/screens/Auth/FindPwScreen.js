import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";

import { ratio, colors } from '../../../utils/Styles';
import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';
import StatusBar from '../../shared/StatusBar';

class FindPwScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: ''
        };
    }
    static navigationOptions = {
        title: 'Find PW'
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar isDarkContent={false} />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    <View style={styles.wrapper}>
                        <TextInput
                            style={{ marginTop: 8 * ratio }}
                            txtLabel={('EMAIL')}
                            txtHint={('EMAIL')}
                            txt={this.state.email}
                            onTextChanged={(text) => this.onTextChanged('EMAIL', text)}
                            isPassword={true}
                        />
                        <View style={styles.btnWrapper}>
                            <Button
                                isLoading={this.state.isLoading}
                                onPress={this.onSendLink}
                                style={styles.btnRegister}
                                textStyle={styles.txtRegister}
                            >{('SEND_LINK')}</Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    onTextChanged = (type, text) => {
        switch (type) {
            case 'EMAIL':
                this.setState({ email: text });
                return;
        }
    }
    onSendLink = () => {
        console.log('onSendLink');
        this.setState({
            isLoading: true,
        }, async () => {
            //auth().sendPasswordResetEmail(this.state.email);

            this.setState({ isLoading: false });
        });
    }
}
export default FindPwScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    scrollView: {
        alignSelf: 'stretch',
    },
    scrollViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        marginTop: 40 * ratio,
        width: '78%',

        flexDirection: 'column',
        alignItems: 'center',
    },
    btnWrapper: {
        width: '100%',
        alignItems: 'flex-end',
    },
    btnRegister: {
        backgroundColor: colors.dodgerBlue,
        borderColor: colors.dodgerBlue,
        borderRadius: 4 * ratio,
        borderWidth: 1 * ratio,
        width: 136 * ratio,
        height: 60 * ratio,
        marginLeft: 4 * ratio,
        marginTop: 24 * ratio,
        marginBottom: 48 * ratio,
        shadowColor: colors.dodgerBlue,
        shadowOffset: {
            width: 0,
            height: 10 * ratio,
        },
        shadowRadius: 4 * ratio,
        shadowOpacity: 0.3,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtRegister: {
        fontSize: 16 * ratio,
        fontWeight: 'bold',
        color: 'white',
    },
});