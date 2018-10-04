import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";

import { colors } from '../../../utils/Styles';

import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';

import { commonNavigationOptionsForModal } from '../../navigation/NavigationOptions';
import { createStackNavigator } from 'react-navigation';



class Profile extends Component {
    constructor(props) {
        super(props);

        const { navigation } = props;
        const { user, friends } = navigation.state.params;

        //console.log(friends);
        //console.log(user);

        this.state = {
            isUpdating: false,
            displayName: user.displayName,
            statusMsg: user.statusMsg,
            img: user.img,
            isMe: user.isMe,  // 임시다.... 
            thisFriends : friends,
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
        const isFriend = user.isFriend;

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.onPressImg}
                    >
                        <Image source={this.state.img} style={styles.img} />
                    </TouchableOpacity>
                    <TextInput
                        editable={this.state.isMe}
                        style={{ marginTop: 24 }}
                        txtLabel={('NAME')}
                        txtHint={('NAME')}
                        txt={this.state.displayName}
                        onTextChanged={(text) => this.onTextChanged('DISPLAY_NAME', text)}
                    />
                    <TextInput
                        editable={this.state.isMe}
                        style={{ marginTop: 24 }}
                        txtLabel={('STATUS MSG')}
                        txtHint={('STATUS MSG')}
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
                            >{('ADD FRIEND')}</Button>}

                        {!this.state.isMe && isFriend &&
                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    isLoading={this.state.isUpdating}
                                    onPress={this.onChatFriend}
                                    style={styles.btnUpdate}
                                    textStyle={styles.txtUpdate}
                                >{('CHAT FRIEND')}</Button>
                                <Button
                                    isLoading={this.state.isUpdating}
                                    onPress={this.onRemoveFriend}
                                    style={styles.btnUpdate}
                                    textStyle={styles.txtUpdate}
                                >{('DELETE FRIEND')}</Button>
                            </View>}

                    </View>
                </View>
            </View>
        );
    }

    onUpdate = () => {
        console.log('onUpdate');
        const { user, friends } = this.props.navigation.state.params;
       
        const { displayName, statusMsg } = this.state;
        this.setState({ isUpdating: true }, () => {
            try {
                // 현재 업데이트 하려면......              
                //user.displayName = displayName;
                //user.statusMsg = statusMsg;
                //console.log(friends);
                for(let u of friends) {
                    //console.log(u.displayName);
                    //console.log(displayName);
                    if( u.displayName.includes(user.displayName) == true) {
                        //console.log(u);
                        u.displayName = displayName;
                        u.statusMsg = statusMsg;
                        console.log(u);
                    }
                }
                //console.log(user);
                this.props.navigation.navigate("Friend", {});  // 뭔가보내야만 한다는 이유를 모르겠다... 
            } catch (err) {
                this.setState({ isUpdating: false });
            }
        });
    }

    onAddFriend = () => {
        const { user } = this.props.navigation.state.params;
        //console.log(user); 
        //db_addfriend(user.uid);
        // isUpdating은 커스텀 버튼의 디자인 효과다...
        this.setState({isUpdating: true}, () => {
            user.isFriend = true;
            //thisFriends.push(user);
            this.props.navigation.navigate("Friend", {user: user, work: 'add' });
        });        
    }

    onRemoveFriend = () => {
        const { user, friends } = this.props.navigation.state.params;
        console.log(friends);
        //db_unfriend(user.uid);
        user.isFriend = false;
        let n = friends.indexOf(user);
        friends.splice(n, 1);
        this.props.navigation.navigate("Friend", { user: user });        
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

// 헤더를 빼면서 뒤로가기 기능이 없다 아래와 같이 구현
const navigatorConfig = {
    navigationOptions: commonNavigationOptionsForModal,
};
export default FriendNavigator = createStackNavigator({
    FriendNavigator: { screen: Profile }
}, navigatorConfig);

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
        marginTop: 40,
        width: '78%',

        flexDirection: 'column',
        alignItems: 'center',
    },
    btnWrapper: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 48,
    },
    btnLogout: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 1,
        width: 136,
        height: 60,
        borderColor: colors.dodgerBlue,
        marginRight: 4,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtLogout: {
        fontSize: 16,
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
            height: 10,
        },
        shadowRadius: 4,
        shadowOpacity: 0.3,
        marginRight: 50,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtUpdate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    img: {
        width: 60,
        height: 60,
    },
});