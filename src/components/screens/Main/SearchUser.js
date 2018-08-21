import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    Animated
} from "react-native";

import UserListItem from '../../Items/UserListItem';
import EmptyListItem from '../../Items/EmptyListItem';

import { ratio, colors, statusBarHeight } from '../../../utils/Styles';
import { IC_BACK, IC_SEARCH } from '../../../utils/Icons';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }        
    }

    static navigationOptions = {
        title: 'SEARCH USER'
    }
    componentDidMount() {
        console.log('componentDidMount', 'SearchUser');
        let users = []; //await db_getAllUser();
        // 여기서 셋팅을 해줘야 하는데.... 
        users = [
            { uid: 0, img: require('./../../../../assets/img/imhyunggwan.png'), displayName: '임형관', statusMsg: 'hello', isFriend: true  },
            { uid: 1, img: require('./../../../../assets/img/jungdongmin.png'), displayName: '정동민', statusMsg: 'hello', isFriend: true },
            { uid: 2, img: require('./../../../../assets/img/kanghangyu.png'), displayName: '강한규', statusMsg: 'hello', isFriend: true },
            { uid: 3, img: require('./../../../../assets/img/kimsungki.png'), displayName: '김성기', statusMsg: 'hello', isFriend: true },
            { uid: 4, img: require('./../../../../assets/img/kimyoonhee.png'), displayName: '김윤희', statusMsg: 'hello', isFriend: true },
            { uid: 5, img: require('./../../../../assets/img/leewonji.png'), displayName: '이원지', statusMsg: 'hello', isFriend: true },
            { uid: 6, img: require('./../../../../assets/img/dongyoung.png'), displayName: '이동룡', statusMsg: 'hello', isFriend: false },
            { uid: 7, img: require('./../../../../assets/img/insu.png'), displayName: '정인수', statusMsg: 'hello', isFriend: false },
            { uid: 8, img: require('./../../../../assets/img/jayoon.png'), displayName: '정재윤', statusMsg: 'hello', isFriend: false },
            { uid: 9, img: require('./../../../../assets/img/kyuho.png'), displayName: '정규호', statusMsg: 'hello', isFriend: false },
            { uid: 10, img: require('./../../../../assets/img/kyungwon.png'), displayName: '박경원', statusMsg: 'hello', isFriend: false },
            { uid: 11, img: require('./../../../../assets/img/myungho.png'), displayName: '이명호', statusMsg: 'hello', isFriend: false },
            { uid: 12, img: require('./../../../../assets/img/myunghwan.png'), displayName: '안명환', statusMsg: 'hello', isFriend: false },
            { uid: 13, img: require('./../../../../assets/img/yoonkwan.png'), displayName: '이윤관', statusMsg: 'hello', isFriend: false },
            { uid: 14, img: require('./../../../../assets/img/youngtak.png'), displayName: '오용택', statusMsg: 'hello', isFriend: false },
        ]

        this.setState({ users: users });
    }
    render() {
        let searchTxt = '';
        let scrollY = new Animated.Value(0);
        //let users = [];

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.viewSearch,
                {
                    height: 50, transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [-50, 0, 50, 100],
                            outputRange: [0, 0, -50, -50],
                        })
                    }],
                }]}>
                    <Animated.View style={{
                        position: 'absolute', width: '100%', paddingHorizontal: 20, height: 50,
                        opacity: scrollY.interpolate({
                            inputRange: [-50, 0, 50, 100],
                            outputRange: [1, 1, 0, 0],
                        })
                    }}>
                        <TextInput
                            onChangeText={(text) => this.onTxtChanged(text)}
                            underlineColorAndroid='transparent' // android fix
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline={false}
                            // value={this.searchTxt}
                            style={{
                                width: '100%', height: 30, top: 10, backgroundColor: 'white',
                                borderRadius: 4, paddingLeft: 34, paddingRight: 10
                            }}
                            onSubmitEditing={this.onSearch}
                            defaultValue={this.searchTxt}
                        />
                        <Image source={IC_SEARCH} style={styles.imgSearch} />
                    </Animated.View>
                </Animated.View>
                <AnimatedFlatList
                    style={{
                        width: '100%', height: '100%', marginBottom: -50,
                        transform: [{
                            translateY: scrollY.interpolate({
                                inputRange: [-50, 0, 50, 100],
                                outputRange: [0, 0, -50, -50],
                            })
                        }],
                    }}
                    contentContainerStyle={                        
                        this.state.users.length === 0
                             ? {
                                 flex: 1,
                                 alignItems: 'center',
                                 justifyContent: 'center',
                             }
                             : null                        
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.users}
                    renderItem={this.renderItem}
                    ListEmptyComponent={<EmptyListItem>{('NO_CONTENT')}</EmptyListItem>}

                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true, listener: this.onScroll },
                    )}
                />
            </View>
        );
    }

    onScroll = (e) => {
        // console.log(e.nativeEvent.contentOffset.y);
    }

    renderItem = ({ item }) => {
        return (
            <UserListItem
                item={item}
                onPress={() => this.onItemClick(item)}
            />
        );
    }

    onItemClick = (item) => {
        // console.log(item);
        this.props.navigation.navigate('Profile', { user: item });
    }

    onTxtChanged = (txt) => {
        this.searchTxt = txt;
        this.onSearch();
    }

    onSearch = () => {
        console.log('onSearch: ' + this.searchTxt);
        if (this.searchTxt === '') {
            this.setState({ users: this.state.users });
        } else {
            this.setState({ users: this.state.users.filter((item) => item.displayName.includes(this.searchTxt)) });
        }
    }

    onChat = () => {
        this.props.navigation.navigate('Chat');
    }
}
export default SearchUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    viewSearch: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: colors.dodgerBlue,
        overflow: 'hidden',
    },
    imgSearch: {
        position: 'absolute',
        width: 16,
        height: 16,
        left: 30, top: 18,
    },
    inputSearch: {
        backgroundColor: 'rgb(247,248,251)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
});