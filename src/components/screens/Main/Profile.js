import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";

import { ratio, colors, statusBarHeight } from '../../../utils/Styles';
import { IC_BACK, IC_MASK } from '../../../utils/Icons';
import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';
import { commonNavigationOptions, commonNavigationOptionsForModal } from '../../navigation/NavigationOptions';
import { createStackNavigator } from 'react-navigation';

class Profile extends Component {
    constructor(props) {
        super(props);

        const { navigation } = props;
        const { user } = navigation.state.params;
        //console.log("constructor");
        //console.log(user)

        this.state = {
            isUpdating: false,
            displayName: user.displayName,
            statusMsg: user.statusMsg,
            img: user.img,
            isMe: user.displayName === '강한규',
        }
    }

    static navigationOptions = {
        title: 'Profile'
    }

    componentDidMount() {
        const { user } = this.props.navigation.state.params;
        //console.log("didMount");
        //console.log(user);
        this.setState({

        })
    }

    render() {
        const { user } = this.props.navigation.state.params;
        //console.log("render");
        //console.log(user);
        const isFriend = user.isFriend; //toJS(appStore.friends).find((item) => item.uid === user.uid) ? true : false;

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    <View style={styles.wrapper}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.onPressImg}
                        >
                            <Image source={this.state.img} style={styles.img} />
                        </TouchableOpacity>
                        <TextInput
                            editable={this.state.isMe}
                            style={{ marginTop: 24 * ratio }}
                            txtLabel={('NAME')}
                            txtHint={('NAME')}
                            txt={this.state.displayName}
                            onTextChanged={(text) => this.onTextChanged('DISPLAY_NAME', text)}
                        />
                        <TextInput
                            editable={this.state.isMe}
                            style={{ marginTop: 24 * ratio }}
                            txtLabel={('STATUS_MSG')}
                            txtHint={('STATUS_MSG')}
                            txt={this.state.statusMsg}
                            onTextChanged={(text) => this.onTextChanged('STATUS_MSG', text)}
                        />

                        <View style={styles.btnWrapper}>
                            {/* <Button
                                onPress={this.onLogout}
                                style={styles.btnLogout}
                                textStyle={styles.txtLogout}
                            >{getString('LOGOUT')}</Button> */}
                            {this.state.isMe &&
                                <Button
                                    isLoading={this.state.isUpdating}
                                    onPress={this.onUpdate}
                                    style={styles.btnUpdate}
                                    textStyle={styles.txtUpdate}
                                >{('UPDATE')}</Button>}
                            {!this.state.isMe && !isFriend &&
                                <Button
                                    isLoading={this.state.isUpdating}
                                    onPress={this.onAddFriend}
                                    style={styles.btnUpdate}
                                    textStyle={styles.txtUpdate}
                                >{('ADD_FRIEND')}</Button>}
                            {!this.state.isMe && isFriend &&
                                <View style={{flexDirection: 'row'}}>
                                    <Button
                                        isLoading={this.state.isUpdating}
                                        onPress={this.onChatFriend}
                                        style={styles.btnUpdate}
                                        textStyle={styles.txtUpdate}
                                    >{('CHAT_FRIEND')}</Button>
                                    <Button
                                        isLoading={this.state.isUpdating}
                                        onPress={this.onRemoveFriend}
                                        style={styles.btnUpdate}
                                        textStyle={styles.txtUpdate}
                                    >{('DELETE_FRIEND')}</Button>
                                </View>}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    onUpdate = () => {
        console.log('onUpdate');
        this.setState({ isUpdating: true }, () => {
            try {
                // 현재 업데이트 하기가 어렵다.. 아래 방식으로 구현 
                // const userData = firebase.auth().currentUser;
                // userData.updateProfile({
                //     displayName: this.state.displayName,
                //     photoURL: '',
                // });

                // // firestore
                // firebase.firestore().collection('users').doc(`${userData.uid}`).set({
                //     displayName: this.state.displayName,
                //     statusMsg: this.state.statusMsg,
                // }, { merge: true });

                this.props.navigation.goBack();
            } catch (err) {
                this.setState({ isUpdating: false });
            }
        });
    }

    onAddFriend = () => {
        const { user } = this.props.navigation.state.params;
        //db_addfriend(user.uid);
        this.props.navigation.navigate("Friend", { user: user });
    }
    onRemoveFriend = () => {
        const { user } = this.props.navigation.state.params;
        //db_unfriend(user.uid);
        //console.log(user)
        this.setState({ } ,
            () => {
                this.props.navigation.navigate("Message", { user: user });
            }
        )
       
    }

    onChatFriend = () => {
        const { user } = this.props.navigation.state.params;
        console.log("chat start")
        //console.log(user)
        this.props.navigation.navigate("Chat", user);
    }

    onTextChanged = (type, text) => {
        switch (type) {
            case 'DISPLAY_NAME':
                this.setState({ displayName: text });
                return;
            case 'STATUS_MSG':
                this.setState({ statusMsg: text });
                return;
        }
    }

    onPressImg = () => {
        console.log('onPressImg');
    }
}
//export default Profile;

const navigatorConfig = {
    navigationOptions: commonNavigationOptionsForModal,
};

const RootNavigator = createStackNavigator({ Root: { screen: Profile } }, navigatorConfig);
export default RootNavigator;

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
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24 * ratio,
        marginBottom: 48 * ratio,
    },
    btnLogout: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderRadius: 4 * ratio,
        borderWidth: 1 * ratio,
        width: 136 * ratio,
        height: 60 * ratio,
        borderColor: colors.dodgerBlue,
        marginRight: 4 * ratio,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtLogout: {
        fontSize: 16 * ratio,
        fontWeight: 'bold',
        color: colors.dodgerBlue,
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
            height: 10 * ratio,
        },
        shadowRadius: 4 * ratio,
        shadowOpacity: 0.3,
        marginRight: 50,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtUpdate: {
        fontSize: 16 * ratio,
        fontWeight: 'bold',
        color: 'white',
    },
    img: {
        width: 60 * ratio,
        height: 60 * ratio,
    },
});