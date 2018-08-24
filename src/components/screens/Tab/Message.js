import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';

import EmptyListItem from '../../items/EmptyListItem';
import ChatroomListItem from '../../items/ChatroomListItem';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    id: 1,
                    img: require('../../../../assets/img/kimsungki.png'),
                    displayName: '김성기',
                    msg: '내일 출근 하세요',
                    count: 6,
                    date: new Date(),
                },
                {
                    id: 2,
                    img: require('../../../../assets/img/imhyunggwan.png'),
                    displayName: '임형관',
                    msg: '내일 쉬겠습니다 ',
                    count: 1,
                    date: new Date(),
                },
            ],
        }

        const test = this.props.navigation.state.params;
        //console.log("test");


    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{
                        alignSelf: 'stretch',
                    }}
                    contentContainerStyle={
                        this.state.messages.length === 0
                            ? {
                                flex: 1,
                                alignSelf: 'stretch',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                            : null
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.messages}
                    renderItem={this.renderItem}
                    ListEmptyComponent={<EmptyListItem>{('NO_CONTENT')}</EmptyListItem>}
                />
                 <ActionButton buttonColor="rgba(231,76,60,1)">
                    {/* <ActionButton.Item buttonColor='#9b59b6' title="Done" onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                        </ActionButton.Item> */}
                    <ActionButton.Item buttonColor='#3498db' title="New" onPress={() => { this._onAddButtonClick(true) }}>
                        <Ionicons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }

    _onAddButtonClick = () => {
        this.props.navigation.navigate('SearchUser')
    }

    renderItem = ({ item }) => {
        return (
            <ChatroomListItem
                item={item}
                onPress={() => this.onItemClick(item.id)}
            />
        );
    }

    onItemClick = (itemId) => {
        console.log(`onItemClick: ${itemId}`);
        this.props.navigation.navigate('Chat', { chatId: itemId });
    }
}
export default Message;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});