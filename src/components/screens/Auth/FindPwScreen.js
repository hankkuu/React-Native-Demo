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
        title: 'Find Password'
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    <View style={styles.wrapper}>
                        <TextInput
                            style={{ marginTop: 8  }}
                            txtLabel={('EMAIL')}
                            txtHint={('EMAIL')}
                            txt={this.state.email}
                            onTextChanged={(text) => this.onTextChanged('EMAIL', text)}
                            isPassword={true}
                        />
                        <View style={styles.btnWrapper}>
                            <Button
                                isLoading={this.state.isLoading}
                                onPress={this.onSendMail}
                                style={styles.btnRegister}
                                textStyle={styles.txtRegister}
                            >{('SEND MAIL')}</Button>
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
    onSendMail = () => {
        console.log('onSendMail');
        this.setState({
            isLoading: true,
        }, () => {
            // 아래같이 메일을 보내서 초기화가 필요하다 
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
        marginTop: 40 ,
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