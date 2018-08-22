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

import { colors } from '../../../utils/Styles';
import { IC_SEARCH } from '../../../utils/Icons';

import GLOBAL from '../../../utils/global';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const gobalUsers = []; 

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            searchTxt: '',
            scrollY: new Animated.Value(0),
        }        
    }

    static navigationOptions = {
        title: 'SEARCH USER'
    }
    
    componentDidMount() {
        //console.log('componentDidMount', 'SearchUser');
         // 여기서 셋팅을 해줘야 하는데.... 
        //console.log(global.users);
        gobalUsers = global.users;
        this.setState({ users: global.users });
    }
    render() {

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.viewSearch,
                {
                    height: 50, transform: [{
                        translateY: this.state.scrollY.interpolate({
                            inputRange: [-50, 0, 50, 100],
                            outputRange: [0, 0, -50, -50],
                        })
                    }],
                }]}>
                    <Animated.View style={{
                        position: 'absolute', width: '100%', paddingHorizontal: 20, height: 50,
                        opacity: this.state.scrollY.interpolate({
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
                            style={{
                                width: '100%', height: 30, top: 10, backgroundColor: 'white',
                                borderRadius: 4, paddingLeft: 34, paddingRight: 10
                            }}
                            onSubmitEditing={this.onSearch}
                            defaultValue={this.state.searchTxt}
                        />
                        <Image source={IC_SEARCH} style={styles.imgSearch} />
                    </Animated.View>
                </Animated.View>
                <AnimatedFlatList
                    style={{
                        width: '100%', height: '100%', marginBottom: -50,
                        transform: [{
                            translateY: this.state.scrollY.interpolate({
                                inputRange: [-50, 0, 50, 100],
                                outputRange: [0, 0, -50, -50],
                            })
                        }],
                    }}
                    contentContainerStyle={       
                        // content와 관련된 style을 아래와 같이 할 수있다.. 사실 가운데 정렬 이라고 밖에...                  
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
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true, listener: this.onScroll },
                    )}
                />
            </View>
        );
    }

    onScroll = (e) => {
        //console.log(e.nativeEvent.contentOffset.y);
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

    // async ~ await 패턴을 사용했다 왜냐하면 setState가 완전히 변경이 안되었는데 onSerch()가 호출되어 문자열 비교의 불일치가 일어났다 
    // await는 이런 점을 보완해준다 즉 단어 그대로 기다리는 것이다 그리고 await를 사용하면 async를 사용하는 패턴으로 코딩해야 에러가 나지 않는다 
    onTxtChanged = async (txt) => {
        //console.log(txt);
        await this.setState({
            searchTxt: txt
        });
        // 아래와 같은 식으로 state를 건르리지 않는다.
        //this.state.searchTxt = txt;
        this.onSearch();
    }

    onSearch = () => {
        const { users, searchTxt } = this.state;
        //console.log('onSearch: ' + searchTxt);        
        if (searchTxt === '') {
            //console.log("전체가 보여야 한다"); // 임시로 전체를 이렇게 가져와야 할것 같다.. state 배열이 비어 있다.
            // 아래에서 상태를변경시켜 놔서 맨 처음것으로 다시 덮어써야 한다 
            this.setState({ users: gobalUsers });
        } else {
            this.setState({ users: users.filter((item) => item.displayName.includes(this.state.searchTxt)) });
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