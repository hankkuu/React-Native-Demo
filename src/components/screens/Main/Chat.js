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

import { IC_SMILE } from '../../../utils/Icons';
import { colors } from '../../../utils/Styles';

import Button from '../../shared/Button';
//import TextInput from '../../shared/TextInput';
import ChatListItem from '../../Items/ChatListItem';
import EmptyListItem from '../../Items/EmptyListItem';

const keyboardDidShowListener = null;

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
        this.state.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => this.keyboardDidShow(e));
    }
    componentWillUnmount() {
        this.state.keyboardDidShowListener.remove();
    }

    render() {
        //const { user } = this.props.navigation.state.params;
        //console.log("user");
        return (
            <View style={styles.container}>

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
                        : <View style={styles.viewBottom}>
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
                            <View style={styles.viewMenu}>
                                <Text>여기에 사진을 불러와서 사진 첨부를 하자</Text>
                            </View>
                        </View>
                }
            </View>
        );
    }

    onTextChanged = (text) => {
        this.setState({
            msg: text
        });
    }

    keyboardDidShow(e) {
        console.log('keyboardHeight', e.endCoordinates.height);
    }

    renderItem = ({ item }) => {
        //console.log(item)
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
        //console.log('showMenu');
        //Keyboard.dismiss();
        this.setState({
            showMenu: !this.state.showMenu,
        });
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
        height: 52,

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    inputChat: {
        width: '80%',
        //fontSize: 14 ,
        marginRight: 20,
        paddingLeft: 48,
    },
    touchMenu: {
        position: 'absolute',
        left: 10,
        height: '100%',
        minWidth: 20,
        justifyContent: 'center',
    },
    imgMenu: {
        width: 20,
        height: 20,
    },
    btnSend: {
        left: 8,
        right: 8,
        backgroundColor: colors.dodgerBlue,
        borderRadius: 4,
        width: 60,
        height: 36,
        marginRight: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },
    txtSend: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 10,
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