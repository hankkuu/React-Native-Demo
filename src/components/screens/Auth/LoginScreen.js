import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from "react-native";

import { colors } from '../../../utils/Styles';
import { statusBarHeight } from '../../../utils/Styles';
import { IC_ICON } from '../../../utils/Icons';

import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            email: '',
            pw: ''
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.iconWrapper}>
                    <Image style={styles.icon} source={IC_ICON} />
                    <Text style={styles.iconTxt}>{('HELLO SERVICE DEV TEAM')}.</Text>
                </View>
                <View style={styles.wrapper}>
                    <TextInput
                        style={styles.txtInput}
                        // txtLabel={ getString('EMAIL') }
                        txtHint={('EMAIL')}
                        txt={this.state.email}
                        onTextChanged={(text) => this.onTextChanged('EMAIL', text)}
                    />
                    <TextInput
                        style={{ marginTop: 8 }}
                        // txtLabel={ getString('EMAIL') }
                        txtHint={('PASSWORD')}
                        txt={this.state.pw}
                        onTextChanged={(text) => this.onTextChanged('PW', text)}
                        isPassword={true}
                    />
                    <View style={styles.viewBtnWrapper}>
                        <Button
                            onPress={this.goToSignup}
                            style={styles.btnSignup}
                            textStyle={styles.txtSignUp}
                        >{('SIGNUP')}</Button>
                        <Button
                            isLoading={this.state.isLogin}
                            onPress={this.onLogin}
                            style={styles.btnLogin}
                            textStyle={styles.txtLogin}
                        >{('LOGIN')}</Button>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.goToForgotPw}
                        style={styles.touchForgotPw}
                    >
                        <Text style={styles.txtForgotPw}>{('FORGOT MY PASSWORD')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    onTextChanged = (type, text) => {
        switch (type) {
            case 'EMAIL':
                this.setState({ email: text });
                return;
            case 'PW':
                this.setState({ pw: text });
                return;
        }
    }

    goToSignup = () => {
        console.log('goToSignup');
        this.props.navigation.navigate('Signup');
    }

    goToForgotPw = () => {
        console.log('goToForgotPw');
        this.props.navigation.navigate('FindPw');
    }

    onLogin = () => {
        this.setState({ isLogin: true }, () => {
            try {
                //const userData = auth(this.state.email, this.state.pw);
                //console.log(userData);
                // 위에가 작동안하기 때문에 다시처음 화면에서 Main을 띄워 줘야 한다 로그인 되었다는 상태를 여기서 저장해 준다 
                this.props.navigation.navigate('Loading', { isLogin: true });
            } catch (err) {
                Alert.alert(getString('ERROR'), err.message);
                this.setState({ isLogin: false });
            }
        });
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        paddingTop: statusBarHeight, // 
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconWrapper: {
        position: 'absolute',
        top: 76,
        left: 40,

        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    icon: {
        width: 60,
        height: 48,
    },
    iconTxt: {
        color: colors.dusk,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
    },
    wrapper: {
        marginTop: 260,
        width: '78%',
        height: 300,

        flexDirection: 'column',
        alignItems: 'center',
    },
    viewBtnWrapper: {
        alignSelf: 'stretch',
        marginTop: 20,

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    btnSignup: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 1,
        width: 136,
        height: 60,
        borderColor: colors.dodgerBlue,
        marginRight: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtSignUp: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.dodgerBlue,
    },
    btnLogin: {
        backgroundColor: colors.dodgerBlue,
        borderColor: colors.dodgerBlue,
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 1,
        width: 136,
        height: 60,
        marginLeft: 4,
        shadowColor: colors.dodgerBlue,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowRadius: 4,
        shadowOpacity: 0.3,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtLogin: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    touchForgotPw: {
        marginTop: 20,
    },
    txtForgotPw: {
        fontSize: 12,
        color: colors.dodgerBlue,
        textDecorationLine: 'underline',
    },
    txtCopyright: {
        marginTop: 80,
        fontSize: 12,
        color: colors.cloudyBlue,
    },
});