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

import UserListItem from '../../Items/UserListItem';
import EmptyListItem from '../../Items/EmptyListItem';
import StatusBar from '../../shared/StatusBar';

//import Swipeout from 'react-native-swipeout';
import ActionSheet from 'react-native-actionsheet';

class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedContextMenuIndex: -1,
            refreshing: false,
        };

        const { navigation } = props;
        const test = navigation.state.params;

        this.state = {
            dummyData: [
                { uid: 0, img: require('./../../../../assets/img/imhyunggwan.png'), displayName: '임형관', statusMsg: 'hello', isFriend: true },
                { uid: 1, img: require('./../../../../assets/img/jungdongmin.png'), displayName: '정동민', statusMsg: 'hello', isFriend: true },
                { uid: 2, img: require('./../../../../assets/img/kanghangyu.png'), displayName: '강한규', statusMsg: 'hello', isFriend: true },
                { uid: 3, img: require('./../../../../assets/img/kimsungki.png'), displayName: '김성기', statusMsg: 'hello', isFriend: true },
                { uid: 4, img: require('./../../../../assets/img/kimyoonhee.png'), displayName: '김윤희', statusMsg: 'hello', isFriend: true },
                { uid: 5, img: require('./../../../../assets/img/leewonji.png'), displayName: '이원지', statusMsg: 'hello', isFriend: true },
            ]
        }
        //const user = this.props.navigation.state.params;
        //console.log(navigation)
        console.log("dkfjskdjflsdjf")
    }

    componentWillMount() {
        console.log("dkfjskdjflsdjf")
        // const user = this.props.navigation.state.params;
        // console.log(user);
        // if (user !== undefined) {
        //     console.log(user);
        //     if (this.state.dummyData.map((x) => x.displayName === user.displayName)) {
        //         this.state.dummyData.splice(this.state.dummyData.indexOf(x), 1);
        //         //console.log(this.state.dummyData);

        //     }
        // }
    }

    render() {
        const user = this.props.navigation.state.params;
        if (user !== undefined ) {
            console.log(user)
            const { dummyData } = this.state;
            let tt = { uid: user.uid, img: user.img, displayName: user.displayName, statusMsg: user.statusMsg, isFriend: true };
            dummyData.push(tt);
            //console.log(dummyData)
            //this.setState({
            //    refreshing: !refreshing
            //})
        }

        return (
            <View style={styles.container}>
                <StatusBar isDarkContent={false} />
                <FlatList
                    style={{
                        alignSelf: 'stretch',
                        //flexDirection: 'column'
                    }}
                    contentContainerStyle={
                        this.state.dummyData.length === 0
                            ? {
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                            : null
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.dummyData}
                    renderItem={this.renderItem}
                    refreshing={this.state.refreshing}
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

                {Platform.OS === 'android' && <ActionSheet
                    ref={(comp) => this.actionSheet = comp}
                    options={['Unfriend', 'Cancel']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={this.onPressActionSheetButton}
                />}

            </View>
        );
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
        this.state.dummyData.map((x) => {
            if (x.displayName === user.displayName) {
                this.setState(
                    this.state.dummyData.splice(x.uid, 1)
                )
            }
        })
    }

    showActionSheet = (user) => {
        console.log('showActionSheet');
        this.selectedUser = user;
        if (this.actionSheet) { this.actionSheet.show(); }
    }

    onOpenContextMenu = (sectionID, rowID) => {
        this.setState({ openedContextMenuIndex: rowID });
    }

    renderItem = ({ item, index }) => {
        const listItem =
            <UserListItem
                item={item}
                onPress={() => this.onItemClick(item)}
                onLongPress={Platform.select({ ios: null, android: () => this.showActionSheet(item) })}
                delete={this.deleteItem}
            />;

        if (Platform.OS === 'ios') {
            return (
                <View></View>
                // <Swipeout
                //     rowID={index}
                //     close={index !== this.state.openedContextMenuIndex}
                //     autoClose={true}
                //     onOpen={this.onOpenContextMenu}
                //     right={[{ text: 'Unfriend', backgroundColor: 'red', onPress: () => this.onPressUnfriend(item) }]}>
                //     {listItem}
                // </Swipeout>
            );
        } else {
            return listItem;
        }
    }

    onItemClick = (item) => {
        //console.log(item);
        this.props.navigation.navigate('Profile', { user: item });
    }

    deleteItem = (item) => {
        this.setState();
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