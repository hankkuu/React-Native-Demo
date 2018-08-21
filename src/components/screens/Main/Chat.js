import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";

import { IC_BACK, IC_SMILE } from '../../../utils/Icons';

import { ratio, colors, statusBarHeight } from '../../../utils/Styles';

import Button from '../../shared/Button';
//import TextInput from '../../shared/TextInput';
import ChatListItem from '../../Items/ChatListItem';
import EmptyListItem from '../../Items/EmptyListItem';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            showMenu: false,
            chats: [
                {
                    id: '0',
                    sender: '0',
                    img: require('../../../../assets/img/kimsungki.png'),
                    message: '임시로 쓰는 말이다.. ',
                    date: new Date(),
                    isPeer: true,
                },
                {
                    id: '1',
                    sender: '1',
                    img: require('../../../../assets/img/imhyunggwan.png'),
                    message: '임시로 대답하는 말이다',
                    date: new Date(),
                    isPeer: false,
                },
            ],
            keyboardDidShowListener: null,
            msg: '',
        }
    }
    static navigationOptions = {
        title: 'CHAT'
    }


    componentDidMount() {
        this.state.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardDidShow(e));
    }
    componentWillUnmount() {
        this.state.keyboardDidShowListener.remove();
    }

    render() {
        const { user } = this.props.navigation.state.params;
        console.log(user);
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior='padding'
                    style={styles.content}
                >
                    <FlatList
                        style={{
                            alignSelf: 'stretch',
                        }}
                        contentContainerStyle={
                            this.state.chats.length === 0
                                ? {
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }
                                : null
                        }
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.chats}
                        renderItem={this.renderItem}
                        ListEmptyComponent={<EmptyListItem>{('NO_CONTENT')}</EmptyListItem>}
                    />
                    {
                        !this.state.showMenu
                            ? <View
                                style={styles.viewChat}
                            >
                                <TextInput
                                    style={styles.inputChat}
                                    placeholder={('WRITE_MESSAGE')}
                                    placeholderTextColor={colors.cloudyBlue}
                                />
                                <TouchableOpacity
                                    style={styles.touchMenu}
                                    onPress={this.showMenu}
                                >
                                    <Image style={styles.imgMenu} source={IC_SMILE} />
                                </TouchableOpacity>
                                <Button
                                    isLoading={this.state.isLoading}
                                    onPress={this.sendChat}
                                    style={styles.btnSend}
                                    textStyle={styles.txtSend}
                                >{('SEND')}</Button>
                            </View>
                            : null
                    }
                </KeyboardAvoidingView>
                {
                    this.state.showMenu
                        ? <View style={styles.viewBottom}>
                            <View style={styles.viewChat}>
                                <TextInput
                                    style={styles.inputChat}
                                    placeholder={('WRITE_MESSAGE')}
                                    placeholderTextColor={colors.cloudyBlue}
                                    onChangeText={this.onTextChanged}
                                />
                                <TouchableOpacity
                                    style={styles.touchMenu}
                                    onPress={this.showMenu}
                                >
                                    <Image style={styles.imgMenu} source={IC_SMILE} />
                                </TouchableOpacity>
                                <Button
                                    isLoading={this.state.isLoading}
                                    onPress={this.sendChat}
                                    style={styles.btnSend}
                                    textStyle={styles.txtSend}
                                >{('SEND')}</Button>
                            </View>
                            <View style={styles.viewMenu} />
                        </View>
                        : null
                }
            </View>
        );
    }

    onTextChanged = text => {
        this.setState({
            msg: text
        });
    }

    _keyboardDidShow(e) {
        console.log('keyboardHeight', e.endCoordinates.height);
    }

    renderItem = ({ item }) => {
        return (
            <ChatListItem
                item={item}
            />
        );
    }

    sendChat = () => {
        console.log('sendChat');
        const { user } = this.props.navigation.state.params;
        const { Chat, msg } = this.state;
        console.log(msg);
        if (msg !== "") {
            console.log(msg);
            console.log(Chat);
            this.setState(prevState => {
                const ID = uuidv1();
                const newObject = {
                    [ID]: {
                        id: ID,
                        sender: user.displayName,
                        img: user.img,
                        message: msg,
                        date: new Date(),
                        isPeer: true,
                    }
                }
                const newState = {
                    ...prevState,
                    msg: '',
                    Chat: {
                        ...prevState.Chat,
                        ...newObject
                    }
                }
                return { ...newState }
            });
        }
    }

    showMenu = () => {
        console.log('showMenu');
        Keyboard.dismiss();
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}
export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',

        flexDirection: 'column',
        alignItems: 'center',
    },
    viewChat: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: colors.paleGray,
        height: 52 * ratio,

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    inputChat: {
        width: '80%',
        //fontSize: 14 * ratio,
        marginRight: 20 * ratio,
        paddingLeft: 48 * ratio,
    },
    touchMenu: {
        position: 'absolute',
        left: 10,
        height: '100%',
        minWidth: 20 * ratio,
        justifyContent: 'center',
    },
    imgMenu: {
        width: 20 * ratio,
        height: 20 * ratio,
    },
    btnSend: {
        right: 8 * ratio,
        backgroundColor: colors.dodgerBlue,
        borderRadius: 4 * ratio,
        width: 60 * ratio,
        height: 36 * ratio,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtSend: {
        fontSize: 14 * ratio,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 5 * ratio,
        paddingVertical: 10 * ratio,
    },
    viewBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    viewMenu: {
        height: 258,
        backgroundColor: 'green',
    },
});