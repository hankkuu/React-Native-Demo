import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform
} from "react-native";
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
//import Swipeout from 'react-native-swipeout';
import ActionSheet from 'react-native-actionsheet';

import UserListItem from '../../items/UserListItem';
import EmptyListItem from '../../items/EmptyListItem';

class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedContextMenuIndex: -1,
            refreshing: false,
            friends: [],
        };

        const { navigation } = props;
        const test = navigation.state.params;
        //console.log(test);

        dummyData = global.users.map((data, index) => {
            if (data.isFriend === true) {
                this.state.friends.push(data);
                return data;
            }
        })  
    }

    componentWillMount() {
        //console.log("componentWillMount - Friend");
        // dummyData = global.users.map((data, index) => {
        //     if (data.isFriend === true) {
        //         this.state.friends.push(data);
        //         return data;
        //     }
        // })    
    }

    componentDidMount() {
        //console.log("componentDidMount - Friend");
        //const { navigation } = this.props;
        //const test = navigation.state.params;
        //console.log(test);
        // dummyData = global.users.map((data, index) => {
        //     if (data.isFriend === true) {
        //         this.state.friends.push(data);
        //         return data;
        //     }
        // })    
    }

    componentDidUpdate() {
        console.log("componentDidUpdate - Friend");
        const { navigation } = this.props;
        const test = navigation.state.params;
        
        if (test !== undefined) {
            const { friends } = this.state;
            if (test.work === 'add') {                 
                if (test.user.isFriend === true) {
                    console.log(test.user);
                    friends.push(test.user);
                }
            } 
        }
      
    }

    render() {      

        return (
            <View style={styles.container}>
                <FlatList
                    style={{
                        alignSelf: 'stretch',
                    }}
                    contentContainerStyle={
                        this.state.friends.length === 0
                            ? {
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                            : null
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.friends}
                    renderItem={this.renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    extraData={this.state}
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

                {Platform.OS === 'android' &&
                    <ActionSheet
                        ref={(comp) => this.actionSheet = comp}
                        options={['Delete Friend', 'Cancel']}
                        cancelButtonIndex={1}
                        destructiveButtonIndex={0}
                        onPress={this.onPressActionSheetButton}
                    />}

            </View>
        );
    }

    onRefresh = () => {
        console.log("refresh");

    }

    _onAddButtonClick = () => {
        this.props.navigation.navigate('SearchUser')
    }

    onPressActionSheetButton = (index) => {
        if (index === 0) {
            this.onPressUnfriend(this.selectedUser);
        }
    }

    onPressUnfriend = (user) => {
        //db_unfriend(user.uid);
        this.state.friends.map((x) => {
            if (x.displayName === user.displayName) {
                this.setState(
                    this.state.friends.splice(x.uid, 1)
                )
            }
        })
    }

    showActionSheet = (user) => {
        console.log('showActionSheet');
        this.selectedUser = user;
        if (this.actionSheet) {
            this.actionSheet.show();
        }
    }

    onOpenContextMenu = (sectionID, rowID) => {
        this.setState({ openedContextMenuIndex: rowID });
    }

    renderItem = ({ item, index }) => {
        //console.log(item.displayName);
        const listItem =
            <UserListItem
                item={item}
                onPress={() => this.onItemClick(item)}
                onLongPress={Platform.select({ ios: null, android: () => this.showActionSheet(item) })}
            />;
        return listItem;
    }

    onItemClick = (item) => {        
        console.log("onItemClick");
        const { friends } = this.state;
        //console.log(friends);
        this.props.navigation.navigate('Profile', { user: item, friends: friends });
    }
}
export default Friend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});