import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from "react-native";

import { ratio, colors } from '../../../utils/Styles';
import { IC_BACK } from '../../../utils/Icons';

import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';
import StatusBar from '../../shared/StatusBar';


class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistering: false,
            email: '',
            pw: '',
            displayName: '',
            statusMsg: '',
        };
    }
    static navigationOptions = {
        title: 'SIGN UP'
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
                        />
                        <TextInput
                            style={{ marginTop: 24 * ratio }}
                            txtLabel={('PASSWORD')}
                            txtHint={('PASSWORD')}
                            txt={this.state.pw}
                            onTextChanged={(text) => this.onTextChanged('PW', text)}
                            isPassword={true}
                        />
                        <TextInput
                            style={{ marginTop: 24 * ratio }}
                            txtLabel={('NAME')}
                            txtHint={('NAME')}
                            txt={this.state.displayName}
                            onTextChanged={(text) => this.onTextChanged('NAME', text)}
                        />
                        <TextInput
                            style={{ marginTop: 24 * ratio }}
                            txtLabel={('STATUS_MSG')}
                            txtHint={('STATUS_MSG')}
                            txt={this.state.statusMsg}
                            onTextChanged={(text) => this.onTextChanged('STATUS_MSG', text)}
                        />
                        <View style={styles.btnWrapper}>
                            <Button
                                isLoading={this.state.isRegistering}
                                onPress={this.onRegister}
                                style={styles.btnRegister}
                                textStyle={styles.txtRegister}
                            >{('REGISTER')}</Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    onRegister = () => {
        this.setState({ isRegistering: true }, async () => {
            try {
                
            } catch (err) {
                this.setState({ isRegistering: false });
                Alert.alert(getString('ERROR'), err.message);
            }
        });

    }

    onTextChanged = (type, text) => {
        switch (type) {
            case 'EMAIL':
                this.setState({ email: text });
                return;
            case 'PW':
                this.setState({ pw: text });
                return;
            case 'NAME':
                this.setState({ displayName: text });
                return;
            case 'STATUS_MSG':
                this.setState({ statusMsg: text });
                return;
        }
    }
}
export default SignupScreen;

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