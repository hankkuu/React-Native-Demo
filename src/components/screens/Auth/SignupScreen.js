import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from "react-native";

import { colors } from '../../../utils/Styles';
import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';

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
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer} // 정렬용
                >
                    <View style={styles.wrapper}>
                        <TextInput
                            style={{ marginTop: 8  }}
                            txtLabel={('EMAIL')}
                            txtHint={('EMAIL')}
                            txt={this.state.email}
                            onTextChanged={(text) => this.onTextChanged('EMAIL', text)}
                        />
                        <TextInput
                            style={{ marginTop: 24  }}
                            txtLabel={('PASSWORD')}
                            txtHint={('PASSWORD')}
                            txt={this.state.pw}
                            onTextChanged={(text) => this.onTextChanged('PW', text)}
                            isPassword={true}
                        />
                        <TextInput
                            style={{ marginTop: 24  }}
                            txtLabel={('NAME')}
                            txtHint={('NAME')}
                            txt={this.state.displayName}
                            onTextChanged={(text) => this.onTextChanged('NAME', text)}
                        />
                        <TextInput
                            style={{ marginTop: 24  }}
                            txtLabel={('STATUS MSG')}
                            txtHint={('STATUS MSG')}
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
                            <Button
                                isLoading={this.state.isRegistering}
                                onPress={this.onRegisterFacebook}
                                style={styles.btnRegister}
                                textStyle={styles.txtRegister}
                            >{('FACE BOOK')}</Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    onRegister = () => {
        this.setState({ isRegistering: true }, () => {
            try {

                // 지금 하는게 없다...
                
            } catch (err) {
                this.setState({ isRegistering: false });
                Alert.alert(getString('ERROR'), err.message);
            }
        });
    }

    onRegisterFacebook = () => {
        this.setState({ isRegistering: true }, () => {
            try {

                // 지금 하는게 없다...
                
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
        marginTop: 40 ,
        width: '78%',

        flexDirection: 'column',
        alignItems: 'center',
    },
    btnWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-around"
        //alignItems: 'flex-end',
    },
    btnRegister: {
        backgroundColor: colors.dodgerBlue,
        borderColor: colors.dodgerBlue,
        borderRadius: 4 ,
        borderWidth: 1 ,
        width: 136 ,
        height: 60 ,
        marginLeft: 4 ,
        marginTop: 24 ,
        marginBottom: 48 ,
        shadowColor: colors.dodgerBlue,
        shadowOffset: {
            width: 0,
            height: 10 ,
        },
        shadowRadius: 4 ,
        shadowOpacity: 0.3,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtRegister: {
        fontSize: 16 ,
        fontWeight: 'bold',
        color: 'white',
    },
});