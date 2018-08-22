import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import SwitchNavigator from './components/navigation/SwitchNavigator';
import { IC_KangHG, IC_IMHG, IC_JungDM, IC_KimSK, IC_KimYH, IC_LeeWG, IC_LeeDY, IC_JungIS, IC_JungJY, IC_JungGH, IC_ParkKW, IC_LeeMH, IC_AnMH, IC_LeeYG, IC_OhYT } from './utils/Icons';


// 일종의 Main 함수 즉 EntryPoint다 시작은 Route를 위한 네비게이터를 연결한다 
export default class App extends Component {
    constructor() {
        super();

        global.users = [
            { uid: 0, img: IC_KangHG, displayName: '강한규', statusMsg: 'hello', isFriend: true, isMe: true },
            { uid: 1, img: IC_IMHG, displayName: '임형관', statusMsg: 'hello', isFriend: true, isMe: false },
            { uid: 2, img: IC_JungDM, displayName: '정동민', statusMsg: 'hello', isFriend: true, isMe: false },
            { uid: 3, img: IC_KimSK, displayName: '김성기', statusMsg: 'hello', isFriend: true, isMe: false },
            { uid: 4, img: IC_KimYH, displayName: '김윤희', statusMsg: 'hello', isFriend: true, isMe: false },
            { uid: 5, img: IC_LeeWG, displayName: '이원지', statusMsg: 'hello', isFriend: true, isMe: false },
            { uid: 6, img: IC_LeeDY, displayName: '이동룡', statusMsg: 'hello', isFriend: false, isMe: false },
            { uid: 7, img: IC_JungIS, displayName: '정인수', statusMsg: 'hello', isFriend: false, isMe: false },
            { uid: 8, img: IC_JungJY, displayName: '정재윤', statusMsg: 'hello', isFriend: false, isMe: false },
            { uid: 9, img: IC_JungGH, displayName: '정규호', statusMsg: 'hello', isFriend: false, isMe: false },
            { uid: 10, img: IC_ParkKW, displayName: '박경원', statusMsg: 'hello', isFriend: false, isMe: false },
            { uid: 11, img: IC_LeeMH, displayName: '이명호', statusMsg: 'hello', isFriend: false, isMe: false },
            { uid: 12, img: IC_AnMH, displayName: '안명환', statusMsg: 'hello', isFriend: false, isMe: false },
            { uid: 13, img: IC_LeeYG, displayName: '이윤관', statusMsg: 'hello', isFriend: false, isMe: false },
            { uid: 14, img: IC_OhYT, displayName: '오용택', statusMsg: 'hello', isFriend: false, isMe: false },        
        ]
    }
    render() {
        return (
            <View style={styles.container}>
                <SwitchNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center', // 여기를 주석을 풀면 다음 화면이 나타나지 않는다.. 겨우 찾았다 이유는 모르겠다
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',
    }
});